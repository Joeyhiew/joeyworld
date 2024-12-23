import { useEffect } from 'react';
import { useState } from 'react';

export const useAdjustGlobeForScreenSize = () => {
  const [globeScale, setGlobeScale] = useState(null);
  const [globePosition, setGlobePosition] = useState([0, -1, 0]);
  const [globeRotation, setGlobeRotation] = useState([0, 0, 0]);

  const adjustGlobeForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -2.5, 2];
    // let rotation = [0, Math.PI / 2, 0];
    let rotation = [0, 0, 0];

    if (window.innerWidth < 380) {
      screenScale = [0.95, 0.95, 0.95];
    } else if (window.innerWidth < 545) {
      screenScale = [1.05, 1.05, 1.05];
    } else if (window.innerWidth < 768) {
      screenScale = [1.15, 1.15, 1.15];
    } else if (window.innerWidth < 1132) {
      screenScale = [1.3, 1.3, 1.3];
    } else {
      screenScale = [1.5, 1.5, 1.5];
    }
    setGlobePosition(screenPosition);
    setGlobeRotation(rotation);
    setGlobeScale(screenScale);
  };

  useEffect(() => {
    adjustGlobeForScreenSize();
    window.addEventListener('resize', adjustGlobeForScreenSize);
    return () => window.removeEventListener('resize', adjustGlobeForScreenSize);
  }, []);

  return [globeScale, globePosition, globeRotation];
};
