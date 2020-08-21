<template>
	<div id="contact-page">
		<div class="contact-form">
			<ul>
				<li class="title">
					<b>E-mail</b>
				</li>
				<li>
					&#115;&#105;&#97;&#111;&#46;&#108;&#105;&#99;&#104;&#105;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;
				</li>
			</ul>
			<ul>
				<li class="title">
					<b>Mobile</b>
				</li>
				<li>&#43;&#52;&#57;&#49;&#55;&#55;&#54;&#53;&#53;&#50;&#49;&#54;&#50;</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		console.log('mounted');
		this.$store.commit('setDocReady', true);
	}
};
</script>

<style lang="scss" scoped>
#contact-page {
	width: 100%;
	height: 100vh;
	.contact-form {
		width: 300px;
		display: block;
		margin: auto;
		margin-top: 20vh;
		ul {
			list-style-type: none;
			li {
				display: inline-block;
			}
			.title {
				width: 80px;
				text-align: start;
			}
		}
	}
}
</style>
