import '@/promise-polyfill';
import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import axios from 'axios';
import * as filters from '@/filters';
import VueProgressBar from 'vue-progressbar';
import iView from 'iview';
import iView_locale from 'iview/src/locale/lang/en-US'
// import 'iview/dist/styles/iview.css';
import '@/nekos-theme.less';

import App from '@/App';
import NavBar from '@/components/NavBar';
import ImagePreview from '@/components/ImagePreview';
import Modal from '@/components/Modal';

Vue.config.productionTip = false;

Vue.use(iView, { locale: iView_locale });
Vue.use(VueProgressBar, {
	color: '#2de58c',
	failedColor: 'red',
	thickness: '4px'
});

Vue.prototype.$http = axios;

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});

Vue.component('NavBar', NavBar);
Vue.component('ImagePreview', ImagePreview);
Vue.component('Modal', Modal);

const app = new Vue({
	el: '#app',
	router,
	store,
	...App
});
