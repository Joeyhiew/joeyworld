import { useGLTF } from '@react-three/drei';
import skyScene from '../assets/3d/sunsetsky1.glb';
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { a } from '@react-spring/three';

const Sky = ({ isRotating, setIsRotating }) => {
  const { nodes, materials } = useGLTF(skyScene);
  const { gl, viewport } = useThree();
  const skyRef = useRef();
  let wheelEventEndTimeout = null;

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerLeave = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      skyRef.current.rotation.z -= delta * 0.0005 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.0005 * Math.PI;
    }
  };

  // Touch events for mobile devices
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      skyRef.current.rotation.z -= delta * 0.0005 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.0005 * Math.PI;
    }
  };

  const handleScroll = (e) => {
    clearTimeout(wheelEventEndTimeout);
    wheelEventEndTimeout = setTimeout(() => {
      setIsRotating(false);
    }, 100);
    setIsRotating(true);
    e.stopPropagation();
    e.preventDefault();

    const deltaX = e.deltaX;
    const clientX = e.clientX;

    if (isRotating) {
      const delta = (deltaX - lastX.current) / viewport.width;

      skyRef.current.rotation.z -= deltaX * 0.00005 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = deltaX * 0.00005 * Math.PI;
    }
  };

  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      skyRef.current.rotation.z -= rotationSpeed.current;
    }
  });
  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mouseleave', handlePointerLeave);
    canvas.addEventListener('scroll', handleScroll);
    canvas.addEventListener('wheel', handleScroll);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handlePointerLeave);
      canvas.removeEventListener('scroll', handleScroll);
      canvas.removeEventListener('wheel', handleScroll);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // useFrame((_, delta) => {
  //   if (isRotating) {
  //     skyRef.current.rotation.z += 0.15 * delta;
  //   }
  // });

  return (
    <a.group ref={skyRef} position={[0, -20, -10]}>
      <group dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.Object_25.geometry} material={materials['Material.010']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_31.geometry} material={materials['Material.018']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_37.geometry} material={materials['Material.018']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_64.geometry} material={materials['Material.008']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_66.geometry} material={materials['Material.008']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_70.geometry} material={materials['Material.021']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_72.geometry} material={materials['Material.010']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_73.geometry} material={materials['Material.017']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_84.geometry} material={materials['Material.011']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_85.geometry} material={materials['Material.021']} />
        <group position={[-28.802, 24.119, -3.816]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-75.577, 91.447, 236.784]} rotation={[0, -1.318, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_02_cloud_00_0.geometry}
                material={materials.cloud_00}
                scale={0.56}
              />
            </group>
            <group position={[-52.426, 91.447, -40.086]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_03_cloud_00_0.geometry}
                material={materials.cloud_00}
                scale={0.401}
              />
            </group>
            <group position={[256.82, 105.747, -70.498]} rotation={[-Math.PI, 0.721, -Math.PI]} scale={0.438}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_05_Cloud_01_0.geometry}
                material={materials.Cloud_01}
                position={[-7.983, -1.878, 9.027]}
                scale={0.415}
              />
            </group>
            <group position={[-8.686, 57.284, -40.086]} rotation={[0, 1.483, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_06_Cloud_01_0.geometry}
                material={materials.Cloud_01}
                position={[24.64, 18.989, 120.641]}
                scale={0.438}
              />
            </group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cloud_01_cloud_00_0.geometry}
              material={materials.cloud_00}
              position={[0, 68.745, 325.035]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cloud_04_cloud_00_0.geometry}
              material={materials.cloud_00}
              position={[256.82, 91.246, -70.498]}
              rotation={[-Math.PI, 1.514, -Math.PI]}
              scale={0.438}
            />
          </group>
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials['Material.034']}
          position={[0.022, -0.23, -0.005]}
          rotation={[0, 0, -Math.PI]}
          scale={[-49.925, -49.925, -0.841]}
        />
        <group position={[31.432, -14.31, 2.884]} rotation={[0, 0, -2.325]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[0, 68.745, 325.036]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_01_cloud_00_0001.geometry}
                material={materials['cloud_00.001']}
                scale={0.455}
              />
            </group>
            <group position={[-75.577, 91.447, 236.784]} rotation={[0, -1.318, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_02_cloud_00_0001.geometry}
                material={materials['cloud_00.001']}
                position={[113.66, -52.487, 582.859]}
                scale={0.632}
              />
            </group>
            <group position={[-52.426, 91.447, -40.086]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_03_cloud_00_0001.geometry}
                material={materials['cloud_00.001']}
                scale={0.509}
              />
            </group>
            <group position={[317.986, 124.535, -77.504]} rotation={[-Math.PI, 0.721, -Math.PI]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_05_Cloud_01_0001.geometry}
                material={materials['Cloud_01.001']}
                position={[-668.916, -46.435, -221.859]}
                scale={0.756}
              />
            </group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cloud_04_cloud_00_0001.geometry}
              material={materials['cloud_00.001']}
              position={[317.986, 91.447, -77.504]}
              rotation={[-Math.PI, 1.514, -Math.PI]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cloud_06_Cloud_01_0001.geometry}
              material={materials['Cloud_01.001']}
              position={[-8.686, 57.284, -40.086]}
              rotation={[0, 1.483, 0]}
            />
          </group>
        </group>
        <group position={[22.137, 13.002, 4.941]} rotation={[-0.42, 0.237, 2.653]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-52.426, 91.447, -40.086]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_03_cloud_00_0002.geometry}
                material={materials['cloud_00.002']}
                scale={0.509}
              />
            </group>
          </group>
        </group>
        <group position={[-20.033, 9.514, -6.379]} rotation={[-0.361, 0.142, -1.03]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cloud_04_cloud_00_0002.geometry}
              material={materials['cloud_00.003']}
              position={[256.82, 91.246, -70.498]}
              rotation={[-Math.PI, 1.514, -Math.PI]}
              scale={0.438}
            />
          </group>
        </group>
        <group position={[5.335, -17.912, 13.137]} rotation={[-0.135, 0.004, -2.674]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-75.577, 91.447, 236.784]} rotation={[0, -1.318, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_02_cloud_00_0002.geometry}
                material={materials['cloud_00.004']}
                position={[113.66, -52.487, 582.859]}
                rotation={[0.039, -0.399, 0.08]}
                scale={[1.124, 1.043, 1.661]}
              />
            </group>
          </group>
        </group>
        <group position={[-6.766, 30.109, 0.42]} rotation={[0, 0, -2.325]} scale={0.044}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cloud_06_Cloud_01_0002.geometry}
              material={materials['Cloud_01.002']}
              position={[-8.686, 57.284, -40.086]}
              rotation={[0, 1.483, 0]}
            />
          </group>
        </group>
        <group position={[-29.959, 5.035, -2.313]} rotation={[0.114, -0.062, 2.46]} scale={0.042}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cloud_06_Cloud_01_0003.geometry}
              material={materials['Cloud_01.003']}
              position={[-8.686, 57.284, -40.086]}
              rotation={[0, 1.483, 0]}
            />
          </group>
        </group>
        <group position={[13.917, 21.896, 2.13]} rotation={[0.047, 0, -2.829]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cloud_04_cloud_00_0003.geometry}
              material={materials['cloud_00.005']}
              position={[317.986, 91.447, -77.504]}
              rotation={[-Math.PI, 1.514, -Math.PI]}
            />
          </group>
        </group>
        <group position={[-18.546, -47.709, 10.229]} rotation={[-0.161, -0.112, -2.029]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-75.577, 91.447, 236.784]} rotation={[0, -1.318, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_02_cloud_00_0003.geometry}
                material={materials['cloud_00.006']}
                position={[113.66, -52.487, 582.859]}
                rotation={[0.039, -0.399, 0.08]}
                scale={[1.124, 1.043, 1.661]}
              />
            </group>
          </group>
        </group>
        <group position={[5.795, -23.755, -1.765]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-52.426, 91.447, -40.086]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_03_cloud_00_0003.geometry}
                material={materials['cloud_00.007']}
                scale={0.401}
              />
            </group>
          </group>
        </group>
        <group position={[-38.801, -36.146, -4.108]} rotation={[-0.049, -0.03, -1.715]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-52.426, 91.447, -40.086]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_03_cloud_00_0004.geometry}
                material={materials['cloud_00.008']}
                scale={0.509}
              />
            </group>
          </group>
        </group>
        <group position={[1.522, -51.085, -0.746]} rotation={[0, 0, -2.325]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[0, 68.745, 325.035]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_01_cloud_00_0002.geometry}
                material={materials['cloud_00.009']}
                scale={0.455}
              />
            </group>
          </group>
        </group>
        <group position={[24.931, 27.291, 3.273]} rotation={[0, 0, -2.325]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[0, 68.745, 325.035]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.cloud_01_cloud_00_0003.geometry}
                material={materials['cloud_00.010']}
                scale={0.455}
              />
            </group>
          </group>
        </group>
        <group position={[-22.511, 52.344, -0.504]} rotation={[0, 0, -2.325]} scale={0.057}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cloud_04_cloud_00_0004.geometry}
              material={materials['cloud_00.011']}
              position={[317.986, 91.447, -77.504]}
              rotation={[-Math.PI, 1.514, -Math.PI]}
            />
          </group>
        </group>
      </group>
    </a.group>
  );
};
export default Sky;
