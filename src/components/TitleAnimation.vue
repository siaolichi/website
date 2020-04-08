<template>
	<div>
		<div id="title-container"></div>
	</div>
</template>

<script>
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import '@/assets/libs/Detector';
const THREE = require('three');

export default {
	name: 'TitleAnimation',
	props: {},
	data() {
		return {
			container: undefined,
			stats: undefined,
			controls: undefined,
			camera: undefined,
			scene: undefined,
			renderer: undefined,
			text: undefined,
			textUniforms: undefined,
			clock: undefined
		};
	},
	async mounted() {
		this.container = document.getElementById('title-container');

		await this.init();
		if (this.text == undefined) {
			setTimeout(() => {
				console.log('wait for reload.');
				document.addEventListener('mousemove', this.moveMouse, false);
				window.addEventListener('resize', this.onWindowResize, false);
			}, 3);
		}
	},
	destroyed() {
		window.removeEventListener('resize', this.onWindowResize);
		document.removeEventListener('mousemove', this.moveMouse);
	},
	methods: {
		async init() {
			const vm = this;
			this.clock = new THREE.Clock();
			this.camera = new THREE.PerspectiveCamera(
				45,
				window.innerWidth / window.innerHeight,
				1,
				10000
			);
			this.camera.position.set(0, 0, 900);
			this.scene = new THREE.Scene();

			// var noiseTexture = new THREE.TextureLoader().load( require('../assets/images/shaders/cloud.png') );
			// noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;

			// var waterTexture = new THREE.TextureLoader().load( require('../assets/images/shaders/water.jpg') );
			// waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
			// vm.textUniforms = {
			// 	baseTexture: 	{ type: "t", value: waterTexture },
			// 	baseSpeed: 		{ type: "f", value: 1.15 },
			// 	noiseTexture: 	{ type: "t", value: noiseTexture },
			// 	noiseScale:		{ type: "f", value: 0.2 },
			// 	alpha: 			{ type: "f", value: 0.3 },
			// 	time: 			{ type: "f", value: 1.0 }
			// };
			vm.textUniforms = {
				u_time: { type: 'f', value: 0.0 },
				u_resolution: { type: 'v2', value: new THREE.Vector2() },
				u_mouse: { type: 'v2', value: new THREE.Vector2() },
				u_complex: { type: 'b', value: false }
			};
			const titleShader = new THREE.ShaderMaterial({
				uniforms: vm.textUniforms,
				vertexShader: require('../assets/shaders/titleVert.vs'),
				fragmentShader: require('../assets/shaders/titleFrag.vs')
			});
			titleShader.transparent = true;

			titleShader.side = THREE.DoubleSide;

			// var flatGeometry = new THREE.PlaneGeometry( 100, 100 );
			// var surface = new THREE.Mesh( flatGeometry, titleShader );
			// // surface.position.set(-60,50,150);
			// vm.scene.add( surface );

			//Text
			let loader = new THREE.FontLoader();
			let typeface =
				'https://dl.dropboxusercontent.com/s/bkqic142ik0zjed/swiss_black_cond.json?';
			await loader.load(typeface, function(font) {
				let xMid;
				let color = 0x00;
				let matLite = new THREE.MeshBasicMaterial({
					color: color,
					transparent: true,
					opacity: 0.4,
					side: THREE.DoubleSide
				});

				let message = 'Hsiao Li Chi';
				let shapes = font.generateShapes(message, 100);
				var geometry = new THREE.TextGeometry(message, {
					font: font,
					size: 80,
					height: 5
				});
				geometry.computeBoundingBox();
				xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
				geometry.translate(xMid, 0, 0);
				// console.log(geometry.vertices);

				// make shape ( N.B. edge view not visible )
				vm.text = new THREE.Mesh(geometry, titleShader);
				vm.text.position.z = 0;
				vm.scene.add(vm.text);
			});

			// render
			this.renderer = new THREE.WebGLRenderer({ alpha: true });
			this.renderer.setClearColor(0xffffff, 0);
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			// this.renderer.shadowMap.enabled = true;
			this.container.appendChild(this.renderer.domElement);
			this.animate();
		},
		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
		},
		moveMouse(event) {
			let canvas = this.container;
			let canvasWidth = canvas.offsetWidth;
			let canvasHeight = canvas.offsetHeight;
			let halfWidth = canvasWidth / 2;
			let halfHeight = canvasHeight / 2;
			let offsetX = canvas.offsetLeft;
			let offsetY = canvas.offsetTop;

			// Main vars
			let mouseX = event.clientX - offsetX;
			let mouseY = event.clientY - offsetY;
			let maxDegree = (20 * Math.PI) / 180;

			let rotationZ = 0;
			if (mouseX < halfWidth) {
				rotationZ = -1 * (halfWidth - mouseX) * (maxDegree / halfWidth);
			} else {
				rotationZ = (mouseX - halfWidth) * (maxDegree / halfWidth);
			}

			let rotationX = 0;
			if (mouseY < halfHeight) {
				rotationX = -1 * (halfHeight - mouseY) * (maxDegree / halfHeight);
			} else {
				rotationX = (mouseY - halfHeight) * (maxDegree / halfHeight);
			}
			this.text.rotation.x = rotationX;
			this.text.rotation.y = rotationZ;
		},
		update() {
			var delta = this.clock.getDelta();
			this.textUniforms.u_time.value += delta;
		},
		animate() {
			const game = this;
			this.renderer.setClearColor(0xffffff, 0);

			this.update();

			requestAnimationFrame(() => {
				game.animate();
			});
			this.renderer.render(this.scene, this.camera);
		}
	}
};
</script>

<style scoped lang="scss">
#container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
}
</style>
