import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function ApeComp(props) {
  const { nodes, materials } = useGLTF('/models/surroundings/ape.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.material}
        position={[0, -0.256, 0.211]}
        scale={0.382}
      />
    </group>
  );
}

useGLTF.preload('/models/surroundings/ape.glb');
