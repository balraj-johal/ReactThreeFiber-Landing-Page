import React, {} from 'react';
import { Text } from '@react-three/drei';
import { motion } from "framer-motion-3d";

function MenuLink(props) {
    return(
        <motion.group
            initial="invisible"
            animate={props.animating ? "visible" : "invisible"}
            variants={{
                "invisible": { scaleX: 0, x: 0.3 },
                "visible": { scaleX: 1, x: 0 }
            }}
            transition={{ ease: "easeInOut", delay: 0.2, duration: 0.2 }}
        >
            <Text 
                color="white"
                fontSize={0.25}
                onClick={() => { window.location.href = props.link; }}
                anchorX="right"
            >
                {props.text}
            </Text>
        </motion.group>
    )
}

export default MenuLink;