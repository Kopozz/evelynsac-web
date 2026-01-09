import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';
import { MessageCircle, X, Send, ChevronDown, MapPin } from 'lucide-react';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Coverage zones in Lima
const coverageZones = [
  { name: 'Miraflores', lat: -12.1191, lng: -77.0297, radius: 2000, color: '#06b6d4' },
  { name: 'San Isidro', lat: -12.0977, lng: -77.0347, radius: 1800, color: '#14b8a6' },
  { name: 'Surco', lat: -12.1464, lng: -76.9917, radius: 2500, color: '#0ea5e9' },
  { name: 'La Molina', lat: -12.0867, lng: -76.9351, radius: 2200, color: '#22c55e' },
  { name: 'San Borja', lat: -12.1067, lng: -76.9997, radius: 1500, color: '#8b5cf6' },
  { name: 'Barranco', lat: -12.1456, lng: -77.0203, radius: 1200, color: '#f59e0b' },
  { name: 'Jesús María', lat: -12.0708, lng: -77.0428, radius: 1300, color: '#ec4899' },
  { name: 'Lince', lat: -12.0833, lng: -77.0333, radius: 1100, color: '#06b6d4' },
];

// Map Component
export function CoverageMap() {
  const centerLima = { lat: -12.0464, lng: -77.0428 };

  return (
    <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
      <MapContainer 
        center={[centerLima.lat, centerLima.lng]} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coverageZones.map((zone) => (
          <Circle
            key={zone.name}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{
              fillColor: zone.color,
              fillOpacity: 0.3,
              color: zone.color,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-center p-2">
                <h3 className="font-bold text-lg">{zone.name}</h3>
                <p className="text-green-600">✅ Cobertura disponible</p>
                <p className="text-sm text-gray-600">Internet hasta 300 Mbps</p>
              </div>
            </Popup>
          </Circle>
        ))}
        {coverageZones.map((zone) => (
          <Marker key={`marker-${zone.name}`} position={[zone.lat, zone.lng]}>
            <Popup>
              <div className="text-center">
                <strong>{zone.name}</strong>
                <br />
                <span className="text-green-600">Cobertura total</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// FAQ Data
const faqData = [
  {
    question: '¿Cuál es la velocidad máxima de internet?',
    answer: 'Ofrecemos planes de hasta 300 Mbps de velocidad simétrica con fibra óptica.',
  },
  {
    question: '¿Hay costo de instalación?',
    answer: '¡No! La instalación es completamente gratuita en todas nuestras zonas de cobertura.',
  },
  {
    question: '¿Cuánto demora la instalación?',
    answer: 'La instalación se programa en un plazo de 24 a 48 horas después de contratar el servicio.',
  },
  {
    question: '¿Incluye router WiFi?',
    answer: 'Sí, todos nuestros planes incluyen un router WiFi 6 de última generación.',
  },
  {
    question: '¿Hay contrato de permanencia?',
    answer: 'No, no tenemos contratos de permanencia. Puedes cancelar cuando desees.',
  },
  {
    question: '¿Cómo puedo pagar mi servicio?',
    answer: 'Aceptamos pagos con tarjeta, transferencia bancaria, Yape y Plin.',
  },
];

// Chatbot Component
export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: '¡Hola! 👋 Soy el asistente virtual de EVELYN SAC. ¿En qué puedo ayudarte?', isBot: true },
  ]);
  const [showFaq, setShowFaq] = useState(true);

  const handleFaqClick = (faq: typeof faqData[0]) => {
    setMessages((prev) => [
      ...prev,
      { text: faq.question, isBot: false },
      { text: faq.answer, isBot: true },
    ]);
    setShowFaq(false);
  };

  const resetChat = () => {
    setMessages([
      { text: '¡Hola! 👋 Soy el asistente virtual de EVELYN SAC. ¿En qué puedo ayudarte?', isBot: true },
    ]);
    setShowFaq(true);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-32 right-6 z-[200] bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-48 right-6 z-[200] w-80 sm:w-96 bg-[#0a0f1a] border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-slide-in-from-top">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#B8860B] to-[#D4AF37] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white">Asistente EVELYN</h3>
                <p className="text-xs text-white/80">En línea</p>
              </div>
            </div>
            <button onClick={resetChat} className="text-xs bg-white/20 px-2 py-1 rounded">
              Reiniciar
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isBot
                      ? 'bg-white/10 text-gray-300 rounded-bl-none'
                      : 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white rounded-br-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Quick Replies */}
          {showFaq && (
            <div className="border-t border-white/10 p-3 space-y-2 max-h-40 overflow-y-auto">
              <p className="text-xs text-gray-500 mb-2">Preguntas frecuentes:</p>
              {faqData.slice(0, 4).map((faq, i) => (
                <button
                  key={i}
                  onClick={() => handleFaqClick(faq)}
                  className="block w-full text-left text-xs bg-white/5 hover:bg-white/10 text-gray-300 p-2 rounded-lg transition-colors"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-white/10 p-3 flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <button className="bg-gradient-to-r from-[#B8860B] to-[#D4AF37] p-2 rounded-xl">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Coverage Check Component
export function CoverageCheck() {
  const [district, setDistrict] = useState('');
  const [result, setResult] = useState<'success' | 'pending' | null>(null);

  const checkCoverage = () => {
    const covered = coverageZones.some(
      (z) => z.name.toLowerCase() === district.toLowerCase()
    );
    setResult(covered ? 'success' : 'pending');
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
        <MapPin className="text-[#D4AF37]" size={24} />
        Verifica tu cobertura
      </h3>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Ingresa tu distrito..."
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50"
        />
        <button
          onClick={checkCoverage}
          className="btn-gradient text-white px-6 py-3 rounded-xl font-bold"
        >
          Verificar
        </button>
      </div>
      {result === 'success' && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400">
          ✅ ¡Excelente! Tenemos cobertura en tu zona.
        </div>
      )}
      {result === 'pending' && (
        <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-xl text-yellow-400">
          ⏳ Zona en expansión. Déjanos tu email y te avisamos cuando tengamos cobertura.
          <input
            type="email"
            placeholder="tu@email.com"
            className="mt-3 w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500"
          />
        </div>
      )}
    </div>
  );
}
