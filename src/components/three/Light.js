/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import * as THREE from 'three';
const Light = ({ scene }) => {
  useEffect(() => {
    //Setup Light
    let light = new THREE.HemisphereLight(0xffffff, 0xa3a3ff);
    light.position.set(0, 200, 0);
    scene.add(light);
    return () => {
      scene.remove(light);
    };
  }, []);
  return <Fragment />;
};

export default Light;
