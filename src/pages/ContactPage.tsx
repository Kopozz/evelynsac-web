import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Envelope, 
  WhatsappLogo, 
  PaperPlaneRight,
  Clock
} from '@phosphor-icons/react';
import { CoverageMap } from '../components/MapAndChat';

export default function ContactPage() {
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.");
  };

  return (
    <div className={`pt-32 pb-20 px-6 min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 gradient-text">Contáctanos</h1>
                <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Estamos listos para atenderte. Elige el medio que prefieras.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Contact Info & Map */}
                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                                <WhatsappLogo size={32} weight="fill" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                            <p className="text-gray-400 text-sm mb-4">Respuesta inmediata</p>
                            <a href="https://wa.me/51999888777" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] font-bold hover:underline">
                                +51 999 888 777
                            </a>
                        </div>
                        
                        <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mb-4">
                                <Phone size={32} weight="fill" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Llámanos</h3>
                            <p className="text-gray-400 text-sm mb-4">Atención 24/7</p>
                            <a href="tel:012345678" className="text-[#D4AF37] font-bold hover:underline">
                                (01) 234-5678
                            </a>
                        </div>

                        <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 mb-4">
                                <Envelope size={32} weight="fill" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Email</h3>
                            <p className="text-gray-400 text-sm mb-4">Consultas y cotizaciones</p>
                            <a href="mailto:ventas@evelynsac.com" className="text-[#D4AF37] font-bold hover:underline">
                                ventas@evelynsac.com
                            </a>
                        </div>

                        <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 mb-4">
                                <Clock size={32} weight="fill" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Horario</h3>
                            <p className="text-gray-400 text-sm mb-4">Atención en oficina</p>
                            <span className="text-[#D4AF37] font-bold">
                                Lun - Sab: 9am - 6pm
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <MapPin size={28} className="text-[#D4AF37]" weight="fill" />
                            Nuestra Cobertura
                        </h3>
                        <div className="glass p-2 rounded-3xl">
                            <CoverageMap />
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="glass p-8 md:p-12 rounded-3xl h-fit border border-[#D4AF37]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <h2 className="text-3xl font-bold mb-8 relative z-10">Envíanos un mensaje</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Nombre</label>
                                <input 
                                    type="text" 
                                    placeholder="Juan Pérez"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Teléfono</label>
                                <input 
                                    type="tel" 
                                    placeholder="999 888 777"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Correo Electrónico</label>
                            <input 
                                type="email" 
                                placeholder="juan@ejemplo.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Asunto</label>
                            <select 
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all [&>option]:text-black"
                            >
                                <option>Quiero contratar un plan</option>
                                <option>Soporte Técnico</option>
                                <option>Facturación</option>
                                <option>Otros</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Mensaje</label>
                            <textarea 
                                rows={4}
                                placeholder="Escribe tu consulta aquí..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none"
                                required
                            ></textarea>
                        </div>

                        <button 
                            type="submit"
                            className="w-full btn-gradient text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                        >
                            <PaperPlaneRight size={20} weight="fill" />
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
