<?

$config = array(

	'host' => '',
	'port' => '465',
	'name' => 'Website',
	'username' => '',
	'password' => '',
	'addreply' => '',
	'type' => 'ssl',

	'subject' => 'Заявка с сайта',

	'receiver' => '',
	
	'test' => true

);



$forms = array(

	'vacancy-form' => array(
		'subject' => 'Новая заявка',
		'text' => 'Карьера',
		'inputsExceptions' => array(), // inputs that will not be validated
		'inputs' => array(

            'name' => array(
                'title' => 'Имя',
                'check' => function($value, $values) {
                    if(strlen($value) < 2) {
						return false;
					}
                    return true;
                }
            ),

            'telephone' => array(
                'title' => 'Телефон',
                'check' => function($value, $values) {
                    if(strlen($value) < 2) {
						return false;
					}
                    // mask validation
                    if (isset($values['phone-mask'])) {
                        $mask = $values['phone-mask'];
                        $mask = str_replace('9', '[0-9]', $mask);
                        if (!preg_match("/^" . $mask . "$/", $value)) {
                            return false;
                        }
                    }
                    return true;
                }
            ),

            'email' => array(
                'title' => 'E-mail',
                'check' => function($value, $values) {
                    if(!filter_var($value, FILTER_VALIDATE_EMAIL)) {
						return false;
					}
                    return true;
                }
            ),

            'position' => array(
                'title' => 'Вакансия',
                'check' => function($value, $values) {
                    if(strlen($value) < 2) {
						return false;
					}
                    return true;
                }
            ),

            'comment' => array(
                'title' => 'Комментарий',
                'check' => function($value, $values) {
                    return true;
                }
            ),

		),
		'callback' => function($values) {
		}
	),
    
);

?>