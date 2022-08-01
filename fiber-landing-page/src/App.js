import React, { useState } from "react";

import { Canvas } from "@react-three/fiber";
// import { View } from "@react-three/drei";

// css
import "./styles/App.css";

// components
import Typography from "./components/Typography";
import Lighting from "./components/Lighting";
import PostProcessing from "./components/PostProcessing";
import MenuToggle from "./components/MenuToggle";
import FloatingBalloon from "./components/FloatingBalloon";

export default function App({ count = 20 }) {
    const BALLOONS_ARRAY = new Array(count).fill("");

    return (
        <>
            <Menu />
            <Typography />
            <BackgroundStars balloons={BALLOONS_ARRAY} />
        </>
    );
}

function Menu() {
    const [ready, setReady] = useState(false);

    return(
        <>
            <MenuUI ready={ready} />
            <MenuCanvas setReady={setReady} />
        </>
    )
}
function MenuUI(props) {
    return(
        <div 
            id="menu-ui" 
            style={{ opacity: props.ready ? "1" : "0" }}
        >
            <div id="titles">
                <a href="https://www.balraj.cool">www.balraj.cool</a>
                <h3>made by:</h3>
            </div> 
        </div>
    )
}
function MenuCanvas(props) {
    return(
        <Canvas 
            gl={{ alpha: true }} 
            camera={{ near: 0.001, far: 100 }} 
            style={{ 
                position: "absolute", 
                zIndex: 11, 
                width: "101%", 
                height: "101%" 
            }}  
        >
            <Lighting hdri="city" />
            <MenuToggle 
                z={1} 
                scale={window.innerWidth > 900 ? 0.6 : 0.45} 
                color={0x9C1822} 
                setReady={props.setReady} 
            />
        </Canvas>
    )
}

function BackgroundStars(props) {
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