import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Beavis(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/beavisAndButthead/beavisChlen.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const first = Object.values(actions)[0];
    first?.reset().fadeIn(0.3).play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="Object_11"
            geometry={nodes.Object_11.geometry}
            material={materials['BEAVISSKIN.001']}
            skeleton={nodes.Object_11.skeleton}
          />
          <skinnedMesh
            name="Object_13"
            geometry={nodes.Object_13.geometry}
            material={materials['BEAVISSKIN.001']}
            skeleton={nodes.Object_13.skeleton}
          />
          <skinnedMesh
            name="Object_15"
            geometry={nodes.Object_15.geometry}
            material={materials['BEAVISCLOTHES.005']}
            skeleton={nodes.Object_15.skeleton}
          />
          <skinnedMesh
            name="Object_17"
            geometry={nodes.Object_17.geometry}
            material={materials['BEAVISCLOTHES.003']}
            skeleton={nodes.Object_17.skeleton}
          />
          <skinnedMesh
            name="Object_19"
            geometry={nodes.Object_19.geometry}
            material={materials['BEAVISCLOTHES.001']}
            skeleton={nodes.Object_19.skeleton}
          />
          <skinnedMesh
            name="Object_21"
            geometry={nodes.Object_21.geometry}
            material={materials['BEAVISSKIN.001']}
            skeleton={nodes.Object_21.skeleton}
          />
          <skinnedMesh
            name="Object_23"
            geometry={nodes.Object_23.geometry}
            material={materials['BEAVISSKIN.001']}
            skeleton={nodes.Object_23.skeleton}
          />
          <skinnedMesh
            name="Object_25"
            geometry={nodes.Object_25.geometry}
            material={materials['BEAVISCLOTHES.006']}
            skeleton={nodes.Object_25.skeleton}
          />
          <skinnedMesh
            name="Object_27"
            geometry={nodes.Object_27.geometry}
            material={materials['BEAVISCLOTHES.004']}
            skeleton={nodes.Object_27.skeleton}
          />
          <skinnedMesh
            name="Object_29"
            geometry={nodes.Object_29.geometry}
            material={materials['BEAVISCLOTHES.002']}
            skeleton={nodes.Object_29.skeleton}
          />
          <skinnedMesh
            name="Object_31"
            geometry={nodes.Object_31.geometry}
            material={materials['BEAVISHAIR.003']}
            skeleton={nodes.Object_31.skeleton}
          />
          <skinnedMesh
            name="Object_33"
            geometry={nodes.Object_33.geometry}
            material={materials['BEAVISHAIR.004']}
            skeleton={nodes.Object_33.skeleton}
          />
          <skinnedMesh
            name="Object_35"
            geometry={nodes.Object_35.geometry}
            material={materials['BEAVISHAIR.007']}
            skeleton={nodes.Object_35.skeleton}
          />
          <skinnedMesh
            name="Object_37"
            geometry={nodes.Object_37.geometry}
            material={materials['BEAVISHAIR.009']}
            skeleton={nodes.Object_37.skeleton}
          />
          <skinnedMesh
            name="Object_39"
            geometry={nodes.Object_39.geometry}
            material={materials['BEAVISHAIR.008']}
            skeleton={nodes.Object_39.skeleton}
          />
          <skinnedMesh
            name="Object_41"
            geometry={nodes.Object_41.geometry}
            material={materials['BEAVISHAIR.006']}
            skeleton={nodes.Object_41.skeleton}
          />
          <skinnedMesh
            name="Object_43"
            geometry={nodes.Object_43.geometry}
            material={materials['BEAVISHAIR.005']}
            skeleton={nodes.Object_43.skeleton}
          />
          <skinnedMesh
            name="Object_7"
            geometry={nodes.Object_7.geometry}
            material={materials['BEAVISHAIR.002']}
            skeleton={nodes.Object_7.skeleton}
          />
          <skinnedMesh
            name="Object_9"
            geometry={nodes.Object_9.geometry}
            material={materials['BEAVISSKIN.001']}
            skeleton={nodes.Object_9.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/beavisAndButthead/beavisChlen.glb');
