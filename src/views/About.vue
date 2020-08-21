<template>
	<div id="about-page">
		<div class="sections-menu">
			<span
				class="menu-point"
				:class="{ active: activeSection == index }"
				@click="scrollToSection(index)"
				v-for="(offset, index) in offsets"
				:key="index"
			>
			</span>
		</div>
		<section class="section home">
			<div class="home-content">
				<h1><b> Hsiao Li Chi</b></h1>
				<hr />
			</div>
		</section>
		<section class="section">
			<h1>About</h1>
			<p>
				Hsiao Li-Chi is a multimedia artist graduated from Berlin University of Art, her
				works take on a variety of forms such as Audio-Visual, sound, installations and live
				performances. Her works are mostly about the relationship of herself, the internet,
				and social society. Recently, her works reach the field of artificial intelligence
				and blockchain, trying to imagine the virtual social activity of nearly future.
			</p>
		</section>
		<section class="section">
			<Timeline />
		</section>
	</div>
</template>
<script>
import Timeline from '../components/Timeline';
export default {
	components: {
		Timeline,
	},
	data() {
		return {
			inMove: false,
			activeSection: 0,
			offsets: [],
			touchStartY: 0
		}
	},
	mounted() {
		console.log('mounted');
		this.$store.commit('setDocReady', true);
		this.calculateSectionOffsets();

		window.addEventListener('DOMMouseScroll', this.handleMouseWheelDOM); // Mozilla Firefox
		window.addEventListener('mousewheel', this.handleMouseWheel, { passive: false }); // Other browsers

		window.addEventListener('touchstart', this.touchStart, { passive: false }); // mobile devices
		window.addEventListener('touchmove', this.touchMove, { passive: false }); // mobile devices
	},
	destroyed() {
		window.removeEventListener('mousewheel', this.handleMouseWheel, { passive: false }); // Other browsers
		window.removeEventListener('DOMMouseScroll', this.handleMouseWheelDOM); // Mozilla Firefox

		window.removeEventListener('touchstart', this.touchStart); // mobile devices
		window.removeEventListener('touchmove', this.touchMove); // mobile devices
	},
	methods: {
		calculateSectionOffsets() {
			let sections = document.getElementsByTagName('section');
			let length = sections.length;

			for (let i = 0; i < length; i++) {
				let sectionOffset = sections[i].offsetTop;
				this.offsets.push(sectionOffset);
			}
		},
		handleMouseWheel: function(e) {
			if (e.wheelDelta < 30 && !this.inMove) {
				this.moveUp();
			} else if (e.wheelDelta > 30 && !this.inMove) {
				this.moveDown();
			}

			e.preventDefault();
			return false;
		},
		handleMouseWheelDOM: function(e) {
			if (e.detail > 0 && !this.inMove) {
				this.moveUp();
			} else if (e.detail < 0 && !this.inMove) {
				this.moveDown();
			}

			return false;
		},
		moveDown() {
			this.inMove = true;
			this.activeSection--;

			if (this.activeSection < 0) this.activeSection = 0;

			this.scrollToSection(this.activeSection, true);
		},
		moveUp() {
			this.inMove = true;
			this.activeSection++;

			if (this.activeSection > this.offsets.length - 1)
				this.activeSection = this.offsets.length - 1;

			this.scrollToSection(this.activeSection, true);
		},
		scrollToSection(id, force = false) {
			if (this.inMove && !force) return false;

			this.activeSection = id;
			this.inMove = true;

			document.getElementsByTagName('section')[id].scrollIntoView({ behavior: 'smooth' });

			setTimeout(() => {
				this.inMove = false;
			}, 400);
		},
		touchStart(e) {
			e.preventDefault();

			this.touchStartY = e.touches[0].clientY;
		},
		touchMove(e) {
			if (this.inMove) return false;
			e.preventDefault();

			const currentY = e.touches[0].clientY;

			if (this.touchStartY < currentY) {
				this.moveDown();
			} else {
				this.moveUp();
			}

			this.touchStartY = 0;
			return false;
		}
	}
};
</script>
<style lang="scss" scoped>
#about-page {
	font-size: 14px;
	display: block;
	text-align: justify;
	margin: 0 auto;
	margin-top: 80px;
	line-height: 1.5em;
	height: 100vh;
	width: 100%;
	.section {
		width: 50%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: auto;
		&.home {
			// font-family: 'Josefin Sans', sans-serif;
			width: 100%;
			height: 70vh;
			align-items: center;
			align-content: center;
			justify-content: center;
			display: flex;
			.home-content {
				width: 100%;
				h1 {
					text-align: center;
					width: 100%;
					-webkit-animation-name: fade-in; /* Safari 4.0 - 8.0 */
					-webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
					animation-name: fade-in;
					animation-duration: 4s;
				}
				hr {
					border: solid black 3px;
					width: 90%;
					-webkit-animation-name: swipe-in; /* Safari 4.0 - 8.0 */
					-webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
					animation-name: swipe-in;
					animation-duration: 4s;
				}
			}
		}
	}
}
.sections-menu {
	position: fixed;
	right: 1rem;
	top: 50%;
	transform: translateY(-50%);
	.menu-point {
		width: 10px;
		height: 10px;
		background-color: #fff;
		display: block;
		margin: 1rem 0;
		opacity: 0.6;
		transition: 0.4s ease all;
		cursor: pointer;
		.active {
			opacity: 1;
			transform: scale(1.5);
		}
	}
}
@media only screen and (max-width: 600px) {
	#about-page {
		width: 90%;
		padding: 0;
	}
}
/* Safari 4.0 - 8.0 */
@-webkit-keyframes swipe-in {
	from {
		width: 0;
		opacity: 0;
	}
	to {
		width: 90%;
		opacity: 1;
	}
}

/* Standard syntax */
@keyframes swipe-in {
	from {
		width: 0;
		opacity: 0;
	}
	to {
		width: 90%;
		opacity: 1;
	}
}

/* Safari 4.0 - 8.0 */
@-webkit-keyframes fade-in {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

/* Standard syntax */
@keyframes fade-in {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
