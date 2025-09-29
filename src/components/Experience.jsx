// Experience.jsx
import {
  Environment,
  useTexture,
  OrbitControls,
  Html,
  Hud,
  OrthographicCamera,
  shaderMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { MeshDepthMaterial } from 'three';
import { degToRad, MathUtils } from 'three/src/math/MathUtils.js';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useState, useRef } from 'react';
import { Color } from 'three';

import { Cards } from './Cards';
import { CardsMobile } from './Cardsmobile';
import { TokenBackground } from '../assets/ModelsCode/TokenInfo';

const depthMaterial = new MeshDepthMaterial();
depthMaterial.depthPacking = THREE.RGBADepthPacking;
depthMaterial.blending = THREE.NoBlending;

const TRANSITION_DURATION = 0.5;

const ScreenTransitionMaterial = shaderMaterial(
  {
    uColor: new Color('pink'),
    uProgression: 0,
    uResolution: [0, 0],
  },
  /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  /* glsl */ `
  uniform vec3 uColor;
  varying vec2 vUv;
  uniform float uProgression;
  const float pi = 3.141592654;
  uniform vec2 uResolution;

  void main() {
    vec2 uvs = vUv - 0.5;
    uvs.x *= uResolution.x / uResolution.y;
    float r = length(uvs * 0.92);
    float theta = atan(uvs.y, uvs.x);
    float spiral = fract(2.5 * theta / pi + 7.0 * pow(r, 0.4) - 4.5 * uProgression);
    float animatedProgression = smoothstep(0.25, 1.0, uProgression);
    float alphaSpiral = step(animatedProgression, spiral);
    float animatedProgressionCircle = smoothstep(0.25, 0.8, uProgression);
    float alphaCircle = step(animatedProgressionCircle, r);
    float alpha = max(alphaSpiral, alphaCircle);

    float animatedProgressionOut = smoothstep(0.5, 1.0, uProgression);
    float alphaCircleOut = step(animatedProgressionOut, r);
    alpha = min(alpha, alphaCircleOut);

    vec3 darkenColor = uColor * 0.2;
    vec3 finalColor = mix(uColor, darkenColor, smoothstep(0.42, 0.8, uProgression));

    gl_FragColor = vec4(finalColor, alpha);
  }
  `,
);

extend({ ScreenTransitionMaterial });

const ScreenTransition = ({ transition }) => {
  const transitionMaterial = useRef();
  const transitionData = useRef({
    from: 0,
    to: 0,
    started: 0,
  });

  useEffect(() => {
    transitionData.current.from = transition && transitionData.current.started ? 1 : 0;
    transitionData.current.to = transition ? 0 : 1;
    transitionData.current.started = new Date().getTime();
  }, [transition]);

  useFrame(() => {
    if (!transitionMaterial.current) {
      return;
    }
    const elapsed =
      (new Date().getTime() - transitionData.current.started) / (TRANSITION_DURATION * 1000);
    transitionMaterial.current.uniforms.uProgression.value = MathUtils.lerp(
      transitionData.current.from,
      transitionData.current.to,
      Math.min(elapsed, 1),
    );
    transitionMaterial.current.uniforms.uResolution.value = [window.innerWidth, window.innerHeight];
  });

  if (!transition) return null;

  return (
    <Hud>
      <OrthographicCamera makeDefault top={1} right={1} bottom={-1} left={-1} near={0} far={1} />
      <mesh>
        <planeGeometry args={[2, 2]} />
        <screenTransitionMaterial ref={transitionMaterial} transparent uColor={new Color('pink')} />
      </mesh>
    </Hud>
  );
};

const MOBILE_BP = 768;

function useIsMobile() {
  const { size } = useThree();
  return size.width <= MOBILE_BP;
}

// Per-mode camera/controls presets (tweak as you like)
function useLayouts(isMobile) {
  const cards = isMobile
    ? { min: 200, max: 420, minPolar: -180, maxPolar: 90, fov: 75, minAz: -95, maxAz: 95 }
    : { min: 140, max: 300, minPolar: -180, maxPolar: 90, fov: 75, minAz: -60, maxAz: 60 };

  // Token mode: a bit tighter distance and azimuth to focus the info
  const token = isMobile
    ? { min: 160, max: 320, minPolar: -160, maxPolar: 85, fov: 75, minAz: -55, maxAz: 55 }
    : { min: 110, max: 220, minPolar: -160, maxPolar: 85, fov: 75, minAz: -40, maxAz: 40 };

  return { cards, token };
}

