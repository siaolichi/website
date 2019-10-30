import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: '/works',
			name: 'works',
			component: () => import('./views/Works.vue'),
			children: [
				{
					path: '',
					name: 'WorkMenu',
					component: () => import('./components/works/Menu.vue')
				},
				{
					path: '201901',
					name: 'DigitalFootprint',
					component: () => import('./components/works/DigitalFootprint.vue')
				},
				{
					path: '201801',
					name: 'TimeCapsuleProject',
					component: () => import('./components/works/TimeCapsuleProject.vue')
				},
				{
					path: '201802',
					name: 'MyTinyNews',
					component: () => import('./components/works/MyTinyNews.vue')
				},
				{
					path: '201803',
					name: 'WomenInAnotherWords',
					component: () => import('./components/works/WomenInAnotherWords.vue')
				},
				{
					path: '201804',
					name: 'Diatomee',
					component: () => import('./components/works/Diatomee.vue')
				},
				{
					path: '201701',
					name: 'MountainsInRain',
					component: () => import('./components/works/MountainsInRain.vue')
				},
				{
					path: '201601',
					name: 'Portrait',
					component: () => import('./components/works/Portrait.vue')
				},
				{
					path: '201401',
					name: 'SheWalksInBeautyUgliness',
					component: () => import('./components/works/SheWalksInBeautyUgliness.vue')
				},
				{
					path: '201402',
					name: 'OneSideTruth',
					component: () => import('./components/works/OneSideTruth.vue')
				}
			]
		},
		{
			path: '/blog',
			name: 'blog',
			beforeEnter() {
				location.href = 'https://medium.com/chi-chi-go-make';
			},
			component: () => import('./views/Works.vue')
		},
		{
			path: '/projects',
			name: 'projects',
			component: () => import('./views/Projects.vue')
		},
		{
			path: '/contact',
			name: 'contact',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/Contact.vue')
		},
		{
			path: '/mini-game',
			name: 'mini-game',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/MiniGame.vue')
		}
	]
});
export default router;
