/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const FBXMesh = ({ scene, initState, modelPath, texturePath, canvasAnimation, manager }) => {
	useEffect(() => {
		console.log('mesh init');
		let model;
		const loader = new FBXLoader(manager);
		try {
			loader.load(modelPath, function (object3d) {
				model = object3d;
				const tLoader = new THREE.TextureLoader(manager);

				model.traverse(function (child) {
					if (child.material && child.material.name) {
						tLoader.load(texturePath, (texture) => {
							if (child instanceof THREE.Mesh) {
								// apply texture
								child.material.map = texture;
								child.material.transparent = true;
								child.material.needsUpdate = true;
							}
						});
					}
				});

				if (initState && initState.position)
					model.position.set(
						initState.position.x,
						initState.position.y,
						initState.position.z
					);
				if (initState && initState.scale) model.scale.multiplyScalar(initState.scale);
				scene.add(model);
			});
		} catch (error) {
			console.log(error);
		}

		return () => {
			console.log('Remove FBX Model');
			if (canvasAnimation) {
				const index = canvasAnimation.map((e) => e.id).indexOf(model.uuid);
				canvasAnimation.splice(index, 1);
			}
			scene.remove(model);
		};
	}, []);

	return <Fragment />;
};

export default FBXMesh;
