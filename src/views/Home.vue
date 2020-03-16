<template>
	<div id="home">
		<div class='icon-scroll'></div>
		<div class="sections-menu">
			<span
				class="menu-point"
				v-bind:class="{active: activeSection == index}"
				v-on:click="scrollToSection(index)"
				v-for="(offset, index) in offsets"
				v-bind:key="index">
			</span>
		</div>
		<section class="section home-section">
			<TitleAnimation/>
		</section>
		<section class="section">
			<h1>About</h1>
			<p>
				Li-Chi Hsiao is a multidisciplinary artist making sound installations and live
				performances. Using self-made interfaces, her works take on a variety of forms such as
				Audio-Visual, sound, installations and live performances. Since 2011, she collaborated
				with sound artist Iang Tu and Chang Yen-Tzu and began to incorporate visual aspects into
				her work. Her installations create a transfer from body to the visual domain. In 2013,
				she began to create audiovisual live performances. In her work she often is questioning
				the relationship between audience and performer, people and herself. Currently, she is
				attending the program of Art and Media at Berlin University of Art. Her practice focuses
				on creating possibilities to connect the performer with the audience through a live
				performance.
			</p>
		</section>
		<section class="section">
			<h1>Events</h1>
			<Timeline/>
		</section>
		<section class="section contact-section">
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
		</section>
	</div>
</template>
<script>
import Timeline from '../components/Timeline';
import TitleAnimation from '../components/TitleAnimation';
export default {
	name: 'Home',
	components: {
		Timeline,
		TitleAnimation
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
		this.$store.commit('setDocReady', true);
		this.calculateSectionOffsets();
    
		window.addEventListener('DOMMouseScroll', this.handleMouseWheelDOM);  // Mozilla Firefox
		window.addEventListener('mousewheel', this.handleMouseWheel, { passive: false }); // Other browsers
		
		window.addEventListener('touchstart', this.touchStart, { passive: false }); // mobile devices
		window.addEventListener('touchmove', this.touchMove, { passive: false }); // mobile devices
	},
	destroyed() {
		window.removeEventListener('mousewheel', this.handleMouseWheel, { passive: false });  // Other browsers
		window.removeEventListener('DOMMouseScroll', this.handleMouseWheelDOM); // Mozilla Firefox
		
		window.removeEventListener('touchstart', this.touchStart); // mobile devices
		window.removeEventListener('touchmove', this.touchMove); // mobile devices
	},
	methods: {
		calculateSectionOffsets() {
			let sections = document.getElementsByTagName('section');
			let length = sections.length;
			
			for(let i = 0; i < length; i++) {
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
				
			if(this.activeSection < 0) this.activeSection = 0;
				
			this.scrollToSection(this.activeSection, true);
		},
		moveUp() {
			this.inMove = true;
			this.activeSection++;
				
			if(this.activeSection > this.offsets.length - 1) this.activeSection = this.offsets.length - 1;
				
			this.scrollToSection(this.activeSection, true);
		},
		scrollToSection(id, force = false) {
			if(this.inMove && !force) return false;
			
			this.activeSection = id;
			this.inMove = true;
			
			document.getElementsByTagName('section')[id].scrollIntoView({behavior: 'smooth'});
			
			setTimeout(() => {
				this.inMove = false;
			}, 400);
		},
		touchStart(e) {
			e.preventDefault();
			
			this.touchStartY = e.touches[0].clientY;
			},
			touchMove(e) {
			if(this.inMove) return false;
			e.preventDefault();
			
			const currentY = e.touches[0].clientY;
			
			if(this.touchStartY < currentY) {
				this.moveDown();
			} else {
				this.moveUp();
			}
			
			this.touchStartY = 0;
			return false;
		}
	},
};
</script>
<style lang="scss" scoped>
#home {
	font-size: 14px;
	display: block;
	text-align: justify;
	margin: 0 auto;
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
		h1{
			text-align: left;
			width: 100%;
		}
		&.contact-section{
			width: 100%;
			height: 100vh;
			.contact-form {
				width: 300px;
				margin: auto;
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
	}
}

.icon-scroll,
.icon-scroll:before {
	position: absolute;
	left: 50%;
}
.icon-scroll {
	width: 40px;
	height: 70px;
	margin-left: -20px;
	bottom: 170px;
	margin-top: -35px;
	box-shadow: inset 0 0 0 2px #000;
	border-radius: 25px;
	&:before {
		content: '';
		width: 8px;
		height: 8px;
		background: #000;
		margin-left: -4px;
		top: 8px;
		border-radius: 4px;
		animation-duration: 1.5s;
		animation-iteration-count: infinite;
		animation-name: scroll;
	}
}

@keyframes scroll{
	0% {
		opacity: 1;
		}
	100% {
		opacity: 0;
		transform: translateY(46px);
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
		border-radius: 5px;
		border: solid 2px #000;
		display: block;
		margin: 2rem 5px 0 5px;
		opacity: .6;
		transition: .4s ease all;
		cursor: pointer;
		&.active {
			opacity: 1;
			transform: scale(1.5);
		}
	}
}
@media only screen and (max-width: 600px) {
	#home {
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
