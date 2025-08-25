import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';

import LoaderOverlay from './components/Loader';

function App() {
  return (
    <>
      <Canvas camera={{ position: [8, 12, 33], fov: 80 }} gl={{ antialias: true }}>
        {/* Everything that needs R3F hooks must be inside Canvas */}
        <Suspense fallback={<LoaderOverlay />}>
          <color attach="background" args={['#141300']} />
          <Experience />
          <Preload all />
        </Suspense>
      </Canvas>
      <a href="https://ignatevink.fun" style={styles.button}>
        Get in
      </a>
    </>
  );
}

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#8b5cf6',
    color: '#fff',
    padding: '12px 28px',
    borderRadius: '999px',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    transition: 'background 0.2s ease',
  },
};

export default App;
