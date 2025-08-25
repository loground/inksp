import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';

import LoaderOverlay from './components/Loader';

function App() {
  return (
    <Canvas camera={{ position: [8, 12, 33], fov: 80 }} gl={{ antialias: true }}>
      {/* Everything that needs R3F hooks must be inside Canvas */}
      <Suspense fallback={<LoaderOverlay />}>
        <color attach="background" args={['#141300']} />
        <Experience />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

export default App;
