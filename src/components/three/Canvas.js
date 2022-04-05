/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useContext } from 'react';
import * as THREE from 'three';
import { APP } from './three.app.js';

import { Context } from '../../contexts';

const Canvas = ({ children }) => {
	const canvaRef = useRef(null);

	const renderer = useRef(new THREE.WebGLRenderer({ antialias: true, alpha: true })).current;

	const { setLoaded, startLoading } = useContext(Context);
	useEffect(() => {
		startLoading();

		var loader = new THREE.FileLoader();
		loader.load('app.json', function (text) {
			var player = new APP.Player(renderer);
			player.load(JSON.parse(text));
			player.setSize(window.innerWidth, window.innerHeight);
			player.play();

			canvaRef.current.appendChild(renderer.domElement);

			window.addEventListener('resize', function () {
				player.setSize(window.innerWidth, window.innerHeight);
			});

			setLoaded();
		});

		return () => {};
	}, []);
	return (
		<div>
			<div ref={canvaRef} key={-1} style={{ width: '100vw', height: '100vh', position: 'fixed' }} />
		</div>
	);
};

export default Canvas;
