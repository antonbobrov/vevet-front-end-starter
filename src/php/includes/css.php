<?
$manifest = 'assets-manifest.json';
if (file_exists($manifest)) {
    $files = json_decode(file_get_contents($manifest), true);
    foreach ($files as $file) {
        if (strpos($file, '.css')) {
            echo '<link rel="stylesheet" href="' . $file . '"> ';
        }
    }
}
else {
    echo '<link rel="stylesheet" href="/assets/css/app.css"> ';
}