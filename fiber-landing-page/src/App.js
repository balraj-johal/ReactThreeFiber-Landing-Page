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
import MenuBalloon from "./components/MenuBalloon";
import FloatingBalloon from "./components/FloatingBalloon";

export default function App({ count = 20 }) {
    const BALLOONS_ARRAY = new Array(count).fill("");

    return (
        <>
            <Typography />
            <MenuCanvas />
            <Canvas 
                gl={{ alpha: false }} 
                camera={{ near: 0.001, far: 50 }} 
                style={{ position: "absolute" }} 
            >
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
                    <FloatingBalloon 
                        key={index} 
                        z={-Math.random() * (index * 2)} 
                        color={0x8CC7FF}
                        scale={1.5}
                    />
                )) }
            </Canvas>
        </>
    );
}

function MenuCanvas(props) {
    return(
        <Canvas 
            gl={{ alpha: true }} 
            camera={{ near: 0.001, far: 50 }} 
            style={{
                position: "absolute",
                zIndex: 1,
            }}  
        >
            <ambientLight />
            <Environment preset="sunset" />
            <MenuBalloon 
                z={1} 
                scale={0.6}
                colour={0x9C1822} 
            />
        </Canvas>
    )
}