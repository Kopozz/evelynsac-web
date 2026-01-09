import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import {
  Lightning,
  ArrowRight,
  Check,
  House,
  MapPin,
  Calendar,
  User,
  Phone,
  Envelope,
  Clock,
  Confetti,
  Share,
  Download,
  TrendUp,
  TrendDown,
  Minus
} from '@phosphor-icons/react';

// ==================== SPEED TEST PREMIUM ====================

// 3D Speedometer needle
function SpeedometerNeedle({ rotation }: { rotation: number }) {
  const needleRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (needleRef.current) {
      needleRef.current.rotation.z = THREE.MathUtils.lerp(
        needleRef.current.rotation.z,
        rotation,
        0.1
      );
    }
  });

  return (
    <mesh ref={needleRef} position={[0, 0, 0.1]}>
      <boxGeometry args={[0.08, 1.8, 0.02]} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
  );
}

// 3D Speedometer component
function Speedometer3D({ speed, maxSpeed = 500 }: { speed: number; maxSpeed?: number }) {
  const rotation = -Math.PI / 4 + (speed / maxSpeed) * (Math.PI / 2 + Math.PI / 4);

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ height: 200 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        
        {/* Background arc */}
        <mesh>
          <torusGeometry args={[1.5, 0.15, 16, 100, Math.PI * 1.5]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        
        {/* Speed gradient arc */}
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <torusGeometry args={[1.5, 0.12, 16, 100, (speed / maxSpeed) * Math.PI * 1.5]} />
          <meshStandardMaterial color="#06b6d4" />
        </mesh>
        
        {/* Center hub */}
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Needle */}
        <SpeedometerNeedle rotation={rotation} />
      </Suspense>
    </Canvas>
  );
}

