<? require_once "config/lang.php"; ?>
<!DOCTYPE html>
<html lang="<? echo LANG; ?>" class="v-reset v-no-transition has-gui">

    <head>
       
       <!-- Meta -->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=Edge">   
       <meta name="format-detection" content="telephone=no">  
       <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no">
       
       <title><? echo $lang['site']['title']; ?></title>

       <!-- Icons -->
       <link rel="icon" type="image/png" href="/image/favicon-16x16.png" sizes="16x16">
       <link rel="icon" type="image/png" href="/image/favicon-32x32.png" sizes="32x32">
       <link rel="icon" type="image/png" href="/image/favicon-64x64.png" sizes="64x64">
       <link rel="icon" type="image/png" href="/image/favicon-96x96.png" sizes="96x96">
       <link rel="apple-touch-icon" href="/image/192x192.png">
       
       <!-- Web -->
       <meta name="apple-mobile-web-app-capable" content="yes" />
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
                    class="custom-scroll <? echo PAGE; ?> v-scroll" 
                    id="custom-scroll"
                >
                    <div class="v-scroll__container">
                        <div class="custom-scroll__outer">