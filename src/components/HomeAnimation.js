import React from 'react';
import Canvas from './three/Canvas';
import FBXMesh from './three/FBXMesh';
import Light from './three/Light';
import Camera from './three/Camera';
import Title from './three/Title';

const HomeAnimation = () => {
    return (
        <Canvas>
            <Title />
            <Camera position={{x: 0, y: 0, z: 200}} />
            <FBXMesh
                modelPath='../models/city/city.fbx'
                texturePath='../models/GiantWoodRoad/texture'
                initState={{
                    position: {x: -50, y: -120, z: 0},
                    scale: 0.05,
                }}
            />
            <Light />
            {/* <OrbitControl /> */}
        </Canvas>
    );
};

export default HomeAnimation;
