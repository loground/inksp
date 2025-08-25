import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations, useFBX } from '@react-three/drei';

export function JungleBay(props) {
  const group = useRef();

  // Load your GLB character (the mesh and skeleton you’ll animate)
  const { nodes, materials } = useGLTF('/models/apee.glb');

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
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, -0.02, 0]} scale={0.005}>
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials['body_mtl.001']}
            skeleton={nodes.body.skeleton}
          />
          <group name="jungle_bay">
            <skinnedMesh
              name="JbackLP002"
              geometry={nodes.JbackLP002.geometry}
              material={materials['TT_checker_2048x2048_UV_GRID.002']}
              skeleton={nodes.JbackLP002.skeleton}
            />
            <skinnedMesh
              name="JbackLP002_1"
              geometry={nodes.JbackLP002_1.geometry}
              material={materials['Iris.005']}
              skeleton={nodes.JbackLP002_1.skeleton}
            />
            <skinnedMesh
              name="JbackLP002_2"
              geometry={nodes.JbackLP002_2.geometry}
              material={materials['Mouth.002']}
              skeleton={nodes.JbackLP002_2.skeleton}
            />
            <skinnedMesh
              name="JbackLP002_3"
              geometry={nodes.JbackLP002_3.geometry}
              material={materials['smoke_cig_white_mtl.001']}
              skeleton={nodes.JbackLP002_3.skeleton}
            />
            <skinnedMesh
              name="JbackLP002_4"
              geometry={nodes.JbackLP002_4.geometry}
              material={materials['smoke_mtl.001']}
              skeleton={nodes.JbackLP002_4.skeleton}
            />
            <skinnedMesh
              name="JbackLP002_5"
              geometry={nodes.JbackLP002_5.geometry}
              material={materials['headphones_pink_mtl.001']}
              skeleton={nodes.JbackLP002_5.skeleton}
            />
            <skinnedMesh
              name="JbackLP002_6"
              geometry={nodes.JbackLP002_6.geometry}
              material={materials['shirt_hoodie_up_dark_gray_mtl.001']}
              skeleton={nodes.JbackLP002_6.skeleton}
            />
            <skinnedMesh
              name="JbackLP002_7"
              geometry={nodes.JbackLP002_7.geometry}
              material={materials['heres_my_signature_mtl.001']}
              skeleton={nodes.JbackLP002_7.skeleton}
            />
            <skinnedMesh
              name="jungle_bay_cornea"
              geometry={nodes.jungle_bay_cornea.geometry}
              material={materials['Cornia.004']}
              skeleton={nodes.jungle_bay_cornea.skeleton}
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
          {/* This bone hierarchy needs to be present under the same group for binding */}
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/apee.glb');
useFBX.preload('/models/Floating.fbx');
