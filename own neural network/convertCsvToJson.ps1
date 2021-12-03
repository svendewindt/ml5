$csv = Import-Csv 'D:\ml5\own neural network2\mushrooms.csv'

$output = $csv | ConvertTo-Json

$output | Out-File 'D:\ml5\own neural network2\mushrooms.json'
