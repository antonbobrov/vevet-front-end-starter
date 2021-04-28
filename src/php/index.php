<?
define("PAGE", "home-page");
require_once './includes/start.php';
?>

<div class="page-content">
    <div class="wrap">

        <h1 class="v-view_b">Front-end Starter</h1>
        <br><br><br>

        <h4 class="v-view_b">Test lazy-img component</h4>
        <br>
        <div style="position: relative; padding-top: 50%" class="v-view_b">
            <lazy-img>
                <img 
                    src="https://picsum.photos/seed/picsum2/1440/600" 
                    alt="Image alt" 
                    srcset="/image/placeholder.svg" 
                    data-srcset="https://picsum.photos/seed/picsum2/1440/600" 
                >
            </lazy-img>
        </div>

    </div>
</div>

<? require_once './blocks/footer.php'; ?>

<? require_once './includes/end.php'; ?>