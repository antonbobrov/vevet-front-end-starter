<?
define("PAGE", "home-page");
require_once './includes/start.php';
?>

<div class="page-content">
    <div class="wrap">

        <h1 class="v-view_b">Front-end Starter</h1>
        <br><br><br>

        <h2 class="v-view_b">Test Popup</h2>
        <br>
        <div class="v-view_b">
            <button class="js-open-popup" data-popup="#test-popup">Open popup</button>
        </div>
        <div id="test-popup" class="display-none">
            <div class="popup-outer">
                <div class="popup-outer__header">Popup window</div>
                <div class="popup-outer__desc">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
        <br><br><br>

        <h2 class="v-view_b">Test lazy-img component</h2>
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