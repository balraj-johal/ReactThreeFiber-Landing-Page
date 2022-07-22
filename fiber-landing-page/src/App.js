import React, { useRef, useState } from "react";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import "./styles/App.css";
import Typography from "./components/Typography";

export default function App() {
    return (
        <>
            <Typography />
            <Canvas>
                <Box />
            </Canvas>
        </>
    );
}


const INIT_HUE = 200;
const END_HUE = 250;

const FLOAT_SPEED = 0.05;

function Box(props) {
    const box = useRef();
    const [hue, setHue] = useState(100);
    const [clicked, setClicked] = useState(false);

    const { viewport } = useThree();

    useFrame((state) => {
        const curr = box.current;

        // rotate in x & z axes
        curr.position.z = THREE.MathUtils.lerp(
            curr.position.z, clicked ? 1 : 0, 0.125
        )
        const rotator = Math.sin(state.clock.elapsedTime) * Math.PI;
        curr.rotation.x = rotator;
        curr.rotation.z = state.clock.elapsedTime;

        // set colour
        const newHue = THREE.MathUtils.lerp(
            hue, clicked ? END_HUE : INIT_HUE, 0.125
        )
        setHue(newHue);

        //loop vertically
        curr.position.y += FLOAT_SPEED;
        if (curr.position.y > viewport.height / 1.5) {
            // set to bottom
            curr.position.y = -viewport.height / 1.5;
            // randomise coords
            curr.position.x = (Math.random() * viewport.width) - viewport.width / 2;
        }
    })

    return(
        <mesh position={[0,0,0]} ref={box} onClick={() => { setClicked(!clicked) }}>
            <boxGeometry />
            <meshBasicMaterial color={`hsl(${hue}, 100%, 50%)`} />
        </mesh>
    )
}