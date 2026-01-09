import { useOutletContext, Link } from 'react-router-dom';
import { 
  WifiHigh as Wifi, 
  Television as Tv, 
  PhoneCall, 
  CheckCircle as Check,
  RocketLaunch,
  GameController,
  Globe,
  DeviceMobile,
  MonitorPlay
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();

  const detailedServices = [
    {
      id: "internet",
      icon: Wifi,
      title: "Internet Fibra Óptica",
      description: "Experimenta la verdadera velocidad con nuestra fibra óptica simétrica dedicada al hogar.",
      features: [
        "Velocidades simétricas de hasta 1000 Mbps",
        "Tecnología XGS-PON de última generación",
        "Router WiFi 6 (AX3000) incluido en todos los planes",
        "Baja latencia ideal para gaming y streaming",
        "Conexión estable sin interrupciones",
        "Soporte priority para usuarios fibra"
      ],
      extraIcon: RocketLaunch,
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: "tv",
      icon: Tv,
      title: "Televisión Digital Interactiva",
      description: "Disfruta del mejor entretenimiento con más de 150 canales en alta definición y contenido on-demand.",
      features: [
        "Más de 150 canales (80+ en HD y 4K)",
        "Decodificador Android TV 4K con control por voz",
        "Funciones de pausa, retroceso y grabación (Cloud DVR)",
        "Acceso directo a Netflix, YouTube y Prime Video",
        "Multi-pantalla: ve tu TV en tu celular o tablet",
        "Canales de deportes exclusivos"
      ],
      extraIcon: MonitorPlay,
      color: "from-purple-500 to-pink-400"
    },
    {
      id: "telefonia",
      icon: PhoneCall,
      title: "Telefonía Fija Ilimitada",
      description: "Comunícate sin límites con tus seres queridos con nuestra línea digital de voz clara.",
      features: [
        "Llamadas ilimitadas a fijos nacionales",
        "Minutos libres a móviles de cualquier operador",
        "Identificador de llamadas avanzado",
        "Buzón de voz digital integrado al email",
        "Sin costo de instalación de línea",
        "Portabilidad numérica gratuita"
      ],
      extraIcon: DeviceMobile,
      color: "from-green-500 to-emerald-400"
    }
  ];

  return (
    <div className={`pt-32 pb-20 px-6 min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="container mx-auto max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Nuestros Servicios</h1>
                <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Soluciones integrales de conectividad diseñadas para transformar tu experiencia digital. 
                    Calidad, velocidad y entretenimiento en un solo lugar.
                </p>
            </motion.div>

            <div className="space-y-24">
                {detailedServices.map((service, index) => (
                    <motion.div 
                        key={service.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
                        id={service.id}
                    >
                        {/* Image/Visual Content */}
                        <div className="w-full lg:w-1/2">
                            <div className={`relative rounded-3xl overflow-hidden aspect-video lg:aspect-square bg-gradient-to-br ${service.color} p-1`}>
                                <div className={`absolute inset-0 bg-[#0a0f1a]/80 backdrop-blur-sm`}></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                                    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${service.color} bg-opacity-20 flex items-center justify-center mb-8 shadow-2xl shadow-${service.color}/50 animate-float`}>
                                        <service.extraIcon size={64} className="text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">{service.title}</h3>
                                    <p className="text-gray-300 max-w-sm">{service.description}</p>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full lg:w-1/2">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20`}>
                                    <service.icon size={32} className="text-white" />
                                </div>
                                <span className={`text-sm font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r ${service.color}`}>
                                    {service.id.toUpperCase()}
                                </span>
                            </div>
                            
                            <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {service.title}
                            </h2>
                            <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {service.description}
                            </p>

                            <ul className="space-y-4 mb-10">
                                {service.features.map((feature, i) => (
                                    <li key={i} className={`flex items-start gap-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <div className={`mt-1 min-w-[20px]`}>
                                             <Check size={20} className="text-[#D4AF37]" weight="fill" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link 
                                to={service.id === 'internet' ? '/planes' : '/contacto'}
                                className="btn-gradient text-white px-8 py-4 rounded-xl font-bold inline-flex items-center gap-3 hover:scale-105 transition-transform"
                            >
                                {service.id === 'internet' ? 'Ver Planes Disponibles' : 'Solicitar Información'}
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-32 text-center">
                <div className="glass p-12 rounded-3xl max-w-4xl mx-auto border border-[#D4AF37]/30">
                    <h2 className="text-3xl font-bold mb-6 text-white">¿Listo para mejorar tu conexión?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Únete a miles de usuarios satisfechos que ya disfrutan de la velocidad y estabilidad de Evelyn SAC.
                    </p>
                    <Link 
                        to="/planes"
                        className="btn-gradient text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-[#D4AF37]/20"
                    >
                        Contratar Ahora
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
