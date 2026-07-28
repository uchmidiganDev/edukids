import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AppProvider } from './context/AppContext';

// HashRouter ishlatiladi - shunda loyiha Vercel, Netlify va GitHub Pages'da
// har qanday qo'shimcha server sozlovisiz, sahifani yangilaganda ham to'g'ri ishlaydi.
// Eslatma: StrictMode ataylab ishlatilmagan - u Framer Motion'ning AnimatePresence
// chiqish animatsiyasini faqat dev rejimida ikki marta chaqirib, sahifa
// o'tishlarini vaqti-vaqti bilan "qotirib" qo'yardi (production build'ga ta'sir qilmaydi).
createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>
);
