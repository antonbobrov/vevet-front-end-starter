<? require_once "config/lang.php"; ?>
<!DOCTYPE html>
<html lang="<? echo LANG; ?>" class="v-reset v-no-transition">

    <head>
       
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">  
		
        <title><? echo $lang['site']['title']; ?></title>
		
		<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no">
		
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="format-detection" content="telephone=no">
		
		<meta name="theme-color" content="#000000">
		<link rel="manifest" href="/manifest.webmanifest">

		<? include('css.php'); ?>

    </head>

	<body class="v-loading">

        <?php require_once "blocks/preloader.php"; ?>

        <div class="page" id="page">

            <?php require_once "blocks/header.php"; ?>

            <div 
                class="app" 
                id="app"
                data-v-page="<? echo PAGE; ?>" 
                data-v-pageAjax-name="<? echo PAGE; ?>" 
            >

                <div 
                    class="custom-scroll <? echo PAGE; ?>" 
                    id="custom-scroll"
                >
                    <div class="custom-scroll__outer">