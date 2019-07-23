<template>
	<div>
		<h1>HSIAO LI CHI</h1>
		<div id="container"></div>
	</div>
</template>

<script>
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import '@/assets/libs/Detector';
// import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';

const FBXLoader = require('three-fbxloader-offical');

const THREE = require('three');

const OrbitControls = require('three-orbit-controls')(THREE);

export default {
	name: 'HelloWorld',
	props: {},
	data() {
		return {
			container: undefined,
			player: {},
			stats: undefined,
			controls: undefined,
			camera: undefined,
			scene: undefined,
			renderer: undefined,
			assetsPath: process.env.NODE_ENV === 'production' ? '/static' : '../static',
			clock: undefined,
			anims: ['Walking'],
			animations: {}
		};
	},
	mounted() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// require("@/assets/libs/inflate.min.js");
		this.container = document.getElementById('container');
		this.clock = new THREE.Clock();
		this.init();
	},
	methods: {
		init() {
			this.camera = new THREE.PerspectiveCamera(
				45,
				window.innerWidth / window.innerHeight,
				1,
				4000
			);
			this.camera.position.set(200, 800, 1600);
			this.scene = new THREE.Scene();
			// this.scene.background = new THREE.Color(0xa0a0a0);
			// this.scene.fog = new THREE.Fog(0xa0a0a0, 700, 3000);

			let light = new THREE.HemisphereLight(0xffffff, 0x444444);
			light.position.set(0, 200, 0);
			this.scene.add(light);

			light = new THREE.DirectionalLight(0xffffff);
			light.position.set(0, 200, 100);
			light.castShadow = true;
			light.shadow.camera.top = 180;
			light.shadow.camera.bottom = -100;
			light.shadow.camera.left = -120;
			light.shadow.camera.right = 120;
			this.scene.add(light);

			// ground
			// const mesh = new THREE.Mesh(
			// 	new THREE.PlaneBufferGeometry(4000, 4000),
			// 	new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
			// );
			// mesh.rotation.x = -Math.PI / 2;
			// mesh.receiveShadow = true;
			// this.scene.add(mesh);
			// const grid = new THREE.GridHelper(2000, 40, 0x000000, 0x000000);
			// grid.material.opacity = 0.2;
			// grid.material.transparent = true;
			// this.scene.add(grid);

			// model
			const loader = new FBXLoader();
			const game = this;

			loader.load(
				`${this.assetsPath}/model/baby/baby-dance.fbx`,
				function(object) {
					object.mixer = new THREE.AnimationMixer(object);
					game.player.mixer = object.mixer;
					game.player.root = object.mixer.getRoot();

					object.name = 'FireFighter';

					object.traverse(function(child) {
						if (child.isMesh) {
							child.material.map = null;
							child.castShadow = true;
							child.receiveShadow = false;
						}
					});

					game.scene.add(object);
					game.player.object = object;
					game.player.mixer.clipAction(object.animations[0]).play();

					game.animate();
				},
				() => {},
				error => {
					console.log(error);
				}
			);

			// render
			this.renderer = new THREE.WebGLRenderer({ alpha: true });
			this.renderer.setClearColor(0xffffff, 0);
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			// this.renderer.shadowMap.enabled = true;
			this.container.appendChild(this.renderer.domElement);
			// game.animate();
			// controller
			this.controls = new OrbitControls(this.camera, this.renderer.domElement);
			this.controls.target.set(0, 150, 0);
			this.controls.update();

			// On window Resize
			window.addEventListener(
				'resize',
				() => {
					game.onWindowResize();
				},
				false
			);
		},
		loadNextAnim(obj, loader, anim) {
			const game = this;
			loader.load(
				`/static/model/animation/${anim}.fbx`,
				object => {
					console.log(object.animations[0]);
					game.animations.Idle = object.animations[0];
					game.action = 'Idle';
					game.player.mixer.clipAction(obj.animations[0]).play();
				},
				() => {},
				err => {
					console.log(err);
				}
			);
		},
		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
		},
		animate() {
			const game = this;
			const dt = this.clock.getDelta();
			this.renderer.setClearColor(0xffffff, 0);
			requestAnimationFrame(() => {
				game.animate();
			});

			if (this.player.mixer !== undefined) this.player.mixer.update(dt);

			this.renderer.render(this.scene, this.camera);
		}
	}
};
</script>

<style scoped lang="scss">
#container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 98vh;
	height: calc(var(--vh, 1vh) * 100);
}
</style>
