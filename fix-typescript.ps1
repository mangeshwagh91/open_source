# Script to convert TypeScript JSX files to JavaScript JSX
# Removes TypeScript type annotations from .jsx files

$uiPath = "client\src\components\ui"
$files = Get-ChildItem "$uiPath\*.jsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Remove forwardRef type parameters like React.forwardRef<Type, Props>(...)
    $content = $content -replace 'React\.forwardRef<[^>]+,\s*[^>]+>\(', 'React.forwardRef('
    
    # Remove type annotations from function parameters
    $content = $content -replace '\(\s*\{([^}]+)\}\s*:\s*React\.[A-Za-z<>"\[\]]+\s*\)', '({ $1 })'
    
    # Remove standalone type annotations
    $content = $content -replace ':\s*React\.[A-Za-z<>"]+(\s*&\s*\{[^}]+\})?', ''
    
    # Check if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`nConversion complete!" -ForegroundColor Cyan
