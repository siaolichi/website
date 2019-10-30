<template>
	<div>
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
			assetsPath: process.env.NODE_ENV === 'production' ? 'https://s3.eu-central-1.amazonaws.com/hsiao-li-chi.com/static' : '../static',
			clock: undefined,
			anims: ['Walking'],
			animations: {}
		};
	},
	mounted() {
		document.documentElement.style.setProperty('--vh', `100%`);

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

			let light = new THREE.HemisphereLight(0x8de0cd, 0xa3a3ff);
			light.position.set(0, 200, 0);
			this.scene.add(light);

			light = new THREE.AmbientLight(0x606060);
			// light.position.set(0, 500, 500);
			// light.castShadow = false;
			// light.shadow.camera.top = 180;
			// light.shadow.camera.bottom = -100;
			// light.shadow.camera.left = -120;
			// light.shadow.camera.right = 120;
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
				`${this.assetsPath}/model/Waving.fbx`,
				function(object) {
					object.mixer = new THREE.AnimationMixer(object);
					game.player.mixer = object.mixer;
					game.player.root = object.mixer.getRoot();

					object.name = 'body';
					object.scale.multiplyScalar(230);
					object.position.set(0, -1000, 0);
					object.rotation.set(-0.2, 0.5, 0);
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
					game.$store.commit('setDocReady', true);
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
	height: 100%;
	z-index: -1;
}
</style>
