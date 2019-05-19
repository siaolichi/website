<template>
	<div id="project-page">
		<div id="archive-section" class="section-container">
			<div>
				<h3>Portfolio 2018 archive</h3>
				<p>2018</p>
				<a href="https://hsiao-li-chi-archive.herokuapp.com/">
					<img :src="require('@/assets/images/websiteImage/portfolio-archive.png')" />
				</a>
				<br />
				<a v-scroll-to="'#time-capsule-section'" class="to-next arrow-icon">
					<img class="icon" :src="require('@/assets/icon/arrow-down.png')" />
				</a>
			</div>
		</div>
		<div id="time-capsule-section" class="section-container">
			<div>
				<a v-scroll-to="'#archive-section'" class="to-next arrow-icon">
					<img class="icon" :src="require('@/assets/icon/arrow-up.png')" />
				</a>
				<br />
				<h3>Time Capsule Project</h3>
				<p>2018</p>
				<a href="http://time-capsule.hsiao-li-chi.com/">
					<img :src="require('@/assets/images/websiteImage/time-capsule.png')" />
				</a>
				<br />
				<a v-scroll-to="'#my-tiny-news-section'" class="to-next arrow-icon">
					<img class="icon" :src="require('@/assets/icon/arrow-down.png')" />
				</a>
			</div>
		</div>
		<div id="my-tiny-news-section" class="section-container">
			<div>
				<a v-scroll-to="'#time-capsule-section'" class="to-next arrow-icon">
					<img class="icon" :src="require('@/assets/icon/arrow-up.png')" />
				</a>
				<br />
				<h3>My Tiny News</h3>
				<p>2017</p>
				<a href="https://siaolichi.github.io/MyTinyNews/">
					<img :src="require('@/assets/images/websiteImage/my-tiny-news.png')" />
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#project-page {
	.section-container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		img {
			width: 60%;
		}
		div {
			align-self: center;
		}
		h3 {
			font-weight: bold;
		}
		.arrow-icon {
			display: inline-block;
			padding: 60px;
			cursor: pointer;
			.icon {
				width: 20px;
				height: 20px;
			}
		}
	}
}
</style>
