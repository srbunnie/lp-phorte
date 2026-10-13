"""Gera previews estáticos e fragmentos Elementor a partir das copys de gestão.

Uso: python scripts/build-lps-gestao.py
Somente biblioteca padrão. Não envia dados nem consulta serviços remotos.
"""
from pathlib import Path
import html
import re
import shutil
from salary_panels import render_salary_panel, salary_css, seed_copy_files

ROOT = Path(__file__).resolve().parents[1]
SHARED = ROOT / 'Graduacao/_shared/gestao'
SLUGS = ('administracao', 'marketing', 'processos-gerenciais', 'recursos-humanos')
LOGO = 'https://faculdadephorte.edu.br/wp-content/uploads/2024/12/logo-faculdade-phorte-unificado-1.svg'
INSTITUTION = 'https://faculdadephorte.edu.br/wp-content/uploads/2025/06/ratio11-2025-faculdade-phorte-final.webp'
FONTS = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@600;700;800&display=swap'
ICON_PATHS = (
    '<path d="M4 19h16M7 15v-4m5 4V5m5 10V8"/>',
    '<circle cx="9" cy="8" r="3"/><path d="M3 20v-3a6 6 0 0 1 12 0v3m2-15a3 3 0 0 1 0 6m2 9v-3a6 6 0 0 0-3-5"/>',
    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m12 12 7-7"/>',
    '<path d="M3 7h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM6 14v4h8M10 10h4"/>',
    '<path d="M6 17c-3-6 0-11 11-12 1 11-5 15-11 12Zm0 0-3 4m3-4 7-7"/>',
    '<path d="m12 3 2.6 5.3L20.5 9l-4.3 4.2 1 5.8-5.2-2.8L6.8 19l1-5.8L3.5 9l5.9-.7Z"/>',
)


def esc(value):
    return html.escape(str(value), quote=True)


def inline(value):
    value = esc(value)
    value = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', value)
    value = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'<a href="\2">\1</a>', value)
    return value


def paragraphs(value):
    blocks = []
    for chunk in re.split(r'\n\s*\n', value.strip()):
        if not chunk or chunk.startswith('**') or chunk.startswith('|'):
            continue
        if chunk.startswith('- '):
            blocks.append('<ul>' + ''.join(f'<li>{inline(line[2:])}</li>' for line in chunk.splitlines() if line.startswith('- ')) + '</ul>')
        else:
            blocks.append('<p>' + inline(' '.join(chunk.splitlines())) + '</p>')
    return '\n'.join(blocks)


def field(section, label):
    match = re.search(r'^\*\*' + re.escape(label) + r':\*\* (.+)$', section, re.M)
    if not match:
        raise ValueError(f'Etiqueta não localizada: {label}')
    return match.group(1)


def groups(section):
    parts = re.split(r'^### (.+)\n', section, flags=re.M)
    return [(parts[i], parts[i + 1].strip()) for i in range(1, len(parts), 2)]


def arrow():
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>'


def icon(index):
    return '<span class="gestao-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + ICON_PATHS[index % len(ICON_PATHS)] + '</svg></span>'


def button(label, target, secondary=False):
    css = 'gestao-button-secondary' if secondary else 'gestao-button-primary'
    return f'<a class="gestao-button {css}" href="{esc(target)}">{esc(label)}{arrow() if not secondary else ""}</a>'


def heading(title, label, identity):
    return f'<span class="gestao-overline">{esc(label)}</span><h2 id="{identity}-title">{esc(title)}</h2>'


def section(identity, css, content):
    return f'<section class="gestao-section {css}" id="{identity}" aria-labelledby="{identity}-title"><div class="gestao-container">\n{content}\n</div></section>\n'


