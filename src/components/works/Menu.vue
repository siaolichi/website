<template>
	<div id="works-menu">
		<!-- <transition name="fade" mode="out-in"> -->
		<div class="middle-line"></div>
		<div class="work-section"  v-for="work in works" :key="work.id">
			<router-link :to="'/works/' + work.id">
				<div class="menu-work-name">
					<div class="work-title">
						<div class="title">
							<div>{{work.year}}</div>
							<div>{{ work.title }}</div>
						</div>
						<div class="empty-space"></div>
					</div>
				</div>
				<div class="work-photo" :style="{'backgroundImage': getImgUrl(work)}"></div>
			</router-link>
		</div>
		<!-- </transition> -->
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
		getImgUrl(work) {
			return 'url('+require('../../assets/images/'+work.id+'/'+work.photos[0])+')'
		}
	}
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans:400,700&display=swap');
a {
	  text-decoration: none;
	//   background-color:lawngreen;
}
#works-menu {
	// animation-name: rolling-right;
	// animation-duration: 4s;
	position: relative;
	height: 3600px;
	width: 100%;
	.middle-line {
		height:100%;
		width: 1px;
		background-color: rgb(202, 202, 202);
		position: absolute;
		top: 100px;
		left: 15%;
	}
	.work-section{
		height: 300px;
		width: 100%;
		position: relative;
		// margin-top: 200px;
		margin-bottom: 200px;
		// background-color: #fff;
		.work-photo{
			width: 100%;
			height: 270px;
			display: inline-block;
			position: absolute;
			top: 100px;
			left: 10%;
			width: 80%;
			height: 280px;
			background-size: cover;
			background-repeat: no-repeat;
			transition: 1s ease;
		}
	}
	.work-section:hover .work-photo{ 
		animation-name: shining;
		top: 10px;
		width: 85%;
		left: 5%;
		height: 150%;
	}
	.menu-work-name{
		width: 100%;
		.work-title {
			height: 300px;
			display: flex;
			justify-content: center;
			align-items:flex-start;
			vertical-align: middle;
			.title {
				font-family: 'Josefin Sans', sans-serif;
				font-weight: bold;
				font-size: 48px;
				width: 60%;
				padding: 0;
				margin: 0;
				display: inline-block;
				color: black;
				background-color: rgba($color: white, $alpha: 0.3);
				z-index: 2;
			}
			.empty-space{
				width: 30%;
				height: 100%;
				border: black solid 0px;
			}
		}
	}
	@keyframes shining {
		0%   {opacity: 0;}
		50% {opacity: 1;}
		100% {opacity: 0;}
	}
	@keyframes rolling-down {
		0%   {width: 0px; opacity: 1;}
		50% {width: 100%; opacity: 1;}
		100% {width: 0px; opacity: 1;}
	}
}
@media only screen and (max-width: 760px) {

}
</style>
