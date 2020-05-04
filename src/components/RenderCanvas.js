import * as THREE from 'three'
import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'

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


export default function RenderCanvas({rate, nhs}){

    const [pulse, setPulse] = useState(true);

    const props = useSpring({
        scale: !rate ? [0, 0, 0] : pulse ? [0.1, 0.1, 0.1] : [0.12,0.12,0.12],
        rotation: [4.8, 0, 0],
        position: [0,!rate ? -1 : -0.25 ,-2],
        config: {mass:2, tension: rate > 1000000 ? 25 : 50, friction:10, clamp: true}
    });


    useEffect(() => {
        
        let beatInterval = Number(((86400 / rate) * 1000).toString().split(".")[0].substr(0,6));

        if(!isNaN(beatInterval)){
            const interval = setInterval(() => {
                setPulse(!pulse);
            }, rate > 1000000 ? 125 : beatInterval/2);
            return () => clearInterval(interval);
        }
    }, [pulse, rate]);
    

    return(
        <Canvas onCreated={({ gl }) => ((gl.shadowMap.enabled = true), (gl.shadowMap.type = THREE.PCFSoftShadowMap))}
            className="Canvas">
            <Camera/>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.85} position={[20, 5, 10]} angle={0.2} penumbra={1} castShadow />

            <a.mesh
            {...props}>
                <Heart attach="geometry" url="heart.obj" color={nhs ? "blue" : "red"}/>
            </a.mesh>
            
        </Canvas>
    );
}