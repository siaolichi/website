import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueScrollTo from 'vue-scrollto';
import vGallery from 'v-gallery';
Vue.use(VueScrollTo);
Vue.use(vGallery);
// You can also pass in the default options
Vue.use(VueScrollTo, {
	container: 'body',
	duration: 500,
	easing: 'ease',
	offset: 0,
	force: true,
	cancelable: true,
	onStart: false,
	onDone: false,
	onCancel: false,
	x: false,
	y: true
});
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
