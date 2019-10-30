<template>
	<div id="works-menu">
		<transition name="fade" mode="out-in">
			<div class="works-menu">
				<router-link class="work-section" v-for="work in works" :key="work.id"
				:style="{ 'backgroundImage': getImgUrl(work.id) }" 
				:to="'/works/' + work.id">
					<div class="work-title">{{ work.title }}</div>
				</router-link>
			</div>
		</transition>
	</div>
</template>

<script>
import worksJson from '@/assets/works.json';
export default {
	name: 'WorkMenu',
	data() {
		return {
			works: worksJson,
			showMenu: true,
			currentWork: {},
			imageList: []
		};
	},
	mounted() {
		console.log('mounted');
		this.$store.commit('setDocReady', true);
	},
	methods: {
		clickMenu(work) {
			this.showMenu = false;
			this.currentWork = work;
			let url;
			this.imageList = [];
			for (let photo of work.photo) {
				url = require(`@/assets/images/${work.id}/${photo}`);
				const item = { title: work.title, url };
				this.imageList.push(item);
			}
		},
		getImgUrl(imgID) {
			var images = require.context('../../assets/', false, /\.png$/)
			console.log(imgID)
			return 'url('+require('@/assets/images/banner/'+imgID+'.jpg')+')'
		}
	}
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');
a {
	color:black;
  	text-decoration: none;
}
.works-menu {
	padding-top: 10px;
	display: flex;
	width: 1700px;
	flex-wrap: nowrap;
	height: 80vh;
	.work-section {
		cursor: pointer;
		border: none;
		background: none;
		margin-left: 20px;
		width: 200px;
		flex-shrink: 1;
		background-size: cover;
		background-position: center bottom;
		height: 100%;
		background-repeat: no-repeat;
		position: relative;
		.work-title {
			text-align: right;
			float: right;
			font-family: 'Josefin Sans', sans-serif;
			font-size: 48px;
			color: black;
			word-wrap: break-word;
			writing-mode: vertical-rl;
			text-orientation: mixed;
		}
	}
	.work-section::before {
		background: rgb(238,174,202);
		background: linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,0) 100%);
		background-size: 170px 1000px;;
		background-position: left top;
		background-repeat: no-repeat;
		position: absolute;
		width: 100px;
		height: 100%;
		content: '';
		opacity: 0;
		animation-name: rolling-right;
  		animation-duration: 4s;
		width: 0;
		transition: all 1s;
		transform: translateX(0px);
	}
	@keyframes rolling-right {
		0%   {width: 0px; opacity: 1; background: #fff;}
		50%  {width: 200px; opacity: 1; background: #fff;}
		100% {width: 200px; opacity: 0; background: #fff;}
	}
	.work-section:hover::before {
		width: 180px;
		// transform: translateX(-50px);
		opacity: 0.8;
	}
}
@media only screen and (max-width: 760px) {
	.video-container {
		position: relative;
		padding-bottom: 56.25%;
		padding-top: 30px;
		height: 0;
		overflow: hidden;
		width: 100%;
	}
}
</style>
