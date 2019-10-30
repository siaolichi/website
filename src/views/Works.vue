<template>
	<div id="works-page">
		<router-view></router-view>
	</div>
</template>

<script>
import worksJson from '@/assets/works.json';
export default {
	name: 'Works',
}
</script>

<style lang="scss" scoped>
#works-page {
	min-height: 80vh;
}
</style>
