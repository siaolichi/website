<template>
	<div id="works-page">
		<div id="content-section" class="section-container">
			<transition name="fade" mode="out-in">
				<div v-if="showMenu" key="1" class="works-menu">
					<div class="vertical-line"></div>
					<div v-for="work in works" :key="work.id">
						<div>
							<button @click="clickMenu(work)">{{ work.title }}</button>
						</div>
					</div>
					<div class="vertical-line"></div>
				</div>
				<div v-else key="2" class="works-menu">
					<button class="to-menu arrow-icon" @click="showMenu = true">
						<img class="icon" :src="require('@/assets/icon/arrow-up.png')" />
					</button>
					<div class="vertical-line"></div>
					<div class="work-title">{{ currentWork.title }} {{ currentWork.year }}</div>
					<p class="work-content" v-html="currentWork.description"></p>
					<br />
					<p class="work-content">Tools: {{ currentWork.tools }}</p>
					<div class="vertical-line"></div>
					<a
						v-if="currentWork.video"
						v-scroll-to="'#video-section'"
						class="to-next arrow-icon"
					>
						<img class="icon" :src="require('@/assets/icon/arrow-down.png')" />
					</a>
					<a
						v-else-if="currentWork.photo[0]"
						v-scroll-to="'#photo-section'"
						class="to-next arrow-icon"
					>
						<img class="icon" :src="require('@/assets/icon/arrow-down.png')" />
					</a>
				</div>
			</transition>
		</div>
		<div v-if="!showMenu && currentWork.video" id="video-section" class="section-container">
			<div id="video-child">
				<a v-scroll-to="'#content-section'" class="to-next arrow-icon">
					<img class="icon" :src="require('@/assets/icon/arrow-up.png')" />
				</a>
				<br />
				<div class="video-container">
					<iframe
						:src="currentWork.video"
						frameborder="0"
						allow="fullscreen"
						allowfullscreen
					></iframe>
				</div>

				<br />
				<a v-scroll-to="'#photo-section'" class="to-next arrow-icon">
					<img class="icon" :src="require('@/assets/icon/arrow-down.png')" />
				</a>
			</div>
		</div>
		<div v-if="!showMenu && currentWork.photo[0]" id="photo-section" class="section-container">
			<div>
				<a
					v-if="currentWork.video"
					v-scroll-to="'#video-section'"
					class="to-next arrow-icon"
				>
					<img class="icon" :src="require('@/assets/icon/arrow-up.png')" />
				</a>
				<a v-else v-scroll-to="'#content-section'" class="to-next arrow-icon">
					<img class="icon" :src="require('@/assets/icon/arrow-up.png')" />
				</a>
				<br />
				<div>
					<v-gallery :images="imageList"></v-gallery>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import worksJson from '@/assets/works.json';
export default {
	name: 'Works',
	data() {
		return {
			works: worksJson,
			showMenu: true,
			currentWork: {},
			imageList: []
		};
	},
	mounted() {
		console.log('mounted');
	},
	methods: {
		clickMenu(work) {
			this.showMenu = false;
			this.currentWork = work;
			let url;
			this.imageList = [];
			for (let photo of work.photo) {
				url = require(`@/assets/images/${work.id}/${photo}`);
				const item = { title: work.title, url };
				this.imageList.push(item);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.works-menu {
	padding-top: 10px;
	text-align: center;
	align-self: center;
	button {
		cursor: pointer;
		border: none;
		background: none;
		padding: 10px;
		font-size: 12px;
	}
	button:focus {
		outline: none;
		font-weight: 900;
	}
	button:hover {
		font-weight: bold;
	}
	.vertical-line {
		height: 50px;
		border-left: solid black 1px;
		width: 2px;
		margin: auto;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.work-content {
		font-size: 12px;
		text-align: justify;
		line-height: 1.5em;
		font-weight: 900;
		width: 60%;
		margin: auto;
	}
	.work-title {
		font-weight: 900;
		margin-bottom: 20px;
	}
	.to-menu:hover {
		opacity: 0.7;
	}
}
.arrow-icon {
	padding: 30px;
	display: inline-block;
	cursor: pointer;
	.icon {
		width: 20px;
		height: 20px;
	}
}
.section-container {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-content: center;
	flex-direction: row;
	#video-child {
		align-self: center;
		text-align: center;
		width: 100%;
	}
	.video-container {
		display: inline-block;
		margin: 0 auto;
		position: relative;
		padding-bottom: 23.125%;
		padding-top: 30px;
		height: 0;
		overflow: hidden;
		width: 50%;
	}
	iframe,
	object,
	embed {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	@media only screen and (max-width: 760px) {
		.video-container {
			position: relative;
			padding-bottom: 56.25%;
			padding-top: 30px;
			height: 0;
			overflow: hidden;
			width: 100%;
		}
	}
}
#photo-section {
	text-align: center;
	div,
	a {
		align-self: center;
		text-align: center;
		margin: 50px;
	}
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave {
	opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 1s;
}
</style>