export const Experience = ({ ...props }) => {
  const isMobile = useIsMobile();
  const { camera } = useThree();
  const { cards, token } = useLayouts(isMobile);
  const controlsRef = useRef();

  // 'cards' | 'token'
  const [mode, setMode] = useState('cards');
  const [transition, setTransition] = useState(false);

  const durationMs = TRANSITION_DURATION * 1000;

  const handleSetMode = (newMode) => {
    if (newMode === mode) return;
    setTransition(true);
    setTimeout(() => {
      setMode(newMode);
    }, durationMs / 2);
    setTimeout(() => {
      setTransition(false);
    }, durationMs);
  };

  // Set fixed FOV
  useEffect(() => {
    camera.fov = 75;
    camera.updateProjectionMatrix();
  }, [camera]);

  // On mode change, update controls limits dynamically (no remount)
  useEffect(() => {
    const ctrl = mode === 'cards' ? cards : token;
    if (controlsRef.current) {
      controlsRef.current.minDistance = ctrl.min;
      controlsRef.current.maxDistance = ctrl.max;
      controlsRef.current.minPolarAngle = degToRad(ctrl.minPolar);
      controlsRef.current.maxPolarAngle = degToRad(ctrl.maxPolar);
      controlsRef.current.minAzimuthAngle = degToRad(ctrl.minAz);
      controlsRef.current.maxAzimuthAngle = degToRad(ctrl.maxAz);
    }
  }, [mode, cards, token]);

  // Initial controls setup (use cards as default)
  useEffect(() => {
    const ctrl = cards;
    if (controlsRef.current) {
      controlsRef.current.minDistance = ctrl.min;
      controlsRef.current.maxDistance = ctrl.max;
      controlsRef.current.minPolarAngle = degToRad(ctrl.minPolar);
      controlsRef.current.maxPolarAngle = degToRad(ctrl.maxPolar);
      controlsRef.current.minAzimuthAngle = degToRad(ctrl.minAz);
      controlsRef.current.maxAzimuthAngle = degToRad(ctrl.maxAz);
    }
  }, [cards]);

  return (
    <group {...props}>
      {/* Controls no longer remount — limits updated dynamically */}
      <OrbitControls ref={controlsRef} enablePan={false} />

      {/* LIGHTS */}
      <Environment preset="sunset" />
      <pointLight position={[12, 5, 12]} intensity={1.2} decay={0.8} distance={100} color="white" />
      <directionalLight position={[-15, 5, -15]} intensity={1.2} color="skyblue" />

      {/* SCENES — instant switch, covered by transition */}
      {mode === 'cards' ? isMobile ? <CardsMobile /> : <Cards /> : <TokenBackground />}

      {/* Global background stays */}
      <Background />

      {/* Transition overlay */}
      <ScreenTransition transition={transition} />

      {/* Switcher UI — centered, 20% from bottom */}
      <Html fullscreen>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '20%',
            transform: 'translateX(-50%)',
            pointerEvents: 'auto',
          }}>
          <div className="flex items-center rounded-full bg-white/10 border border-white/20 backdrop-blur">
            <button
              onClick={() => handleSetMode('cards')}
              className={`px-4 py-2 text-sm rounded-l-full transition ${
                mode === 'cards' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
              }`}>
              Cards
            </button>
            <button
              onClick={() => handleSetMode('token')}
              className={`px-4 py-2 text-sm rounded-r-full transition ${
                mode === 'token' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
              }`}>
              Token
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
};

export const Background = () => {
  const map = useTexture('/last.webp');
  map.wrapS = THREE.RepeatWrapping;
  map.repeat.x = -1;
  map.offset.x = 1;
  map.needsUpdate = true;

  return (
    <mesh scale={1} rotation-y={Math.PI / 2}>
      <sphereGeometry args={[320, 80, 80]} />
      <meshBasicMaterial side={THREE.BackSide} map={map} toneMapped={false} />
    </mesh>
  );
};
