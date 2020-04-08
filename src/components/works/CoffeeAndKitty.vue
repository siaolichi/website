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
						decentralized, pseudonymous, open and transparent, are known as features of
						blockchain.<br />
						In the centralized system, only the bank or government can see what you are
						doing.<br />
						But in the decentralized system, since blockchains are transparent, every
						action in the ledger can be easily checked and viewed.<br />
						The most crucial elements are addresses. everything we do in the blockchain
						is related to address, a 27-34 digit code consisting of letters and
						numbers.<br /><br />
						There are three groups of people have the addresses:<br />
						Miner, Intermediaries, for example, the virtual currency exchange or
						contract, and the general user.<br />
						In some cases like the general user who wants to use cryptocurrency as a
						payment method, how many of them should we treat as our personal data?<br />
						These bunch of addresses is not only exiting in blockchain but also spread
						on the internet.<br />
						<br />
						This work begins with a cup of coffee and a crypto kitty. To buy a cup of
						coffee and a crypto kitty, how many addressed have been connected, and how
						many addresses will be connected in the future?  How many of those addresses
						will be found on the internet and how many of them are the real user, or
						even be found the real personal data somewhere on the internet? How much
						information can we get if we only google it?<br />
						I visualize it, google it, checking the website.<br />
						Every activity, transaction, contract we found from this work are already
						spread, stored, and couldn't be erased from the internet.<br />
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
			...worksJson[0],
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
