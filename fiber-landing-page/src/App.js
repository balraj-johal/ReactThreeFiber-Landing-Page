import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import "./App.css";

export default function App() {
    return (
        <Canvas>
            <Box />
        </Canvas>
    );
}

function Box(props) {
    const box = useRef();

    useFrame(() => {
        box.current.rotation.z += 0.01;
    })

    return(
        <mesh position={[0,0,0]} ref={box} >
            <boxGeometry />
            <meshBasicMaterial color={"hotpink"} />
        </mesh>
    )
}