// Experience.jsx
import { CameraControls, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { MeshDepthMaterial, MeshStandardMaterial } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { Cards } from './Cards';

const depthMaterial = new MeshDepthMaterial();
depthMaterial.depthPacking = THREE.RGBADepthPacking;
depthMaterial.blending = THREE.NoBlending;

// ---- choose your breakpoint (px)
const MOBILE_BP = 768;

// Optional: a tiny helper that treats both small screens and coarse pointers as “mobile”
function useIsMobile() {
  const { size } = useThree(); // { width, height }
  // You can also add window.matchMedia inside a useEffect if you need more signals
  return size.width <= MOBILE_BP;
}

export const Experience = ({ ...props }) => {
  const isMobile = useIsMobile();

  // Centralized layouts: easy to tweak per device
  const layout = useMemo(
    () =>
      isMobile
        ? {
            // camera: { min: 18, max: 70, minPolar: -180, maxPolar: 80, fov: 70 },
            MainScene: { scale: 11, position: [18, -5, 0], rotationY: Math.PI / 5 },
          }
        : {
            camera: { minPolar: -180, maxPolar: 80, fov: 80 },
            MainCapsule: { scale: 15, position: [25, -8.8, 0], rotationY: Math.PI / 5 },
          },
    [isMobile],
  );

  return (
    <group {...props}>
      <CameraControls
        minDistance={layout.camera.min}
        maxDistance={layout.camera.max}
        minPolarAngle={degToRad(layout.camera.minPolar)}
        maxPolarAngle={degToRad(layout.camera.maxPolar)}
      />

      {/* LIGHTS */}
      <Environment preset="sunset" />
      <pointLight position={[12, 5, 12]} intensity={1.2} decay={0.8} distance={100} color="white" />
      <directionalLight position={[-15, 5, -15]} intensity={1.2} color="skyblue" />

      {/* SCENE with responsive transforms */}
      <Cards />

      {/* <Background /> */}
      <Background />
    </group>
  );
};

export const Background = () => {
  const map = useTexture('/classrom.PNG');

  return (
    <>
      <mesh scale={1} rotation-y={Math.PI / 2}>
        <sphereGeometry args={[280, 80, 80]} />
        <meshBasicMaterial side={THREE.BackSide} map={map} toneMapped={false} />
      </mesh>
    </>
  );
};
