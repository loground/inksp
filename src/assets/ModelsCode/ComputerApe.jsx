import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function ApeComp(props) {
  const { nodes, materials } = useGLTF('/models/surroundings/ape-opt.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.material}
        position={[-0.001, 1.961, 0.6]}
        scale={2.216}
      />
    </group>
  );
}

useGLTF.preload('/models/surroundings/ape-opt.glb');
