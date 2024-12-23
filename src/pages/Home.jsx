import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Popup from '../components/Popup.jsx';
import { Environment } from '@react-three/drei';
import { useControls } from 'leva';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Plane from '../models/Plane';
import { useState } from 'react';
import { useAdjustGlobeForScreenSize } from '../hooks/useAdjustGlobeForScreenSize.js';
import { useAdjustPlaneForScreenSize } from '../hooks/useAdjustPlaneForScreenSize.js';

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);

  const [globeScale, globePosition, globeRotation] = useAdjustGlobeForScreenSize();
  const [planeScale, planePosition, planeRotation] = useAdjustPlaneForScreenSize();

  const directionalCtl = useControls('Directional Light', {
    visible: true,
    position: {
      x: 10.3,
      y: 1.0,
      z: 4.4,
    },
    castShadow: true,
  });

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-20 left-0 right-0 z-10 flex justify-center items-center">
        {currentStage && <Popup currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen relative ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
        shadows
      >
        <Suspense fallback={<Loader />}>
          <Environment preset="sunset" />

          {/* <directionalLight position={[1, 1, 1]} intensity={2} shadow={true} castShadow={directionalCtl.castShadow} /> */}
          <directionalLight
            // color={'#CB818E'}
            intensity={2}
            visible={directionalCtl.visible}
            position={[directionalCtl.position.x, directionalCtl.position.y, directionalCtl.position.z]}
            castShadow={directionalCtl.castShadow}
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-far={20}
          />
          <ambientLight intensity={0.5} color={'#ffc35c'} />
          {/* <pointLight /> */}
          {/* <spotLight /> */}
          {/* <hemisphereLight
            skyColor="#CB818E"
            groundColor="#000000"
            intensity={3}
            castShadow={true}
            receiveShadow={true}
            //            shadow-camera-near={0.1}
            // shadow-mapSize-width={4096}
            // shadow-mapSize-height={4096}
            // shadow-camera-far={20}
            // shadow-camera-left={-10}
            // shadow-camera-right={10}
            // shadow-camera-top={10}
            // shadow-camera-bottom={-10}
          /> */}

          <Plane
            position={planePosition}
            scale={planeScale}
            isRotating={isRotating}
            rotation={[0.75, 1.3, 0]}
            castShadow
          />
          <Sky isRotating={isRotating} />
          <Island
            position={globePosition}
            scale={globeScale}
            rotation={globeRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};
export default Home;
