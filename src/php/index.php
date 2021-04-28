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



        <h2 class="v-view_b">Test Video Popup</h2>
        <br>
        <div class="v-view_b">
            <play-video-button
                source="yt"
                src="lM02vNMRRB0"
            >Open video in popup (Youtube)</play-video-button>
            <br>
            <play-video-button
                source="vm"
                src="542425649"
            >Open video in popup (Vimeo)</play-video-button>
            <br>
            <play-video-button
                source="srv"
                src="/image/test-content/video.mp4"
            >Open video in popup (Server)</play-video-button>
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
        <br><br><br>



        <h2 class="v-view_b">Test Ajax Form</h2>
        <br>
        <ajax-form 
            class="ajax-form v-view_b"
            popup-on-success="#test-popup"
        >
            <form 
                action="/mail/index.php" 
                method="post" 
                class="v-form"
            >

                <div class="form-grid">

                    <input type="hidden" name="form" value="vacancy-form">

                    <div class="form-double-input">
                        <div class="form-input">
                            <label for="input-name" class="form-input__label">Name:</label>
                            <div class="form-input__input">
                                <input type="text" name="name" id="input-name" minlength="2">
                            </div>
                        </div>
                        <div class="form-input">
                            <label for="input-telephone" class="form-input__label">Telephone:</label>
                            <div class="form-input__input">
                                <input type="hidden" name="phone-code" id="input-phone-code" value="">
                                <input type="hidden" name="phone-mask" id="input-phone-mask" value="">
                                <input type="tel" name="telephone" id="input-telephone" data-telephone-code="#input-phone-code" data-telephone-mask="#input-phone-mask">
                            </div>
                        </div>
                    </div>

                    <div class="form-double-input" style="z-index: 1;">
                        <div class="form-input">
                            <label for="input-email" class="form-input__label">Email:</label>
                            <div class="form-input__input">
                                <input type="email" name="email" id="input-email">
                            </div>
                        </div>
                        <div class="form-input">
                            <label for="input-position" class="form-input__label">Option:</label>
                            <div class="form-input__input hide-first-option">
                                <select name="position" id="input-position">
                                    <option value="">Choose position</option>
                                    <option value="designer">Designer</option>
                                    <option value="front">Front-end</option>
                                    <option value="back">Back-end</option>
                                </select>
                                <span class="form-input__error-ico"></span>
                            </div>
                        </div>
                    </div>

                    <div class="form-input">
                        <label for="input-comment" class="form-input__label">Comment:</label>
                        <div class="form-input__input">
                            <textarea name="comment" id="input-comment"></textarea>
                        </div>
                    </div>

                    <div class="form-grid__buttons">
                        <button type="submit">Submit</button>
                    </div>
                
                </div>

            </form>
        </ajax-form>



    </div>
</div>

<? require_once './blocks/footer.php'; ?>

<? require_once './includes/end.php'; ?>