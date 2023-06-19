import {Canvas, useFrame} from "@react-three/fiber";
import PlanetEarth from "./Earth";
import './EarthCanvas.css'
import {Grid} from "@mui/material";
import {useEffect, useRef} from "react";


const EarthCanvas = () => {
    const ref = useRef()

    const divStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: '#000000',
        margin: 0
    };

    useEffect(() => {
        // Add the class to the body element
        let appDiv = document.getElementById("appCanvas");
        console.log(appDiv)
        if (appDiv) {
            console.log(appDiv)
            appDiv.classList.add("EarthCanvas")
            console.log(appDiv)
            appDiv.classList.remove("App")
        }

        return () => {
            if (appDiv) {
                appDiv.classList.remove("EarthCanvas");
                appDiv.classList.add("App")
            }
        };
    }, []);
    return (
        <Grid sx={divStyle}>
            <Canvas style={{height: "100%"}}>
                <PlanetEarth/>
            </Canvas>
        </Grid>
    )
}

export default EarthCanvas;