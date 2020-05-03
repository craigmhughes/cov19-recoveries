import React, { useState, useEffect, useMemo } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

const Heart = ({url, color})=>{

    const [model, setModel] = useState();
    const newMaterial = new THREE.MeshPhongMaterial({color: color});
       
    useMemo(() => new OBJLoader().load(url, (obj)=>{
        obj.traverse((child)=>{
            if (child.isMesh) child.material = newMaterial;
            if ( child instanceof THREE.Mesh ) { child.castShadow = true; }
        });

        setModel(obj);
    }), [url]);

    return model ? <primitive object={model} /> : null;
}

export default Heart;