"""Conteúdo e HTML estático da variante Painel claro do protótipo de salários."""
from pathlib import Path
import html
import json
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
PROTOTYPE = ROOT / 'Graduacao/prototipo-salarios/index.html'
STYLES = ROOT / 'Graduacao/_shared/salarios/styles.css'
COURSES = {
    'administracao': 'administracao',
    'marketing': 'marketing',
    'processos-gerenciais': 'processos-gerenciais',
    'recursos-humanos': 'recursos-humanos',
    'pedagogia': 'pedagogia',
    'traducao-e-interpretacao-ingles-portugues': 'traducao e interpretacao',
}
BEGIN = '<!-- phorte-salary-panel:start -->'
END = '<!-- phorte-salary-panel:end -->'
CSS_BEGIN = '/* phorte-salary-panel:start */'
CSS_END = '/* phorte-salary-panel:end */'


def seed_copy_files():
    markup = PROTOTYPE.read_text(encoding='utf-8')
    dataset = re.search(r'const courses = (\[[\s\S]*?\n    \]);', markup).group(1)
    dataset = re.sub(r'\b(name|page|title|copy|source|salaries)\s*:', r'"\1":', dataset)
    for course in json.loads(dataset):
        if course['page'] not in COURSES:
            continue
        path = ROOT / 'Graduacao' / COURSES[course['page']] / 'copy/salarios.md'
        if path.exists():
            continue
        path.parent.mkdir(parents=True, exist_ok=True)
        rows = '\n'.join(f'| {role} | {value} |' for value, role in course['salaries'])
        text = f'''# Salários — {course['name']}

**Estado editorial:** conteúdo do protótipo incorporado ao preview por solicitação do usuário. Fontes e períodos permanecem sujeitos à confirmação antes de publicação.

**Referência de composição e dados:** [protótipo de salários — Painel claro](../../prototipo-salarios/index.html), consultado localmente em 2026-10-09. Nenhuma atualização estatística foi realizada nesta incorporação.

## Conteúdo do painel

**Título:** {course['title']}

**Texto:** {course['copy']}

| Ocupação | Média mensal |
|---|---|
{rows}

**Fonte exibida:** {course['source']}

## Utilização

Inserir após atuação profissional. Três cards no desktop e uma coluna no mobile, com destaque tênue no primeiro card. A copy salarial é independente da copy acadêmica do curso. Educação Física está fora desta incorporação.
'''
        path.write_text(text, encoding='utf-8')


def render_salary_panel(folder_name):
    path = ROOT / 'Graduacao' / folder_name / 'copy/salarios.md'
    copy = path.read_text(encoding='utf-8')
    def field(label):
        return re.search(r'^\*\*' + re.escape(label) + r':\*\* (.+)$', copy, re.M).group(1)
    rows = re.findall(r'^\| ([^|]+) \| ([^|]+) \|$', copy, re.M)[1:]
    slug = next(key for key, value in COURSES.items() if value == folder_name)
    identity = f'{slug}-salarios'
    cards = ''.join(f'<div class="phorte-salary-card"><span class="phorte-salary-label">Média Salarial</span><strong class="phorte-salary-value">{html.escape(value)}</strong><span class="phorte-salary-role">{html.escape(role)}</span></div>' for role, value in rows)
    return f'''{BEGIN}
<section data-phorte-salary-section id="{identity}" aria-labelledby="{identity}-title">
  <div class="phorte-salary-container"><div class="phorte-salary-panel" data-style="clean">
    <div class="phorte-salary-copy"><h2 id="{identity}-title">{html.escape(field('Título'))}</h2><p>{html.escape(field('Texto'))}</p></div>
    <div class="phorte-salary-grid" role="group" aria-label="Médias salariais por ocupação">{cards}</div>
    <p class="phorte-salary-source">{html.escape(field('Fonte exibida'))}</p>
  </div></div>
</section>
{END}'''


def salary_css():
    return CSS_BEGIN + '\n' + STYLES.read_text(encoding='utf-8') + '\n' + CSS_END + '\n'


def integrate_after_careers(path, folder_name):
    text = path.read_text(encoding='utf-8')
    text = re.sub(re.escape(BEGIN) + r'[\s\S]*?' + re.escape(END) + r'\n?', '', text)
    career = re.search(r'<section\b[^>]*\bid="carreira"[^>]*>[\s\S]*?</section>', text)
    if not career:
        raise ValueError(f'Seção de atuação não encontrada: {path}')
    text = text[:career.end()] + '\n\n' + render_salary_panel(folder_name) + text[career.end():]
    # A FAQ antiga de Tradução contém uma média diferente sem fonte identificada.
    text = text.replace('Levantamentos de mercado de 2026 indicam médias para tradutores em torno de R$ 3 mil, mas esse valor pode variar bastante conforme o perfil profissional e a forma de atuação..', 'As médias do painel salarial são por ocupação e não representam um salário inicial garantido.')
    path.write_text(text, encoding='utf-8')


def append_styles(path):
    text = path.read_text(encoding='utf-8')
    text = re.sub(re.escape(CSS_BEGIN) + r'[\s\S]*?' + re.escape(CSS_END) + r'\n?', '', text)
    path.write_text(text.rstrip() + '\n\n' + salary_css(), encoding='utf-8')


def build_existing_pages():
    seed_copy_files()
    translation = ROOT / 'Graduacao/traducao e interpretacao'
    pedagogy = ROOT / 'Graduacao/pedagogia'
    for path in [translation / 'index.html', translation / 'implementacao/elementor/widget-before-form.html']:
        integrate_after_careers(path, 'traducao e interpretacao')
    append_styles(translation / 'styles.css')
    shutil.copyfile(translation / 'styles.css', translation / 'implementacao/elementor/styles.css')
    for path in [pedagogy / 'index-claro-2027-1.html', pedagogy / 'implementacao/elementor/2027-1/widget-before-form.html']:
        integrate_after_careers(path, 'pedagogia')
    path = pedagogy / 'index-claro-2027-1.html'
    text = path.read_text(encoding='utf-8')
    text = re.sub(r'<style data-phorte-salary-styles>[\s\S]*?</style>\n?', '', text)
    text = text.replace('</head>', '<style data-phorte-salary-styles>\n' + salary_css() + '</style>\n</head>', 1)
    path.write_text(text, encoding='utf-8')
    (pedagogy / 'implementacao/elementor/2027-1/salarios.css').write_text(salary_css(), encoding='utf-8')
    for folder in [translation, pedagogy]:
        elementor = folder / 'implementacao/elementor'
        if folder == pedagogy:
            elementor /= '2027-1'
        (elementor / 'salary-panel.html').write_text(render_salary_panel(folder.name) + '\n', encoding='utf-8')
    print('Painel claro incorporado em Pedagogia 2027.1 e Tradução, incluindo Elementor')
