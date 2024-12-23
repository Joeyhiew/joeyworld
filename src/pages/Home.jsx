import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Popup from '../components/Popup.jsx';
import { Environment } from '@react-three/drei';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Plane from '../models/Plane';
import { useState } from 'react';
import { useAdjustGlobeForScreenSize } from '../hooks/useAdjustGlobeForScreenSize.js';
import { useAdjustPlaneForScreenSize } from '../hooks/useAdjustPlaneForScreenSize.js';
import Navbar from '../components/Navbar.jsx';
import sunset from '../assets/venice_sunset_1k.hdr';
import { useCallback } from 'react';
import UserGuide from '../components/Userguide.jsx';

const NewUserGuideKey = 'joey_world_first_time_user';

const Home = () => {
  const [isReady, setIsReady] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);

  const [globeScale, globePosition, globeRotation] = useAdjustGlobeForScreenSize();
  const [planeScale, planePosition, planeRotation] = useAdjustPlaneForScreenSize();
  const shouldDisplayGuide = sessionStorage.getItem(NewUserGuideKey) !== 'false';

  const handleUnmountLoader = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleMountLoader = useCallback(() => {
    setIsReady(false);
  }, []);

  const handleStartMove = useCallback(() => {
    sessionStorage.setItem(NewUserGuideKey, 'false');
  }, []);

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-20 max-[480px]:top-32 max-[545px]:top-40 left-0 right-0 z-10 flex justify-center items-center">
        <Popup currentStage={currentStage} />
      </div>
      {isReady && <Navbar />}

      {isReady && shouldDisplayGuide && <UserGuide />}

      <Canvas
        className={`w-full h-screen relative ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
        shadows
      >
        <Suspense fallback={<Loader onUnmount={handleUnmountLoader} onMount={handleMountLoader} />}>
          <Environment files={sunset} />
          {/* <directionalLight position={[1, 1, 1]} intensity={2} shadow={true} castShadow={directionalCtl.castShadow} /> */}
          <directionalLight
            // color={'#CB818E'}
            intensity={2}
            // visible={directionalCtl.visible}
            position={[10.3, 1.0, 4.0]}
            castShadow={true}
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
            rotation={planeRotation}
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
            onStartMove={handleStartMove}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};
export default Home;
