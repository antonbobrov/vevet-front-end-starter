<?

header("Access-Control-Allow-Origin: *");



// get language
$lang = 'en';
if ($_POST['lang']) {
	$lang = $_POST['lang'];
}



// check captcha
// $reCaptchaSecret = '';
// $recaptchaValid = false;
// if (!empty($_POST['g-recaptcha-response'])) {
// 	$curl = curl_init('https://www.google.com/recaptcha/api/siteverify');
// 	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
// 	curl_setopt($curl, CURLOPT_POST, true);
// 	curl_setopt($curl, CURLOPT_POSTFIELDS, 'secret=' . $reCaptchaSecret . '&response=' . $_POST['g-recaptcha-response']);
// 	$out = curl_exec($curl);
// 	curl_close($curl);
// 	$out = json_decode($out);
// 	if ($out->success == true) {
// 		$recaptchaValid = true;
// 	} 
// }
// if (!$recaptchaValid) {
// 	header('Content-Type: application/json');
// 	echo json_encode(array(
// 		'success' => false,
// 		'errors' => array(
// 			'recaptcha' => $lang === 'he' ? 'אשר שאתה לא רובוט' : 'Confirm you are not a robot'
// 		)
// 	));
// 	exit;
// }



include_once('Email.php');
include_once('config.php');
new Email($config, $forms);

?>