import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Simplified Layout
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PlansPage from './pages/PlansPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="servicios" element={<ServicesPage />} />
          <Route path="planes" element={<PlansPage />} />
          <Route path="testimonios" element={<TestimonialsPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contacto" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
