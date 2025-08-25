import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Palm(props) {
  const { nodes, materials } = useGLTF('/models/surroundings/palm.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Palm_Tree_1_Plam_Tree_0.geometry}
        material={materials.Plam_Tree}
        position={[0.048, 1.61, -0.01]}
        scale={1.608}
      />
    </group>
  );
}

useGLTF.preload('/models/surroundings/palm.glb');
