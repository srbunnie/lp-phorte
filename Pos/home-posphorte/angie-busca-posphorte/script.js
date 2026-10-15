(function () {
	'use strict';

	var modalityIds = [37, 157, 119, 35];

	function initWidget(root) {
		if (!root || root.dataset.phortePosSearchReady === 'true') return;
		var form = root.querySelector('[data-search-form]');
		var modality = root.querySelector('[data-modality]');
		var area = root.querySelector('[data-area]');
		var course = root.querySelector('[data-course]');
		var query = root.querySelector('[data-search-query]');
		var submit = root.querySelector('.phorte-pos-search__submit');
		var status = root.querySelector('[data-status]');
		var results = root.querySelector('[data-results]');
		var loadMoreCourses = root.querySelector('[data-load-more]');
		if (!form || !modality || !area || !status || !results) return;

		root.dataset.phortePosSearchReady = 'true';
		var endpoint = root.dataset.endpoint.replace(/\/$/, '');
		var labels = {
			modality: modality.options[0].textContent,
			area: area.options[0].textContent,
			course: course && course.options.length ? course.options[0].textContent : '',
			loading: root.dataset.loading || 'Carregando opções…',
			empty: root.dataset.empty || 'Não encontramos cursos com esses critérios.'
		};
		var areaRequest = 0;
		var courseRequest = 0;
		var resultRequest = 0;
		var coursePage = 0;
		var coursePages = 0;
		var resultPage = 0;
		var resultPages = 0;
		var resultsPending = false;

		function setStatus(message, error, retry) {
			status.replaceChildren();
			status.classList.toggle('is-error', !!error);
			if (message) status.appendChild(document.createTextNode(message + (retry ? ' ' : '')));
			if (retry) {
				var button = document.createElement('button');
				button.type = 'button';
				button.className = 'phorte-pos-search__retry';
				button.textContent = 'Tentar novamente';
				button.addEventListener('click', retry, { once: true });
				status.appendChild(button);
			}
		}

		function clearResults() { results.replaceChildren(); }
		function isCurrentResult(requestId) { return root.isConnected && requestId === resultRequest; }
		function invalidateResults() {
			resultRequest += 1;
			resultsPending = false;
			clearResults();
			setStatus('');
			if (submit) submit.disabled = false;
		}
		function resetSelect(select, label, disabled) {
			if (!select) return;
			select.replaceChildren(new Option(label, ''));
			select.disabled = !!disabled;
		}
		function urlFor(resource, params) {
			var url = new URL(endpoint + '/' + resource, window.location.href);
			Object.keys(params || {}).forEach(function (key) {
				if (params[key] !== '' && params[key] !== null && typeof params[key] !== 'undefined') url.searchParams.set(key, params[key]);
			});
			return url.toString();
		}
		function request(resource, params) {
			return fetch(urlFor(resource, params), { method: 'GET', credentials: 'same-origin', headers: { Accept: 'application/json' } }).then(function (response) {
				return response.json().catch(function () { return {}; }).then(function (body) {
					if (!response.ok) throw new Error(body.message || 'Não foi possível consultar o catálogo.');
					return body;
				});
			});
		}
		function appendOptions(select, items) {
			items.forEach(function (item) { select.add(new Option(item.name || item.title, String(item.id))); });
		}

		function loadModalities() {
			modality.disabled = true;
			setStatus(labels.loading);
			request('modalities', {}).then(function (items) {
				if (!root.isConnected) return;
				var filtered = Array.isArray(items) ? items.filter(function (item) { return modalityIds.indexOf(Number(item.id)) !== -1; }) : [];
				appendOptions(modality, filtered);
				modality.disabled = false;
				setStatus(filtered.length ? '' : 'Nenhuma modalidade disponível no momento.', !filtered.length);
			}).catch(function (error) {
				if (!root.isConnected) return;
				modality.disabled = true;
				setStatus(error.message, true, loadModalities);
			});
		}

		function loadAreas() {
			var selectedModality = modality.value;
			var requestId = ++areaRequest;
			courseRequest += 1;
			invalidateResults();
			resetSelect(area, labels.area, true);
			if (course) resetSelect(course, labels.course, true);
			if (loadMoreCourses) loadMoreCourses.hidden = true;
			if (!selectedModality) { setStatus(''); return; }
			setStatus(labels.loading);
			var retry = function () { loadAreas(); };
			request('areas', { modality: selectedModality }).then(function (items) {
				if (!root.isConnected || requestId !== areaRequest) return;
				appendOptions(area, Array.isArray(items) ? items : []);
				area.disabled = false;
				setStatus(items.length ? '' : 'Nenhuma área disponível para esta modalidade.', !items.length, items.length ? null : retry);
			}).catch(function (error) {
				if (root.isConnected && requestId === areaRequest) setStatus(error.message, true, retry);
			});
		}

		function loadCourses(append) {
			var requestId = ++courseRequest;
			if (!course) return;
			if (!area.value) {
				resetSelect(course, labels.course, true);
				if (loadMoreCourses) loadMoreCourses.hidden = true;
				invalidateResults();
				return;
			}
			var nextPage = append ? coursePage + 1 : 1;
			if (!append) {
				resetSelect(course, labels.course, true);
				invalidateResults();
			}
			if (loadMoreCourses) loadMoreCourses.hidden = true;
			setStatus(labels.loading);
			var retry = function () { loadCourses(append); };
			request('courses', { modality: modality.value, area: area.value, page: nextPage, per_page: 100 }).then(function (payload) {
				if (!root.isConnected || requestId !== courseRequest) return;
				appendOptions(course, payload.items || []);
				course.disabled = false;
				coursePage = Number(payload.page || nextPage);
				coursePages = Number(payload.pages || 0);
				if (loadMoreCourses) loadMoreCourses.hidden = coursePage >= coursePages;
				setStatus(payload.total ? '' : labels.empty, !payload.total, payload.total ? null : retry);
			}).catch(function (error) {
				if (root.isConnected && requestId === courseRequest) setStatus(error.message, true, retry);
			});
		}

		function resultLink(item) {
			var link = document.createElement('a');
			link.className = 'phorte-pos-search__result-link';
			link.href = item.url;
			link.textContent = item.title || 'Ver curso';
			return link;
		}

		function loadResults(append) {
			if (append && resultsPending) return;
			var selectedCourse = course && course.value ? course.value : '';
			if (selectedCourse) {
				var directRequestId = ++resultRequest;
				var selectedQuery = query ? query.value.trim() : '';
				setStatus(labels.loading);
				request('search', { modality: modality.value, area: area.value, course: selectedCourse, q: selectedQuery }).then(function (payload) {
					if (!isCurrentResult(directRequestId)) return;
					if (payload.items && payload.items[0] && payload.items[0].url) window.location.assign(payload.items[0].url);
					else setStatus(labels.empty, true);
				}).catch(function (error) { if (isCurrentResult(directRequestId)) setStatus(error.message, true, function () { loadResults(false); }); });
				return;
			}

			var currentPage = append ? resultPage + 1 : 1;
			var requestId = ++resultRequest;
			var searchParams = { q: query ? query.value.trim() : '', modality: modality.value, area: area.value, page: currentPage, per_page: 12 };
			if (!append) clearResults();
			resultsPending = true;
			setStatus(labels.loading);
			if (submit) submit.disabled = true;
			var retry = function () { loadResults(append); };
			request('search', searchParams).then(function (payload) {
				if (!isCurrentResult(requestId)) return;
				if (!append) {
					var heading = document.createElement('h3');
					heading.className = 'phorte-pos-search__results-heading';
					heading.textContent = payload.total ? 'Resultados (' + payload.total + ')' : labels.empty;
					results.appendChild(heading);
					if (!payload.total) { setStatus(''); return; }
					var list = document.createElement('ul');
					list.className = 'phorte-pos-search__results-list';
					list.setAttribute('aria-label', 'Cursos encontrados');
					results.appendChild(list);
				}
				var resultList = results.querySelector('.phorte-pos-search__results-list');
				(payload.items || []).forEach(function (item) {
					var row = document.createElement('li');
					row.appendChild(resultLink(item));
					resultList.appendChild(row);
				});
				var more = results.querySelector('[data-results-more]');
				if (more) more.remove();
				resultPage = Number(payload.page || currentPage);
				resultPages = Number(payload.pages || 0);
				if (resultPage < resultPages) {
					more = document.createElement('button');
					more.type = 'button';
					more.className = 'phorte-pos-search__results-more';
					more.dataset.resultsMore = 'true';
					more.textContent = 'Carregar mais resultados';
					more.addEventListener('click', function () { loadResults(true); });
					results.appendChild(more);
				}
				setStatus('');
			}).catch(function (error) {
				if (isCurrentResult(requestId)) setStatus(error.message, true, retry);
			}).finally(function () {
				if (isCurrentResult(requestId)) {
					resultsPending = false;
					if (submit) submit.disabled = false;
				}
			});
		}

		modality.addEventListener('change', loadAreas);
		area.addEventListener('change', function () { invalidateResults(); if (course) loadCourses(false); else setStatus(''); });
		if (course) course.addEventListener('change', invalidateResults);
		if (query) query.addEventListener('input', invalidateResults);
		if (loadMoreCourses) loadMoreCourses.addEventListener('click', function () { loadCourses(true); });
		form.addEventListener('submit', function (event) { event.preventDefault(); loadResults(false); });
		loadModalities();
	}

	function initAll(scope) {
		var context = scope || document;
		if (context.matches && context.matches('[data-phorte-pos-search]')) initWidget(context);
		Array.prototype.forEach.call(context.querySelectorAll('[data-phorte-pos-search]'), initWidget);
	}

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { initAll(document); });
	else initAll(document);

	function registerElementorHook() {
		if (!window.elementorFrontend || !elementorFrontend.hooks || registerElementorHook.registered) return;
		registerElementorHook.registered = true;
		elementorFrontend.hooks.addAction('frontend/element_ready/phorte_pos_search.default', function ($scope) { initAll($scope[0]); });
		elementorFrontend.hooks.addAction('frontend/element_ready/shortcode.default', function ($scope) { initAll($scope[0]); });
	}
	if (window.jQuery) {
		jQuery(window).on('elementor/frontend/init', registerElementorHook);
		registerElementorHook();
	}
})();
