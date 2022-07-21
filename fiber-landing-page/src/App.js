import React, { useRef, useState } from "react";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

import "./App.css";

export default function App() {
    return (
        <Canvas>
            <Box />
        </Canvas>
    );
}


const INIT_HUE = 200;
const END_HUE = 250;

function Box(props) {
    const box = useRef();
    const [hue, setHue] = useState(100);
    const [clicked, setClicked] = useState(false);

    useFrame((state) => {
        const curr = box.current;
        curr.position.z = THREE.MathUtils.lerp(
            curr.position.z, clicked ? 1 : 0, 0.125
        )
        const rotator = Math.sin(state.clock.elapsedTime) * Math.PI;
        curr.rotation.x = rotator;
        curr.rotation.z = state.clock.elapsedTime;

        const newHue = THREE.MathUtils.lerp(
            hue, clicked ? END_HUE : INIT_HUE, 0.125
        )
        setHue(newHue);
        console.log(hue);
    })

    return(
        <mesh position={[0,0,0]} ref={box} onClick={() => { setClicked(!clicked) }}>
            <boxGeometry />
            <meshBasicMaterial color={`hsl(${hue}, 100%, 50%)`} />
        </mesh>
    )
}