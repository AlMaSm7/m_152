import {useFrame, useLoader} from "@react-three/fiber";
import {useRef} from "react";
import Map from './media/map.jpg'
import {TextureLoader} from "three";
import {OrbitControls, Stars} from "@react-three/drei";

const PlanetEarth = () => {
    const ref = useRef()

    const [earthMap] = useLoader(TextureLoader, [Map])

    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime()
        ref.current.rotation.y = elapsedTime / 6
    })
    return (
        <>
            <Stars radius={300} depth={20} count={75000} factor={5} saturation={0.1} fade={true}/>
            <pointLight color='white' position={[3, 0, 3]} intensity={1.2}/>
            <mesh rotation={[-0.3, 30, 0]} ref={ref}>
                <sphereGeometry args={[1.3, 32, 32]}/>
                <meshPhongMaterial color='blue'/>
                <meshStandardMaterial map={earthMap} metalness={0.4} roughness={0.7}/>
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    zoomSpeed={0.6}
                    panSpeed={0.5}
                    rotateSpeed={0.4}
                />
            </mesh>
        </>
    )
}

export default PlanetEarth