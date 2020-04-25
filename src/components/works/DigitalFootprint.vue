<template>
	<div class="work-container">
		<BackgroundVideo :url="video" />
		<button v-if="!showDescription" class="open-button" @click="switchDescription">D</button>
		<button v-else class="close-button" @click="switchDescription">X</button>
		<transition name="fade" mode="out-in">
			<div v-if="showDescription" class="more-detail">
				<div class="description">
					<h1>{{ title }}</h1>
					<p>{{ year }}</p>
					<p>
						The right to control our own data has become a serious topic today.
						<br /><br />
						In the generation of information explosion, not only the information we
						receive, but also our personal data is being uploaded to the internet
						unconsciously. In the future, the one who has the most information will be
						the overlord.
						<br /><br />
						In the work "digital footprint", Hsiao Li-Chi visualises the internet as a
						small space. Everything that has happened in this space will be played out
						and then a hash code will be printed as proof of the event’s existence. It
						will play only once. The audience has to watch out to memorise it, if they
						miss it, it will become just a digital footprint.
						<br /><br />
						Key, keyhole, footprint.
						<br />
						Everything was determined once you decide to join it.
					</p>
				</div>
				<div class="gallery">
					<v-gallery :images="imageList"></v-gallery>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import worksJson from '@/assets/works.json';
import BackgroundVideo from './BackgroundVideo';
export default {
	name: 'TimeCapsuleProject',
	components: {
		BackgroundVideo
	},
	data() {
		return {
			...worksJson[worksJson.map(e => e.id).indexOf('201901')],
			showDescription: true,
			showPhotos: true,
			imageList: []
		};
	},
	mounted() {
		console.log('mounted', this.title);
		this.$store.commit('setDocReady', true);
		for (let photo of this.photos) {
			console.log(photo);
			let url = require(`../../assets/images/${this.id}/${photo}`);
			const item = { title: this.title, url };
			this.imageList.push(item);
		}
	},
	methods: {
		switchDescription() {
			this.showDescription = !this.showDescription;
		},
		switchshowPhotos() {
			this.showPhotos = !this.showPhotos;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/libs/variables.scss';
.work-container {
	height: 100%;
	.open-button,
	.close-button {
		background: $white-background-color;
		border: none;
		font-weight: bold;
		font-size: 20px;
		// float: right;
		width: 60px;
		height: 60px;
		margin: 30px;
		border-radius: 30px;
		z-index: 2;
	}
	.more-detail {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		height: 100%;
		align-items: stretch;
	}
	.description {
		background: $white-background-color;
		font-size: 12px;
		margin: 20px;
		padding: 20px;
		text-align: justify;
		line-height: 1.5em;
		font-weight: 900;
		width: 40%;
	}
	.gallery {
		width: 40%;
		margin: 20px;
	}
	@media only screen and (max-width: 760px) {
		.description {
			width: 100%;
		}
		.gallery {
			width: 100%;
		}
	}
}
</style>
