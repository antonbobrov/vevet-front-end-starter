<?
$manifest = 'assets-manifest.json';
if (file_exists($manifest)) {
    $files = json_decode(file_get_contents($manifest), true);
    foreach ($files as $file) {
        if (strpos($file, '.js')) {
            echo '<script src="' . $file . '" defer></script>';
        }
    }
}
else {
    echo '<script src="/assets/js/app.js" defer></script> ';
}