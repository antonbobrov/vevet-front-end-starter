[На русском](README.ru.md)

# A Front-end Starter for developing Front-end with Vevet

Works with OpenServer + Webpack.

## Getting started
Install node dependencies
```sh
npm install
```
Launch OpenServer & Webpack
```sh
npm start
```
Build
```sh
npm build
```



<br>

## !!! Checklist
    * Viewport callbacks on modules destroy
    * DPR
    * Update menu on AjaxPage change
    * Update languages on AjaxPage change
    * iPhone 5 - 320w
    * Lazy image - use <img>
    * Image attributes: alt, title
    * Horizontal scroll - overflow:hidden for wrappers
    * Video autoplay on browser shut down in iOS
    * PageSpeed tests
    * iOS scroll but on resize whe using not window-scroll (top toolbar)
    * Button types

<br>





## Structure overview: 
    * /src/ - Source Files
    * /public/ - Build files for production
    * /webpack/ - Webpack configuration
    * /.htaccess - It is used to bundle Webpack with OpenServer and also to output the PHP files to the root of the OpenServer domain.





## Attention
All pages are linked using AJAX. To define a link working with AJAX, add the class "v-al" to it. The AJAX module doesn't support cross-domain requests. Each page must contain the block
```html
<div 
    class="app" 
    id="app" 
    data-v-page="PAGE_NAME" 
    data-v-pageAjax-name="PAGE_NAME" 
></div>
```
where "PAGE_NAME" is the name of the page bound with JavaScript. If there's not any page instance with this very name, the Default page instance will be used.
