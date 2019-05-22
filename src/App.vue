<template>
	<div id="app">
		<NavBar />
		<MainView />
	</div>
</template>

<script>
import NavBar from './components/NavBar';
import MainView from './views/MainView';
export default {
	components: {
		NavBar,
		MainView
	},
	data() {
		return {
			openMenu: false
		};
	}
};
</script>

<style lang="scss">
@font-face {
	font-family: 'Chogokuboso Gothic';
	src: url('~@/assets/chogokubosogothic_5.ttf') format('truetype');
}
#app {
	position: relative;
	margin: 0;
	padding: 0;
	top: 0;
	left: 0;
	font-family: 'Chogokuboso Gothic';
	font-weight: bold;
	width: 100%;
}
</style>
