<template>
	<div id="app">
		<NavBar />
		<router-view />
	</div>
</template>

<script>
import NavBar from './components/NavBar';
export default {
	components: {
		NavBar
	},
	data() {
		return {
			openMenu: false
		};
	}
};
</script>

<style lang="scss">
#app {
	position: relative;
	margin: 0;
	padding: 0;
	top: 0;
	left: 0;
}
</style>
