# Tworzy assets/og-image.png (1200×630) – obraz do podglądu linków (LinkedIn, Facebook, komunikatory)
# z szablonu narzedzia/og-image.html. Wymaga Microsoft Edge i działającego podglądu lokalnego
# (http://localhost:8123, konfiguracja „bextip-landing” w .claude/launch.json).
$root = Split-Path -Parent $PSScriptRoot
$edge = Join-Path ${env:ProgramFiles(x86)} "Microsoft\Edge\Application\msedge.exe"
$out = Join-Path $root "assets\og-image.png"
$dataDir = Join-Path $env:TEMP "bextip-og-edge"
& $edge --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 `
  --window-size=1200,630 --virtual-time-budget=8000 --user-data-dir="$dataDir" `
  --screenshot="$out" "http://localhost:8123/narzedzia/og-image.html" 2>$null | Out-Null
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile($out)
"$out - $($img.Width) x $($img.Height) px, $([Math]::Round((Get-Item $out).Length / 1KB)) KB"
$img.Dispose()
