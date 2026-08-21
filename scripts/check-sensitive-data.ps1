$ErrorActionPreference = 'Stop'

$repoRoot = (Get-Location).Path
# Obtem arquivos rastreados e novos não ignorados pelo git
$files = git -c core.quotepath=false ls-files --cached --others --exclude-standard
$sensitiveNames = '\.env($|\.)|\.pem$|\.key$|\.p12$|credentials|secrets?'
$patterns = '(?i)(api[_-]?key|secret|token|password|passwd|authorization|bearer)\s*[:=]\s*["'']?[^\s"''`]+|-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9_]+|sk-[A-Za-z0-9_-]{20,}'
$findings = @()

$binaryExts = '\.(png|jpe?g|webp|gif|zip|ttf|woff2?|svg|ico|mp4|mov|pdf)$'

foreach ($file in $files) {
  if ($file -match '^skills/' -or $file -match '^scripts/' -or $file -match '^node_modules/' -or $file -match '^\.next/' -or $file -match '/_next/' -or $file -match '/dist/') { continue }
  if ($file -match $sensitiveNames) {
    $findings += "Arquivo com nome sensível: $file"
    continue
  }
  if ($file -match $binaryExts) { continue }
  $fullPath = Join-Path $repoRoot $file
  if (Test-Path -LiteralPath $fullPath -PathType Leaf) {
    $matches = Select-String -LiteralPath $fullPath -Pattern $patterns -AllMatches -ErrorAction SilentlyContinue
    foreach ($match in $matches) {
      $line = $match.Line
      # Ignorar falsos positivos conhecidos (tokens de design Figma, Elementor a11y CDN public widget)
      if ($line -match 'entry\.token === token' -or $line -match 'cdn\.elementor\.com/a11y' -or $line -match 'token:\s*["''`]?(--uscs|d[1-3]|uscs-global)' -or $file -match 'tests/price-card') { continue }
      $findings += "${file}:$($match.LineNumber): possível segredo"
    }
  }
}

if ($findings.Count -gt 0) {
  Write-Host 'Revisão bloqueada. Verifique as ocorrências:' -ForegroundColor Red
  $findings | ForEach-Object { Write-Host "- $_" }
  exit 1
}

Write-Host 'Revisão concluída: nenhum arquivo ou padrão sensível foi encontrado.' -ForegroundColor Green
