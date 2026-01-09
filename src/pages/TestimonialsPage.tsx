import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Quotes, UserCircle, MapPin } from '@phosphor-icons/react';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';

export default function TestimonialsPage() {
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();

  const testimonials = [
    {
      name: "Carlos Mendoza",
      handle: "@SanIsidro",
      description: "La velocidad es increíble. Trabajo desde casa subiendo archivos pesados y nunca he tenido una caída. Totalmente recomendado para profesionales.",
      image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Andrea Luján",
      handle: "@Miraflores",
      description: "Me cambié de otro operador y la diferencia es abismal. El ping en juegos bajó a la mitad y Netflix ya no se corta.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Miguel Ángel",
      handle: "@LaMolina",
      description: "El soporte técnico es rápido de verdad. Tuve una duda con el WiFi y me ayudaron por WhatsApp al instante.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Lucía Fernández",
      handle: "@SanBorja",
      description: "Precio justo para la calidad que ofrecen. No te suben la tarifa a los meses como otros. Honestidad que se aprecia.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Roberto Campos",
      handle: "@JesusMaria",
      description: "La instalación fue súper limpia y ordenada. Los técnicos usaron protectores para zapatos y dejaron todo impecable.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Elena Vargas",
      handle: "@Surco",
      description: "Tengo clases virtuales todo el día y la conexión es súper estable. Mis hijos también juegan online sin problemas.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className={`pt-32 pb-20 px-6 min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 gradient-text">Lo que dicen nuestros clientes</h1>
                <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    La confianza se gana con hechos. Mira por qué miles de limeños nos eligen.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
                    {[
                        { label: "Clientes Activos", value: "5,000+" },
                        { label: "Satisfacción", value: "98%" },
                        { label: "Uptime Anual", value: "99.9%" },
                        { label: "Distritos", value: "12+" },
                    ].map((stat, i) => (
                        <div key={i} className="glass p-4 rounded-2xl">
                            <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

      <div className="relative mb-20">
        <AnimatedTestimonials
          data={testimonials}
          className="py-10"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 mt-12 max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-500">
                Más de 5,000 clientes satisfechos en todo Lima
            </p>
      </div>
    </div>
  </div>
)
}
