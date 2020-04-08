<template>
	<div id="project-page" class="full-container">
		<ProjectThree />
		<div class="section-container">
			<div id="loka-section">
				<div>
					<h3>Loka Location</h3>
					<p>2020</p>
					<a href="https://loka-location.herokuapp.com/">
						<img :src="require('@/assets/images/websiteImage/loka.png')" />
					</a>
					<p class="description">
						A map share website which user can create group, share maps, see other one's
						map and location recommandation
					</p>
				</div>
			</div>
			<div id="archive-section">
				<div>
					<h3>Portfolio 2018 archive</h3>
					<p>2018</p>
					<a href="https://hsiao-li-chi-archive.herokuapp.com/">
						<img :src="require('@/assets/images/websiteImage/portfolio-archive.png')" />
					</a>
					<p class="description">
						Old website created in 2018
					</p>
				</div>
			</div>
			<div id="fun-section">
				<div>
					<h3>Little Fun in Quarantine</h3>
					<p>2018</p>
					<a href="https://fun.hsiao-li-chi.com/">
						<img :src="require('@/assets/images/websiteImage/fun.png')" />
					</a>
					<p class="description">
						Some cuties in Quarantine.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ProjectThree from './ProjectThree';
export default {
	components: {
		ProjectThree
	},
	mounted() {
		this.$store.commit('setDocReady', true);
	}
};
</script>

<style lang="scss" scoped>
#project-page {
	.section-container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		text-align: center;
		justify-content: space-evenly;
		img {
			width: 400px;
			height: 400px;
			margin: 20px;
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
		.description {
			width: 500px;
			height: 100px;
		}
	}
}
</style>
