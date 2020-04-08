<template>
	<div>
		<div id="three-container"></div>
	</div>
</template>

<script>
import '@/assets/libs/Detector';
const THREE = require('three');
import gsap from 'gsap';
import GeometryUtils from '../assets/libs/GeometryUtils';

export default {
	name: 'Three',
	props: {},
	data() {
		return {
			container: undefined,
			canvasWidth: undefined,
			canvasHeight: undefined,
			stats: undefined,
			controls: undefined,
			camera: undefined,
			scene: undefined,
			renderer: undefined,
			clock: undefined,
			cube: undefined,
			particleSystem: undefined,
			particleGeometry: undefined,
			particleCount: 2000
		};
	},
	async mounted() {
		this.container = document.getElementById('three-container');
		this.canvasWidth = this.container.offsetWidth;
		this.canvasHeight = this.container.offsetHeight;
		await this.init();
		document.addEventListener('mousemove', this.moveMouse, false);
		window.addEventListener('resize', this.onWindowResize, false);
	},
	destroyed() {
		window.removeEventListener('resize', this.onWindowResize);
		document.removeEventListener('mousemove', this.moveMouse);
	},
	methods: {
		async init() {
			this.clock = new THREE.Clock();
			this.camera = new THREE.PerspectiveCamera(
				45,
				this.canvasWidth / this.canvasHeight,
				0.1,
				1000
			);
			this.camera.position.set(0, 0, 500);
			this.scene = new THREE.Scene();

			//Geometry example
			this.particleGeometry = new THREE.BoxGeometry(200, 200, 200, 15, 15, 15);
			let material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
			this.cube = new THREE.Mesh(this.particleGeometry, material);
			// this.scene.add(this.cube);

			//Create particleSystem
			material = new THREE.ParticleBasicMaterial({
				color: 0x000000,
				size: 2
			});
			// this.particleMorphTo(particles);
			this.particleSystem = new THREE.ParticleSystem(this.particleGeometry, material);
			this.scene.add(this.particleSystem);
			const vm = this;
			setTimeout(() => {
				let points = GeometryUtils.randomPointsInGeometry(
					vm.particleGeometry,
					vm.particleCount
				);
				let particles = vm.createVerticesFromPoint(points);
				vm.particleMorphTo(particles);
			}, 5000);

			// render
			this.renderer = new THREE.WebGLRenderer({ alpha: true });
			this.renderer.setClearColor(0xffffff, 0);
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(this.canvasWidth, this.canvasHeight);
			this.container.appendChild(this.renderer.domElement);
			this.animate();
		},
		createVerticesShape() {
			// now create the individual particles
			let particles = new THREE.Geometry();
			for (var p = 0; p < this.particleCount; p++) {
				// create a particle with random
				// position values, -250 -> 250
				let pX = Math.random() * 500 - 250;
				let pY = Math.random() * 500 - 250;
				let pZ = Math.random() * 500 - 250;
				let particle = new THREE.Vector3(pX, pY, pZ);

				// add it to the geometry
				particles.vertices.push(particle);
			}
			return particles;
		},
		createVerticesFromPoint(points) {
			let v = new THREE.Geometry();
			for (var p = 0; p < this.particleCount; p++) {
				var vertex = new THREE.Vector3();
				vertex.x = points[p]['x'];
				vertex.y = points[p]['y'];
				vertex.z = points[p]['z'];
				v.vertices.push(vertex);
			}
			return v;
		},
		particleMorphTo(newParticles, color = '0x000000') {
			for (var i = 0; i < this.particleGeometry.vertices.length; i++) {
				gsap.to(this.particleGeometry.vertices[i], {
					x: newParticles.vertices[i].x,
					y: newParticles.vertices[i].y,
					z: newParticles.vertices[i].z
				});
			}
			this.particleSystem.material.color.setHex(color);
		},
		onWindowResize() {
			this.canvasWidth = this.container.offsetWidth;
			this.canvasHeight = this.container.offsetHeight;
			this.camera.aspect = this.canvasWidth / this.canvasHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(this.canvasWidth, this.canvasHeight);
		},
		// This function will let your mesh object have little rotation when your mouse move
		moveMouse(event) {
			let halfWidth = this.canvasWidth / 2;
			let halfHeight = this.canvasHeight / 2;
			let offsetX = this.container.offsetLeft;
			let offsetY = this.container.offsetTop;

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

			//Put your geometry here in order to have animation
			this.cube.rotation.x = rotationX;
			this.cube.rotation.y = rotationZ;
		},
		update() {
			let delta = this.clock.getDelta();
			this.particleGeometry.verticesNeedUpdate = true;
			this.particleSystem.rotation.x += delta / 5;
			this.particleSystem.rotation.y += delta / 5;
			this.particleSystem.rotation.z += delta / 5;
			//Animations goes here
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
#three-container {
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: -1;
}
</style>
