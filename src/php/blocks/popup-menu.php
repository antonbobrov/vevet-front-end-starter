<div class="v-menu desktop-hide" id="menu">

    <div class="v-menu__bg"></div>

    <div class="v-menu__content">
        <div class="v-menu__scroll">

            <div class="popup-menu">

                <!-- Menu Header -->
                <div class="popup-menu__header v-menu__alpha">
                    <ul class="popup-menu__languages js-languages" translate="no">
                        <li>
                            <a href="/?page=<? echo PAGE; ?>&lang=en" class="active">En</a>
                        </li>
                        <li>
                            <a href="/?page=<? echo PAGE; ?>&lang=ru">Ru</a>
                        </li>
                    </ul>
                    <button class="burger-button js-menu-close-button close">
                        <span>Close</span>
                    </button>
                </div>

                <div class="popup-menu__container">

                    <!-- Menu Links -->
                    <nav class="popup-menu__links">
                        <ul itemscope="" itemtype="http://schema.org/SiteNavigationElement">
                            <li class="v-menu__translate" itemprop="name">
                                <a 
                                    href="/" 
                                    itemprop="url"
                                    class="v-al js-menu-link <? if (PAGE === 'home-page'): ?>active<? endif; ?>"
                                >
                                    <span>Home</span>
                                </a>
                            </li>
                            <li class="v-menu__translate" itemprop="name">
                                <a 
                                    href="/text-page.php" 
                                    itemprop="url"
                                    class="v-al js-menu-link <? if (PAGE === 'home-page'): ?>active<? endif; ?>"
                                >
                                    <span>Text styles</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                </div>

            </div>

        </div>
    </div>

</div>