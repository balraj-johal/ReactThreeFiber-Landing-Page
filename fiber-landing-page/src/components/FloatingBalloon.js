import React, { Suspense, useEffect, useRef } from 'react';
import { useFrame, useThree } from "@react-three/fiber";

// utils
import { getRandomXPos } from "../utils/threejs-utils";

import BalloonSmoothedMesh from "./BalloonSmoothedMesh";

const FLOAT_SPEED = 0.015;
function FloatingBalloon(props) {
    const balloon = useRef();
    const { viewport, camera } = useThree();
    const { width, height } = viewport.getCurrentViewport(camera, [0 , 0, props.z]);

    const animData = {
        rotationSpeed: 0.05 + (Math.random() / 2),
        clockwise: Math.random() > 0.5 ? true : false,
        rotationZ: Math.random() * 0.25,
    }

    useEffect(() => {
        if (!balloon.current) return;
        // randomise coords
        balloon.current.position.y = (Math.random() * height) - height / 2;
        balloon.current.position.x = getRandomXPos(width);
        // randomise initial rotation
        balloon.current.rotation.y = Math.random() * 2 * Math.PI;
        balloon.current.position.z = props.z;
        // rotate to face camera
        balloon.current.rotation.x = Math.PI / 2;
        balloon.current.rotation.z = animData.rotationZ;
    }, [height])

    useFrame((state, delta) => {
        const current = balloon.current;
        // animate balloon rotation
        if (animData.clockwise) {
            current.rotation.y -= delta * animData.rotationSpeed;
        } else {
            current.rotation.y += delta * animData.rotationSpeed;
        }
        // loop vertically
        current.position.y += FLOAT_SPEED;
        if (current.position.y > height / 1.2) {
            // set to bottom
            current.position.y = -height / 1.2;
            current.position.x = getRandomXPos(width);
        }
    })

    return(
        <Suspense fallback={null}>
            <BalloonSmoothedMesh ref={balloon} colour={props.color} scale={props.scale} />
        </Suspense>
    )
}

export default FloatingBalloon;
