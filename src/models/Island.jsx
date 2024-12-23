import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { a } from '@react-spring/three';

import islandScene from '../assets/3d/joeyworldv3.glb';

const Island = ({ isRotating, setIsRotating, setCurrentStage, position, onStartMove, ...props }) => {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    onStartMove();

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
      islandRef.current.rotation.z -= delta * 0.005 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.005 * Math.PI;
    }
  };

  // Touch events for mobile devices
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
    onStartMove();

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

      islandRef.current.rotation.z -= delta * 0.005 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.005 * Math.PI;
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

      islandRef.current.rotation.z -= rotationSpeed.current;
    }
    // When rotating, determine the current stage based on island's orientation
    const rotation = islandRef.current.rotation.z;

    const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    // Set the current stage based on the island's orientation
    switch (true) {
      case normalizedRotation >= 0.8 && normalizedRotation <= 1.2:
        setCurrentStage(1);
        break;
      case normalizedRotation >= 1.85 && normalizedRotation <= 2.3:
        setCurrentStage(2);
        break;
      case normalizedRotation >= 3.25 && normalizedRotation <= 3.9:
        setCurrentStage(3);
        break;
      case normalizedRotation >= 4.45 && normalizedRotation <= 4.85:
        setCurrentStage(4);
        break;
      case normalizedRotation >= 5.35 && normalizedRotation <= 5.75:
        setCurrentStage(5);
        break;
      default:
        setCurrentStage(null);
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

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // need to wrap with a group to allow rotation about local axis
  return (
    <a.group position={position}>
      <a.group {...props} ref={islandRef}>
        <group {...props} dispose={null}>
          <group position={[0.991, -0.308, 0.272]} rotation={[1.368, 1.093, -2.913]} scale={0.055}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <group position={[0, 0, -15]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_1_Cylinder_Mat_0.geometry}
                  material={materials.material}
                  position={[334.838, 464.993, 2.5]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_1_Cylinder_1_Cylinder_1_Cylinder_3_Mat2_0.geometry}
                  material={materials['Mat.2']}
                  position={[400, 453.681, 30.5]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_1_Cylinder_2_Mat1_0.geometry}
                  material={materials['Mat.1']}
                  position={[301.01, 493.809, -25.5]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Extrude_Mat2_0.geometry}
                  material={materials['Mat.2']}
                  position={[281.282, 305.197, 22.471]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Tube_Mat2_0.geometry}
                  material={materials['Mat.2']}
                  position={[558.402, 71.704, 15]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Tube_1_Mat_0.geometry}
                  material={materials.material}
                  position={[569.917, 71.704, 15]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Tube_2_Mat1_0.geometry}
                  material={materials['Mat.1']}
                  position={[547.396, 71.704, 15]}
                />
              </group>
            </group>
          </group>
          <group position={[0.863, 0.61, 0.367]} rotation={[-0.998, 0.793, 2.274]} scale={0.038}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <group position={[-0.627, 0.859, -7.095]} rotation={[0, Math.PI / 4, Math.PI / 2]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials['Material.008']}
                  position={[0.12, 0.356, 0.426]}
                  scale={0.844}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_7.geometry}
                  material={materials['Material.009']}
                  position={[0.12, 0.356, 0.426]}
                  scale={0.844}
                />
              </group>
              <group position={[0, 1.167, 0]} rotation={[0, Math.PI / 4, 0]} scale={[3.33, 1.243, 3.33]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials['Material.007']}
                  position={[0.107, 0.058, -0.128]}
                  scale={0.844}
                />
              </group>
              <group position={[0, 3.642, 0]} scale={[5.968, 1, 0.481]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials['Material.008']}
                  position={[-0.008, -0.313, -1.148]}
                  scale={0.844}
                />
              </group>
            </group>
          </group>
          <group position={[-1.112, 0.164, 0.587]} rotation={[-0.712, -0.965, 0.277]} scale={0.001}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <group position={[-370.548, -380.402, 88.51]} rotation={[-1.191, -0.466, 1.228]} scale={68.017}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.keyboard_1_Material001_0.geometry}
                  material={materials['Material.010']}
                  position={[2.386, -1.562, -0.229]}
                  rotation={[-0.261, 0.201, -0.354]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.keyboard_1_Material002_0.geometry}
                  material={materials['Material.013']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.keyboard_1_Material004_0.geometry}
                  material={materials['Material.014']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.keyboard_1_Material006_0.geometry}
                  material={materials['Material.011']}
                  position={[2.386, -1.562, -0.229]}
                  rotation={[-0.261, 0.201, -0.354]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.keyboard_1_Material007_0.geometry}
                  material={materials['Material.012']}
                  position={[2.386, -1.562, -0.229]}
                  rotation={[-0.261, 0.201, -0.354]}
                />
              </group>
              <group position={[-331.053, -39.154, -35.522]} rotation={[-1.532, -0.617, 0.67]} scale={68.017}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.monitor_1_Material001_0.geometry}
                  material={materials['Material.010']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.monitor_1_Material002_0.geometry}
                  material={materials['Material.013']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.monitor_1_Material004_0.geometry}
                  material={materials['Material.014']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.monitor_1_Material006_0.geometry}
                  material={materials['Material.011']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.monitor_1_Material007_0.geometry}
                  material={materials['Material.012']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.monitor_1_Material009_0.geometry}
                  material={materials['Material.015']}
                />
              </group>
            </group>
          </group>
          <group position={[-0.811, 0.701, 0.716]} rotation={[-1.523, -0.763, -0.817]} scale={0.018}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_7001.geometry}
              material={materials.initialShadingGroup_1}
              position={[-10.581, 14.055, -2.032]}
              scale={0.675}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_9001.geometry}
              material={materials.initialShadingGroup_0}
              position={[-11.907, 15.078, -2.043]}
              scale={0.675}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_11.geometry}
              material={materials.initialShadingGroup}
              position={[-11.903, 15.068, -1.899]}
              scale={0.675}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_3.geometry}
              material={materials.initialShadingGroup_3}
              position={[-11.907, 15.078, -2.043]}
              scale={0.675}
            />
          </group>
          <group position={[-0.399, -0.934, 0.224]} rotation={[1.551, -0.369, 3.002]} scale={0.046}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_2007.geometry}
              material={materials.palette}
              position={[1.32, 0.383, 0.031]}
              rotation={[0.241, 0.032, 0.091]}
            />
          </group>
          <group position={[-0.015, 0.036, -0.01]} rotation={[-2.881, -0.252, -3.075]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Icosphere005.geometry}
              material={materials['Material.005']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Icosphere005_1.geometry}
              material={materials['Material.006']}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Icosphere001.geometry}
            material={materials['Material.002']}
            position={[-0.015, 0.036, -0.01]}
            rotation={[-2.881, -0.252, -3.075]}
            scale={1.016}
          />
          <group position={[-1.197, 0.638, 0.054]} rotation={[-Math.PI / 2, 0, -3.091]} scale={0.001}>
            <group position={[-228.141, -280.375, -22.734]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_3002.geometry}
                material={materials['DEFAULT.002']}
                position={[-1712.605, 634.304, 235.115]}
                rotation={[-0.673, -0.541, -1.308]}
                scale={0.414}
              />
            </group>
          </group>
          <group position={[-1.197, 0.638, 0.054]} rotation={[-Math.PI / 2, 0, -3.091]} scale={0.001}>
            <group position={[-228.141, -280.375, -22.734]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_3003.geometry}
                material={materials['DEFAULT.003']}
                position={[-838.602, 1049.164, -1499.816]}
                rotation={[-2.335, -0.059, -3.079]}
                scale={0.302}
              />
            </group>
          </group>
          <group position={[-1.197, 0.638, 0.054]} rotation={[-Math.PI / 2, 0, -3.091]} scale={0.001}>
            <group position={[-228.141, -280.375, -22.734]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_3004.geometry}
                material={materials['DEFAULT.004']}
                position={[-1231.446, -651.636, 594.9]}
                scale={[1, 1, 0.672]}
              />
            </group>
          </group>
          <group position={[-0.643, -0.399, 0.124]} rotation={[-1.576, 0.072, -3.099]} scale={0.001}>
            <group position={[-228.141, -280.375, -22.734]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_3005.geometry}
                material={materials['DEFAULT.005']}
                position={[-1355.968, 891.584, 435.916]}
                rotation={[-1.835, -0.874, -2.918]}
                scale={0.248}
              />
            </group>
          </group>
          <group position={[-0.691, 0.309, 1.002]} rotation={[-0.418, -1.269, -1.85]} scale={0.001}>
            <group position={[-228.141, -280.375, -22.734]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_3006.geometry}
                material={materials['DEFAULT.006']}
                position={[-93.929, -8.695, -57.003]}
                rotation={[-0.673, -0.541, -1.308]}
                scale={0.414}
              />
            </group>
          </group>
          <group position={[-0.24, 0.479, 1.143]} rotation={[-0.48, -0.192, -2.478]} scale={0.145}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plant_Fern_Plant_Texture_0002.geometry}
                material={materials['Plant_Texture.005']}
                position={[-1.915, -1.435, -1.589]}
                scale={0.839}
              />
            </group>
          </group>
          <group position={[0.154, 1.111, -0.035]} rotation={[-1.554, 0.001, -3.091]} scale={0.015}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <group position={[0.001, 0, 0]}>
                <group
                  position={[-237.005, 182.906, -396.379]}
                  rotation={[-1.72, -0.015, 1.26]}
                  scale={[270.945, 270.945, 134.51]}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_Big_rock_3_0001.geometry}
                    material={materials.Material}
                    position={[0.082, 0.647, 0.728]}
                    rotation={[-0.303, -0.098, -0.058]}
                  />
                </group>
              </group>
            </group>
          </group>
          <group position={[-0.26, 0.139, 1.402]} rotation={[-0.251, 0.049, -3.129]} scale={0.071}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plant_Palm1_Plant_Texture_0001.geometry}
                material={materials['Plant_Texture.007']}
                position={[-4.515, -3.8, 0.175]}
                scale={1.584}
              />
            </group>
          </group>
          <group position={[0.412, 1.13, 0.004]} rotation={[-1.561, 0.197, -0.068]} scale={0.122}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle046_Material015_0.geometry}
                material={materials['Material.003']}
                position={[4.483, 162.587, -49.478]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle047_Material014_0.geometry}
                material={materials['Material.004']}
                position={[11.053, -4.696, -29.593]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder469_Material005_0.geometry}
                material={materials['Material.001']}
                position={[6.808, -79.281, -47.587]}
                rotation={[-Math.PI / 2, 0, -0.303]}
                scale={100}
              />
            </group>
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.tree}
            position={[0.04, 0.901, -0.101]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.106}
          />
          <group position={[1.029, -0.104, -0.093]} rotation={[-Math.PI / 2, 0, 0]} scale={0.098}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_2001.geometry}
              material={materials.tree}
              rotation={[-2.643, 1.141, 2.422]}
            />
          </group>
          <group position={[0.573, -0.573, 0.793]} rotation={[0.835, 0.495, -2.439]} scale={0.079}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle046_Material015_0001.geometry}
                material={materials['Material.003']}
                position={[4.483, 162.587, -49.478]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle047_Material014_0001.geometry}
                material={materials['Material.004']}
                position={[11.053, -4.696, -29.593]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder469_Material005_0001.geometry}
                material={materials['Material.001']}
                position={[6.808, -79.281, -47.587]}
                rotation={[-Math.PI / 2, 0, -0.303]}
                scale={100}
              />
            </group>
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2008.geometry}
            material={materials.tree}
            position={[-0.686, -0.79, -0.011]}
            rotation={[1.579, -0.363, 0.498]}
            scale={0.067}
          />
          <group position={[-1.17, -0.337, 0.043]} rotation={[1.906, -1.437, -2.812]} scale={0.171}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle046_Material015_0002.geometry}
                material={materials['Material.003']}
                position={[4.483, 162.587, -49.478]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle047_Material014_0002.geometry}
                material={materials['Material.004']}
                position={[11.053, -4.696, -29.593]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder469_Material005_0002.geometry}
                material={materials['Material.001']}
                position={[6.808, -79.281, -47.587]}
                rotation={[-Math.PI / 2, 0, -0.303]}
                scale={100}
              />
            </group>
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2009.geometry}
            material={materials.tree}
            position={[-0.166, -1.015, -0.019]}
            rotation={[1.557, -0.288, 0.573]}
            scale={0.067}
          />
          <group position={[0.358, 0.676, 0.874]} rotation={[-0.599, 0.271, 0.191]} scale={0.094}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle046_Material015_0003.geometry}
                material={materials['Material.003']}
                position={[4.483, 162.586, -49.478]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle047_Material014_0003.geometry}
                material={materials['Material.004']}
                position={[11.053, -4.696, -29.593]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder469_Material005_0003.geometry}
                material={materials['Material.001']}
                position={[6.808, -79.281, -47.587]}
                rotation={[-Math.PI / 2, 0, -0.303]}
                scale={100}
              />
            </group>
          </group>
          <group position={[0.454, -0.637, 0.667]} rotation={[1.025, 0.488, -2.171]} scale={0.075}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_2010.geometry}
              material={materials['tree.001']}
              scale={0.778}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2011.geometry}
            material={materials['tree.002']}
            position={[-0.545, 0.909, -0.238]}
            rotation={[-1.56, -0.523, 0.071]}
            scale={0.046}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2012.geometry}
            material={materials['tree.002']}
            position={[-0.625, 0.906, -0.046]}
            rotation={[-1.386, -0.558, -0.903]}
            scale={0.046}
          />
          <group position={[-0.736, -0.037, 0.859]} rotation={[0.022, -0.857, -0.187]} scale={0.078}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle046_Material015_0004.geometry}
                material={materials['Material.017']}
                position={[-25.13, 139.047, -15.651]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle047_Material014_0004.geometry}
                material={materials['Material.018']}
                position={[-18.56, -28.236, 4.233]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder469_Material005_0004.geometry}
                material={materials['Material.016']}
                position={[-22.805, -102.82, -13.761]}
                rotation={[-Math.PI / 2, 0, -0.303]}
                scale={100}
              />
            </group>
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.rock_3.geometry}
            material={materials['Material.020']}
            position={[0.403, 0.619, 0.815]}
            rotation={[-0.703, 0.444, 0.463]}
            scale={0.023}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.rock_2.geometry}
            material={materials['Material.019']}
            position={[-1.107, -0.175, -0.174]}
            rotation={[1.17, -1.151, 0.089]}
            scale={[0.036, 0.026, 0.024]}
          />
        </group>
      </a.group>
    </a.group>
  );
};

export default Island;
