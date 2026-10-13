"""Atualiza salários das seis LPs produzidas, exceto Educação Física."""
from salary_panels import build_existing_pages, seed_copy_files
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

if __name__ == '__main__':
    seed_copy_files()
    spec = spec_from_file_location('gestao_builder', Path(__file__).with_name('build-lps-gestao.py'))
    builder = module_from_spec(spec)
    spec.loader.exec_module(builder)
    for course in builder.SLUGS:
        builder.build(course)
    build_existing_pages()
