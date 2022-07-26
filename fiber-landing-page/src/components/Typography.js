import React, {  } from "react";
import { motion } from "framer-motion";

export default function Typography() {
    return (
        <motion.div 
            id="typography"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 100,
                delay: 1
             }}
        >
            <Titles />
            <Description />
        </motion.div>
    );
}

function Titles(props) {
    return(
        <div id="titles">
            <h1>STARS</h1>
            <h2>these things floating*</h2>
            <h3>*these things really floating</h3>
        </div> 
    )
}
function Description(props) {
    return(
        <p id="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit 
            esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui 
            officia deserunt mollit anim id est laborum.
        </p> 
    )
}