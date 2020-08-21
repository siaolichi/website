import React, { useEffect, Fragment } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const OrbitControl = ({ camera, renderer, canvasAnimation }) => {
  useEffect(() => {
    if (camera.current) {
      const controls = new OrbitControls(camera.current, renderer.domElement);
      controls.update();
      canvasAnimation.push(controls.update);
    }
  }, [camera, canvasAnimation, renderer.domElement]);
  return <Fragment />;
};

export default OrbitControl;
