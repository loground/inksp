import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const Background = () => {
  const meshRef = useRef();
  const startTime = useRef(performance.now() / 1000);
  const { size } = useThree();

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(size.width, size.height, 1) },
      },
      // Fullscreen quad in clip space
      vertexShader: `
        void main() {
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform float iTime;
        uniform vec3 iResolution;

        // Tunables
        #define SLICES           25.0
        #define START_AMPLITUDE  0.001
        #define START_FREQUENCY  0.25
        #define START_DENSITY    0.0
        #define ANIMATION_SPEED  0.025
        #define RADIUS           0.4

        // FBM helpers
        mat3 m = mat3( 0.00,  0.10,  0.60,
                      -0.80,  0.36, -0.48,
                      -0.60, -0.48,  0.14 );

        float hash(float n){ return fract(sin(n)*43.5453123); }

        float noise(in vec3 x){
          vec3 p=floor(x), f=fract(x);
          f=f*f*(3.0-2.0*f);
          float n=p.x+p.y*57.0+113.0*p.z;
          float res=mix(mix(mix(hash(n+0.0),hash(n+1.0),f.x),
                            mix(hash(n+57.0),hash(n+58.0),f.x),f.y),
                        mix(mix(hash(n+113.0),hash(n+114.0),f.x),
                            mix(hash(n+170.0),hash(n+171.0),f.x),f.y),f.z);
          return res;
        }

        float fbm(vec3 p){
          float f=0.0;
          f+=0.5*noise(p);
          p=m*p*2.02;
          f+=0.15*noise(p);
          p=m*p*2.03;
          f+=0.125*noise(p);
          return f/0.875;
        }

        vec3 gradient(float s){
          return vec3(0.7725, 0.9137, 0.0706);
        }

        bool intersectSphere(vec3 origin, vec3 direction, out float tmin, out float tmax){
          float a=dot(direction,direction);
          float b=2.0*dot(origin,direction);
          float c=dot(origin,origin)-RADIUS*RADIUS;
          float disc=b*b-4.0*a*c;
          tmin=tmax=0.0;
          if(disc<=0.0) return false;
          float sdisc=sqrt(disc);
          float t0=(-b - sdisc)/(2.0*a);
          float t1=(-b + sdisc)/(2.0*a);
          tmax=t1;
          if(t0>=0.0) tmin=t0;
          return true;
        }

        // Fixed camera (no mouse)
        vec2 rt(vec2 x,float y){ return vec2(cos(y)*x.x - sin(y)*x.y, sin(y)*x.x + cos(y)*x.y); }

        void mainImage(out vec4 fragColor, in vec2 fragCoord){
          // normalized & aspect-corrected pixel coordinate
          vec2 p = (fragCoord.xy / iResolution.xy) * 2.0 ;
          
          p.x *= iResolution.x / 1.5 / iResolution.y / 1.2;
          

          // fixed camera orientation
          vec3 oo = vec3(-0.5, -0.7, 0.7);
          vec3 od = normalize(vec3(p.x, p.y, -2.0));
          vec3 o, d;
          // small constant yaw for interest
          float yaw = 0.3;
          o.xz = rt(oo.xz, yaw);
          o.y  = oo.y;
          d.xz = rt(od.xz, yaw);
          d.y  = od.y;

          vec3 col = vec3(0.0784, 0.0745, 0.0);
          float tmin, tmax;
          if (intersectSphere(o, d, tmin, tmax)) {
            for (float i = 0.0; i < SLICES; i += 1.0) {
              float t = tmin + i / SLICES;
              if (t > tmax) break;
              vec3 curpos = o + d * t;

              float s = (RADIUS - length(curpos)) * (1.5 / RADIUS);
              
              s = max(s, 0.0);
              s *= 1.1;

              float a = START_AMPLITUDE;
              float b = START_FREQUENCY;
              float dd = START_DENSITY;
              for (int j = 0; j < 3; j++) {
                dd += 0.5 / abs((fbm(5.0 * curpos * b + ANIMATION_SPEED * iTime / b) * 2.0 - 1.0) / a);
                b *= 2.0;
                a /= 2.0;
              }

              col += gradient(s) * max(dd * s, 0.0);
            }
          }
          

          fragColor = vec4(col, 1.0); // opaque
        }

        void main(){
          vec4 c;
          mainImage(c, gl_FragCoord.xy);
          gl_FragColor = c;
        }
      `,
      transparent: false,
      depthTest: false, // draw regardless of depth
      depthWrite: false, // don't affect the depth buffer
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // create once

  useFrame(() => {
    const t = performance.now() / 1000 - startTime.current;
    if (!meshRef.current) return;
    const { material } = meshRef.current;
    material.uniforms.iTime.value = t;
    material.uniforms.iResolution.value.set(size.width, size.height, 1);
  });

  // keep iResolution in sync on mount/resize
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.iResolution.value.set(size.width, size.height, 1);
    }
  }, [size.width, size.height]);

  return (
    <mesh ref={meshRef} renderOrder={-1} frustumCulled={false}>
      {/* Fullscreen quad: goes straight to NDC via vertex shader */}
      <planeGeometry args={[2, 2]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export default Background;
