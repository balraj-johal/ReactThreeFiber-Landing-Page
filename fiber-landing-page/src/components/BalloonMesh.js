/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';

let BalloonMesh = React.forwardRef(({ ...props }, ref) => {
    const { nodes } = useGLTF('/StarBalloon-transformed.glb');

    return (
        <group ref={ref} {...props} dispose={null} >
            <mesh 
                geometry={nodes['Balloon_-_smoothed'].geometry} 
                scale={[props.scale, props.scale, props.scale]}
            >
                <meshPhysicalMaterial 
                    color={props.colour} 
                    roughness={0.2}
                    metalness={0.79}
                    reflectivity={0.5}
                    clearcoat={0.57}
                    clearcoatRoughness={0.5}
                    transparent={true}
                    opacity={props.opacity}
                />  
            </mesh>
        </group>
    )
})

export default BalloonMesh;

useGLTF.preload('/StarBalloon-transformed.glb')
