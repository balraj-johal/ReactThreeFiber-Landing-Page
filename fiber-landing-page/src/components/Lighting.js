import React, {  } from "react";
import { Environment } from "@react-three/drei";

export default function Lighting(props) {
    return(
        <>
            <ambientLight />
            <Environment preset={props.hdri} />
        </>
    )
}
