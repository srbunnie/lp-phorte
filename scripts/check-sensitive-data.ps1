$ErrorActionPreference = 'Stop'

$excluded = @('\\.git\\', '\\node_modules\\', '\\skills\\')
$files = git ls-files --cached --others --exclude-standard
$sensitiveNames = '\.env($|\.)|\.pem$|\.key$|\.p12$|credentials|secrets?'
$patterns = '(?i)(api[_-]?key|secret|token|password|passwd|authorization|bearer)\s*[:=]\s*["'']?[^\s"''`]+|-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9_]+|sk-[A-Za-z0-9_-]{20,}'
$findings = @()

foreach ($file in $files) {
  if ($excluded | Where-Object { $file -match $_ }) { continue }
  if ($file -match $sensitiveNames) {
    $findings += "Arquivo com nome sensível: $file"
    continue
  }
  if (Test-Path -LiteralPath $file -PathType Leaf) {
    $matches = Select-String -LiteralPath $file -Pattern $patterns -AllMatches -ErrorAction SilentlyContinue
    foreach ($match in $matches) { $findings += "${file}:$($match.LineNumber): possível segredo" }
  }
}

if ($findings.Count -gt 0) {
  Write-Host 'Revisão bloqueada. Verifique as ocorrências:' -ForegroundColor Red
  $findings | ForEach-Object { Write-Host "- $_" }
  exit 1
}

Write-Host 'Revisão concluída: nenhum arquivo ou padrão sensível foi encontrado.' -ForegroundColor Green
