# Шаблон Front-end для Vevet

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
    * /src/ - Исходные файлы
    * /public/ - Production-файлы
    * /webpack/ - Конфигурация Webpack
    * /.htaccess - Используется для связки WebpackDevServer c OpenServer и вывода PHP файлов в корень OpenServer домена.

## Внимание
Все страницы связаны с помощью AJAX. Чтобы переход по ссылке осуществлялся через AJAX, ссылке нужно добавить класс "v-al". AJAX модуль не работает с кросс-доменными запросами. Каждая страница должна содержать блок
```html
<div 
    class="app" 
    id="app" 
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
### v-view_a
Элемент появляется с эффектом "fade-in".