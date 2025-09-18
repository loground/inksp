// Experience.jsx
import { CameraControls, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { MeshDepthMaterial } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { Cards } from './Cards';
import { CardsMobile } from './Cardsmobile';

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
            camera: {
              min: 200,
              max: 420,
              minPolar: -180,
              maxPolar: 90,
              fov: 70,
              minAz: -95,
              maxAz: 95,
            },
          }
        : {
            camera: {
              min: 140,
              max: 300,
              minPolar: -180,
              maxPolar: 90,
              fov: 80,
              minAz: -60,
              maxAz: 60,
            },
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
        minAzimuthAngle={degToRad(layout.camera.minAz)}
        maxAzimuthAngle={degToRad(layout.camera.maxAz)}
      />

      {/* LIGHTS */}
      <Environment preset="sunset" />
      <pointLight position={[12, 5, 12]} intensity={1.2} decay={0.8} distance={100} color="white" />
      <directionalLight position={[-15, 5, -15]} intensity={1.2} color="skyblue" />

      {/* SCENE with responsive transforms */}
      {isMobile ? <CardsMobile /> : <Cards />}

      <Background />
    </group>
  );
};
export const Background = () => {
  const map = useTexture('/last.webp');

  // Flip horizontally
  map.wrapS = THREE.RepeatWrapping;
  map.repeat.x = -1; // mirror on X
  map.offset.x = 1; // re-center after mirroring
  map.needsUpdate = true;

  return (
    <mesh scale={1} rotation-y={Math.PI / 2}>
      <sphereGeometry args={[320, 80, 80]} />
      <meshBasicMaterial side={THREE.BackSide} map={map} toneMapped={false} />
    </mesh>
  );
};
