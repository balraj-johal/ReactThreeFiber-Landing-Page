import React, {  } from "react";
import { 
    DepthOfField, 
    EffectComposer, 
    Noise, 
    Vignette 
} from "@react-three/postprocessing";

export default function PostProcessing() {
    return(
        <EffectComposer>
            <Noise opacity={0.1} />
            <DepthOfField 
                target={[0,0,10]}
                focalLength={0.025} 
                bokehScale={5} 
                height={700} 
            />
            <Vignette eskil={false} offset={0.1} darkness={0.25} />
        </EffectComposer>
    )
}
