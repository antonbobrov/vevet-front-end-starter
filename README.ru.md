# Шаблон Front-end для OpenServer и Vevet

Работает на OpenServer + Webpack

## Getting started
Установите npm зависимости
```sh
npm install
```
Запустить OpenServer и Webpack
```sh
npm start
```
Соберать production-версию
```sh
npm build
```





## Структура: 
    * /src/ - Source Files
        * /src/fonts/ - Шрифты
        * /src/img/ - Изображения, используемые в качестве backround'ов структурных блоков
        * /src/js/ - JavaScript
            * /src/js/helpers/ - Полезные модули
            * /src/js/modules/ - Модули, используемые на страницых
            * /src/js/pages/ - Инициализация страниц
                * /src/js/pages/init/
                    * /src/js/pages/init/createPage.js - Инициализирует нужную страницу при первоначальной загрузке
                    * /src/js/pages/init/pageAjax.js - Связывает страницы с помощью AJAX
                    * /src/js/pages/init/pagesRegistry.js - Содержит все страницы в массиве
                * /src/js/pages/default.js - Экземпляр страницы по умполчанию. Наследуется другими страинцами.
            * /src/js/v/ - Инициализация Vevet.js
            * /src/js/index.js
            * /src/js/init.js - Инициализирует все приложение
            * /src/js/register-service-worker.js - Регистрирует Service Worker
            * /src/js/os-domain.js - Содержит название домена в OpenServer, чтобы отключать Service Worker во время локальной разработки.
            * /src/js/settings.js - Конфигурация, используемая модулями и страницами
        * /src/php/ - PHP файлы: страницы, блоки.
        * /src/static/ - Файлы, которые в production-версии будут в корне
        * /src/styles/ - SASS & CSS
            * /src/styles/blocks/ - Элементы, используемые на страницах
            * /src/styles/helpers/
            * /src/styles/layout/ - Структурные элементы
            * /src/styles/mixins/ - SASS миксины
            * /src/styles/pages/ - Страницы
            * /src/styles/settings/
    * /public/ - Production-файлы
    * /webpack/ - Конфигурация Webpack
    * /.htaccess - Используется для связки WebpackDevServer c OpenServer и вывода PHP файлов в корень OpenServer домена.

## Внимание
Все страницы связаны с помощью AJAX. Чтобы переход по ссылке осуществлялся через AJAX, ссылке нужно добавить класс "v-al". AJAX модуль не работает с кросс-доменными запросами. Каждая страница должна содержать блок
```html
<div 
    class="app" 
    data-v-page="PAGE_NAME" 
    data-v-pageAjax-name="PAGE_NAME" 
></div>
```
где "PAGE_NAME" - имя страницы, используемое в JavaScript. Если экземпляра страницы с таким именем не существует, будет использоваться экземпляр по умполчанию.

## HTML Classes

### full-height
Элементы, высота которых - 100% вьюпорта. Высота блока устанавливается через JavaScript.

### v-view
Элементы, которым при появлении во вьюпорте добавляется класс "v-viewed".

### v-view_b
Элемент появляется с эффектом "fade-in-from-bottom".