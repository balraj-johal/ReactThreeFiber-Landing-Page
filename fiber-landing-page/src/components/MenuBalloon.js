import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from "@react-three/fiber";

import BalloonSmoothedMeshAnimated from "./BalloonSmoothedMeshAnimated";

function MenuBalloon(props) {
    const balloon = useRef();
    const { viewport, camera } = useThree();

    const [menuOpen, setMenuOpen] = useState(false);

    const { width: initWidth, height: initHeight } = 
        viewport.getCurrentViewport(camera, [0 , 0, props.z]);
    const [viewportData, setViewportData] = useState({
        width: initWidth,
        height: initHeight
    });
    const [balloonData, setBalloonData] = useState({
        initial: {
            x: 1,
            y: 1,
        },
        target: {
            x: 1,
            y: 1,
        }
    })

    let handleClick = () => {
        setMenuOpen(!menuOpen);
        console.log("menu open: ", menuOpen)
    }

    useEffect(() => {
        if (!balloon.current) return;
        balloon.current.position.z = props.z;
        // get balloon bounds
        balloon.current.children[0].geometry.computeBoundingBox();
        const bounds = balloon.current.children[0].geometry.boundingBox;
        const offset = bounds.max.x * 1;
        // update animation data
        setBalloonData({
            initial: {
                x: viewportData.width / 2 - offset,
                y: viewportData.height / 2 - offset,
            },
            target: {
                x: viewportData.width / 2 - 3 * offset,
                y: viewportData.height / 2 - offset,
            }
        })
        // rotate to face camera
        balloon.current.rotation.x = Math.PI / 2;
        if (menuOpen) {

        }
        console.log(balloonData)
    }, [viewportData])

    useFrame((state, delta) => {
        if (menuOpen) {
            balloon.current.rotation.y += delta * 1;
        }
    })

    let handleResize = () => {
        let { width, height } = viewport.getCurrentViewport(camera, [0 , 0, props.z]);
        setViewportData({
            width: width,
            height: height
        })
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    return(
        <Suspense fallback={null}>
            <BalloonSmoothedMeshAnimated
                ref={balloon} 
                colour={props.colour} 
                scale={props.scale} 
                onClick={handleClick}
                animating={menuOpen}
                initial={balloonData.initial}
                target={balloonData.target}
            />
        </Suspense>
    )
}

export default MenuBalloon;
