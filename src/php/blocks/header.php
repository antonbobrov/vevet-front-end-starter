<header class="header">

    <div class="header__logo" translate="no">
        <a href="/" class="v-al">Logo</a>
    </div>

    <nav class="header__menu">
        <ul>
            <li>
                <a href="/" class="v-al js-menu-link <? if (PAGE === 'home-page'): ?>active<? endif; ?>">
                    <span>Home</span>
                </a>
            </li>
            <li>
                <a href="/text-page.php" class="v-al js-menu-link <? if (PAGE === 'text-page'): ?>active<? endif; ?>">
                    <span>Text styles</span>
                </a>
            </li>
        </ul>
    </nav>

    <ul class="header__languages js-languages" translate="no">
        <li>
            <a href="/?page=<? echo PAGE; ?>&lang=en" class="active">En</a>
        </li>
        <li>
            <a href="/?page=<? echo PAGE; ?>&lang=ru">Ru</a>
        </li>
    </ul>

    <div class="header__burger">
        <button class="burger-button js-menu-button">
            <span>Menu</span>
            <i></i>
        </button>
    </div>

</header>