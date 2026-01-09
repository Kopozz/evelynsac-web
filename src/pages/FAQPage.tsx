import { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CaretDown, 
  Question, 
  ChatCircleText,
  WifiHigh,
  CreditCard,
  Wrench
} from '@phosphor-icons/react';

export default function FAQPage() {
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('general');

  const categories = [
    { id: 'general', name: 'General', icon: Question },
    { id: 'tecnico', name: 'Soporte Técnico', icon: WifiHigh },
    { id: 'pagos', name: 'Pagos y Facturación', icon: CreditCard },
    { id: 'instalacion', name: 'Instalación', icon: Wrench },
  ];

  const faqs = {
    general: [
      { q: "¿En qué distritos tienen cobertura?", a: "Actualmente cubrimos Miraflores, San Isidro, Surco, La Molina, San Borja, Barranco, Jesús María y Lince. Estamos expandiéndonos rápidamente a más distritos." },
      { q: "¿Hay contrato de permanencia?", a: "No, en Evelyn SAC creemos en la libertad. Nuestros planes no tienen contratos forzosos ni penalidades por cancelación. Te quedas porque quieres, no porque te obligamos." },
      { q: "¿Qué incluyen los planes?", a: "Todos los planes incluyen instalación gratuita, router WiFi 6 de última generación y soporte técnico prioritario." }
    ],
    tecnico: [
      { q: "¿Qué es la velocidad simétrica?", a: "Significa que tienes la misma velocidad tanto para descargar archivos (bajada) como para subirlos (subida). Ideal para videollamadas, streaming y subir contenido a la nube." },
      { q: "¿Qué hago si mi internet está lento?", a: "Primero, intenta reiniciar tu router (desenchúfalo 10 segundos). Si el problema persiste, contáctanos por WhatsApp y nuestro equipo técnico realizará un diagnóstico remoto al instante." },
      { q: "¿Puedo cambiar mi contraseña del WiFi?", a: "¡Sí! Puedes hacerlo desde nuestra App Evelyn o solicitándolo a través de nuestros canales de atención." }
    ],
    pagos: [
      { q: "¿Cómo puedo pagar mi recibo?", a: "Aceptamos pagos a través de Yape, Plin, transferencia bancaria (BCP, Interbank, BBVA) y pagos en línea con tarjeta de crédito/débito desde nuestra web." },
      { q: "¿Cuándo vence mi recibo?", a: "Los recibos vencen el día 15 de cada mes. Te enviaremos un recordatorio por SMS y correo electrónico 3 días antes." },
      { q: "¿Dan factura?", a: "Sí, todos nuestros planes para empresas y RUC 10 incluyen factura electrónica." }
    ],
    instalacion: [
      { q: "¿Cuánto demora la instalación?", a: "Una vez contratado el servicio, programamos la instalación en un plazo máximo de 24 a 48 horas." },
      { q: "¿Tiene costo de instalación?", a: "La instalación es 100% gratuita promocionalmente para todos nuestros nuevos clientes en zonas de cobertura." },
      { q: "¿Necesito cableado especial?", a: "Nosotros nos encargamos de todo. Llevamos la fibra óptica directamente hasta tu hogar e instalamos los equipos necesarios." }
    ]
  };

  // @ts-ignore
  const currentFaqs = faqs[activeCategory] || faqs.general;

  return (
    <div className={`pt-32 pb-20 px-6 min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-6 gradient-text">Centro de Ayuda</h1>
                <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Resolvemos tus dudas al instante.
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                            activeCategory === cat.id 
                            ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30 scale-105' 
                            : 'glass hover:bg-white/10'
                        }`}
                    >
                        <cat.icon size={20} />
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
                {currentFaqs.map((faq: any, index: number) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`glass rounded-2xl overflow-hidden border ${
                            openIndex === index 
                            ? 'border-[#D4AF37]/50 bg-white/5' 
                            : 'border-white/5'
                        }`}
                    >
                        
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left font-bold text-lg"
                        >
                            <span className={openIndex === index ? 'gradient-text' : ''}>{faq.q}</span>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <CaretDown size={24} className={openIndex === index ? 'text-[#D4AF37]' : 'text-gray-500'} />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className={`px-6 pb-6 pt-0 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <p className="mb-6 text-gray-400">¿No encontraste lo que buscabas?</p>
                <Link to="/contacto" className="btn-gradient text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2">
                    <ChatCircleText size={24} />
                    Contactar Soporte
                </Link>
            </div>
        </div>
    </div>
  )
}
