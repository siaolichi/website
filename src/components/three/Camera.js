/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import * as THREE from 'three';

const Camera = ({ camera, position }) => {
  useEffect(() => {
    const compCamera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      1, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    camera.current = compCamera;
    camera.current.updateProjectionMatrix();
    camera.current.position.set(position.x, position.y, position.z);
  }, []);
  return <div></div>;
};

export default Camera;
