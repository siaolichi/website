<template>
	<div id="app">
		<div v-if="docReady === false" class="loading-modal">
			<div>
				<svg 
					width="200px"  
					height="200px"  
					viewBox="0 0 100 100" 
					preserveAspectRatio="xMidYMid" 
					class="lds-squiggle" 
					style="background: none;"
				>
					<defs>
					<filter
						id="lds-squiggle-filterid-f8a7cca4d2818"
					>
						<feTurbulence 
							baseFrequency="0.03" 
							numOctaves="3" 
							seed="0" 
							result="turb"
						>
							<animate 
								attributeName="seed" 
								calcMode="discrete" 
								values="0;1;2;3;4;5;6;7;8;9;0" 
								keyTimes="0;0.1;0.2;0.3;0.4;0.5;0.6;0.7;0.8;0.9;1" 
								dur="1s" 
								repeatCount="indefinite"
							></animate>
						</feTurbulence>
						<feDisplacementMap 
							in="SourceGraphic" 
							in2="turb" 
							scale="5"
						></feDisplacementMap>
					</filter>
					</defs>
					<text 
						x="50" 
						y="50" 
						dy="0.38em" 
						text-anchor="middle" 
						ng-attr-fill="#51cacc" 
						ng-attr-font-family="Arial" 
						ng-attr-font-size="20" 
						filter="url(#lds-squiggle-filterid-f8a7cca4d2818)" 
						fill="#1d3f72" 
						font-family="Arial" 
						font-size="20"
					>Loading</text>
				</svg>
			</div>
		</div>
		<NavBar />
		<TopNav />
		<MainView />
	</div>
</template>

<script>
import NavBar from './components/NavBar';
import MainView from './views/MainView';
import TopNav from './components/TopNav';
import { mapState } from 'vuex';
export default {
	components: {
		NavBar,
		MainView,
		TopNav
	},
	data() {
		return {
			openMenu: false
		};
	},
	computed: {
		...mapState(['docReady'])
	},
	mounted() {
	}
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
* {
	box-sizing: border-box;
}

html, body{  
	height: 100%;  
	padding: 0;  
	margin: 0;  
}  
#app {
	position: relative;
	margin: 0;
	padding: 0;
	top: 0;
	left: 0;
	font-family: 'Roboto', sans-serif;
	width: 100%;
	.loading-modal{
		display: flex;
		position: fixed;
		width: 100%;
		height: 100vh;
		background: rgba($color: #fff, $alpha: 0.8);
		justify-content: center;
		align-items: center;
		z-index: 10;
	}
	#fountainTextG{
		width:234px;
		margin:auto;
	}

	.fountainTextG{
		color:rgb(0,0,0);
		font-family:Arial;
		font-size:24px;
		text-decoration:none;
		font-weight:normal;
		font-style:normal;
		float:left;
		animation-name:bounce_fountainTextG;
			-o-animation-name:bounce_fountainTextG;
			-ms-animation-name:bounce_fountainTextG;
			-webkit-animation-name:bounce_fountainTextG;
			-moz-animation-name:bounce_fountainTextG;
		animation-duration:2.09s;
			-o-animation-duration:2.09s;
			-ms-animation-duration:2.09s;
			-webkit-animation-duration:2.09s;
			-moz-animation-duration:2.09s;
		animation-iteration-count:infinite;
			-o-animation-iteration-count:infinite;
			-ms-animation-iteration-count:infinite;
			-webkit-animation-iteration-count:infinite;
			-moz-animation-iteration-count:infinite;
		animation-direction:normal;
			-o-animation-direction:normal;
			-ms-animation-direction:normal;
			-webkit-animation-direction:normal;
			-moz-animation-direction:normal;
		transform:scale(.5);
			-o-transform:scale(.5);
			-ms-transform:scale(.5);
			-webkit-transform:scale(.5);
			-moz-transform:scale(.5);
	}#fountainTextG_1{
		animation-delay:0.75s;
			-o-animation-delay:0.75s;
			-ms-animation-delay:0.75s;
			-webkit-animation-delay:0.75s;
			-moz-animation-delay:0.75s;
	}
	#fountainTextG_2{
		animation-delay:0.9s;
			-o-animation-delay:0.9s;
			-ms-animation-delay:0.9s;
			-webkit-animation-delay:0.9s;
			-moz-animation-delay:0.9s;
	}
	#fountainTextG_3{
		animation-delay:1.05s;
			-o-animation-delay:1.05s;
			-ms-animation-delay:1.05s;
			-webkit-animation-delay:1.05s;
			-moz-animation-delay:1.05s;
	}
	#fountainTextG_4{
		animation-delay:1.2s;
			-o-animation-delay:1.2s;
			-ms-animation-delay:1.2s;
			-webkit-animation-delay:1.2s;
			-moz-animation-delay:1.2s;
	}
	#fountainTextG_5{
		animation-delay:1.35s;
			-o-animation-delay:1.35s;
			-ms-animation-delay:1.35s;
			-webkit-animation-delay:1.35s;
			-moz-animation-delay:1.35s;
	}
	#fountainTextG_6{
		animation-delay:1.5s;
			-o-animation-delay:1.5s;
			-ms-animation-delay:1.5s;
			-webkit-animation-delay:1.5s;
			-moz-animation-delay:1.5s;
	}
	#fountainTextG_7{
		animation-delay:1.64s;
			-o-animation-delay:1.64s;
			-ms-animation-delay:1.64s;
			-webkit-animation-delay:1.64s;
			-moz-animation-delay:1.64s;
	}




	@keyframes bounce_fountainTextG{
		0%{
			transform:scale(1);
			color:rgb(0,0,0);
		}

		100%{
			transform:scale(.5);
			color:rgb(255,255,255);
		}
	}

	@-o-keyframes bounce_fountainTextG{
		0%{
			-o-transform:scale(1);
			color:rgb(0,0,0);
		}

		100%{
			-o-transform:scale(.5);
			color:rgb(255,255,255);
		}
	}

	@-ms-keyframes bounce_fountainTextG{
		0%{
			-ms-transform:scale(1);
			color:rgb(0,0,0);
		}

		100%{
			-ms-transform:scale(.5);
			color:rgb(255,255,255);
		}
	}

	@-webkit-keyframes bounce_fountainTextG{
		0%{
			-webkit-transform:scale(1);
			color:rgb(0,0,0);
		}

		100%{
			-webkit-transform:scale(.5);
			color:rgb(255,255,255);
		}
	}

	@-moz-keyframes bounce_fountainTextG{
		0%{
			-moz-transform:scale(1);
			color:rgb(0,0,0);
		}

		100%{
			-moz-transform:scale(.5);
			color:rgb(255,255,255);
		}
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
