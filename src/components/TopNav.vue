<template>
	<div class="top-nav">
		<!-- <router-link to="/">
			<h1 class="site-name">HSIAO LI CHI</h1>
		</router-link> -->
		<div v-for="item in showLink" :key="item.title" class="link-button">
			<router-link 
			:to="item.linkto" 
			class="link-text topBotomBordersOut"
			>{{ item.title }}</router-link>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			showLink: []
		};
	},
	computed: {
		...mapState(['links'])
	},
	mounted() {
		this.showLink = this.links;
	}
};
</script>

<style lang="scss" scoped>
.top-nav {
	height: 80px;
	width: 100%;
	background: none;
	-webkit-transition: background-color 1s ease-out;
	-moz-transition: background-color 1s ease-out;
	-o-transition: background-color 1s ease-out;
	transition: background-color 1s ease-out;
	position: fixed;
	z-index: 4;
	h1 {
		display: inline-block;
	}
	.link-button {
		// display: inline-block;
		margin: 20px;
		vertical-align: bottom;
		text-align: center;
		float: right;
	}
	.site-name {
		display: inline-block;
		margin: 20px;
		color: black;
		text-decoration: none;
	}
	.link-text {
		color: black;
		text-decoration: none;
		padding: 10px 10px;
		position: relative;
		cursor: pointer;
	}
	/* Top and Bottom borders go out */
	.link-text::before,
	.link-text::after {
		position: absolute;
		left: 0px;
		width: 100%;
		height: 1px;
		background: #000;
		content: '';
		// border-top: solid black 1px;
		opacity: 0;
		transition: all 0.3s;
	}

	.link-text::before {
		top: 0px;
		transform: translateY(10px);
	}

	.link-text::after {
		bottom: 0px;
		color: red;
		transform: translateY(-10px);
	}

	.link-text:hover::before,
	.link-text:hover::after {
		opacity: 1;
		transform: translateY(0px);
	}
	@media only screen and (max-width: 760px) {
		display: none;
	}
}
.nav-background {
	transition: all 1s;
	opacity: 0;
	background: rgb(255,255,255);
	background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
	width: 100%;
	height: 120px;
	position: fixed;
	left: 0px;
	top: 0px;
	z-index: 0;
}
.top-nav:hover{
	background-color: rgba(255,255,255,0.8);
}

</style>
