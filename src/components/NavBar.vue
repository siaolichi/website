<template>
	<div id="nav-bar">
		<div class="open-menu">
			<!-- <router-link to="/" class="site-name">
					<h1>HSIAO LI CHI</h1>
				</router-link> -->
			<button class="menu-button" prevent @click="toggleMenu()">
				<div>ME</div>
				<div>NU</div>
			</button>
		</div>
		<div class="label-wrapper">
			<div v-for="item in showLinks" :key="item.title" @click="toggleMenu()">
				<router-link :to="item.linkto" tag="div">
					<div class="label">
						<p>{{ item.title }}</p>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			showLinks: [],
			openMenu: false
		};
	},
	computed: {
		...mapState(['links'])
	},
	mounted() {
		window.scrollBy({ top: 0, left: 0, behavior: 'smooth' });
		console.log('scroll');
	},
	methods: {
		toggleMenu() {
			// let elements = document.getElementsByClassName('nav-container');
			// for(let element of elements){
			// this.openMenu ? element.style.opacity = 0 : element.style.opacity = 1;
			// console.log(element.style.opacity)
			// }
			this.openMenu = !this.openMenu;
			if (this.openMenu) {
				this.showLinks = this.links;
				// document.getElementById('nav-bar').style.background = 'rgba(255, 255, 255, 0.8)';
				document.getElementById('nav-bar').style.height = '100vh';
			} else {
				this.showLinks = [];
				// document.getElementById('nav-bar').style.background = 'none';
				document.getElementById('nav-bar').style.height = '80px';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
#nav-bar {
	z-index: 4;
	position: fixed;
	width: 100%;
	-webkit-backface-visibility: hidden;
	height: 80px;
	top: 0;
	left: 0;
	transition: all 0.5s ease;
	background: rgba(255, 255, 255, 0.8);
	.open-menu {
		.menu-button {
			cursor: pointer;
			position: absolute;
			top: 0;
			right: 0;
			width: 50px;
			height: 50px;
			background: none;
			border: none;
			text-align: right;
			margin: 20px;
			font-size: 20px;
			color: black;
		}
		.site-name {
			// margin: 20px;
			color: black;
			width: 80%;
			height: 100%;
			text-decoration: none;
		}
	}
	.label-wrapper {
		width: 100%;
		height: calc(100% - 80px);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: auto;
		.label {
			width: 100%;
			margin: 30px;
			cursor: pointer;
			vertical-align: middle;
			height: 50px;
			margin: auto;
			padding: 0;
			text-align: right;
			opacity: 0;
			transition: all 1s ease;
		}
	}
}
button:focus {
	outline: none;
}
@media only screen and (max-width: 760px) {
	.label {
		opacity: 1 !important;
		// display: inline-block;
	}
}
@media only screen and (min-width: 760px) {
	#nav-bar {
		display: none;
	}
}
</style>
