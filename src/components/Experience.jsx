// Experience.jsx
import { CameraControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { MeshDepthMaterial } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';

import { MainCapsule } from '../assets/ModelsCode/Capsule';
import { JungleBay } from '../assets/ModelsCode/Ape';
import { MferMax } from '../assets/ModelsCode/MaxMfer';
import { Butthead } from '../assets/ModelsCode/Butthead';
import { Beavis } from '../assets/ModelsCode/Beavis';
import { ApeComp } from '../assets/ModelsCode/ComputerApe';
import { RoomOptimised } from '../assets/ModelsCode/newRoom';
import Background from './Background';
import { Palm } from '../assets/ModelsCode/Palm';

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
            camera: { min: 18, max: 70, minPolar: -180, maxPolar: 80, fov: 70 },
            MainCapsule: { scale: 11, position: [18, -5, 0], rotationY: Math.PI / 5 },
            JungleBay: { scale: 4, position: [18, -2, 0] },
            MferMax: { scale: 0.8, position: [-1, -5, -1], rotationY: Math.PI * 2 },
            Butthead: {
              scale: 4,
              position: [-2, -8, 1],
              rotationY: Math.PI,
              rotationX: Math.PI / 2,
            },
            Beavis: { scale: 8, position: [11, -2, 8], rotationY: Math.PI * 1.2 },
            ApeComp: { scale: 2.4, position: [-17, 6, 10], rotationY: Math.PI / 1 },
            Room: { scale: 8, position: [-20, 18, -10] },
            Palm: { scale: 7, position: [26, -8, -4] },
          }
        : {
            camera: { min: 20, max: 70, minPolar: -180, maxPolar: 80, fov: 80 },
            MainCapsule: { scale: 15, position: [25, -8, 0], rotationY: Math.PI / 5 },
            JungleBay: { scale: 5, position: [25, -4, 0] },
            MferMax: { scale: 1, position: [0, -8, 1], rotationY: Math.PI * 2 },
            Butthead: {
              scale: 5,
              position: [-2, -12, 1],
              rotationY: Math.PI,
              rotationX: Math.PI / 2,
            },
            Beavis: { scale: 10, position: [14, -5.5, 8.5], rotationY: Math.PI * 1.2 },
            ApeComp: { scale: 3, position: [-22, 5.5, 10], rotationY: Math.PI / 1 },
            Room: { scale: 10, position: [-25, 20, -12] },
            Palm: { scale: 8, position: [36, -8, -8] },
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

      {/* <Background /> */}
      <MainCapsule
        scale={layout.MainCapsule.scale}
        position={layout.MainCapsule.position}
        rotation-y={layout.MainCapsule.rotationY}
      />

      <JungleBay scale={layout.JungleBay.scale} position={layout.JungleBay.position} />

      <MferMax
        scale={layout.MferMax.scale}
        position={layout.MferMax.position}
        rotation-y={layout.MferMax.rotationY}
      />

      <Butthead
        scale={layout.Butthead.scale}
        position={layout.Butthead.position}
        rotation-y={layout.Butthead.rotationY}
        rotation-x={layout.Butthead.rotationX}
      />

      <Beavis
        scale={layout.Beavis.scale}
        position={layout.Beavis.position}
        rotation-y={layout.Beavis.rotationY}
      />

      <ApeComp
        scale={layout.ApeComp.scale}
        position={layout.ApeComp.position}
        rotation-y={layout.ApeComp.rotationY}
      />

      <RoomOptimised scale={layout.Room.scale} position={layout.Room.position} />

      <Palm scale={layout.Palm.scale} position={layout.Palm.position} />
    </group>
  );
};
