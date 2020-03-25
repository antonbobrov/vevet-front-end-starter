[На русском](README.ru.md)

# A Template for developing Front-end with Vevet

Works on OpenServer + Webpack.

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





## Structure overview: 
    * /src/ - Source Files
        * /src/fonts/ - Web fonts
        * /src/img/ - Images used as layout blocks' backgrounds
        * /src/js/ - JavaScript
            * /src/js/helpers/ - Just helpers
            * /src/js/modules/ - Modules that are included on pages
            * /src/js/pages/ - Pages initialization
                * /src/js/pages/init/
                    * /src/js/pages/init/createPage.js - Initializes the needed page on page load
                    * /src/js/pages/init/pageAjax.js - Links pages using AJAX
                    * /src/js/pages/init/pagesRegistry.js - Contains all pages in a single array
                * /src/js/pages/default.js - Default page instance inherited by others.
            * /src/js/v/ - Vevet.js initialization
            * /src/js/index.js - Includes everything needed
            * /src/js/init.js - Initializes the Application
            * /src/js/register-service-worker.js - Registers a Service Worker
            * /src/js/os-domain.js - Contains the name of the OpenServer domain to disable the Service Worker while development.
            * /src/js/settings.js - Configuration used by pages and modules.
        * /src/php/ - PHP files: pages, blocks.
        * /src/static/ - The files that will be in the root of the build folder
        * /src/styles/ - SASS & CSS
            * /src/styles/includes/ - Elements used on pages
            * /src/styles/helpers/
            * /src/styles/layout/ - Layout elements
            * /src/styles/mixins/ - SASS mixins
            * /src/styles/pages/ - Pages rules
            * /src/styles/settings/
    * /public/ - Build files
    * /webpack/ - Webpack configuration
    * /.htaccess - It is used to bundle Webpack with OpenServer and also to output the PHP files to the root of the OpenServer domain.





## Attention
All pages are linked using AJAX. To define a link working with AJAX, add the class "v-al" to it. The AJAX module doesn't support cross-domain requests. Each page must contain the block
```html
<div 
    class="app" 
    data-v-page="PAGE_NAME" 
    data-v-pageAjax-name="PAGE_NAME" 
></div>
```
where "PAGE_NAME" is the name of the page bound with JavaScript. If there's not any page instance with this very name, the Default page instance will be used.





## HTML Classes

### full-height
Defines a full-height element. The height of the block is set with JavaScript.

### v-view
JavaScript observable elements. When they appear in the viewport, the class "v-viewed" is added.

### v-view_b
The element appears with a "fade-in-from-bottom" effect.