def card_section(section_copy, identity, css, label, two=False, numbered=False, faculty=False):
    entries = groups(section_copy)
    title, lead = entries[0]
    cards = []
    for index, (name, body) in enumerate(entries[1:]):
        mark = icon(index)
        if numbered:
            mark = f'<span class="gestao-career-index" aria-hidden="true">{index + 1:02d}</span>'
        if faculty:
            initials = ''.join(word[0] for word in name.split()[:2])
            mark = f'<span class="gestao-avatar" aria-hidden="true">{esc(initials)}</span>'
        cards.append(f'<article class="gestao-card">{mark}<h3>{esc(name)}</h3>{paragraphs(body)}</article>')
    grid = ' gestao-card-grid-two' if two else ''
    return section(identity, css, f'<div class="gestao-section-head">{heading(title, label, identity)}<div class="gestao-prose">{paragraphs(lead)}</div></div><div class="gestao-card-grid{grid}">' + '\n'.join(cards) + '</div>')


def source_link(refs, label):
    match = re.search(r'\| ' + re.escape(label) + r' \| \[[^\]]+\]\((https?://[^)]+)\)', refs)
    if not match:
        raise ValueError(f'Destino não localizado: {label}')
    return match.group(1)


def build(slug):
    folder = ROOT / 'Graduacao' / slug
    copy = (folder / 'copy/copy.md').read_text(encoding='utf-8')
    refs = (folder / 'referencias/fontes-e-pendencias.md').read_text(encoding='utf-8')
    parts = re.split(r'^## (\d{2})\. [^\n]+\n', copy, flags=re.M)
    sections = {int(parts[i]): parts[i + 1].strip() for i in range(1, len(parts), 2)}
    if set(sections) != set(range(1, 16)):
        raise ValueError(f'{slug}: a copy precisa conter as quinze seções')
    hero_title, hero_body = groups(sections[1])[0]
    name = hero_title.removeprefix('Graduação em ')
    registration = source_link(refs, 'Inscrição do curso')
    second = source_link(refs, 'Segunda graduação')
    hero_image = source_link(refs, 'Fundo do hero atual')
    fact_rows = re.findall(r'^\| ([^|]+) \| ([^|]+) \|$', sections[2], re.M)[1:]
    facts = {label.strip(): value.strip() for label, value in fact_rows}
    duration, degree, modalities = facts['Duração'], facts['Formação'], facts['Modalidade']
    semesters = duration.split()[0]
    curriculum = groups(sections[11])
    modules = curriculum[1:]
    contact_id = f'{slug}-inscricao'
    about_id = f'{slug}-sobre'
    grade_id = f'{slug}-grade'
    faculty_id = f'{slug}-docentes'

    hero = f'''<section class="gestao-hero" id="{slug}-inicio" aria-labelledby="{slug}-title">
<div class="gestao-container">
<nav class="gestao-crumbs" aria-label="Caminho de navegação"><a href="https://faculdadephorte.edu.br/">Início</a><span aria-hidden="true">›</span><a href="https://faculdadephorte.edu.br/graduacao/">Graduação</a><span aria-hidden="true">›</span><strong>{esc(name)}</strong></nav>
<div class="gestao-hero-grid"><div class="gestao-hero-copy">
<span class="gestao-overline">{esc(field(sections[1], 'Identificador'))}</span>
<h1 id="{slug}-title">{esc(name)}</h1>
<p class="gestao-hero-lead">{esc(field(sections[1], 'Proposta'))}</p>
<div class="gestao-hero-support">{paragraphs(hero_body)}</div>
<div class="gestao-offer"><div><strong>{esc(degree)}</strong><span>Formação superior</span></div><div><strong>{esc(semesters)} semestres</strong><span>{esc(modalities)}</span></div></div>
<div class="gestao-actions">{button(field(sections[1], 'CTA primário'), registration)}{button(field(sections[1], 'CTA secundário'), '#' + about_id, True)}</div>
<small class="gestao-offer-note">{esc(field(sections[1], 'Texto de apoio à oferta'))}</small>
</div><figure class="gestao-hero-visual"><img class="gestao-hero-image" src="{esc(hero_image)}" alt="Imagem temática apresentada pela Phorte para o curso de {esc(name)}" width="680" height="620" fetchpriority="high">
<figcaption class="gestao-hero-caption"><b aria-hidden="true">{esc(semesters)}</b><span><strong>{esc(semesters)} semestres de formação</strong><small>{esc(degree)} em {esc(name)}</small></span></figcaption></figure></div></div></section>'''
    fact_html = '<section class="gestao-facts" aria-label="Informações do curso"><dl class="gestao-container gestao-facts-grid">' + ''.join(f'<div class="gestao-fact"><dt>{esc(label)}</dt><dd>{esc(value)}</dd></div>' for label, value in fact_rows) + '</dl></section>'

    title, body = groups(sections[3])[0]
    about = section(about_id, 'gestao-about', f'<div class="gestao-about-grid"><div>{heading(title, "Sobre o curso", about_id)}<div class="gestao-prose">{paragraphs(body)}</div></div><figure><img class="gestao-about-image" src="{INSTITUTION}" alt="Imagem institucional da Faculdade Phorte" width="600" height="480" loading="lazy"><figcaption class="gestao-image-caption">Faculdade Phorte · São Paulo</figcaption></figure></div>')

    entries = groups(sections[4])
    identity = f'{slug}-modalidade'
    modality_cards = ''.join(f'<article class="gestao-card">{icon(i)}<h3>{esc(label)}</h3>{paragraphs(body)}</article>' for i, (label, body) in enumerate(entries[1:]))
    modality_grid = 'gestao-card-grid-two' if len(entries) > 2 else 'gestao-card-grid-one'
    modality = section(identity, 'gestao-modality gestao-surface', f'<div class="gestao-section-head">{heading(entries[0][0], "Modalidades", identity)}</div><div class="gestao-card-grid {modality_grid}">{modality_cards}</div><div class="gestao-block-action">{button(field(sections[4], "CTA de orientação"), "#" + contact_id, True)}</div>')

    competencies = card_section(sections[5], f'{slug}-competencias', 'gestao-competencies', 'Competências')
    title, body = groups(sections[6])[0]
    identity = f'{slug}-pratica'
    practice = section(identity, 'gestao-practice', f'<div class="gestao-practice-grid"><div>{heading(title, "Vivência prática", identity)}<div class="gestao-prose">{paragraphs(body)}</div></div><div class="gestao-practice-card"><b>{len(modules):02d}</b><strong>módulos com Gestão em Ação</strong><p>O componente está presente em todos os módulos da matriz publicada.</p></div></div>')
    differences = card_section(sections[7], f'{slug}-diferenciais', 'gestao-differences gestao-surface', 'Diferenciais', two=True)
    careers = card_section(sections[8], f'{slug}-atuacao', 'gestao-careers', 'Atuação profissional', numbered=True)

    title, body = groups(sections[9])[0]
    identity = f'{slug}-perfil'
    before_list = body.split('\n- ', 1)[0]
    items = re.findall(r'^- (.+)$', body, re.M)
    profile = section(identity, 'gestao-profile gestao-surface', f'<div class="gestao-profile-grid"><div>{heading(title, "Seu perfil", identity)}<div class="gestao-prose">{paragraphs(before_list)}</div></div><ul class="gestao-profile-list">' + ''.join(f'<li>{inline(item)}</li>' for item in items) + '</ul></div>')
    faculty = card_section(sections[10], faculty_id, 'gestao-faculty', 'Docentes', faculty=True)

    grade_title, grade_lead = curriculum[0]
    accordions = []
    for index, (label, body) in enumerate(modules):
        subjects = re.findall(r'^- (.+)$', body, re.M)
        opened = ' open' if index == 0 else ''
        accordions.append(f'<details class="gestao-accordion"{opened}><summary><span class="gestao-module-index" aria-hidden="true">{index + 1:02d}</span>{esc(label)}</summary><ul class="gestao-subjects">' + ''.join(f'<li>{inline(subject)}</li>' for subject in subjects) + '</ul></details>')
    grade = section(grade_id, 'gestao-curriculum gestao-surface', f'<div class="gestao-curriculum-grid"><div class="gestao-section-head">{heading(grade_title, "Grade curricular", grade_id)}<div class="gestao-prose">{paragraphs(grade_lead)}</div><div class="gestao-block-action">{button(field(sections[11], "CTA"), "#" + contact_id, True)}</div></div><div>' + '\n'.join(accordions) + '</div></div>')

    entries = groups(sections[12])
    identity = f'{slug}-ingresso'
    routes = [registration, second]
    admission_cards = ''.join(f'<article class="gestao-card">{icon(i)}<h3>{esc(title)}</h3>{paragraphs(body)}{button(field(body, "CTA"), routes[i], i == 1)}</article>' for i, (title, body) in enumerate(entries[1:]))
    admission = section(identity, 'gestao-admission', f'<div class="gestao-section-head">{heading(entries[0][0], "Ingresso", identity)}<div class="gestao-prose">{paragraphs(entries[0][1])}</div></div><div class="gestao-card-grid gestao-card-grid-two">{admission_cards}</div><p class="gestao-conditions">{esc(field(sections[12], "Texto comercial de apoio"))}</p>')

    title, body = groups(sections[13])[0]
    intro = f'<div class="gestao-form-intro"><h3 id="{slug}-form-title">{esc(title)}</h3>{paragraphs(body)}</div>'
    preview_message = field(sections[13], 'Mensagem exclusiva do preview demonstrativo')
    preview_form = f'''<form data-preview-form method="dialog" aria-labelledby="{slug}-form-title" data-preview-message="{esc(preview_message)}">
<div class="gestao-form-field"><label for="{slug}-nome">Nome completo *</label><input id="{slug}-nome" type="text" autocomplete="name" required maxlength="120"></div>
<div class="gestao-form-field"><label for="{slug}-email">E-mail *</label><input id="{slug}-email" type="email" autocomplete="email" required maxlength="180"></div>
<div class="gestao-form-field"><label for="{slug}-whatsapp">WhatsApp *</label><input id="{slug}-whatsapp" type="tel" inputmode="tel" autocomplete="tel" required maxlength="30"></div>
<div class="gestao-form-field"><label for="{slug}-ingresso-interesse">Interesse no ingresso *</label><select id="{slug}-ingresso-interesse" required><option value="">Selecione uma opção</option><option value="vestibular">Vestibular</option><option value="segunda-graduacao">Segunda graduação</option><option value="orientacao">Quero orientação</option></select></div>
<button class="gestao-button gestao-button-primary gestao-form-submit" data-preview-submit type="button" disabled>{esc(field(sections[13], 'Botão'))}{arrow()}</button>
<p class="gestao-form-feedback" data-preview-feedback role="status" tabindex="-1" hidden></p>
<noscript><p class="gestao-form-notice">Para continuar sem JavaScript, use o link de inscrição oficial. Este formulário é demonstrativo.</p></noscript></form>'''
    disclaimer = '<p class="gestao-form-notice">Este formulário é demonstrativo: nenhum dado é enviado ou armazenado. Para fazer sua inscrição, use o processo seletivo oficial.</p>'
    enrollment_copy = f'<div class="gestao-enrollment-copy">{heading(title, "Vamos conversar", contact_id)}<div class="gestao-prose">{paragraphs(body)}</div>{button("Fazer inscrição", registration)}<p class="gestao-conditions" style="color: #fff1f1">{esc(field(sections[12], "Texto comercial de apoio"))}</p></div>'
    enrollment = section(contact_id, 'gestao-enrollment', f'<div class="gestao-enrollment-grid">{enrollment_copy}<div class="gestao-enrollment-form">{intro}{preview_form}{disclaimer}</div></div>')

    entries = groups(sections[14])
    identity = f'{slug}-faq'
    faq_items = []
    for question, answer in entries[1:]:
        answer_html = paragraphs(answer)
        if 'situação do curso no MEC' in question:
            answer_html += '<p><a href="https://emec.mec.gov.br/">Consultar o e-MEC</a></p>'
        faq_items.append(f'<details class="gestao-accordion"><summary>{esc(question)}</summary><div class="gestao-faq-answer">{answer_html}</div></details>')
    faq = section(identity, 'gestao-faq', f'<div class="gestao-faq-wrap"><div class="gestao-section-head">{heading(entries[0][0], "Perguntas frequentes", identity)}</div>' + '\n'.join(faq_items) + '</div>')

    title, body = groups(sections[15])[0]
    identity = f'{slug}-cta-final'
    final = f'<section class="gestao-final-cta" id="{identity}" aria-labelledby="{identity}-title"><div class="gestao-container gestao-final-grid"><div class="gestao-final-copy"><h2 id="{identity}-title">{esc(title)}</h2>{paragraphs(body)}</div><div class="gestao-final-actions">{button(field(sections[15], "CTA primário"), registration)}<a class="gestao-text-link" href="#{contact_id}">{esc(field(sections[15], "CTA de contato"))}</a></div></div></section>'
    sticky = f'<div class="gestao-mobile-cta" data-mobile-cta hidden>{button("Fazer inscrição", registration)}</div>'
    salary = render_salary_panel(slug)
    before = '\n'.join([hero, fact_html, about, modality, competencies, practice, differences, careers, salary, profile, faculty, grade, admission])
    after = '\n'.join([faq, final, sticky])
    header = f'<a class="gestao-skip" href="#{about_id}">Ir para o conteúdo</a><header class="gestao-header"><div class="gestao-container gestao-header-inner"><a href="https://faculdadephorte.edu.br/" aria-label="Faculdade Phorte — início"><img class="gestao-logo" src="{LOGO}" alt="Faculdade Phorte" width="134" height="59"></a><nav class="gestao-navigation" aria-label="Navegação do curso"><a href="#{grade_id}">Grade curricular</a><a href="#{faculty_id}">Docentes</a>{button("Receber informações", "#" + contact_id, True)}</nav></div></header>'
    footer = f'<footer class="gestao-footer"><div class="gestao-container gestao-footer-inner"><a href="https://faculdadephorte.edu.br/"><img class="gestao-logo" src="{LOGO}" alt="Faculdade Phorte — início" width="110" height="49" loading="lazy"></a><nav class="gestao-footer-links" aria-label="Links institucionais"><a href="https://faculdadephorte.edu.br/graduacao/">Graduação Phorte</a><a href="../../politicas/index.html">Privacidade e termos</a><a href="https://faculdadephorte.edu.br/graduacao/{slug}/">Página oficial do curso</a></nav></div></footer>'
    description = field(sections[1], 'Proposta') + ' ' + degree + ', ' + duration + ', ' + modalities + ' na Faculdade Phorte.'
    page = f'''<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="{esc(description)}"><meta name="robots" content="noindex, nofollow"><title>Graduação em {esc(name)} | Faculdade Phorte — preview</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="{FONTS.replace('&', '&amp;')}" rel="stylesheet"><link rel="icon" href="data:,"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="preview.css"><script src="script.js" defer></script></head><body>
<div class="phorte-lp-gestao phorte-lp-gestao--{slug}" data-course="{slug}">
{header}<main>{before}{enrollment}{after}</main>{footer}
</div></body></html>\n'''
    (folder / 'index.html').write_text(page, encoding='utf-8')
    (folder / 'preview.css').write_text('/* Somente o documento de preview; não usar no Elementor. */\nhtml { margin: 0; }\nbody { margin: 0; }\n', encoding='utf-8')
    for asset in ['styles.css', 'script.js']:
        shutil.copyfile(SHARED / asset, folder / asset)
    with (folder / 'styles.css').open('a', encoding='utf-8') as output:
        output.write('\n' + salary_css())
    elementor = folder / 'implementacao/elementor'
    elementor.mkdir(parents=True, exist_ok=True)
    fragments = {'widget-before-form.html': before, 'widget-after-form.html': after, 'salary-panel.html': salary, 'enrollment-copy.html': enrollment_copy, 'form-intro.html': intro, 'form-disclaimer.html': '<p class="gestao-form-notice">Solicitação de contato sobre o curso e as condições de ingresso. O envio deste pedido não confirma matrícula ou reserva de vaga.</p>'}
    for filename, fragment in fragments.items():
        (elementor / filename).write_text(fragment.rstrip() + '\n', encoding='utf-8')
    for asset in ['styles.css', 'script.js']:
        shutil.copyfile(folder / asset, elementor / asset)
    elementor_readme = f'''# {name} no Elementor

**Estado:** primeira montagem estática, pronta para revisão. Conteúdo acadêmico/comercial e mídia ainda sujeitos às pendências do [dossiê](../../referencias/fontes-e-pendencias.md). Não publicado.

## Containers

```text
Container principal — phorte-lp-gestao phorte-lp-gestao--{slug}
├── HTML: widget-before-form.html
├── Container: gestao-section gestao-enrollment (ID: {contact_id})
│   └── Container: gestao-container gestao-enrollment-grid
│       ├── HTML: enrollment-copy.html
│       └── Container: gestao-enrollment-form
│           ├── HTML: form-intro.html
│           ├── Form widget nativo do Elementor
│           └── HTML: form-disclaimer.html
└── HTML: widget-after-form.html
```

Atributo adicional da seção de contato: `aria-labelledby="{contact_id}-title"`. Configurar a grade com duas colunas no desktop e uma no mobile. Desativar gaps/paddings padrão dos containers que duplicarem os espaçamentos do CSS. Se o container intermediário ocupar toda a largura, aplicar `gestao-container` ao container externo de conteúdo e deixar a grade interna sem largura duplicada.

## Estilos, script e fontes

- Inserir [styles.css](styles.css) no local permitido pelo projeto. O wrapper isola todos os seletores.
- Inserir [script.js](script.js) uma única vez por página, após os fragmentos ou via carregador com defer. Grade e FAQ funcionam sem JavaScript.
- Carregar Montserrat 600/700/800 e Inter 400/500/600/700/800 pelo Elementor ou pelo tema; não duplicar importações.
- Não colar o HTML completo do preview ou `preview.css` no Elementor. Header e footer são fornecidos pelo site.
- Usar IDs únicos como nos fragmentos; âncoras de informações apontam para `#{contact_id}`.

## Form widget nativo

Nome sugerido: `gestao_{slug.replace('-', '_')}`. Campos com labels visíveis: `nome`, `email`, `whatsapp`, `ingresso`. Opções: Vestibular, Segunda graduação, Quero orientação. Campo oculto: `curso = {name}`. Os quatro campos do preview são obrigatórios; confirmar a obrigatoriedade operacional antes de publicar.

Botão: **{field(sections[13], 'Botão')}**.

Mensagem após sucesso real: **{field(sections[13], 'Mensagem de contato, para uso após configuração oficial')}**

Configurar ações nativas, destinatário de e-mail e eventual CRM somente na operação autorizada. Definir consentimento, aviso de privacidade e link institucional conforme a política vigente. Não colar o formulário demonstrativo de `index.html`: o widget nativo ocupa esse espaço.

## Mídia e ações

As URLs públicas das imagens são referências do dossiê, sem download. Validar enquadramento e substituir pelas URLs aprovadas da Biblioteca de Mídia na montagem. Docentes não usam retratos com identidade pendente.

O painel claro de salários já está em `widget-before-form.html`, após atuação profissional; [salary-panel.html](salary-panel.html) é o fragmento isolado, para uso alternativo sem duplicar o bloco. Conteúdo em [salarios.md](../../copy/salarios.md), reproduzido do protótipo por solicitação do usuário; confirmação das fontes e períodos antes da publicação permanece pendente.

- Inscrição: [{registration}]({registration}).
- Segunda graduação: [{second}]({second}).
- Contato: `#{contact_id}`.

## Atualização

Editar [copy.md](../../copy/copy.md) e as fontes comuns; executar `python scripts/build-lps-gestao.py` a partir da raiz do repositório para regenerar os quatro pacotes. Ajustes manuais nos arquivos gerados serão sobrescritos.

Revisão prevista: desktop/mobile, grade/FAQ por teclado, CTA fixo, formulário nativo, destinos e aprovação acadêmica/comercial antes da publicação. Esta geração não executa testes ou publica arquivos.
'''
    (elementor / 'README.md').write_text(elementor_readme, encoding='utf-8')
    print(f'{slug}: preview e pacote Elementor gerados')


if __name__ == '__main__':
    seed_copy_files()
    for course in SLUGS:
        build(course)
