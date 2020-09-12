/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useEffect} from 'react';
import * as THREE from 'three';
const vertexShader = require('./shaders/titleVert.vs').default;
const fragmentShader = require('./shaders/titleFrag.vs').default;
const Title = ({scene, canvasAnimation, manager}) => {
    useEffect(() => {
        let text;
        console.log('text init');
        const titleShader = new THREE.ShaderMaterial({
            uniforms: {
                u_time: {type: 'f', value: 0.0},
                u_resolution: {type: 'v2', value: new THREE.Vector2()},
                u_mouse: {type: 'v2', value: new THREE.Vector2()},
                u_complex: {type: 'b', value: false},
            },
            vertexShader,
            fragmentShader,
        });
        titleShader.transparent = true;

        titleShader.side = THREE.DoubleSide;
        let loader = new THREE.FontLoader(manager);
        let typeface = 'https://dl.dropboxusercontent.com/s/bkqic142ik0zjed/swiss_black_cond.json?';
        loader.load(typeface, function (font) {
            let xMid;

            let message = 'Hsiao Li Chi';
            var geometry = new THREE.TextGeometry(message, {
                font: font,
                size: 30,
                height: 1,
            });
            geometry.computeBoundingBox();
            xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
            geometry.translate(xMid, 0, 0);
            // console.log(geometry.vertices);

            // make shape ( N.B. edge view not visible )
            text = new THREE.Mesh(geometry, titleShader);
            text.position.y = 100;
            canvasAnimation.push({
                id: text.uuid,
                animation: (delta, currentTime) => {
                    text.rotation.y = Math.sin(currentTime) / 2;
                    const shaderUniforms = text.material.uniforms;
                    shaderUniforms.u_time.value += delta;
                },
            });

            scene.add(text);
        });

        return () => {
            console.log('Remove text');
            if (canvasAnimation) {
                const index = canvasAnimation.map((e) => e.id).indexOf(text.uuid);
                canvasAnimation.splice(index, 1);
            }
            scene.remove(text);
        };
    }, []);
    return <Fragment />;
};

export default Title;
