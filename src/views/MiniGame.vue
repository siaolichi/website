<template>
	<div id="mini-game">
		<iframe
			id="game"
			src="https://s3-us-west-2.amazonaws.com/sharemygame.com/85f9ed55-5749-4bc3-a551-7b8e50188524/rocket fly/index.html"
			frameborder="0"
			height="80%"
			width="100%"
			style="height: 500px;"
			allowfullscreen="true"
			scrolling="no"
		>
		</iframe>
		<div class="game-rule">
			Space: Turn on the engine<br />
			D key: Turn right<br />
			A key: turn left<br />
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#mini-game {
	background: none;
	z-index: -1;
	iframe {
		margin-top: 100px;
	}
	.game-rule {
		width: 80%;
		margin: auto;
	}
}
</style>
