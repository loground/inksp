import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations, useFBX } from '@react-three/drei';

export function JungleBay(props) {
  const group = useRef();

  // Load your GLB character (the mesh and skeleton you’ll animate)
  const { nodes, materials } = useGLTF('/models/apee-opt.glb');

  // Load the FBX that contains the animation you want
  const fbx = useFBX('/models/Floating.fbx');

  // Optional but often helpful: FBX files may contain scale tracks you don’t want
  // (uncomment if your model scales weirdly during playback)
  // fbx.animations.forEach(clip => {
  //   clip.tracks = clip.tracks.filter(t => !t.name.endsWith('.scale'));
  // });

  // Bind FBX animations to the GLB skeleton under `group`
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
      <group>
        <group name="Armature" rotation={[Math.PI / 2, -0.02, 0]} scale={0.005}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials['body_mtl.001']}
            skeleton={nodes.body.skeleton}
          />
          <skinnedMesh
            name="jungle_bay_cornea"
            geometry={nodes.jungle_bay_cornea.geometry}
            material={materials['Cornia.004']}
            skeleton={nodes.jungle_bay_cornea.skeleton}
          />
          <group name="jungle_bay">
            <skinnedMesh
              name="jungle_bay_primitive0"
              geometry={nodes.jungle_bay_primitive0.geometry}
              material={materials['TT_checker_2048x2048_UV_GRID.002']}
              skeleton={nodes.jungle_bay_primitive0.skeleton}
            />
            <skinnedMesh
              name="jungle_bay_primitive1"
              geometry={nodes.jungle_bay_primitive1.geometry}
              material={materials['Iris.005']}
              skeleton={nodes.jungle_bay_primitive1.skeleton}
            />
            <skinnedMesh
              name="jungle_bay_primitive2"
              geometry={nodes.jungle_bay_primitive2.geometry}
              material={materials['Mouth.002']}
              skeleton={nodes.jungle_bay_primitive2.skeleton}
            />
            <skinnedMesh
              name="jungle_bay_primitive3"
              geometry={nodes.jungle_bay_primitive3.geometry}
              material={materials['smoke_cig_white_mtl.001']}
              skeleton={nodes.jungle_bay_primitive3.skeleton}
            />
            <skinnedMesh
              name="jungle_bay_primitive4"
              geometry={nodes.jungle_bay_primitive4.geometry}
              material={materials['smoke_mtl.001']}
              skeleton={nodes.jungle_bay_primitive4.skeleton}
            />
            <skinnedMesh
              name="jungle_bay_primitive5"
              geometry={nodes.jungle_bay_primitive5.geometry}
              material={materials['headphones_pink_mtl.001']}
              skeleton={nodes.jungle_bay_primitive5.skeleton}
            />
            <skinnedMesh
              name="jungle_bay_primitive6"
              geometry={nodes.jungle_bay_primitive6.geometry}
              material={materials['shirt_hoodie_up_dark_gray_mtl.001']}
              skeleton={nodes.jungle_bay_primitive6.skeleton}
            />
            <skinnedMesh
              name="jungle_bay_primitive7"
              geometry={nodes.jungle_bay_primitive7.geometry}
              material={materials['heres_my_signature_mtl.001']}
              skeleton={nodes.jungle_bay_primitive7.skeleton}
            />
          </group>
          <skinnedMesh
            name="shirt_hoodie_dark_gray"
            geometry={nodes.shirt_hoodie_dark_gray.geometry}
            material={materials['shirt_hoodie_dark_gray_mtl.001']}
            skeleton={nodes.shirt_hoodie_dark_gray.skeleton}
          />
          <skinnedMesh
            name="type_ape002"
            geometry={nodes.type_ape002.geometry}
            material={materials['type_ape_mtl.001']}
            skeleton={nodes.type_ape002.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/apee-opt.glb');
useFBX.preload('/models/Floating.fbx');
