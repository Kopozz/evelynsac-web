import { useEffect, useMemo, useCallback } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import confetti from 'canvas-confetti';

// ============================================
// PARTICLES BACKGROUND - Fiber Optic Effect
// ============================================
export function ParticlesBackground() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const particlesOptions = useMemo(() => ({
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 60,
    particles: {
      color: { value: ["#06b6d4", "#14b8a6", "#22d3ee"] },
      links: {
        color: "#06b6d4",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none" as const,
        random: true,
        straight: false,
        outModes: { default: "bounce" as const },
      },
      number: {
        density: { enable: true, area: 800 },
        value: 60,
      },
      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: { enable: true, speed: 1, minimumValue: 0.1 },
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      options={particlesOptions}
    />
  );
}

// ============================================
// ANIMATED COUNTER
// ============================================
interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}

export function AnimatedCounter({ end, suffix = '', prefix = '', decimals = 0, duration = 2.5 }: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <span ref={ref}>
      {inView ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator=","
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
}

// ============================================
// TYPING ANIMATION HERO (Using RotatingText)
// ============================================
import RotatingText from './RotatingText';

export function HeroTypingAnimation() {
  return (
    <RotatingText
      texts={['tu Hogar', 'Gamers', 'Empresas', 'Streamers', 'Familias']}
      mainClassName="px-2 sm:px-3 md:px-4 bg-[#D4AF37] text-[#0a0f1a] py-1 sm:py-2 rounded-lg inline-flex items-center"
      staggerFrom="last"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      staggerDuration={0.025}
      splitLevelClassName="overflow-hidden pb-1 sm:pb-2"
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
      rotationInterval={2000}
    />
  );
}

// ============================================
// WHATSAPP FLOATING BUTTON
// ============================================
export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/51999888777?text=Hola,%20quiero%20información%20sobre%20los%20planes%20de%20internet"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-12 right-6 z-[200] w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        ¡Escríbenos ahora!
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white rotate-45"></div>
      </div>
      
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></span>
    </motion.a>
  );
}

// ============================================
// ANIMATED SECTION WRAPPER
// ============================================
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// ANIMATED CARD WITH 3D EFFECT
// ============================================
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCard({ children, className = '' }: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        transition: { duration: 0.2 }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// CONFETTI TRIGGER
// ============================================
export function triggerConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

// ============================================
// SPEED TEST WIDGET
// ============================================
interface SpeedTestWidgetProps {
  onComplete?: (speed: number) => void;
}

export function SpeedTestWidget({ onComplete }: SpeedTestWidgetProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const handleStartTest = useCallback(() => {
    // Simulate speed test
    const testButton = document.getElementById('speed-test-btn');
    const speedDisplay = document.getElementById('speed-display');
    const progressBar = document.getElementById('speed-progress');
    
    if (testButton && speedDisplay && progressBar) {
      testButton.textContent = 'Probando...';
      (testButton as HTMLButtonElement).disabled = true;
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        
        const currentSpeed = Math.floor((progress / 100) * 350 + Math.random() * 50);
        speedDisplay.textContent = `${currentSpeed}`;
        
        if (progress >= 100) {
          clearInterval(interval);
          const finalSpeed = Math.floor(300 + Math.random() * 100);
          speedDisplay.textContent = `${finalSpeed}`;
          testButton.textContent = 'Probar de nuevo';
          (testButton as HTMLButtonElement).disabled = false;
          onComplete?.(finalSpeed);
          
          // Trigger confetti on completion
          triggerConfetti();
        }
      }, 100);
    }
  }, [onComplete]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-8 max-w-md mx-auto"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Test de Velocidad</h3>
        <p className="text-gray-400 text-sm mb-6">Prueba nuestra velocidad en tiempo real</p>
        
        <div className="mb-6">
          <div className="text-6xl font-bold gradient-text mb-2">
            <span id="speed-display">0</span>
          </div>
          <div className="text-gray-400">Mbps</div>
        </div>
        
        {/* Progress bar */}
        <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
          <div 
            id="speed-progress"
            className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] rounded-full transition-all duration-100"
            style={{ width: '0%' }}
          ></div>
        </div>
        
        <button
          id="speed-test-btn"
          onClick={handleStartTest}
          className="btn-gradient text-white px-8 py-3 rounded-full font-bold"
        >
          Iniciar Test
        </button>
      </div>
    </motion.div>
  );
}
