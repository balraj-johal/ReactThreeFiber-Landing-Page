/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, {  } from 'react'
import { useGLTF } from '@react-three/drei'

let BalloonSmoothedMesh = React.forwardRef(({ ...props }, ref) => {
  const { nodes, materials } = useGLTF('/StarBalloon-transformed.glb')

  return (
    <group ref={ref} {...props} dispose={null} >
      <mesh 
        geometry={nodes['Balloon_-_smoothed'].geometry} 
        scale={[2, 2, 2]}
        // material={materials['Balloon.003']} 
      >
        <meshPhysicalMaterial 
          color={0x8CC7FF} 
          roughness={0.2}
          metalness={0.79}
          reflectivity={0.5}
          clearcoat={0.57}
          clearcoatRoughness={0.5}
        />  
      </mesh>
    </group>
  )
})

export default BalloonSmoothedMesh;

useGLTF.preload('/StarBalloon-transformed.glb')