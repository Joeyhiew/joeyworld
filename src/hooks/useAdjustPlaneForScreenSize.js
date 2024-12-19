import { useEffect } from 'react';
import { useState } from 'react';

export const useAdjustPlaneForScreenSize = () => {
  const [planeScale, setPlaneScale] = useState(null);
  const [planePosition, setPlanePosition] = useState([0, -1, 0]);
  const [planeRotation, _] = useState([0, 0, 0]);

  const adjustPlaneForScreenSize = () => {
    let screenScale;
    let screenPosition;

    if (window.innerWidth < 380) {
      screenScale = [0.2, 0.2, 0.2];
      screenPosition = [0, -0.4, 2.5];
    } else if (window.innerWidth < 545) {
      screenScale = [0.25, 0.25, 0.25];
      screenPosition = [0, -0.25, 2.5];
    } else if (window.innerWidth < 768) {
      screenScale = [0.35, 0.35, 0.35];
      screenPosition = [0, 0, 2.5];
    } else if (window.innerWidth < 1132) {
      screenScale = [0.4, 0.4, 0.4];
      screenPosition = [0, 0.3, 2.5];
    } else {
      screenScale = [0.5, 0.5, 0.5];
      screenPosition = [0, 0.6, 2.5];
    }
    setPlanePosition(screenPosition);
    setPlaneScale(screenScale);
  };

  useEffect(() => {
    adjustPlaneForScreenSize();
    window.addEventListener('resize', adjustPlaneForScreenSize);
    return () => window.removeEventListener('resize', adjustPlaneForScreenSize);
  }, []);

  return [planeScale, planePosition, planeRotation];
};
