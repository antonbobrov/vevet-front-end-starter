<?
define("LANG", "en");

$lang = array();

$lang['site']['title'] = 'Front-end Starter';



// For ModX
if (isset($_GET['contexts'])) {

    $contexts = explode(",", $_GET['contexts']);
    header('Content-Type: text/html; charset=utf-8');
    foreach ($lang as $key => $settings) {
        foreach($settings as $keySettings => $settingsSettings){
            for($i = 0; $i < count($contexts); $i++){
                echo "INSERT INTO `modx_context_setting` (`context_key`, `key`, `value`, `xtype`, `namespace`, `area`, `editedon`) VALUES ('".$contexts[$i]."', '".$key."_".$keySettings."', '".$settingsSettings."', 'textfield', 'core', 'language', NULL);";
            }
        }
    }
    exit();

}