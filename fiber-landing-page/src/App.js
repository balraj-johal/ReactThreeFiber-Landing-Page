import React, {  } from "react";

import { Canvas } from "@react-three/fiber";
// import { View } from "@react-three/drei";

// css
import "./styles/App.css";

// components
import Typography from "./components/Typography";
import Lighting from "./components/Lighting";
import PostProcessing from "./components/PostProcessing";
import Menu from "./components/Menu";
import FloatingBalloon from "./components/FloatingBalloon";

export default function App({ count = 20 }) {
    const BALLOONS_ARRAY = new Array(count).fill("");

    return (
        <>
            <MenuCanvas />
            <Typography />
            <BGCanvas balloons={BALLOONS_ARRAY} />
        </>
    );
}

function MenuCanvas() {
    return(
        <Canvas 
            gl={{ alpha: true }} 
            camera={{ near: 0.001, far: 100 }} 
            style={{ position: "absolute", zIndex: 11 }}  
        >
            <Lighting hdri="city" />
            <Menu z={1} scale={0.6} color={0x9C1822} />
        </Canvas>
    )
}

function BGCanvas(props) {
    return(
        <Canvas 
            camera={{ near: 0.001, far: 50 }} 
            style={{ position: "absolute" }} 
        >
            <color attach="background" args={["#FBFDF7"]} />
            <Lighting hdri="apartment" />
            <PostProcessing />
            { props.balloons.map((elem, index) => (
                <FloatingBalloon 
                    key={index} 
                    z={-Math.random() * (index * 2)} 
                    color={0x8CC7FF}
                    scale={1.5}
                />
            )) }
        </Canvas>
    )
}