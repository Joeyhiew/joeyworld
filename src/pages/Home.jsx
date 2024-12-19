import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Popup from '../components/Popup.jsx';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Plane from '../models/Plane';
import { useState } from 'react';
import { useAdjustGlobeForScreenSize } from '../hooks/useAdjustGlobeForScreenSize.js';
import { useAdjustPlaneForScreenSize } from '../hooks/useAdjustPlaneForScreenSize.js';

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const [globeScale, globePosition, globeRotation] = useAdjustGlobeForScreenSize();
  const [planeScale, planePosition, planeRotation] = useAdjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex justify-center items-center">
        {currentStage && <Popup currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen relative ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight />
          <spotLight />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <Plane position={planePosition} scale={planeScale} isRotating={isRotating} rotation={[0.75, -1, 0]} />
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