// Premium Speed Test Widget
export function PremiumSpeedTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');
  const [history, setHistory] = useState<Array<{ date: string; download: number; upload: number; ping: number }>>([]);

  const runTest = () => {
    setIsRunning(true);
    setPhase('ping');
    setCurrentSpeed(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);

    // Simulate ping test
    setTimeout(() => {
      const pingResult = Math.floor(Math.random() * 10) + 3;
      setPing(pingResult);
      setPhase('download');

      // Simulate download test
      let downloadProgress = 0;
      const downloadInterval = setInterval(() => {
        downloadProgress += Math.random() * 50;
        if (downloadProgress >= 300) {
          downloadProgress = 280 + Math.random() * 40;
          clearInterval(downloadInterval);
          setDownloadSpeed(downloadProgress);
          setPhase('upload');

          // Simulate upload test
          let uploadProgress = 0;
          const uploadInterval = setInterval(() => {
            uploadProgress += Math.random() * 40;
            if (uploadProgress >= 280) {
              uploadProgress = 260 + Math.random() * 40;
              clearInterval(uploadInterval);
              setUploadSpeed(uploadProgress);
              setPhase('complete');
              setIsRunning(false);
              
              // Add to history
              setHistory(prev => [...prev.slice(-4), {
                date: new Date().toLocaleTimeString(),
                download: Math.round(downloadProgress),
                upload: Math.round(uploadProgress),
                ping: pingResult
              }]);
            }
            setCurrentSpeed(uploadProgress);
          }, 100);
        }
        setCurrentSpeed(downloadProgress);
      }, 100);
    }, 1000);
  };

  return (
    <div className="glass rounded-3xl p-8 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Speed Test Premium</h3>
        <p className="text-gray-400">Mide tu velocidad de conexión en tiempo real</p>
      </div>

      {/* 3D Speedometer */}
      <div className="relative mb-6">
        <Speedometer3D speed={currentSpeed} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <div className="text-4xl font-bold gradient-text">{Math.round(currentSpeed)}</div>
          <div className="text-sm text-gray-400">Mbps</div>
        </div>
      </div>

      {/* Phase indicator */}
      {phase !== 'idle' && phase !== 'complete' && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-sm font-medium">
              {phase === 'ping' && 'Midiendo latencia...'}
              {phase === 'download' && 'Probando descarga...'}
              {phase === 'upload' && 'Probando subida...'}
            </span>
          </div>
        </div>
      )}

      {/* Results */}
      {phase === 'complete' && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-green-400 text-2xl font-bold">{ping}ms</div>
            <div className="text-xs text-gray-500">Ping</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-cyan-400 text-2xl font-bold">{Math.round(downloadSpeed)}</div>
            <div className="text-xs text-gray-500">Download Mbps</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-teal-400 text-2xl font-bold">{Math.round(uploadSpeed)}</div>
            <div className="text-xs text-gray-500">Upload Mbps</div>
          </div>
        </div>
      )}

      {/* Action button */}
      <button
        onClick={runTest}
        disabled={isRunning}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          isRunning
            ? 'bg-gray-600 cursor-not-allowed'
            : 'btn-gradient hover:scale-[1.02]'
        }`}
      >
        {isRunning ? 'Midiendo...' : phase === 'complete' ? 'Probar de nuevo' : 'Iniciar Test'}
      </button>

      {/* Share buttons */}
      {phase === 'complete' && (
        <div className="flex justify-center gap-4 mt-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Share size={18} />
            <span className="text-sm">Compartir</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Download size={18} />
            <span className="text-sm">Guardar</span>
          </button>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Historial</h4>
          <div className="space-y-2">
            {history.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm bg-white/5 rounded-lg px-3 py-2">
                <span className="text-gray-500">{item.date}</span>
                <div className="flex gap-4">
                  <span className="text-cyan-400">↓{item.download}</span>
                  <span className="text-teal-400">↑{item.upload}</span>
                  <span className="text-green-400">{item.ping}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== MULTI-STEP FORM ====================

interface FormData {
  // Step 1 - Plan
  plan: string;
  // Step 2 - Personal
  name: string;
  email: string;
  phone: string;
  dni: string;
  // Step 3 - Address
  department: string;
  district: string;
  address: string;
  reference: string;
  // Step 4 - Schedule
  date: string;
  timeSlot: string;
}

const initialFormData: FormData = {
  plan: '',
  name: '',
  email: '',
  phone: '',
  dni: '',
  department: '',
  district: '',
  address: '',
  reference: '',
  date: '',
  timeSlot: ''
};

export function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const totalSteps = 4;

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      gsap.to(formRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setStep(step + 1);
          gsap.fromTo(formRef.current, 
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3 }
          );
        }
      });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      gsap.to(formRef.current, {
        x: 20,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setStep(step - 1);
          gsap.fromTo(formRef.current, 
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3 }
          );
        }
      });
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 2000);
  };

  const plans = [
    { id: 'basic', name: 'Plan Básico', speed: '100 Mbps', price: 69 },
    { id: 'home', name: 'Plan Hogar', speed: '200 Mbps', price: 89 },
    { id: 'premium', name: 'Plan Premium', speed: '300 Mbps', price: 119 },
  ];

  const timeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
  ];

  if (isComplete) {
    return (
      <div className="glass rounded-3xl p-8 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} weight="bold" className="text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">¡Solicitud Enviada!</h3>
        <p className="text-gray-400 mb-6">
          Hemos recibido tu solicitud. Un asesor se comunicará contigo pronto para confirmar la instalación.
        </p>
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-left text-sm">
            <div>
              <span className="text-gray-500">Plan:</span>
              <span className="text-white ml-2">{plans.find(p => p.id === formData.plan)?.name}</span>
            </div>
            <div>
              <span className="text-gray-500">Fecha:</span>
              <span className="text-white ml-2">{formData.date}</span>
            </div>
            <div>
              <span className="text-gray-500">Horario:</span>
              <span className="text-white ml-2">{formData.timeSlot}</span>
            </div>
            <div>
              <span className="text-gray-500">Distrito:</span>
              <span className="text-white ml-2">{formData.district}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setIsComplete(false);
            setStep(1);
            setFormData(initialFormData);
          }}
          className="btn-gradient px-6 py-3 rounded-xl font-bold"
        >
          Nueva Solicitud
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                i < step ? 'bg-green-500 text-white' :
                i === step ? 'bg-cyan-500 text-white' :
                'bg-white/10 text-gray-500'
              }`}>
                {i < step ? <Check size={20} weight="bold" /> : i}
              </div>
              {i < 4 && (
                <div className={`w-16 lg:w-24 h-1 mx-2 rounded ${
                  i < step ? 'bg-green-500' : 'bg-white/10'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Plan</span>
          <span>Datos</span>
          <span>Dirección</span>
          <span>Horario</span>
        </div>
      </div>

      {/* Form content */}
      <div ref={formRef}>
        {/* Step 1: Plan Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Selecciona tu Plan</h3>
            <div className="grid gap-4">
              {plans.map(plan => (
                <button
                  key={plan.id}
                  onClick={() => updateForm('plan', plan.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.plan === plan.id
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">{plan.name}</div>
                      <div className="text-sm text-gray-400">{plan.speed} simétricos</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">S/{plan.price}</div>
                      <div className="text-xs text-gray-500">/mes</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Personal Info */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Datos Personales</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nombre completo</label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => updateForm('name', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Juan Pérez"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <div className="relative">
                    <Envelope size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => updateForm('email', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="juan@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Teléfono</label>
                  <div className="relative">
                    <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => updateForm('phone', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="999 888 777"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">DNI</label>
                <input
                  type="text"
                  value={formData.dni}
                  onChange={e => updateForm('dni', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="12345678"
                  maxLength={8}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Address */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Dirección de Instalación</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Departamento</label>
                  <select
                    value={formData.department}
                    onChange={e => updateForm('department', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  >
                    <option value="">Seleccionar</option>
                    <option value="lima">Lima</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Distrito</label>
                  <select
                    value={formData.district}
                    onChange={e => updateForm('district', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  >
                    <option value="">Seleccionar</option>
                    <option value="miraflores">Miraflores</option>
                    <option value="san-isidro">San Isidro</option>
                    <option value="surco">Santiago de Surco</option>
                    <option value="la-molina">La Molina</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Dirección</label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => updateForm('address', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Av. Principal 123, Dpto 101"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Referencia</label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={e => updateForm('reference', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="Frente al parque"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Schedule */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Agenda tu Instalación</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Fecha preferida</label>
                <div className="relative">
                  <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => updateForm('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Horario preferido</label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => updateForm('timeSlot', slot)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                        formData.timeSlot === slot
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                          : 'border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <Clock size={16} />
                      <span className="text-sm">{slot}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            step === 1
              ? 'opacity-0 pointer-events-none'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          Anterior
        </button>
        
        {step < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={step === 1 && !formData.plan}
            className="btn-gradient px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
          >
            Siguiente
            <ArrowRight size={20} weight="bold" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.date || !formData.timeSlot}
            className="btn-gradient px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Confirmar Solicitud'}
            {!isSubmitting && <Check size={20} weight="bold" />}
          </button>
        )}
      </div>
    </div>
  );
}

// ==================== PLAN COMPARATOR ====================

export function PlanComparator() {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);

  const allPlans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 69,
      speed: 100,
      features: {
        'Velocidad': '100 Mbps',
        'Instalación': 'Gratis',
        'Router WiFi': 'Básico',
        'Soporte': '24/7',
        'TV Canales': 'No incluido',
        'Telefonía': 'No incluido'
      }
    },
    {
      id: 'home',
      name: 'Hogar',
      price: 89,
      speed: 200,
      features: {
        'Velocidad': '200 Mbps',
        'Instalación': 'Gratis',
        'Router WiFi': 'Dual Band',
        'Soporte': '24/7 Prioritario',
        'TV Canales': '80+ canales',
        'Telefonía': 'No incluido'
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 119,
      speed: 300,
      features: {
        'Velocidad': '300 Mbps',
        'Instalación': 'Gratis',
        'Router WiFi': 'WiFi 6',
        'Soporte': '24/7 VIP',
        'TV Canales': '120+ canales HD',
        'Telefonía': 'Ilimitada'
      }
    }
  ];

  const togglePlan = (id: string) => {
    if (selectedPlans.includes(id)) {
      setSelectedPlans(selectedPlans.filter(p => p !== id));
    } else if (selectedPlans.length < 2) {
      setSelectedPlans([...selectedPlans, id]);
    }
  };

  const comparedPlans = allPlans.filter(p => selectedPlans.includes(p.id));
  const featureKeys = Object.keys(allPlans[0].features);

  return (
    <div className="space-y-6">
      {/* Plan selection */}
      <div className="flex flex-wrap justify-center gap-4">
        {allPlans.map(plan => (
          <button
            key={plan.id}
            onClick={() => togglePlan(plan.id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              selectedPlans.includes(plan.id)
                ? 'bg-cyan-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {plan.name} - S/{plan.price}/mes
          </button>
        ))}
      </div>

      {/* Comparison table */}
      {comparedPlans.length === 2 && (
        <div className="glass rounded-2xl p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Característica</th>
                {comparedPlans.map(plan => (
                  <th key={plan.id} className="text-center py-3 px-4">
                    <div className="text-white font-bold">{plan.name}</div>
                    <div className="text-cyan-400 text-lg">S/{plan.price}/mes</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureKeys.map(feature => (
                <tr key={feature} className="border-t border-white/5">
                  <td className="py-3 px-4 text-gray-400">{feature}</td>
                  {comparedPlans.map(plan => {
                    const value = plan.features[feature as keyof typeof plan.features];
                    const otherPlan = comparedPlans.find(p => p.id !== plan.id);
                    const otherValue = otherPlan?.features[feature as keyof typeof plan.features];
                    const isBetter = value !== otherValue && value !== 'No incluido';
                    
                    return (
                      <td key={plan.id} className="text-center py-3 px-4">
                        <span className={`flex items-center justify-center gap-1 ${
                          isBetter ? 'text-green-400' : 'text-gray-300'
                        }`}>
                          {isBetter && <TrendUp size={16} />}
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {comparedPlans.length < 2 && (
        <p className="text-center text-gray-400">
          Selecciona 2 planes para comparar
        </p>
      )}
    </div>
  );
}
