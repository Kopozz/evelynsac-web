import { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  X, 
  Trophy, 
  Lightning, 
  WifiHigh, 
  DeviceMobile, 
  Television, 
  ShieldCheck,
  Info
} from '@phosphor-icons/react';
import { AnimatedCard } from '../components/PremiumEffects';

export default function PlansPage() {
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: "Básico",
      speed: "100",
      price: billingCycle === 'monthly' ? "79" : "75",
      features: [
        "Internet Fibra Óptica",
        "WiFi 6 Router",
        "1 Decodificador HD"
      ],
      notIncluded: [
        "Canales Premium",
        "IP Pública Estática"
      ],
      color: "from-blue-500 to-cyan-400",
      recommended: false
    },
    {
      name: "Gamer",
      speed: "300",
      price: billingCycle === 'monthly' ? "109" : "100",
      features: [
        "Internet Fibra Simétrica",
        "WiFi 6 Router Potente",
        "2 Decodificadores 4K",
        "Prioridad de tráfico Gaming",
        "IP Pública Dinámica"
      ],
      notIncluded: [],
      color: "from-[#D4AF37] to-[#F2C94C]",
      recommended: true
    },
    {
      name: "Ultra",
      speed: "600",
      price: billingCycle === 'monthly' ? "159" : "149",
      features: [
        "Internet Fibra Simétrica",
        "WiFi 6 Mesh System",
        "3 Decodificadores 4K",
        "Canales Premium Incluidos",
        "Soporte VIP 24/7"
      ],
      notIncluded: [],
      color: "from-purple-600 to-pink-500",
      recommended: false
    }
  ];

  const comparisonFeatures = [
    { name: "Tecnología Fibra Óptica", basic: true, gamer: true, ultra: true },
    { name: "Velocidad Simétrica", basic: true, gamer: true, ultra: true },
    { name: "Router WiFi 6", basic: true, gamer: true, ultra: true },
    { name: "Soporte Prioritario", basic: false, gamer: true, ultra: true },
    { name: "IP Pública Estática", basic: false, gamer: false, ultra: true },
    { name: "Canales HD", basic: "80+", gamer: "120+", ultra: "150+" },
    { name: "Paramount+ Incluido", basic: false, gamer: true, ultra: true },
  ];

  return (
    <div className={`pt-32 pb-20 px-6 min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 gradient-text">Planes Diseñados para Ti</h1>
                <p className={`text-xl max-w-2xl mx-auto mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Elige la velocidad que necesitas. Sin contratos forzosos, sin letras chiquitas.
                </p>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-[#D4AF37]' : 'text-gray-500'}`}>Mensual</span>
                    <button 
                        onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                        className="w-16 h-8 bg-gray-700 rounded-full relative p-1 transition-colors hover:bg-gray-600"
                    >
                        <motion.div 
                            className="w-6 h-6 bg-[#D4AF37] rounded-full shadow-lg"
                            animate={{ x: billingCycle === 'monthly' ? 0 : 32 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                        Anual <span className="text-xs text-green-500 ml-1">(-10%)</span>
                    </span>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
                {plans.map((plan, index) => (
                    <AnimatedCard key={plan.name} className="h-full">
                        <div className={`relative h-full glass rounded-3xl p-8 border transition-all duration-300 ${plan.recommended ? 'border-[#D4AF37] shadow-xl shadow-[#D4AF37]/20 scale-105 z-20' : 'border-white/10 hover:border-white/30'}`}>
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F2C94C] text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                                    <Trophy weight="fill" />
                                    Más Popular
                                </div>
                            )}

                            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-[#D4AF37]">S/{plan.price}</span>
                                <span className="text-gray-500">/mes</span>
                            </div>

                            <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <Lightning size={24} className="text-[#D4AF37]" weight="fill" />
                                    <span className="text-3xl font-bold text-white">{plan.speed} Mbps</span>
                                </div>
                                <p className="text-sm text-gray-400">Velocidad simétrica de subida y bajada</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-green-500 min-w-[20px] mt-1" weight="fill" />
                                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                                    </li>
                                ))}
                                {plan.notIncluded.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 opacity-50">
                                        <X size={20} className="text-gray-500 min-w-[20px] mt-1" />
                                        <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.recommended ? 'btn-gradient text-white shadow-lg' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                Elegir {plan.name}
                            </button>
                        </div>
                    </AnimatedCard>
                ))}
            </div>

            {/* Comparison Table */}
            <div className="glass p-8 rounded-3xl overflow-x-auto">
                <h3 className="text-2xl font-bold mb-8 text-center text-white">Comparativa Completa</h3>
                <table className="w-full min-w-[600px] text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="py-4 px-4 text-gray-400 font-medium">Características</th>
                            {plans.map(plan => (
                                <th key={plan.name} className={`py-4 px-4 text-center font-bold ${plan.recommended ? 'text-[#D4AF37]' : 'text-white'}`}>
                                    {plan.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonFeatures.map((feature, index) => (
                            <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 px-4 text-white font-medium flex items-center gap-2">
                                    {feature.name}
                                    <Info size={16} className="text-gray-500 cursor-help" />
                                </td>
                                <td className="py-4 px-4 text-center">
                                    {feature.basic === true ? <CheckCircle size={20} className="text-green-500 mx-auto" weight="fill" /> : 
                                     feature.basic === false ? <X size={20} className="text-gray-600 mx-auto" /> : 
                                     <span className="text-white">{feature.basic}</span>}
                                </td>
                                <td className="py-4 px-4 text-center bg-[#D4AF37]/5">
                                    {feature.gamer === true ? <CheckCircle size={20} className="text-green-500 mx-auto" weight="fill" /> : 
                                     feature.gamer === false ? <X size={20} className="text-gray-600 mx-auto" /> : 
                                     <span className="text-[#D4AF37] font-bold">{feature.gamer}</span>}
                                </td>
                                <td className="py-4 px-4 text-center">
                                    {feature.ultra === true ? <CheckCircle size={20} className="text-green-500 mx-auto" weight="fill" /> : 
                                     feature.ultra === false ? <X size={20} className="text-gray-600 mx-auto" /> : 
                                     <span className="text-purple-400 font-bold">{feature.ultra}</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-16 text-center">
                 <p className="text-gray-400 mb-4">¿Tienes dudas sobre qué plan elegir?</p>
                 <Link to="/contacto" className="text-[#D4AF37] underline hover:text-[#F2C94C]">Chatea con un asesor</Link>
            </div>
        </div>
    </div>
  )
}
