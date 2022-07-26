import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import { useSpring } from 'framer-motion';

// utils
import { getRandomXPos } from "../utils/threejs-utils";

import BalloonMesh from "./BalloonMesh";

const FLOAT_SPEED = 0.015;
function FloatingBalloon(props) {
    const balloon = useRef();
    const [opacity, setOpacity] = useState(0);

    // initialise and persist animation data over rerenders
    const animData = useRef();
    if (!animData.current) {
        animData.current = {
            rotationSpeed: 0.05 + (Math.random() / 2),
            clockwise: Math.random() > 0.5 ? true : false,
            rotationZ: Math.random() * 0.25,
        }
    }

    const { viewport, camera } = useThree();
    const { width, height } = 
        viewport.getCurrentViewport(camera, [0 , 0, props.z]);

    useEffect(() => {
        updateBalloonPosition(height, animData.current?.rotationZ, props.z, width);
    }, [height, animData.current?.rotationZ, props.z, width])

    useFrame((state, delta) => {
        const current = balloon.current;
        // animate balloon rotation
        if (animData.current?.clockwise) {
            current.rotation.y -= delta * animData.current?.rotationSpeed;
        } else {
            current.rotation.y += delta * animData.current?.rotationSpeed;
        }
        // loop vertically
        current.position.y += FLOAT_SPEED;
        if (current.position.y > height / 1.2) {
            // set to bottom
            current.position.y = -height / 1.2;
            current.position.x = getRandomXPos(width);
        }
    })

    let updateBalloonPosition = (height, zRotation, zPosition, width) => {
        if (!balloon.current) return setTimeout(() => {
            updateBalloonPosition(height, zRotation, zPosition, width);
        }, 10);
        // randomise coords
        balloon.current.position.y = (Math.random() * height) - height / 2;
        balloon.current.position.x = getRandomXPos(width);
        // randomise initial rotation
        balloon.current.rotation.y = Math.random() * 2 * Math.PI;
        balloon.current.position.z = zPosition;
        // rotate to face camera
        balloon.current.rotation.x = Math.PI / 2;
        // initialise z axis rotation
        balloon.current.rotation.z = zRotation;
    }

    // fade opacity of balloons in
    const spring = useSpring(0);
    useEffect(() => {
        setTimeout(() => {
            spring.set(1);
        }, 100)
        spring.onChange(latest => {
            setOpacity(latest);
        })
    }, [])

    return(
        <Suspense fallback={null}>
            <BalloonMesh 
                ref={balloon} 
                colour={props.color} 
                scale={props.scale} 
                opacity={opacity} 
            />
        </Suspense>
    )
}

export default FloatingBalloon;
