import { CameraControls, Environment, Float, Gltf, Text } from '@react-three/drei';
import * as THREE from 'three';
import { MeshDepthMaterial } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { MainCapsule } from '../assets/ModelsCode/Capsule';
import { JungleBay } from '../assets/ModelsCode/Ape';

import { FinalRoom } from '../assets/ModelsCode/RoomFixed';
import { MferMax } from '../assets/ModelsCode/MaxMfer';
import Background from './Background';
import { Butthead } from '../assets/ModelsCode/Butthead';
import { Beavis } from '../assets/ModelsCode/Beavis';
import { ApeComp } from '../assets/ModelsCode/ComputerApe';
const depthMaterial = new MeshDepthMaterial();
depthMaterial.depthPacking = THREE.RGBADepthPacking;
depthMaterial.blending = THREE.NoBlending;

export const Experience = ({ ...props }) => {
  return (
    <group {...props}>
      <CameraControls
        minDistance={20}
        maxDistance={70}
        minPolarAngle={degToRad(-180)}
        maxPolarAngle={degToRad(80)}
      />
      {/* LIGHTS */}
      <Environment preset="sunset" />
      <pointLight position={[12, 5, 12]} intensity={1.2} decay={0.8} distance={100} color="white" />
      <directionalLight position={[-15, 5, -15]} intensity={1.2} color="skyblue" />

      {/* <Background /> */}
      {/* SCENE */}
      <MainCapsule scale={15} position={[25, -8, 0]} rotation-y={Math.PI / 5} />

      <JungleBay scale={5} position={[25, -4, 0]} />

      <MferMax scale={15} position={[-8, -8, 5.5]} rotation-y={Math.PI / 1.4} />
      <Butthead scale={3} position={[-2, -2, 12.5]} rotation-y={Math.PI} rotation-x={Math.PI / 2} />
      <Beavis scale={10} position={[14, -5.5, 8.5]} rotation-y={Math.PI * 1.2} />
      <ApeComp scale={3} position={[-22, 5.5, 10]} rotation-y={Math.PI / 1} />

      <FinalRoom scale={10} position={[-25, 20, -12]} />
    </group>
  );
};
