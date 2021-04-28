<?

header("Access-Control-Allow-Origin: *");

include_once('Email.php');
include_once('config.php');
new Email($config, $forms);

?>