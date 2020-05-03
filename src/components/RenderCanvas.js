import * as THREE from 'three'
import React, { useState } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { useSpring, animated } from 'react-spring/three'

import Heart from './heart.js';

/**
 * Camera, placed looking at center.
 */
const Camera = () => {
    const three = useThree();
    const camera = three.camera;
    camera.position.z = 2.5;
    camera.position.y = 0;
    three.gl.setSize(window.innerWidth,window.innerHeight);

    return null;
};


export default function RenderCanvas(){

    const [props, set] = useSpring(() => ({
        scale: [0.1, 0.1, 0.1],
        rotation: [4.75, 0, 0],
        position: [0,-1,-2]
    }));
    

    return(
        <Canvas onCreated={({ gl }) => ((gl.shadowMap.enabled = true), (gl.shadowMap.type = THREE.PCFSoftShadowMap))}
            className="Canvas">
            <Camera/>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.85} position={[20, 5, 10]} angle={0.2} penumbra={1} castShadow />

            <animated.mesh {...props}>
                <Heart url="heart.obj" color="#ff6861"/>
            </animated.mesh>
            
        </Canvas>
    );
}