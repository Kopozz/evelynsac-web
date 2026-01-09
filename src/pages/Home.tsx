import { useState, useEffect } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { 
  WifiHigh as Wifi, 
  Television as Tv, 
  CheckCircle as Check, 
  MapPin, 
  CaretDown as ChevronDown,
  CaretUp as ChevronUp,
  CaretLeft as ChevronLeft,
  CaretRight as ChevronRight,
  Lightning as Zap,
  Lightning,
  ShieldCheck as Shield,
  Headset as Headphones,
  Star,
  Gauge,
  MapTrifold,
  PhoneCall
} from '@phosphor-icons/react';
import { 
  AnimatedCounter, 
  HeroTypingAnimation, 
  AnimatedSection,
  triggerConfetti
} from '../components/PremiumEffects';
import { CoverageMap, CoverageCheck } from '../components/MapAndChat';
import GlareHover from '../components/ui/GlareHover';

export default function Home() {
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [testimonialsIndex, setTestimonialsIndex] = useState(0);
  const [speedTestActive, setSpeedTestActive] = useState(false);
  const [speedTestResult, setSpeedTestResult] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [hash]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-rotate testimonials carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialsIndex(prev => prev >= 3 ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Speed test simulation
  const runSpeedTest = () => {
    setSpeedTestActive(true);
    setSpeedTestResult(0);
    let speed = 0;
    const interval = setInterval(() => {
      speed += Math.random() * 50 + 20;
      if (speed >= 300) {
        setSpeedTestResult(287 + Math.random() * 25);
        setSpeedTestActive(false);
        clearInterval(interval);
      } else {
        setSpeedTestResult(speed);
      }
    }, 200);
  };

  const services = [
    {
      icon: Wifi,
      title: 'Internet Fibra Óptica',
      description: 'Velocidad simétrica hasta 1 Gbps',
      features: ['Instalación incluida', 'Router WiFi 6 gratis', 'App móvil de control']
    },
    {
      icon: Tv,
      title: 'Cable TV Premium',
      description: 'Más de 150 canales HD y 4K',
      features: ['Decodificador HD incluido', 'Canales premium', 'Grabador DVR']
    },
    {
      icon: PhoneCall,
      title: 'Telefonía Ilimitada',
      description: 'Llamadas ilimitadas a todo el Perú',
      features: ['Línea fija incluida', 'Llamadas nacionales', 'Identificador de llamadas']
    }
  ];

  const plans = [
    {
      name: 'Básico',
      monthlyPrice: 79,
      annualPrice: 67,
      speed: '100 Mbps',
      features: ['Internet 100 Mbps', 'Router WiFi incluido', 'Instalación gratis', 'Soporte técnico 24/7'],
      popular: false
    },
    {
      name: 'Premium',
      monthlyPrice: 129,
      annualPrice: 109,
      speed: '300 Mbps',
      features: ['Internet 300 Mbps', 'Router WiFi 6', 'Cable TV HD (80+ canales)', 'Telefonía ilimitada', 'Instalación express'],
      popular: true
    },
    {
      name: 'Ultra',
      monthlyPrice: 199,
      annualPrice: 169,
      speed: '500 Mbps',
      features: ['Internet 500 Mbps', 'Router WiFi 6 Mesh', 'Cable TV 4K (150+ canales)', 'Telefonía ilimitada', 'IP pública estática', 'Soporte prioritario'],
      popular: false
    }
  ];

  const cities = ['Lima', 'Callao', 'Miraflores', 'San Isidro', 'La Molina', 'Surco', 'San Borja', 'Barranco'];

  const testimonials = [
    {
      name: 'Carlos Mendoza',
      role: 'Empresario',
      comment: 'Excelente servicio. La velocidad es increíble y nunca he tenido problemas de conexión. El soporte técnico responde en minutos.',
      rating: 5,
      avatar: 'CM'
    },
    {
      name: 'María Rodríguez',
      role: 'Diseñadora',
      comment: 'Cambié de proveedor y fue la mejor decisión. La instalación fue rápida y profesional. Muy recomendado.',
      rating: 5,
      avatar: 'MR'
    },
    {
      name: 'Luis García',
      role: 'Gamer',
      comment: 'Como gamer, necesito baja latencia y EVELYN SAC me da exactamente eso. Ping estable y sin cortes.',
      rating: 5,
      avatar: 'LG'
    },
    {
      name: 'Ana Torres',
      role: 'Médico',
      comment: 'Trabajo desde casa con telemedicina y la conexión nunca me ha fallado. Esencial para mi trabajo.',
      rating: 5,
      avatar: 'AT'
    },
    {
      name: 'Roberto Sánchez',
      role: 'Streamer',
      comment: 'Transmito en 4K sin problemas. La velocidad de subida es excelente y el ping mínimo. Totalmente recomendado.',
      rating: 5,
      avatar: 'RS'
    },
    {
      name: 'Patricia Vega',
      role: 'Profesora',
      comment: 'Clases virtuales fluidas para toda mi familia. Tres hijos conectados y sin ninguna caída.',
      rating: 5,
      avatar: 'PV'
    }
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo toma la instalación?',
      answer: 'La instalación estándar se realiza en 24-48 horas después de la confirmación del pedido. Para zonas con cobertura existente, puede ser el mismo día.'
    },
    {
      question: '¿Cuál es el costo de instalación?',
      answer: 'La instalación es completamente GRATIS en todos nuestros planes. Solo pagas tu primera mensualidad.'
    },
    {
      question: '¿Tienen contrato de permanencia?',
      answer: 'No manejamos contratos de permanencia obligatorios. Puedes cancelar en cualquier momento sin penalidades.'
    },
    {
      question: '¿Qué pasa si tengo problemas técnicos?',
      answer: 'Contamos con soporte técnico 24/7. Puedes contactarnos por WhatsApp, llamada telefónica o a través de nuestra app móvil.'
    }
  ];

  return (
    <>
      {/* 3D Background Placeholder if needed */}
      {/* <Background3D /> */}

      {/* --- HERO SECTION --- */}
      <header id="inicio" className="section-hero pt-32 pb-20 lg:pt-44 lg:pb-32 px-6 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Internet <span className="gradient-text">Ultra Rápido</span>
              <br />
              <LayoutGroup>
                <motion.span 
                  className="inline-flex items-center gap-2 flex-wrap justify-center"
                  layout
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                >
                  <motion.span layout transition={{ type: 'spring', damping: 30, stiffness: 400 }}>para</motion.span>
                  <HeroTypingAnimation />
                </motion.span>
              </LayoutGroup>
            </h1>
            <p className={`text-xl mb-10 leading-relaxed max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Conectamos tu hogar con tecnología de fibra óptica de última generación. Velocidad, estabilidad y el mejor servicio para tu hogar y negocio.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  <Zap className="text-[#D4AF37]" size={24} />
                </div>
                <div className="text-left">
                  <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Hasta 1 Gbps</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Velocidad</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  <Shield className="text-[#D4AF37]" size={24} />
                </div>
                <div className="text-left">
                  <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>99.9% Uptime</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Disponibilidad</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  <Headphones className="text-[#D4AF37]" size={24} />
                </div>
                <div className="text-left">
                  <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>24/7 Soporte</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Atención</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollTo('planes')}
                className="btn-gradient text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2"
              >
                Ver Planes
              </button>
              <button 
                onClick={() => scrollTo('cobertura')}
                className={`px-8 py-4 rounded-full font-bold text-lg border transition-all flex items-center justify-center gap-2 ${isDarkMode ? 'text-gray-300 border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/5' : 'text-gray-700 border-gray-300 hover:border-[#D4AF37]/50 hover:bg-gray-100'}`}
              >
                Verificar Cobertura
              </button>
            </div>
          </div>

          {/* Stats Counter - Animated */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <AnimatedSection delay={0}>
              <div className="glass rounded-2xl p-6 text-center card-glow">
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={50} suffix="K+" />
                </div>
                <div className="text-gray-400">Clientes Satisfechos</div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="glass rounded-2xl p-6 text-center card-glow">
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <div className="text-gray-400">Años de Experiencia</div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="glass rounded-2xl p-6 text-center card-glow">
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={4.9} decimals={1} suffix="/5" />
                </div>
                <div className="text-gray-400">Satisfacción</div>
              </div>
            </AnimatedSection>
          </div>

          {/* Speed Test Widget */}
          <div className="mt-12 max-w-md mx-auto">
            <div className="glass rounded-2xl p-6 card-glow text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Gauge className="text-[#D4AF37]" size={24} />
                <h3 className="text-lg font-bold text-white">Test de Velocidad</h3>
              </div>
              
              {speedTestActive ? (
                <div className="space-y-4">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] transition-all duration-200"
                      style={{ width: `${(speedTestResult / 300) * 100}%` }}
                    />
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    {speedTestResult.toFixed(0)} Mbps
                  </div>
                  <p className="text-sm text-gray-400">Midiendo velocidad...</p>
                </div>
              ) : speedTestResult > 0 ? (
                <div className="space-y-4">
                  <div className="text-5xl font-bold gradient-text">
                    {speedTestResult.toFixed(0)} Mbps
                  </div>
                  <p className="text-sm text-green-400">¡Excelente velocidad!</p>
                  <button 
                    onClick={runSpeedTest}
                    className="text-sm text-[#D4AF37] hover:text-[#e6c75a] transition-colors"
                  >
                    Probar de nuevo
                  </button>
                </div>
              ) : (
                <button 
                  onClick={runSpeedTest}
                  className="btn-gradient px-6 py-3 rounded-xl font-bold text-white"
                >
                  Iniciar Test
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- SERVICES SECTION --- */}
      <section id="servicios" className="section-plans py-24 px-6 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Todo lo que necesitas</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Servicios diseñados para brindarte la mejor experiencia de conectividad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="glass rounded-3xl p-8 card-glow card-3d group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/20 border border-[#D4AF37]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="text-[#D4AF37]" size={32} />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <Check size={18} className="text-green-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* "Saber más" para Servicios */}
          <div className="text-center">
            <Link to="/servicios" className="btn-gradient text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform">
                Ver todos los detalles
                <ChevronRight weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- SPEED COMPARISON SECTION --- */}
      <section className="section-speed py-20 px-6 relative">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 flex items-center justify-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Lightning size={32} weight="fill" className="text-yellow-400" />
              Compara Velocidades
            </h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mira la diferencia entre EVELYN SAC y la competencia</p>
          </div>

          <div className="glass rounded-3xl p-8">
            <div className="space-y-8">
              {/* EVELYN Speed */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className={`font-bold text-lg flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Zap className="text-[#D4AF37]" size={20} />
                    EVELYN SAC
                  </span>
                  <span className="text-2xl font-bold gradient-text">300 Mbps</span>
                </div>
                <div className={`h-8 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <div 
                    className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] rounded-full animate-pulse"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>

             {/* Competitors logic ... (simplified for brevity but reused mostly) */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Competencia</span>
                  <span className={`text-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Promedio 80 Mbps</span>
                </div>
                <div className={`h-6 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <div 
                    className="h-full bg-gray-500 rounded-full"
                    style={{ width: '27%' }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <strong className="text-[#D4AF37]">Hasta 3x más rápido</strong> que la competencia
              </p>
              <button 
                onClick={() => scrollTo('planes')}
                className="btn-gradient text-white px-8 py-3 rounded-full font-bold"
              >
                Ver Planes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="planes" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>El plan perfecto para ti</h2>
            <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Elige el plan que mejor se adapte a tus necesidades. Sin contratos de permanencia.
            </p>
            
            {/* Toggle Mensual/Anual */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${!isAnnual ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}>Mensual</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${isAnnual ? 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37]' : (isDarkMode ? 'bg-white/20' : 'bg-gray-300')}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${isAnnual ? 'left-8' : 'left-1'}`}></div>
              </button>
              <span className={`text-sm font-medium ${isAnnual ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                Anual <span className="text-[#D4AF37] font-bold">-15%</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
            {plans.map((plan, index) => (
              <div key={index} className={`relative ${plan.popular ? 'scale-105 z-10' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg shadow-[#D4AF37]/40 animate-bounce">
                      Más Popular
                    </div>
                  </div>
                )}
                <GlareHover
                  borderRadius="1.5rem"
                  glareColor={plan.popular ? '#D4AF37' : '#ffffff'}
                  glareOpacity={plan.popular ? 0.3 : 0.1}
                >
                <div 
                  className={`relative w-full h-full rounded-3xl p-8 transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-b from-[#D4AF37]/10 to-[#B8860B]/10 border-2 border-[#D4AF37]/50 shadow-2xl shadow-[#D4AF37]/20' 
                      : 'glass card-glow'
                  }`}
                >
                  <div className="text-center mb-6">
                    <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                    <div className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{plan.speed}</div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>S/</span>
                      <span className="text-5xl font-bold gradient-text">
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>/mes</span>
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-[#D4AF37] mt-2">
                        Ahorras S/{(plan.monthlyPrice - plan.annualPrice) * 12}/año
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-[#D4AF37]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`w-full py-4 rounded-xl font-bold transition-all ${
                      plan.popular 
                        ? 'btn-gradient text-white' 
                        : isDarkMode 
                          ? 'border border-white/20 text-white hover:border-[#D4AF37]/50 hover:bg-white/5'
                          : 'border border-gray-300 text-gray-700 hover:border-[#D4AF37]/50 hover:bg-gray-100'
                    }`}
                  >
                    Contratar Ahora
                  </button>
                </div>
                </GlareHover>
              </div>
            ))}
          </div>
          
           {/* "Saber más" para Planes */}
           <div className="text-center">
            <Link to="/planes" className="btn-gradient text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform">
                Ver todos los planes
                <ChevronRight weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- COVERAGE SECTION --- */}
      <section id="cobertura" className="section-coverage py-24 px-6 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-4xl font-bold mb-6 flex items-center justify-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <MapTrifold size={36} weight="duotone" className="text-[#D4AF37]" />
              Mapa de Cobertura
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Explora nuestras zonas de cobertura en tiempo real
            </p>
          </div>

          <div className="mb-12">
            <CoverageMap />
          </div>

          <div className="max-w-xl mx-auto mb-12">
            <CoverageCheck />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city) => (
              <button 
                key={city}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isDarkMode ? 'text-gray-300 bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]' : 'text-gray-600 bg-gray-100 border border-gray-200 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:text-[#B8860B]'}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonios" className="section-testimonials py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Lo que dicen nuestros clientes</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Miles de familias ya confían en nosotros
            </p>
          </div>

          <div className="relative mb-12">
             <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${testimonialsIndex * (100 / 3)}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-4">
                      <div className="glass rounded-3xl p-8 card-glow h-full">
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial.comment}"</p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B8860B] to-[#D4AF37] flex items-center justify-center text-white font-bold">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
          
           {/* "Saber más" para Testimonios */}
           <div className="text-center">
            <Link to="/testimonios" className="btn-gradient text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform">
                Ver más historias
                <ChevronRight weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="section-faq py-24 px-6 relative">
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>¿Tienes dudas?</h2>
            
          </div>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="glass rounded-2xl overflow-hidden card-glow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className={`font-bold pr-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="text-[#D4AF37] shrink-0" size={20} />
                  ) : (
                    <ChevronDown className={`shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                  )}
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === index ? 'pb-5 max-h-40' : 'max-h-0'}`}>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* "Saber más" para FAQ */}
          <div className="text-center">
            <Link to="/faq" className="btn-gradient text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform">
                Ver todas las preguntas y respuestas
                <ChevronRight weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contacto" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="glass rounded-3xl p-8">
            <h2 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Envíanos un mensaje</h2>
            <form 
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                triggerConfetti();
                setFormSubmitted(true);
                setTimeout(() => setFormSubmitted(false), 3000);
              }}
            >
              {/* Simplified form */}
              <div>
                <input type="text" placeholder="Nombre" className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500" />
              </div>
              <div>
                 <input type="email" placeholder="Email" className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500" />
              </div>
              <button 
                  type="submit"
                  className="w-full btn-gradient text-white py-4 rounded-xl font-bold"
                >
                  Enviar mensaje
              </button>
            </form>
          </div>
          
           {/* "Saber más" para Contacto? Quizás no hace falta, ya estamos aquí. Pero añadiré un link por consistencia si se quiere. */}
           <div className="flex flex-col justify-center">
             <h2 className="text-3xl font-bold mb-6">¿Prefieres visitarnos?</h2>
             <p className="text-gray-400 mb-8">Nuestras oficinas están abiertas para atenderte.</p>
             <Link to="/contacto" className="btn-gradient text-white px-8 py-3 rounded-full font-bold inline-flex items-center justify-center gap-2 w-fit">
                Ver ubicación y horarios completos <ChevronRight />
             </Link>
           </div>
        </div>
      </div>
      </section>

    </>
  );
}
