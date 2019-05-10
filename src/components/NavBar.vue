<template>
	<div id="nav-bar">
		<div id="dynamic-nav">
			<div id="open-menu">
				<button prevent @click="toggleMenu()">ME<br />NU</button>
			</div>
			<transition-group
				transition="fade"
				stagger="250"
				:css="false"
				@before-enter="beforeEnter"
				@enter="enter"
				@leave="leave"
			>
				<router-link
					v-for="item in showLinks"
					:key="item.title"
					class="nav-container"
					:to="item.linkto"
					tag="div"
				>
					<div class="label">
						<p>{{ item.title }}</p>
					</div>
					<img
						class="cross-icon"
						src="https://img.icons8.com/windows/32/000000/delete-sign.png"
					/>
				</router-link>
			</transition-group>
		</div>
		<div class="overlay"></div>
	</div>
</template>

<script>
import Velocity from 'velocity-animate';
export default {
	data() {
		return {
			links: [
				{
					title: 'Home',
					linkto: '/'
				},
				{
					title: 'About',
					linkto: 'about'
				},
				{
					title: 'Projects',
					linkto: 'projects'
				},
				{
					title: 'Works',
					linkto: 'works'
				},
				{
					title: 'Contact',
					linkto: 'contact'
				}
			],
			showLinks: [],
			openMenu: false
		};
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
				document.getElementById('nav-bar').style.background = 'rgba(255, 255, 255, 0.8)';
			} else {
				this.showLinks = [];
				document.getElementById('nav-bar').style.background = 'none';
			}
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
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	transition: all 0.5s ease;
	background: rgba(255, 255, 255, 0);
	#dynamic-nav {
		float: right;
		width: 170px;
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
		display: inline-block;
		vertical-align: middle;
		width: 15px;
		height: 15px;
		margin: auto;
		margin-right: 25px;
	}
	.label p {
		opacity: 0;
		transition: all 1s ease;
		margin: 0 auto;
	}
	.label {
		width: 60%;
		vertical-align: middle;
		height: 25px;
		margin: auto;
		padding: 0;
		text-align: right;
	}
}
#open-menu {
	width: 100%;
	height: 100%;
	button {
		background: none;
		border: none;
		width: 100%;
		height: 100%;
		text-align: right;
		padding-right: 20px;
		font-size: 20px;
	}
}
button:focus {
	outline: none;
}
.nav-container:hover {
	.label p {
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
</style>
