import React, {  } from "react";

export default function Typography() {
    return (
        <div id="typography">
            <Titles />
            <Description />
        </div>
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