# Comprehensive TypeScript to JavaScript converter for .jsx files
$uiPath = "client\src\components\ui"
$files = Get-ChildItem "$uiPath\*.jsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Pattern 1: Remove React.forwardRef<Type1, Type2>(
    $content = $content -replace 'React\.forwardRef<[^>]+>\(', 'React.forwardRef('
    
    # Pattern 2: Remove forwardRef<Type1, Type2>(
    $content = $content -replace 'forwardRef<[^>]+>\(', 'forwardRef('
    
    # Pattern 3: Remove type annotations from parameters like { prop }: Type
    $content = $content -replace '\(\s*\{\s*([^}]+)\}\s*:\s*[^)]+\)\s*=>', '({ $1 }) =>'
    
    # Pattern 4: Remove HTMLElement type annotations
    $content = $content -replace '<HTML[A-Za-z]+Element,\s*React\.[A-Za-z<>"\[\]]+>', ''
    
    # Pattern 5: Remove ComponentPropsWithoutRef and similar
    $content = $content -replace 'React\.(ComponentPropsWithoutRef|ComponentProps|ElementRef)<[^>]+>', ''
    
    # Pattern 6: Remove type annotations after closing parenthesis
    $content = $content -replace '\):\s*[A-Za-z<>\[\]]+\s*=>', ') =>'
    
    # Pattern 7: Remove interface/type definitions (lines starting with)
    $content = $content -replace '(?m)^\s*(interface|type)\s+[A-Za-z]+\s*=\s*[^;]+;?\s*$', ''
    
    # Check if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "Skipped (no changes): $($file.Name)" -ForegroundColor Gray
    }
}

Write-Host "`nAll .jsx files processed!" -ForegroundColor Cyan
