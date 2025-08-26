import { useRef } from 'react';
import { Text3D } from '@react-three/drei';
import { MeshBasicMaterial } from 'three';

const Text = () => {
  const textRef = useRef();

  return (
    <>
      <Text3D
        ref={textRef}
        castShadow
        font="/font/sp.json"
        lineHeight={0.8}
        letterSpacing={0.4}
        bevelEnabled
        bevelThickness={0.6}
        bevelSize={0.1}
        material={
          new MeshBasicMaterial({
            color: '#EB47AE', // Bright pink base
            metalness: 1, // Pure metal
            roughness: 0, // Perfectly reflective (mirror-like)
            emissive: '#000000', // No emissive glow for realism
            envMapIntensity: 2, // Stronger reflections for a shiny finish
          })
        }>
        INK
      </Text3D>
    </>
  );
};

export default Text;
