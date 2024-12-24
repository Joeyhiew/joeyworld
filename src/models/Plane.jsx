import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

import planeScene from '../assets/3d/cartoon_plane.glb';

const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(planeScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, ref);

  // Use an effect to control the plane's animation based on 'isRotating'
  useEffect(() => {
    // if (isRotating) {
    actions['Main'].play();
    // } else {
    //   actions['Main'].stop();
    // }
  }, [actions]);

  return (
    <mesh {...props} ref={ref} castShadow>
      <primitive object={scene} castShadow />
    </mesh>
  );
};
export default Plane;
