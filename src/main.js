import '@/promise-polyfill';
import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import axios from 'axios';
import * as filters from '@/filters';
import VueProgressBar from 'vue-progressbar';
import VueTimeago from 'vue-timeago';
import VueAnalytics from 'vue-analytics';
import Buefy from 'buefy';

import App from '@/App';
import NavBarBue from '@/components/NavBarBue';
import VueI18n from 'vue-i18n';

Vue.use(require('vue-cookies'))

Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: $cookies.get('lang'),   // 语言标识
	//this.$i18n.locale // 通过切换locale的值来实现语言切换
	messages: {
		'zh-CN': require('./common/lang/zh'),   // 中文语言包
		'en-US': require('./common/lang/en')    // 英文语言包
	}
})

Vue.config.productionTip = false;

Vue.use(Buefy, {
	defaultModalScroll: 'keep'
});
Vue.use(VueProgressBar, {
	color: '#2de58c',
	failedColor: 'red',
	thickness: '4px'
});

Vue.prototype.$http = axios;

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});

Vue.component('NavBarBue', NavBarBue);

function requireAll(requireContext) {
	return requireContext.keys().reduce((current, next) => {
		current[next.substr(2, 5)] = requireContext(next);
		return current;
	}, {});
}

Vue.use(VueTimeago, {
	locale: 'zh-CN',
	locales: requireAll(require.context("vue-timeago/locales", true, /\.json$/))
});

const app = new Vue({
	el: '#app',
	i18n,
	router,
	store,
	...App
});
