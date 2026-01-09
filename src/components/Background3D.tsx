import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// Floating particles that follow mouse
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Animated glowing orbs
function GlowingSpheres() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, 64, 64]} position={[-4, 2, -5]}>
          <MeshDistortMaterial
            color="#06b6d4"
            transparent
            opacity={0.3}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere args={[1, 64, 64]} position={[4, -1, -4]}>
          <MeshDistortMaterial
            color="#14b8a6"
            transparent
            opacity={0.25}
            distort={0.3}
            speed={3}
          />
        </Sphere>
      </Float>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.2}>
        <Sphere args={[0.8, 64, 64]} position={[0, 3, -6]}>
          <MeshDistortMaterial
            color="#0ea5e9"
            transparent
            opacity={0.2}
            distort={0.5}
            speed={1.5}
          />
        </Sphere>
      </Float>
    </>
  );
}

// Wave mesh animation
function WavePlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const waveX = Math.sin(x * 2 + state.clock.elapsedTime) * 0.1;
        const waveY = Math.sin(y * 2 + state.clock.elapsedTime) * 0.1;
        positions.setZ(i, waveX + waveY);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, -2]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <meshStandardMaterial
        color="#0a0f1a"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

// Main 3D Background Component
export function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#14b8a6" />
          
          <ParticleField />
          <GlowingSpheres />
          <WavePlane />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Simpler alternative for performance
export function Background3DSimple() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Gradient mesh background (CSS + 3D hybrid)
export function GradientMeshBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* CSS Gradient Orbs */}
      <div className="absolute w-[800px] h-[800px] -top-[400px] -left-[400px] bg-gradient-radial from-cyan-500/30 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute w-[600px] h-[600px] -bottom-[300px] -right-[300px] bg-gradient-radial from-teal-500/25 via-teal-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-blue-500/20 via-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* 3D Canvas overlay */}
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
