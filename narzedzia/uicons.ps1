# Tworzy assets/icons/<plik>.svg (biale ikony 24x24) z ikon Uicons wskazanych w narzedzia/uicons.html.
# Wymaga Microsoft Edge i dzialajacego podgladu lokalnego (http://localhost:8123, konfiguracja "bextip-landing").
$root = Split-Path -Parent $PSScriptRoot
$edge = Join-Path ${env:ProgramFiles(x86)} "Microsoft\Edge\Application\msedge.exe"
$dataDir = Join-Path $env:TEMP "bextip-uicons-edge"
# msedge.exe to program okienkowy: jego wyjscie trzeba przekierowac do pliku (zwykle przechwycenie zwraca pusty tekst)
$dump = Join-Path $env:TEMP "bextip-uicons-dom.html"
Start-Process -FilePath $edge -Wait -NoNewWindow -RedirectStandardOutput $dump -ArgumentList @(
  "--headless=new", "--disable-gpu", "--virtual-time-budget=20000", "--user-data-dir=`"$dataDir`"",
  "--dump-dom", "http://localhost:8123/narzedzia/uicons.html")
$m = [regex]::Match([IO.File]::ReadAllText($dump), '<pre id="out">(.*?)</pre>', 'Singleline')
if (-not $m.Success -or $m.Groups[1].Value.Trim() -eq "") { "No icons - is the local preview running?"; exit 1 }
$enc = New-Object Text.UTF8Encoding $false
foreach ($line in ($m.Groups[1].Value -split "`n")) {
  $parts = $line.Trim() -split '\|', 2
  if ($parts.Count -ne 2 -or $parts[1].StartsWith("BRAK")) { "Skipped: $line"; continue }
  $svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="' + $parts[1] + '"/></svg>'
  $out = Join-Path $root ("assets\icons\" + $parts[0] + ".svg")
  [IO.File]::WriteAllText($out, $svg, $enc)
  "{0}.svg - {1} chars of path data" -f $parts[0], $parts[1].Length
}
