<?php

header('Content-Type: text/plain; charset=utf-8');
session_start();

$name = 'attachment';

try {
   
    // Undefined | Multiple Files | $_FILES Corruption Attack
    // If this request falls under any of them, treat it invalid.
    if (
        !isset($_FILES[$name]['error']) ||
        is_array($_FILES[$name]['error'])
    ) {
        throw new RuntimeException('Invalid parameters.');
    }

    // Check $_FILES['upfile']['error'] value.
    switch ($_FILES[$name]['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            throw new RuntimeException('No file sent.');
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            throw new RuntimeException('Exceeded filesize limit.');
        default:
            throw new RuntimeException('Unknown errors.');
    }

    // You should also check filesize here.
    if ($_POST['max-size']) {
        if ($_FILES[$name]['size'] > (int)$_POST['max-size']) {
            throw new RuntimeException('Exceeded filesize limit.');
        }
    }

    // get file extension
    $path = $_FILES[$name]['name'];
    $ext = pathinfo($path, PATHINFO_EXTENSION);

    // check extensions
    $extensions = ".doc, .docx, .pdf";
    if ($_POST['extensions']) {
        $extensions = $_POST['extensions'];
    }
    $extensions = explode(',', $extensions);
    $hasExtension = false;
    foreach ($extensions as $extension) {
        $extension = str_replace(' ', '', $extension);
        $extension = str_replace('.', '', $extension);
        if ($extension === $ext) {
            $hasExtension = true;
        }
    }
    if (!$hasExtension) {
        throw new RuntimeException('Invalid file extension');
    }

    // You should name it uniquely.
    // DO NOT USE $_FILES['upfile']['name'] WITHOUT ANY VALIDATION !!
    // On this example, obtain safe unique name from its binary data.
    $newFileName = sprintf(
        dirname(__FILE__) . '/uploads/%s'  . date("FjYgia") . '.%s',
        sha1_file($_FILES[$name]['tmp_name']),
        $ext
    );
    if (!move_uploaded_file(
        $_FILES[$name]['tmp_name'],
        $newFileName
    )) {
        throw new RuntimeException('Failed to move uploaded file.');
    }

    // check mime types
    $mimeTypes = "application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf";
    // if ($_POST['accept']) {
    //     $mimeTypes = $_POST['accept'];
    // }
    $mimeTypes = explode(',', $mimeTypes);
    $hasMimeType = false;
    foreach ($mimeTypes as $mimeType) {
        $mimeType = str_replace(' ', '', $mimeType);
        if (mime_content_type($newFileName) === $mimeType) {
            $hasMimeType = true;
        }
    }
    if (!$hasMimeType) {
        unlink($newFileName);
        throw new RuntimeException('Invalid file mime-type ' . $_FILES[$name]['tmp_name']);
    }

    $loadedFile = mb_convert_encoding(basename($newFileName), 'UTF-8', 'UTF-8');
    $loadedFile = htmlentities($loadedFile, ENT_QUOTES, 'UTF-8');
    echo $loadedFile;

} catch (RuntimeException $e) {

    echo $e->getMessage();

}

?>