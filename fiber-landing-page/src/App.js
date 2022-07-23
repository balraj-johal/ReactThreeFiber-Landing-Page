import React, {  } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { 
    DepthOfField, 
    EffectComposer, 
    Noise, 
    Vignette 
} from "@react-three/postprocessing";

// css
import "./styles/App.css";

// components
import Typography from "./components/Typography";
import Balloon from "./components/Balloon";

export default function App({ count = 20 }) {
    const BALLOONS_ARRAY = new Array(count).fill("");

    return (
        <>
            <Typography />
            {/* set alpha to false for EffectComposer compatibility */}
            <Canvas gl={{ alpha: false }} camera={{ near: 0.001, far: 50 }} >
                {/* removing alpha means we need to add bg color in three
                    not in css */}
                <color attach="background" args={["#FBFDF7"]} />

                {/* LIGHTING */}
                <ambientLight />
                <Environment preset="apartment" />

                {/* POSTPROCESSING */}
                <EffectComposer>
                    <Noise opacity={0.1} />
                    <DepthOfField 
                        target={[0,0,10]}
                        focalLength={0.025} 
                        bokehScale={8} 
                        height={700} 
                    />
                    <Vignette eskil={false} offset={0.1} darkness={0.25} />
                </EffectComposer>

                {/* BALLOONS */}
                { BALLOONS_ARRAY.map((elem, index) => (
                    <Balloon key={index} z={-Math.random() * (index * 2)} />
                )) }
            </Canvas>
        </>
    );
}
