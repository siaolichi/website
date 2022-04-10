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
			var player = new APP.Player(renderer, canvaRef.current);
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
	return <div ref={canvaRef} key={-1} style={backgorundStyle} />;
};

export default Canvas;

const backgorundStyle = {
	background: 'linear-gradient(360deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
	position: 'fixed',
	top: '0',
	left: '0',
	width: '100vw',
	height: '100vh',
	zIndex: '-2',
	overflowX: 'hidden'
};
