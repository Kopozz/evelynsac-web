import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { 
  Lightning, 
  Clock, 
  Headset,
  Play,
  ArrowRight,
  Sparkle
} from '@phosphor-icons/react';

// Animated fiber optic cable effect
function FiberOpticLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const lines = [];
  for (let i = 0; i < 15; i++) {
    const startY = (Math.random() - 0.5) * 10;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-15, startY, -5),
      new THREE.Vector3(-5, startY + Math.sin(i) * 2, -3),
      new THREE.Vector3(5, startY - Math.cos(i) * 2, -3),
      new THREE.Vector3(15, startY + Math.random() * 2, -5),
    ]);
    
    lines.push(
      <mesh key={i}>
        <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
        <meshBasicMaterial 
          color={i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#14b8a6' : '#0ea5e9'} 
          transparent 
          opacity={0.6}
        />
      </mesh>
    );
  }

  return <group ref={linesRef}>{lines}</group>;
}

// Animated data particles flowing through
function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  const velocities: number[] = [];

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    velocities.push(0.02 + Math.random() * 0.05);
  }

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3] += velocities[i];
        if (positions[i * 3] > 15) {
          positions[i * 3] = -15;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#22d3ee"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Hero 3D Scene
export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
          <FiberOpticLines />
          <DataParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Speedometer animated component
export function AnimatedSpeedometer({ speed = 300 }: { speed?: number }) {
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const speedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate speed counter
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCurrentSpeed(Math.floor(speed * easeOutQuart));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [speed]);

  const rotation = (currentSpeed / 500) * 180 - 90; // -90 to 90 degrees

  return (
    <div ref={speedRef} className="relative w-48 h-24 overflow-hidden">
      {/* Speedometer background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-t-full border-t-4 border-l-4 border-r-4 border-cyan-500/30" />
      
      {/* Speed marks */}
      <div className="absolute inset-0 flex justify-between px-4 pt-2">
        <span className="text-xs text-gray-500">0</span>
        <span className="text-xs text-cyan-400">250</span>
        <span className="text-xs text-gray-500">500</span>
      </div>
      
      {/* Needle */}
      <div 
        className="absolute bottom-0 left-1/2 w-1 h-20 bg-gradient-to-t from-cyan-500 to-cyan-300 origin-bottom transition-transform duration-100"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      />
      
      {/* Center dot */}
      <div className="absolute bottom-0 left-1/2 w-4 h-4 -translate-x-1/2 translate-y-1/2 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50" />
      
      {/* Speed value */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-center">
        <span className="text-3xl font-bold text-white">{currentSpeed}</span>
        <span className="text-sm text-cyan-400 ml-1">Mbps</span>
      </div>
    </div>
  );
}

// Premium Hero Component
export function PremiumHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo('.hero-badge',
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    .fromTo('.hero-title-line',
      { opacity: 0, y: 100, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, stagger: 0.2, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo('.hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.hero-feature',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero-cta-primary',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.3'
    )
    .fromTo('.hero-cta-secondary',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo('.hero-speedometer',
      { opacity: 0, scale: 0.5, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
      '-=0.5'
    );
  }, []);

  const features = [
    { icon: Lightning, text: 'Hasta 300 Mbps', color: 'text-yellow-400' },
    { icon: Clock, text: '99.9% Uptime', color: 'text-green-400' },
    { icon: Headset, text: 'Soporte 24/7', color: 'text-blue-400' },
  ];

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-transparent to-[#0a0f1a]/90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/50 via-transparent to-[#0a0f1a]/50 z-10" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Sparkle size={16} weight="fill" className="text-yellow-400" />
              <span className="text-sm font-medium text-cyan-300">#1 en Fibra Óptica del Perú</span>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="hero-title-line block text-white">Internet</span>
              <span className="hero-title-line block bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Ultra Rápido</span>
              <span className="hero-title-line block text-white">para el Futuro</span>
            </h1>
            
            {/* Description */}
            <p className="hero-description text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
              Conecta tu hogar con la mejor tecnología de fibra óptica. 
              Velocidad simétrica, estabilidad garantizada.
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="hero-feature flex items-center gap-2">
                  <feature.icon size={24} weight="duotone" className={feature.color} />
                  <span className="text-gray-300 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="hero-cta-primary group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  Ver Planes
                  <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button className="hero-cta-secondary flex items-center gap-3 text-gray-300 hover:text-white px-6 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Play size={20} weight="fill" className="text-cyan-400 ml-0.5" />
                </div>
                <span className="font-medium">Ver Demo</span>
              </button>
            </div>
          </div>
          
          {/* Right content - Speedometer */}
          <div className="hero-speedometer hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
              
              {/* Main speedometer card */}
              <div className="relative glass rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-4">
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Velocidad Actual</span>
                </div>
                <AnimatedSpeedometer speed={300} />
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">5ms</div>
                    <div className="text-xs text-gray-500">Ping</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">300</div>
                    <div className="text-xs text-gray-500">Download</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">300</div>
                    <div className="text-xs text-gray-500">Upload</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Loading screen component
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Animate out
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              scale: 1.1,
              duration: 0.5,
              ease: 'power2.in',
              onComplete
            });
          }
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#0a0f1a] flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
            <Lightning size={28} weight="fill" className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white">EVELYN SAC</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      {/* Progress text */}
      <div className="mt-4 text-gray-500 text-sm">
        Cargando experiencia... {Math.floor(Math.min(progress, 100))}%
      </div>
    </div>
  );
}
