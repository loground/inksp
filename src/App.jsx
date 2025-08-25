import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';

function App() {
  return (
    <Canvas
      camera={{
        position: [8, 12, 33],
        fov: 80,
      }}>
      {/* <fog attach="fog" args={['#343315', 40, 80]} /> */}
      <color attach="background" args={['#141300']} />
      <Experience />
    </Canvas>
  );
}

export default App;
