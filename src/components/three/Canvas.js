/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  isValidElement,
  cloneElement,
  useRef,
  useEffect,
  useContext,
} from 'react';
import * as THREE from 'three';

import { Context } from '../../contexts';

const Canvas = ({ children }) => {
  const canvaRef = useRef(null);
  const camera = useRef(null);
  const renderer = useRef(
    new THREE.WebGLRenderer({ antialias: true, alpha: true })
  ).current;
  const scene = useRef(new THREE.Scene()).current;
  const clock = useRef(new THREE.Clock()).current;

  var manager = new THREE.LoadingManager();
  const childrenComp = [];
  const canvasAnimation = useRef([]);
  const { setLoaded, startLoading } = useContext(Context);

  useEffect(() => {
    startLoading();

    const width = canvaRef.current.clientWidth;
    const height = canvaRef.current.clientHeight;
    renderer.setSize(width, height);
    canvaRef.current.appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff, 0);

    let animateID;
    const animate = () => {
      const delta = clock.getDelta();
      canvasAnimation.current.map((callback) => callback(delta));

      renderer.setClearColor(0xffffff, 0);
      if (camera.current) renderer.render(scene, camera.current);
      animateID = requestAnimationFrame(() => {
        animate();
      });
    };
    manager.onLoad = function () {
      setLoaded();
      animate();
      onWindowResize();
    };
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', moveMouse, false);
    window.addEventListener('touchmove', touchMove, false);
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('touchmove', touchMove);
      cancelAnimationFrame(animateID);
    };
  }, []);

  let key = 0;
  if (Array.isArray(children)) {
    for (let child of children) {
      if (isValidElement(child)) {
        childrenComp.push(
          cloneElement(child, {
            key,
            scene,
            canvasAnimation: canvasAnimation.current,
            camera,
            renderer,
            manager,
          })
        );
      }
      key++;
    }
  } else {
    if (isValidElement(children)) {
      childrenComp.push(
        cloneElement(children, {
          key,
          scene,
          canvasAnimation: canvasAnimation.current,
          camera,
          renderer,
        })
      );
    }
    key++;
  }

  const moveMouse = (event) => {
    let canvasWidth = window.innerWidth;
    let halfWidth = canvasWidth / 2;
    let offsetX = canvaRef.current.offsetLeft;

    // Main vars
    let mouseX = event.clientX - offsetX;
    let maxDegree = (20 * Math.PI) / 180;

    let rotationZ = 0;
    if (mouseX < halfWidth) {
      rotationZ = -1 * (halfWidth - mouseX) * (maxDegree / halfWidth);
    } else {
      rotationZ = (mouseX - halfWidth) * (maxDegree / halfWidth);
    }

    scene.children.map((obj, index) => {
      // obj.rotation.x = rotationX;
      return (obj.rotation.y = (-rotationZ * 2) / index);
    });
  };
  const touchMove = (event) => {
    let canvasWidth = window.innerWidth;
    let halfWidth = canvasWidth / 2;
    let offsetX = canvaRef.current.offsetLeft;

    // Main vars
    let mouseX = event.touches[0].clientX - offsetX;
    let maxDegree = (20 * Math.PI) / 180;

    let rotationZ = 0;
    if (mouseX < halfWidth) {
      rotationZ = -1 * (halfWidth - mouseX) * (maxDegree / halfWidth);
    } else {
      rotationZ = (mouseX - halfWidth) * (maxDegree / halfWidth);
    }

    scene.children.map((obj, index) => {
      // obj.rotation.x = rotationX;
      return (obj.rotation.y = (-rotationZ * 2) / index);
    });
  };

  const onWindowResize = () => {
    camera.current.aspect = window.innerWidth / window.innerHeight;
    camera.current.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return [
    ...childrenComp,
    <div ref={canvaRef} key={-1} style={{ width: '100vw', height: '100vh' }} />,
  ];
};

export default Canvas;
