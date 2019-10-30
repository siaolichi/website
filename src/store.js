import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		docReady: false,
		links: [
			{
				title: 'Home',
				linkto: '/'
			},
			{
				title: 'About',
				linkto: '/about'
			},
			// {
			// 	title: 'Web Projects',
			// 	linkto: 'projects'
			// },
			{
				title: 'Works',
				linkto: '/works'
			},
			{
				title: 'Blog',
				linkto: '/blog'
			},
			{
				title: 'Contact',
				linkto: '/contact'
			}
		]
	},
	mutations: {
		setDocReady: (state, val) => {
			return (state.docReady = val);
		}
	},
	actions: {}
});
