import '../styles/index.scss';

import './helpers/dom-css/adaptiveFontSize';
import './helpers/dom-css/setCssVars';
import './layout/loading/preloader';
import './pages/registerPages';

import registerServiceWorker from './service-worker';

registerServiceWorker();
