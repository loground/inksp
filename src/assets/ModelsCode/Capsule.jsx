import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function MainCapsule(props) {
  const { nodes, materials } = useGLTF('/models/surroundings/crystal_capsule-opt.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.A_CapsuleSealed_LOD0_M_CapsuleGlass_0.geometry}
        material={materials.M_CapsuleGlass}
        position={[0, 0.571, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.441}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.A_CapsuleSealed_LOD0_M_CapsuleTop_0.geometry}
        material={materials.M_CapsuleTop}
        position={[0, 0.997, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.242}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.A_CapsuleSealed_LOD0_M_CapsuleBot_0.geometry}
        material={materials.M_CapsuleBot}
        position={[0, 0.163, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.231}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.A_CapsuleSealed_LOD0_M_CapsuleSealing_0.geometry}
        material={materials.M_CapsuleSealing}
        position={[0, 0.578, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.473}
      />
    </group>
  );
}

useGLTF.preload('/models/surroundings/crystal_capsule-opt.glb');
