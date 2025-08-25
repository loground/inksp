import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useFBX } from '@react-three/drei';

export function Butthead(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/beavisAndButthead/buttheadfinal.glb');
  const fbx = useFBX('/models/beavisAndButthead/Sitting_talking.fbx');

  const { actions, mixer } = useAnimations(fbx.animations, group);

  useEffect(() => {
    // Ensure the mixer targets the GLB skeleton in `group`
    if (mixer && group.current) {
      // @ts-expect-error internal but harmless: makes sure mixer roots at your group
      mixer._root = group.current;
    }

    // Play the first (or a named) action
    const first = Object.values(actions)[0];
    first?.reset().fadeIn(0.3).play();

    return () => {
      Object.values(actions).forEach((a) => a?.stop());
    };
  }, [actions, mixer]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          geometry={nodes.Object_88.geometry}
          material={materials.butthead_skin}
          skeleton={nodes.Object_88.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_91.geometry}
          material={materials.butthead_skin}
          skeleton={nodes.Object_91.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_94.geometry}
          material={materials.butthead_gums}
          skeleton={nodes.Object_94.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_97.geometry}
          material={materials.butthead_hair}
          skeleton={nodes.Object_97.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_100.geometry}
          material={materials.butthead_skin}
          skeleton={nodes.Object_100.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_103.geometry}
          material={materials.butthead_teeth}
          skeleton={nodes.Object_103.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_106.geometry}
          material={materials.butthead_eyebrows}
          skeleton={nodes.Object_106.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_109.geometry}
          material={materials.butthead_pupils}
          skeleton={nodes.Object_109.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_112.geometry}
          material={materials.butthead_skin}
          skeleton={nodes.Object_112.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_115.geometry}
          material={materials.butthead_teeth}
          skeleton={nodes.Object_115.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_118.geometry}
          material={materials.butthead_eyebrows}
          skeleton={nodes.Object_118.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_121.geometry}
          material={materials.butthead_pupils}
          skeleton={nodes.Object_121.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_124.geometry}
          material={materials.butthead_shirt}
          skeleton={nodes.Object_124.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_127.geometry}
          material={materials.butthead_shirt_tex}
          skeleton={nodes.Object_127.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_130.geometry}
          material={materials.butthead_shoes}
          skeleton={nodes.Object_130.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_133.geometry}
          material={materials.butthead_shorts}
          skeleton={nodes.Object_133.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_136.geometry}
          material={materials.butthead_socks}
          skeleton={nodes.Object_136.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_139.geometry}
          material={materials.butthead_teeth}
          skeleton={nodes.Object_139.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/beavisAndButthead/butt-head.glb');
useFBX.preload('/models/beavisAndButthead/CheerSit.fbx');
