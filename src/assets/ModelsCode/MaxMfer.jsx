import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useFBX } from '@react-three/drei';

export function MferMax(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/mfer/mfer-opt.glb');
  const fbx = useFBX('/models/mfer/Silly_Dancing.fbx');

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
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, -0.02, 0]} scale={0.005}>
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials['body_mtl.001']}
            skeleton={nodes.body.skeleton}
          />
          <skinnedMesh
            name="eyes_normal"
            geometry={nodes.eyes_normal.geometry}
            material={materials['eyes_normal_mtl.001']}
            skeleton={nodes.eyes_normal.skeleton}
          />
          <skinnedMesh
            name="hat_bandana_dark_gray"
            geometry={nodes.hat_bandana_dark_gray.geometry}
            material={materials['hat_bandana_dark_gray_mtl.001']}
            skeleton={nodes.hat_bandana_dark_gray.skeleton}
          />
          <skinnedMesh
            name="headphones_black"
            geometry={nodes.headphones_black.geometry}
            material={materials['headphones_black_mtl.001']}
            skeleton={nodes.headphones_black.skeleton}
          />
          <skinnedMesh
            name="heres_my_signature"
            geometry={nodes.heres_my_signature.geometry}
            material={materials['heres_my_signature_mtl.001']}
            skeleton={nodes.heres_my_signature.skeleton}
          />
          <skinnedMesh
            name="mouth_smile"
            geometry={nodes.mouth_smile.geometry}
            material={materials['mouth_smile_mtl.001']}
            skeleton={nodes.mouth_smile.skeleton}
          />
          <skinnedMesh
            name="smoke"
            geometry={nodes.smoke.geometry}
            material={materials['smoke_mtl.001']}
            skeleton={nodes.smoke.skeleton}
          />
          <skinnedMesh
            name="smoke_cig_black"
            geometry={nodes.smoke_cig_black.geometry}
            material={materials['smoke_cig_black_mtl.001']}
            skeleton={nodes.smoke_cig_black.skeleton}
          />
          <skinnedMesh
            name="type_plain"
            geometry={nodes.type_plain.geometry}
            material={materials['type_plain_mtl.001']}
            skeleton={nodes.type_plain.skeleton}
          />
          <skinnedMesh
            name="watch_sub_black"
            geometry={nodes.watch_sub_black.geometry}
            material={materials['watch_sub_black_mtl.001']}
            skeleton={nodes.watch_sub_black.skeleton}
          />
          <skinnedMesh
            name="watch_sub_strap_white"
            geometry={nodes.watch_sub_strap_white.geometry}
            material={materials['watch_sub_strap_white_mtl.001']}
            skeleton={nodes.watch_sub_strap_white.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}
useGLTF.preload('/models/mfer/mfer-opt.glb');
useFBX.preload('/models/mfer/Silly_Dancing.fbx');
