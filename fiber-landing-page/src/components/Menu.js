import React, { 
    Suspense, 
    useCallback, 
    useEffect, 
    useRef, 
    useState 
} from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import MenuLink from './MenuLink';

import { motion } from "framer-motion-3d";
import { Sphere } from '@react-three/drei';
import * as THREE from "three";
import { useSpring } from 'framer-motion';
import Balloon from './Balloon';

function Menu(props) {
    const balloon = useRef();
    const screenWipe = useRef();
    const { viewport, camera } = useThree();

    const { width: initWidth, height: initHeight } = 
        viewport.getCurrentViewport(camera, [0 , 0, props.z]);
        
    const [menuOpen, setMenuOpen] = useState(false);
    const [viewportData, setViewportData] = useState({
        width: initWidth,
        height: initHeight
    });
    const [balloonData, setBalloonData] = useState({
        initial: { x: 1, y: 1, },
        target: { x: 1, y: 1, }
    })

    let handleClick = () => {
        setMenuOpen(!menuOpen);
    }

    let updatePosition = (viewportData, zPosition) => {
        // keep refreshing function if target balloon hasn't been mounted yet
        if (!balloon.current) return setTimeout(() => {
            updatePosition(viewportData, zPosition);
        }, 10);
        balloon.current.position.z = zPosition;
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
                x: viewportData.width / 2 - offset,
                y: viewportData.height / 2 - offset,
            }
        })
        // rotate to face camera
        balloon.current.rotation.x = Math.PI / 2;
    }

    useEffect(() => {
        updatePosition(viewportData, props.z);
    }, [viewportData, props.z])


    let handleResize = useCallback(() => {
        let { width, height } = 
            viewport.getCurrentViewport(camera, [0 , 0, props.z]);
        setViewportData({ width: width, height: height });
    }, [camera, props.z, viewport])

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        setTimeout(() => { handleResize(); }, 100);

        return () => { window.removeEventListener("resize", handleResize) }
    }, [handleResize])

    // add menu screen wipe
    const [menuWipeScale, setMenuWipeScale] = useState(0);
    const spring = useSpring(0);
    useEffect(() => {
        setTimeout(() => {
            if (menuOpen) {
                spring.set(Math.max(viewport.width, viewport.height));
            } else {
                spring.set(0);
            }
        }, 100)
        spring.onChange(latest => {
            setMenuWipeScale(latest);
        });

        return () => {
            spring.clearListeners();
        }
    }, [menuOpen])
    
    // rotate menu balloon
    useFrame((state, delta) => {
        if (menuWipeScale > 0.1) balloon.current.rotation.y += delta * 1;
    })

    const [animVariants, setAnimVariants] = useState({
        "initial" : {
            x: balloonData.initial?.x,
            y: balloonData.initial?.y 
        },
        "animated" : { 
            x: balloonData.target?.x,
            y: balloonData.target?.y 
        },
    });
    useEffect(() => {
        setAnimVariants({
            "initial" : { 
                x: balloonData.initial?.x, 
                y: balloonData.initial?.y 
            },
            "animated" : { 
                x: balloonData.target?.x, 
                y: balloonData.target?.y 
            },
        });
    }, [balloonData]);

    const BASIC_MATERIAL = <meshBasicMaterial
            color={props.color} 
            roughness={0.2}
            metalness={0.79}
            reflectivity={0.5}
            clearcoat={0.57}
            clearcoatRoughness={0.5}
            transparent={true}
            opacity={1}
        />;

    return(
        <Suspense fallback={null}>
            <motion.group 
                initial="hidden"
                animate={menuOpen ? "animated" : "initial"}
                variants={animVariants}
                transition={{ ease: "anticipate" }}
            >
                <Balloon
                    material={BASIC_MATERIAL} 
                    ref={balloon}
                    color={menuWipeScale < 0.01 ? props.color : 0xFFFFFF} 
                    scale={props.scale} 
                    onClick={handleClick}
                />
                <MenuLink 
                    animating={menuOpen} 
                    text="www.balraj.cool"
                    link="https://www.balraj.cool"
                />
                <Sphere 
                    ref={screenWipe} 
                    scale={[menuWipeScale, menuWipeScale, menuWipeScale]}
                    position={[1.15,0.5,0]}
                    onClick={handleClick}
                >
                    <meshBasicMaterial 
                        color={props.color} 
                        side={THREE.DoubleSide} 
                    />
                </Sphere>
            </motion.group>
        </Suspense>
    )
}

export default Menu;
