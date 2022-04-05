/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Mesh } from 'three';

const InfoText = ({ scene, canvasAnimation, manager, initState, title }) => {
	useEffect(() => {
		let text;
		console.log('InfoText init');
		let loader = new FontLoader(manager);
		let typeface = 'https://dl.dropboxusercontent.com/s/bkqic142ik0zjed/swiss_black_cond.json?';
		const material = new THREE.MeshPhongMaterial({ color: 0x000000 });

		const cubeGeometry = new THREE.BoxGeometry(40, 15, 2);
		const cubeMatetial = new THREE.MeshBasicMaterial({ color: 0xffffff });
		const cube = new Mesh(cubeGeometry, cubeMatetial);
		cube.position.y = (2, 5, -1);

		loader.load(typeface, function (font) {
			let xMid;
			var geometry = new TextGeometry(title, {
				font: font,
				size: 10,
				height: 1
			});
			geometry.computeBoundingBox();
			xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
			geometry.translate(xMid, 0, 0);
			// console.log(geometry.vertices);

			// make shape ( N.B. edge view not visible )
			text = new THREE.Mesh(geometry, material);
			if (initState && initState.position) {
				text.position.set(initState.position.x, initState.position.y, initState.position.z);
				cube.position.set(initState.position.x + 1, initState.position.y + 5, initState.position.z - 0.5);
			}
			if (initState && initState.scale) {
				text.scale.multiplyScalar(initState.scale);
				cube.scale.multiplyScalar(initState.scale);
			}
			if (initState && initState.boxScale) {
				cubeGeometry.scale(initState.boxScale.x, initState.boxScale.y, initState.boxScale.z);
			}
			const randomBegin = Math.random() * 5;

			canvasAnimation.push({
				id: text.uuid,
				animation: (delta, currentTime) => {
					cube.position.y = initState.position.y + 5 + Math.sin(currentTime * 2 + randomBegin);
					text.position.y = initState.position.y + Math.sin(currentTime * 2 + randomBegin);
				}
			});
			text.name = title;
			cube.name = title;
			scene.add(text);
			scene.add(cube);
		});

		return () => {
			console.log('Remove text');
			if (canvasAnimation) {
				const index = canvasAnimation.map((e) => e.id).indexOf(text.uuid);
				canvasAnimation.splice(index, 1);
			}
			scene.remove(text);
			scene.remove(cube);
		};
	}, []);
	return <Fragment />;
};

export default InfoText;
