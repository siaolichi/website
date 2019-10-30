<template>
	<div id="nav-bar">
		<div id="dynamic-nav">
			<div id="open-menu">
				<router-link to="/" class="site-name">
					<h1>HSIAO LI CHI</h1>
				</router-link>
				<button prevent @click="toggleMenu()">
					<div>ME</div>
					<div>NU</div>
				</button>
			</div>
			<transition-group
				transition="fade"
				stagger="250"
				:css="false"
				@before-enter="beforeEnter"
				@enter="enter"
				@leave="leave"
			>
				<div v-for="item in showLinks" :key="item.title" @click="toggleMenu()">
					<router-link
						class="nav-container"
						:to="item.linkto"
						tag="div"
						@click.native="scrollToTop"
					>
						<div class="label">
							<p>{{ item.title }}</p>
						</div>
						<img
							class="cross-icon"
							src="https://img.icons8.com/windows/32/000000/delete-sign.png"
						/>
					</router-link>
				</div>
			</transition-group>
		</div>
		<!-- <div class="overlay"></div> -->
	</div>
</template>

<script>
import Velocity from 'velocity-animate';
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
		},
		scrollToTop() {
			this.$nextTick(() => {
				window.scrollTo(0, 0);
			});
		},
		beforeEnter: function(el) {
			el.style.opacity = 0;
			el.style.height = 0;
		},
		enter: function(el, done) {
			var delay = el.dataset.index * 150;
			setTimeout(function() {
				Velocity(el, { opacity: 1, height: 60 }, { complete: done });
			}, delay);
		},
		leave: function(el, done) {
			var delay = el.dataset.index * 150;
			setTimeout(function() {
				Velocity(el, { opacity: 0, height: 0 }, { complete: done });
			}, delay);
		}
	}
};
</script>

<style lang="scss" scoped>
#nav-bar {
	z-index: 2;
	position: fixed;
	width: 100vw;
	-webkit-backface-visibility: hidden;
	height: 80px;
	top: 0;
	left: 0;
	transition: all 0.5s ease;
	#dynamic-nav {
		width: 100vw;
		background: rgba(255, 255, 255, 0.6);
	}
}
.nav-container {
	display: flex;
	flex-direction: col;
	align-items: flex-start;
	flex-wrap: nowrap;
	overflow: hidden;
	cursor: pointer;
	.cross-icon {
		border: none;
		background: none;
		padding: 0;
		// display: inline-block;
		vertical-align: middle;
		width: 15px;
		margin: 0 auto;
		height: 15px;
		margin-right: 25px;
	}
	.label p {
		margin: 0 auto;
		vertical-align: middle;
	}
	.label {
		width: 60%;
		vertical-align: middle;
		height: 25px;
		margin: auto;
		padding: 0;
		text-align: right;
		opacity: 0;
		transition: all 1s ease;
	}
}
#open-menu {
	display: flex;
	button {
		background: none;
		border: none;
		// width: 40%;
		height: 100%;
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
button:focus {
	outline: none;
}
.nav-container:hover {
	.label {
		opacity: 1;
	}
}
.fade-transition {
	opacity: 1;
	transition: all 1s ease;
}
.fade-enter,
.fade-leave {
	opacity: 0;
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
