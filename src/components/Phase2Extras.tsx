import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  Calculator,
  Coins,
  TrendUp,
  Sparkle,
  Star,
  Play,
  Pause,
  CaretLeft,
  CaretRight,
  Lightning,
  Clock,
  ShieldCheck,
  Headset,
  Trophy,
  Users,
  CheckCircle,
  GameController,
  PaintBrush,
  House,
  VideoCamera,
  Medal,
  Rocket,
  CreditCard,
  Phone
} from '@phosphor-icons/react';

// ==================== SAVINGS CALCULATOR ====================

export function SavingsCalculator() {
  const [currentProvider, setCurrentProvider] = useState('');
  const [currentPayment, setCurrentPayment] = useState(120);
  const [selectedPlan, setSelectedPlan] = useState(89);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const providers = [
    { name: 'Claro', avg: 130 },
    { name: 'Movistar', avg: 140 },
    { name: 'Entel', avg: 125 },
    { name: 'Win', avg: 110 },
    { name: 'Bitel', avg: 100 },
    { name: 'Otro', avg: 120 }
  ];

  const plans = [
    { name: 'Básico 100Mbps', price: 69 },
    { name: 'Hogar 200Mbps', price: 89 },
    { name: 'Premium 300Mbps', price: 119 }
  ];

  const monthlySavings = currentPayment - selectedPlan;
  const yearlySavings = monthlySavings * 12;
  const savingsPercent = ((monthlySavings / currentPayment) * 100).toFixed(0);

  const calculate = () => {
    setShowResults(true);
    if (resultsRef.current) {
      gsap.fromTo(resultsRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  };

  return (
    <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Calculator size={32} weight="duotone" className="text-cyan-400" />
        <h3 className="text-2xl font-bold text-white">Calculadora de Ahorro</h3>
      </div>

      <div className="space-y-6">
        {/* Current Provider */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">¿Cuál es tu proveedor actual?</label>
          <div className="grid grid-cols-3 gap-2">
            {providers.map(provider => (
              <button
                key={provider.name}
                onClick={() => {
                  setCurrentProvider(provider.name);
                  setCurrentPayment(provider.avg);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentProvider === provider.name
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {provider.name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Payment Slider */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            ¿Cuánto pagas actualmente al mes?
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="50"
              max="250"
              value={currentPayment}
              onChange={e => setCurrentPayment(Number(e.target.value))}
              className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="w-24 text-right">
              <span className="text-2xl font-bold text-white">S/{currentPayment}</span>
            </div>
          </div>
        </div>

        {/* Plan Selection */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Selecciona un plan EVELYN:</label>
          <div className="grid grid-cols-3 gap-3">
            {plans.map(plan => (
              <button
                key={plan.name}
                onClick={() => setSelectedPlan(plan.price)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  selectedPlan === plan.price
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div className="text-xs text-gray-400 mb-1">{plan.name}</div>
                <div className="text-xl font-bold gradient-text">S/{plan.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculate}
          className="w-full btn-gradient py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
        >
          <Coins size={24} weight="duotone" />
          Calcular mi Ahorro
        </button>

        {/* Results */}
        {showResults && monthlySavings > 0 && (
          <div ref={resultsRef} className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-2xl p-6 border border-green-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Sparkle size={24} weight="fill" className="text-yellow-400" />
              <span className="text-green-400 font-bold">¡Excelente noticia!</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">S/{monthlySavings}</div>
                <div className="text-sm text-gray-400">Ahorro mensual</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400">S/{yearlySavings}</div>
                <div className="text-sm text-gray-400">Ahorro anual</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">{savingsPercent}%</div>
                <div className="text-sm text-gray-400">Menos</div>
              </div>
            </div>

            <p className="text-center text-gray-300 mt-4">
              ¡Ahorrarías <span className="text-green-400 font-bold">S/{yearlySavings}</span> al año 
              cambiándote a EVELYN SAC!
            </p>
          </div>
        )}

        {showResults && monthlySavings <= 0 && (
          <div ref={resultsRef} className="bg-white/5 rounded-2xl p-6 text-center">
            <p className="text-gray-300">
              Ya tienes un buen precio. ¡Pero con EVELYN SAC tendrás mejor velocidad y servicio!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== VIDEO TESTIMONIALS ====================

interface Testimonial {
  id: number;
  name: string;
  role: string;
  icon: React.ElementType;
  iconColor: string;
  quote: string;
  rating: number;
  videoUrl?: string;
}

export function VideoTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      role: 'Gamer Profesional',
      icon: GameController,
      iconColor: 'text-purple-400',
      quote: 'La latencia es increíble. Mis partidas de Valorant nunca fueron tan fluidas. 5ms de ping constante.',
      rating: 5
    },
    {
      id: 2,
      name: 'María García',
      role: 'Diseñadora Freelance',
      icon: PaintBrush,
      iconColor: 'text-pink-400',
      quote: 'Subo archivos pesados en segundos. Antes tardaba horas, ahora son minutos. Cambió mi productividad.',
      rating: 5
    },
    {
      id: 3,
      name: 'José Rodríguez',
      role: 'Padre de Familia',
      icon: House,
      iconColor: 'text-cyan-400',
      quote: 'Mis 3 hijos en clases virtuales, mi esposa en videollamadas y yo jugando. Ningún problema.',
      rating: 5
    },
    {
      id: 4,
      name: 'Ana Torres',
      role: 'Streamer',
      icon: VideoCamera,
      iconColor: 'text-red-400',
      quote: 'Stream en 1080p 60fps sin drops. Mi audiencia nota la diferencia. 100% recomendado.',
      rating: 5
    }
  ];

  const nextSlide = () => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isPlaying) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main testimonial */}
      <div 
        ref={containerRef}
        className="glass rounded-3xl p-8 md:p-12 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Avatar / Video placeholder */}
          <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
            <div className={`w-full h-full rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center ${testimonials[activeIndex].iconColor}`}>
              {(() => { const Icon = testimonials[activeIndex].icon; return <Icon size={64} weight="duotone" />; })()}
            </div>
            {testimonials[activeIndex].videoUrl && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute bottom-2 right-2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            {/* Rating */}
            <div className="flex justify-center md:justify-start gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  weight={i < testimonials[activeIndex].rating ? 'fill' : 'regular'}
                  className={i < testimonials[activeIndex].rating ? 'text-yellow-400' : 'text-gray-600'}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
              "{testimonials[activeIndex].quote}"
            </blockquote>

            {/* Author */}
            <div>
              <div className="font-bold text-white text-lg">{testimonials[activeIndex].name}</div>
              <div className="text-cyan-400">{testimonials[activeIndex].role}</div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeIndex ? 'bg-cyan-400 w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <CaretLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <CaretRight size={24} />
      </button>
    </div>
  );
}

// ==================== WHY CHOOSE US ====================

export function WhyChooseUs() {
  const features = [
    {
      icon: Lightning,
      title: 'Velocidad Real',
      description: 'Velocidad simétrica garantizada. Lo que contratas es lo que recibes, sin letra pequeña.',
      stat: '300 Mbps',
      color: 'text-yellow-400'
    },
    {
      icon: Clock,
      title: '99.9% Uptime',
      description: 'Nuestra red de fibra óptica tiene redundancia. Tu conexión nunca se cae.',
      stat: '99.9%',
      color: 'text-green-400'
    },
    {
      icon: ShieldCheck,
      title: 'Sin Límites',
      description: 'Uso ilimitado real. Sin throttling, sin fair use, sin sorpresas en tu factura.',
      stat: '∞ GB',
      color: 'text-blue-400'
    },
    {
      icon: Headset,
      title: 'Soporte Humano',
      description: 'Atención 24/7 con personas reales. Resolvemos en minutos, no en días.',
      stat: '< 5 min',
      color: 'text-cyan-400'
    },
    {
      icon: Trophy,
      title: 'Mejor Precio',
      description: 'Hasta 40% más barato que la competencia con mejor velocidad y servicio.',
      stat: '-40%',
      color: 'text-pink-400'
    },
    {
      icon: Users,
      title: '+50K Clientes',
      description: 'Miles de familias peruanas ya confían en nosotros. Únete a la comunidad.',
      stat: '50K+',
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <div 
          key={i}
          className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 group"
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-white/5 ${feature.color} group-hover:scale-110 transition-transform`}>
              <feature.icon size={28} weight="duotone" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{feature.title}</h4>
                <span className={`text-sm font-bold ${feature.color}`}>{feature.stat}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==================== TRUST BADGES ====================

export function TrustBadges() {
  const badges = [
    { icon: Medal, label: '#1 en Perú', color: 'text-yellow-400' },
    { icon: Star, label: '4.9/5 Rating', color: 'text-amber-400' },
    { icon: ShieldCheck, label: 'Garantía 30 días', color: 'text-green-400' },
    { icon: Rocket, label: 'Instalación 24h', color: 'text-cyan-400' },
    { icon: CreditCard, label: 'Sin costo inicial', color: 'text-blue-400' },
    { icon: Phone, label: 'Soporte 24/7', color: 'text-purple-400' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {badges.map((badge, i) => (
        <div 
          key={i}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
        >
          <badge.icon size={18} weight="duotone" className={badge.color} />
          <span className="text-sm font-medium text-gray-300">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
