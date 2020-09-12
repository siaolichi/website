/* eslint-disable react-hooks/exhaustive-deps */
import React, {isValidElement, cloneElement, useRef, useEffect, useContext, useState, useCallback} from 'react';
import * as THREE from 'three';
import FBXMesh from './FBXMesh';
import Light from './Light';
import Camera from './Camera';
import Title from './Title';
import OrbitControl from './OrbitControl';

import {Context} from '../../contexts';
import InfoText from './InfoText';
import InfoModal from '../InfoModal';
import useEffectListener from '../../hooks/useEffectListener';

const Canvas = ({children}) => {
    const canvaRef = useRef(null);

    const renderer = useRef(new THREE.WebGLRenderer({antialias: true, alpha: true})).current;
    const scene = useRef(new THREE.Scene()).current;
    const clock = useRef(new THREE.Clock()).current;
    const raycaster = useRef(new THREE.Raycaster()).current;
    const mouseVector = useRef(new THREE.Vector3()).current;
    const camera = useRef(null);
    let canvasAnimation = useRef([]).current;
    const [modal, setModal] = useState(false);
    var manager = new THREE.LoadingManager();
    // const childrenComp = [];

    const {setLoaded, startLoading} = useContext(Context);
    useEffect(() => {
        startLoading();

        const width = canvaRef.current.clientWidth;
        const height = canvaRef.current.clientHeight;
        renderer.setSize(width, height);
        canvaRef.current.appendChild(renderer.domElement);
        renderer.setClearColor(0xffffff, 0);

        let animateID;
        let currentTime = 0;
        const animate = () => {
            const delta = clock.getDelta();
            currentTime += delta;
            canvasAnimation.map((item) => item.animation(delta, currentTime));

            renderer.setClearColor(0xffffff, 0);
            if (camera.current) renderer.render(scene, camera.current);
            animateID = requestAnimationFrame(() => {
                animate();
            });
        };

        manager.onLoad = () => {
            animate();
        };

        manager.onLoad = function () {
            setLoaded();
            animate();
            onWindowResize();
        };

        return () => {
            window.removeEventListener('resize', onWindowResize);
            cancelAnimationFrame(animateID);
        };
    }, []);

    const onMouseMove = useCallback((e) => {
        const width = canvaRef.current.clientWidth;
        const height = canvaRef.current.clientHeight;
        mouseVector.x = 2 * (e.clientX / width) - 1;
        mouseVector.y = 1 - 2 * (e.clientY / height);
        raycaster.setFromCamera(mouseVector, camera.current);
        const intersects = raycaster.intersectObjects(scene.children);
        for (let obj of scene.children.filter((obj) => obj.name === 'about' || obj.name === 'contact'))
            obj.scale.set(1, 1, 1);
        for (let intersect of intersects) {
            const name = intersect.object.name;
            if (name === 'about' || name === 'contact') {
                for (let obj of scene.children.filter((obj) => obj.name === name)) obj.scale.set(1.2, 1.2, 1.2);
            }
        }
    }, []);
    const onTouchMove = (event, modal) => {
        const width = canvaRef.current.clientWidth;
        const height = canvaRef.current.clientHeight;
        console.log(event);
        mouseVector.x = 2 * (event.changedTouches[0].clientX / width) - 1;
        mouseVector.y = 1 - 2 * (event.changedTouches[0].clientY / height);
        console.log(mouseVector);
        raycaster.setFromCamera(mouseVector, camera.current);
        const intersects = raycaster.intersectObjects(scene.children);
        for (let intersect of intersects) {
            const name = intersect.object.name;
            console.log(modal);
            if (!modal) setModal(name);
        }
    };

    const onMouseDown = useCallback((modal) => {
        raycaster.setFromCamera(mouseVector, camera.current);
        const intersects = raycaster.intersectObjects(scene.children);
        for (let intersect of intersects) {
            const name = intersect.object.name;
            console.log(modal);
            if (!modal) setModal(name);
        }
    }, []);

    const config = {
        scene,
        canvasAnimation,
        camera,
        renderer,
        manager,
    };

    const onWindowResize = () => {
        if (camera.current) {
            camera.current.aspect = window.innerWidth / window.innerHeight;
            camera.current.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    };

    useEffectListener('resize', onWindowResize);
    useEffectListener('mousemove', onMouseMove);
    useEffectListener('mousedown', () => onMouseDown(modal));
    useEffectListener('touchend', (e) => onTouchMove(e, modal));
    return (
        <>
            <Title {...config} />
            <InfoText
                {...config}
                title='about'
                initState={{
                    position: {x: 40, y: 55, z: 120},
                }}
            />
            <InfoText
                {...config}
                title='contact'
                initState={{
                    position: {x: -54, y: 55, z: 100},
                    boxScale: {x: 1.3, y: 1, z: 1},
                }}
            />
            <Camera position={{x: 0, y: 100, z: 250}} {...config} />
            <FBXMesh
                modelPath='../models/city/city.fbx'
                texturePath='../models/city/Palette.jpg'
                initState={{
                    position: {x: 0, y: 0, z: 50},
                    scale: 0.1,
                }}
                {...config}
            />
            <Light {...config} />
            <OrbitControl {...config} />
            <div ref={canvaRef} key={-1} style={{width: '100vw', height: '100vh'}} />
            <InfoModal modal={modal} setModal={setModal} />
        </>
    );
};

export default Canvas;
// window.addEventListener('mousemove', moveMouse, false);
// window.addEventListener('touchmove', touchMove, false);

// window.removeEventListener('mousemove', moveMouse);
// window.removeEventListener('touchmove', touchMove);

// if (Array.isArray(children)) {
// 	for (let child of children) {
// 		if (isValidElement(child)) {
// 			childrenComp.push(
// 				cloneElement(child, {
// 					key,
// 					scene,
// 					canvasAnimation: canvasAnimation.current,
// 					camera,
// 					renderer,
// 					manager,
// 				})
// 			);
// 		}
// 		key++;
// 	}
// } else {
// 	if (isValidElement(children)) {
// 		childrenComp.push(
// 			cloneElement(children, {
// 				key,
// 				scene,
// 				canvasAnimation: canvasAnimation.current,
// 				camera,
// 				renderer,
// 			})
// 		);
// 	}
// 	key++;
// }

// const moveMouse = (event) => {
//     let canvasWidth = window.innerWidth;
//     let halfWidth = canvasWidth / 2;
//     let offsetX = canvaRef.current.offsetLeft;

//     // Main vars
//     let mouseX = event.clientX - offsetX;
//     let maxDegree = (20 * Math.PI) / 180;

//     let rotationZ = 0;
//     if (mouseX < halfWidth) {
//         rotationZ = -1 * (halfWidth - mouseX) * (maxDegree / halfWidth);
//     } else {
//         rotationZ = (mouseX - halfWidth) * (maxDegree / halfWidth);
//     }

//     scene.children.map((obj, index) => {
//         // obj.rotation.x = rotationX;
//         return (obj.rotation.y = (-rotationZ * 2) / index);
//     });
// };
// const touchMove = (event) => {
//     let canvasWidth = window.innerWidth;
//     let halfWidth = canvasWidth / 2;
//     let offsetX = canvaRef.current.offsetLeft;

//     // Main vars
//     let mouseX = event.touches[0].clientX - offsetX;
//     let maxDegree = (20 * Math.PI) / 180;

//     let rotationZ = 0;
//     if (mouseX < halfWidth) {
//         rotationZ = -1 * (halfWidth - mouseX) * (maxDegree / halfWidth);
//     } else {
//         rotationZ = (mouseX - halfWidth) * (maxDegree / halfWidth);
//     }

//     scene.children.map((obj, index) => {
//         // obj.rotation.x = rotationX;
//         return (obj.rotation.y = (-rotationZ * 2) / index);
//     });
// };
