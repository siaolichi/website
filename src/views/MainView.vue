<template>
	<div id="main-view">
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#main-view {
	position: absolute;
	width: 100%;
	min-height: 100vh;
	.fade-enter-active,
	.fade-leave-active {
		transition-duration: 1s;
		transition-property: opacity;
		transition-timing-function: ease;
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
}
</style>
