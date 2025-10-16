import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF, useVideoTexture, Html } from '@react-three/drei';

function VideoScreen({ src = '/movie.mp4', width = 10, aspect = 16 / 9, ...props }) {
  const height = useMemo(() => width / aspect, [width, aspect]);

  const texture = useVideoTexture(src, {
    start: false, // don't auto-play
    loop: true,
    muted: false,
    playsInline: true,
    crossOrigin: 'anonymous',
  });

  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Grab the <video> element once it's created and keep UI state in sync
  useEffect(() => {
    const v = texture?.image;
    if (!v || !(v instanceof HTMLVideoElement)) return;

    videoRef.current = v;

    // initialize button state from real element
    setPlaying(!v.paused && !v.ended);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);

    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, [texture?.image]);

  // Hard stop the video when this component unmounts (leaving cinema mode)
  useEffect(() => {
    return () => {
      const v = videoRef.current;
      try {
        if (v) {
          v.pause();
          v.currentTime = 0; // rewind
          v.muted = true; // safety against brief audio blips
        }
      } catch {}
      // also dispose the texture to be safe (optional)
      try {
        texture?.dispose?.();
      } catch {}
    };
  }, [texture]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused || v.ended) {
        // play() returns a promise in modern browsers
        await v.play();
      } else {
        v.pause();
      }
      // 'playing' is driven by event listeners; no need to setState here
    } catch (err) {
      console.error('Video play/pause failed:', err);
    }
  };

  return (
    <>
      <mesh {...props}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      <Html
        scale={80}
        position={[30, -250, 30]}
        rotation-x={-Math.PI / 2}
        rotation-z={Math.PI}
        occlude
        style={{ pointerEvents: 'auto' }}>
        <div className="flex gap-2 items-center justify-center">
          <button
            onClick={togglePlay}
            className="px-4 text-3xl font-sp py-1 text-white hover:text-yellow-300 rounded-lg text-outline-soft transition">
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => window.open('https://manifold.xyz/@ignatev_ink/id/4133746928', '_blank')}
            className="px-4 text-3xl font-sp py-1 text-white rounded-lg text-outline-soft hover:text-yellow-300 transition">
            Mint
          </button>
        </div>
      </Html>
    </>
  );
}

export function Cinema(props) {
  const { nodes, materials } = useGLTF('/models/cinema/scene.gltf');

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {/* --- your original meshes --- */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2.geometry}
          material={materials.MetalTrim}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_1.geometry}
          material={materials.Color_05}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_2.geometry}
          material={materials.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_3.geometry}
          material={materials.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_4.geometry}
          material={materials.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_5.geometry}
          material={materials.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3.geometry}
          material={materials.Color_08}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_1.geometry}
          material={materials.Color_07}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_2.geometry}
          material={materials.Color_09}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_3.geometry}
          material={materials.Color_09}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_4.geometry}
          material={materials.Color_11}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_5.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_6.geometry}
          material={materials.Fabric_Color}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_7.geometry}
          material={materials.Color_03}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_8.geometry}
          material={materials.Color_02}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_9.geometry}
          material={materials.Color_01}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_6.geometry}
          material={materials.GlassWindow}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_7.geometry}
          material={materials.GlassDoor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3_10.geometry}
          material={materials.Black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2_8.geometry}
          material={materials.GlassDoor02}
        />
        <lineSegments geometry={nodes.Material2_9.geometry} material={materials.edge_color000255} />

        {/* --- drop-in video screen; move/rotate/scale as needed --- */}
        <VideoScreen
          src="/movie.mp4"
          width={320} // tweak to match your screen frame
          aspect={10 / 8}
          position={[-30, -330, 160]} // <-- you'll replace these
          rotation={[1.5, 3.2, -0.005]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/cinema/scene.gltf');
