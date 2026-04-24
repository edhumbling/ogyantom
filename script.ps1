$files = Get-ChildItem -Path src/app -Recurse -Filter "page.tsx"
foreach ($f in $files) {
  $c = Get-Content -Path $f.FullName -Raw
  $c = $c -replace 'pt-36', 'pt-36 lg:pt-48'
  $c = $c -replace 'pb-20', 'pb-20 lg:pb-32'
  $c = $c -replace 'py-16', 'py-16 lg:py-32'
  $c = $c -replace 'pb-16', 'pb-16 lg:pb-32'
  $c = $c -replace 'tracking-\[0\.14em\]', 'tracking-[0.25em]'
  $c = $c -replace 'tracking-\[0\.12em\]', 'tracking-[0.25em]'
  $c = $c -replace 'font-display', 'font-display tracking-tighter'
  $c = $c -replace 'duration-\d+ ease-out', 'duration-[400ms] ease-out'
  $c = $c -replace 'transition hover:', 'transition duration-[400ms] ease-out hover:'
  $c = $c -replace 'architectural-band relative', 'architectural-band relative -my-10 lg:-my-20 z-10'
  $c = $c -replace 'h-14\b', 'h-16'
  $c = $c -replace 'px-6\b', 'px-10'
  $c = $c -replace 'rounded-full bg', 'rounded-[40px_8px_40px_8px] bg'
  $c = $c -replace 'rounded-full border', 'rounded-[40px_8px_40px_8px] border'
  Set-Content -Path $f.FullName -Value $c -NoNewline
}