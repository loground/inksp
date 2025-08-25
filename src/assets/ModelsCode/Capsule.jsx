import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function MainCapsule(props) {
  const { nodes, materials } = useGLTF('/models/crystal_capsule.glb');
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={6.667}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.A_CapsuleSealed_LOD0_M_CapsuleGlass_0.geometry}
              material={materials.M_CapsuleGlass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.A_CapsuleSealed_LOD0_M_CapsuleTop_0.geometry}
              material={materials.M_CapsuleTop}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.A_CapsuleSealed_LOD0_M_CapsuleBot_0.geometry}
              material={materials.M_CapsuleBot}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.A_CapsuleSealed_LOD0_M_CapsuleSealing_0.geometry}
              material={materials.M_CapsuleSealing}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/crystal_capsule.glb');
