import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  List as Menu, 
  X, 
  Sun, 
  Moon, 
  PhoneCall, 
  Lightning as Zap,
  MapPin 
} from '@phosphor-icons/react';
import { WhatsAppButton } from './PremiumEffects';
import { ChatBot } from './MapAndChat';
import { LoadingScreen } from './HeroPremium';
import GradualBlur from './GradualBlur';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Podríamos iniciarlo en true si queremos loading global
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para scroll suave a secciones si estamos en home, o navegar si no
  const handleNavClick = (id: string) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else {
      // Si estamos en otra página, esto se maneja con Link to="/#id" que react-router hash link puede manejar, 
      // o simplemente navegamos a la página dedicada.
      // El usuario pidió páginas dedicadas, así que el navbar quizás deba llevar a las páginas dedicadas.
      // Pero el usuario dijo "cuando apretas esos botones de arriba te lleve a dicho apartado osea de la pagina principal".
      // Así que mantendré la lógica de anclas para HOME, pero si estoy fuera de home, debo ir a home#seccion.
    }
  };

  const navLinks = [
    { name: 'Inicio', path: '/', sectionId: 'inicio' },
    { name: 'Servicios', path: '/', sectionId: 'servicios' },
    { name: 'Planes', path: '/', sectionId: 'planes' },
    { name: 'Testimonios', path: '/', sectionId: 'testimonios' },
    { name: 'FAQ', path: '/', sectionId: 'faq' },
    { name: 'Contacto', path: '/', sectionId: 'contacto' }
  ];

  return (
    <>
      <ScrollToTop />
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div data-theme={isDarkMode ? 'dark' : 'light'} className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-300 flex flex-col ${isDarkMode ? 'dark-mode bg-[#0a0f1a] text-white' : 'light-mode bg-[#f8fafc] text-[#0f172a]'}`}>
      
        <WhatsAppButton />
        <ChatBot />

        {/* --- NAVBAR --- */}
        <nav 
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled 
              ? isDarkMode 
                ? 'bg-[#0a0f1a]/95 backdrop-blur-md py-3 border-b border-white/10'
                : 'bg-white/95 backdrop-blur-md py-3 border-b border-gray-200 shadow-sm'
              : 'bg-transparent py-5'
          }`}
        >
          <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <img 
                src="/logo.png" 
                alt="NET FIBER PERÚ"
                className="h-28 w-auto object-contain"
              />
            </Link>

            {/* Desktop Menu */}
            <div className={`hidden lg:flex items-center gap-8 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {navLinks.map((item) => {
                // Si es Inicio o estamos en home, usamos scroll, si no Link
                const isHome = location.pathname === '/';
                
                if (isHome) {
                    return (
                        <button 
                            key={item.name} 
                            onClick={() => handleNavClick(item.sectionId)}
                            className="hover:text-[#D4AF37] transition-colors"
                        >
                            {item.name}
                        </button>
                    )
                } else {
                    // Si estamos en otra página, el link lleva a home con hash (o a la página dedicada, pero user pidió comportamiento original)
                    // El user dijo: "cuando apretas esos botones de arriba te lleve a dicho apartado osea de la pagina principal"
                    return (
                        <Link 
                            key={item.name}
                            to={`/#${item.sectionId}`} // Esto requerirá un useEffect en Home para leer el hash
                            className="hover:text-[#D4AF37] transition-colors"
                        >
                            {item.name}
                        </Link>
                    )
                }
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} className="text-[#D4AF37]" /> : <Moon size={20} className="text-[#1e3a5f]" />}
              </button>
              <a href="tel:+51999888777" className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <PhoneCall size={18} className="text-[#D4AF37]" />
                <span className="font-medium">999 888 777</span>
              </a>
              <button className="btn-gradient text-white px-6 py-2.5 rounded-full font-bold text-sm">
                Contáctanos
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-[#0a0f1a]/98 backdrop-blur-lg border-b border-white/10 p-6 flex flex-col gap-4 lg:hidden animate-slide-in-from-top">
              {navLinks.map((item) => (
                 location.pathname === '/' ? (
                    <button 
                        key={item.name} 
                        onClick={() => handleNavClick(item.sectionId)}
                        className="text-left text-lg font-medium text-gray-300 py-2 border-b border-white/5 hover:text-[#D4AF37] transition-colors"
                    >
                        {item.name}
                    </button>
                 ) : (
                    <Link
                        key={item.name}
                        to={`/#${item.sectionId}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-left text-lg font-medium text-gray-300 py-2 border-b border-white/5 hover:text-[#D4AF37] transition-colors"
                    >
                        {item.name}
                    </Link>
                 )
              ))}
              <button className="btn-gradient text-white py-3 rounded-xl font-bold mt-2">
                Contáctanos
              </button>
            </div>
          )}
        </nav>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-grow">
            <Outlet context={{ isDarkMode }} /> 
        </main>

        {/* --- FOOTER --- */}
        <footer className={`relative z-[200] border-t pt-12 mt-auto p-6 ${isDarkMode ? 'border-white/10 bg-[#0a0f1a]' : 'border-gray-200 bg-[#f8fafc]'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              {/* Logo & Description */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#B8860B] to-[#D4AF37] rounded-xl flex items-center justify-center text-white">
                    <Zap size={22} fill="currentColor" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>EVELYN SAC</span>
                    <span className="text-xs text-[#D4AF37]">Fibra Óptica Premium</span>
                  </div>
                </div>
                <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Líder en servicios de fibra óptica, cable TV y telefonía en Perú.
                </p>
                {/* Social Icons */}
                <div className="flex gap-3">
                  {/* Icons placeholders... reusing existing ones */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FB</div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>IG</div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>TW</div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>YT</div>
                </div>
              </div>

              {/* Enlaces Rápidos */}
              <div>
                <h4 className={`font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Enlaces Rápidos</h4>
                <ul className={`space-y-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {navLinks.map(link => (
                    <li key={link.name}>
                        <Link to={`/${link.path === '/' ? '#' + link.sectionId : link.path}`} className="hover:text-[#D4AF37] transition-colors">{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Servicios */}
              <div>
                <h4 className={`font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Servicios</h4>
                <ul className={`space-y-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li><Link to="/servicios" className="hover:text-[#D4AF37] transition-colors">Internet Fibra Óptica</Link></li>
                  <li><Link to="/servicios" className="hover:text-[#D4AF37] transition-colors">Cable TV Premium</Link></li>
                  <li><Link to="/servicios" className="hover:text-[#D4AF37] transition-colors">Telefonía Ilimitada</Link></li>
                  <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Paquetes Empresariales</Link></li>
                  <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Soporte Técnico</Link></li>
                </ul>
              </div>

              {/* Contacto */}
              <div>
                <h4 className={`font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contacto</h4>
                <ul className={`space-y-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-center gap-3">
                    <PhoneCall size={16} className="text-[#D4AF37] shrink-0" />
                    <span>+51 999 888 777</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 text-[#D4AF37] shrink-0">@</div>
                    <span>contacto@evelynsac.com</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Av. Tecnología 123, Lima, Perú</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Copyright */}
            <div className={`flex flex-col md:flex-row justify-between items-center py-6 border-t text-sm ${isDarkMode ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
              <p>&copy; 2026 EVELYN SAC. Todos los derechos reservados.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Política de Privacidad</a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Términos y Condiciones</a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Libro de Reclamaciones</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <GradualBlur 
        preset="page-footer"
        strength={2}
        height="120px"
        zIndex={50} // El blur debe quedar atras
      />
    </>
  );
}
