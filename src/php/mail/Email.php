<?php

include_once('class/PHPMailerAutoload.php');
require_once 'lib/Twig/Autoloader.php';


class Email {

	private $config;
	private $forms;
	private $form;
	private $subject;
	private $formName;
	private $formSubject;
	private $formHTML;
	private $template = 'mail';

	function __construct($config, $forms) {

		// add config
		$this->config = $config;
		$this->forms = $forms;

		// check if post exists
		$result = $this->checkPost();
		if (!$result) {
			$this->errorPost();
		}

		// check if the post value 'form' exists
		$result = $this->checkFormPost();
		if (!$result) {
			$this->errorFormPost();
		}

		// check if the form exists
		$result = $this->checkForm();
		if (!$result) {
			$this->errorForm();
		}

		// check inputs in the form
		$result = $this->checkInputs();
		if (count($result) > 0) {
			$this->error($result);
		}
		else {
			if (isset($this->form['callback'])) {
				$this->form['callback']($this->post);
			}
			$this->send();
		}

	}



	private function checkPost() {

		if (isset($_POST)) {
			$this->post = $_POST;
			return true;
		}

		return false;

	}

	private function checkFormPost() {

		if (isset($this->post['form'])) {
			$this->formName = $this->post['form'];
			return true;
		}

		return false;

	}

	private function checkForm() {

		$exists = false;
		foreach ($this->forms as $key => $value) {
			if ($this->formName == $key) {

				$this->form = $value;
				$this->subject = $this->config['subject'];
				$this->formSubject = $value['subject'];
				if (isset($value['template'])) {
					$this->template = $value['template'];
				}

				$exists = true;

			}
		}

		return $exists;

	}

	private function checkInputs() {

		$errors = array();

		// go thru all inputs
		foreach ($this->form['inputs'] as $key => $value) {

			$exists = false;

			// check if input exists
			if (!isset($this->post[$key])) {
				// check in exceptions
				$excExists = false;
				if (isset($this->form['inputsExceptions'])) {
					foreach ($this->form['inputsExceptions'] as $exc) {
						if ($exc == $key) {
							$excExists = true;
						}
					}
				}
				// set errors
				if ($excExists) {
					continue;
				}
				else {
					// $errors[$key] = 'The field "' . $key . '" must not be empty';
					$errors[$key] = 'Поле должно быть заполнено';
					continue;
				}
			}

			// validate
			if (!$value['check']($this->post[$key], $this->post)) {
				if ($value['getError']) {
					$errors[$key] = $value['getError']($this->post[$key], $this->post);
				}
				else {
					// $errors[$key] = 'The field "' . $key . '" is not valid';
					$errors[$key] = 'Поле должно быть заполнено правильно';
				}
			}

		}

		return $errors;

	}



	private function error($arr) {
		$error = array(
			'success' => false,
			'errors' => $arr
		);
		$this->output($error);
	}

	private function errorPost() {
		return $this->error(array(
			'post' => 'No post variable.'
		));
	}

	private function errorFormPost() {
		return $this->error(array(
			'form' => 'The form must contain the input "form".'
		));
	}

	private function errorForm() {
		return $this->error(array(
			'form' => 'The form "' . $this->formName . '" does not exist.'
		));
	}



	private function output($arr) {

        $json = json_encode($arr);

        header('Content-Type: application/json');
		echo $json;
		
		exit;

	}



	private function twig() {

		Twig_Autoloader::register();

		$loader = new Twig_Loader_Filesystem('templates');
		$twig = new Twig_Environment($loader, array(
			'cache' => 'compilation_cache',
			'auto_reload' => true
		));

		return $twig->render($this->template . '.html', $this->twigVars());

	}

	private function twigVars() {

		// inputs
		$inputs = array();
		foreach ($this->form['inputs'] as $key => $value) {
			$inputs[$key] = array(
				'title' => $value['title'],
				'name' => $key,
				'value' => $this->post[$key]
			);
		}

		// text
		if (isset($this->form['text'])) {
			$text = $this->form['text'];
		}
		else {
			$text = false;
		}

		// return

		return array(
			'subject' => $this->subject,
			'formSubject' => $this->formSubject,
			'config' => $this->config,
			'post' => $this->post,
			'inputs' => $inputs,
			'text' => $text
		);

	}

	private function send() {

		// test
		if ($this->config['test']) {
			$success = array(
				'success' => true
			);
			$this->output($success);
		}

		// get html
		$this->formHTML = $this->twig();

		// send
		try {

			$mail = new PHPMailer(true);
	
			$mail->IsSMTP();
			$mail->Host = $this->config['host'];
			$mail->SMTPDebug = 0;
			$mail->SMTPAuth = true;
			$mail->Port = $this->config['port'];
			$mail->SMTPSecure = $this->config['type'];
			$mail->CharSet="UTF-8";
			$mail->Username = $this->config['username'];
			$mail->Password = $this->config['password'];
			$mail->AddAddress($this->config['receiver'], $this->config['receiver']);
			$mail->AddReplyTo($this->config['addreply'], $this->config['name']);
			$mail->SetFrom($this->config['username'], $this->config['name']);

			// add attachment
			if ($_POST['loaded-file']) {
				$mail->AddAttachment(
					'./fileupload/uploads/' . $_POST['loaded-file'],
					$_POST['loaded-file']
				);
			}
	
			$mail->Subject = htmlspecialchars($this->subject);
			$mail->MsgHTML($this->formHTML);
			$mail->Send();

			// remove attachment
			if ($_POST['loaded-file']) {
				$loadedFile = mb_convert_encoding($_POST['loaded-file'], 'UTF-8', 'UTF-8');
				$loadedFile = htmlentities($loadedFile, ENT_QUOTES, 'UTF-8');
				unlink('./fileupload/uploads/' . $loadedFile);
			}
	
		}
		catch(phpmailerException $e) {
			$this->error(array(
				'smtp' => 'SMTP error'
			));
		}

		// success
		$success = array(
			'success' => true
		);
		$this->output($success);

	}

}

?>