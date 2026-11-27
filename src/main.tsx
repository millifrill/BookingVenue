import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/tokens.css';
import './index.css';
import './styles/global.css';
import App from './App.tsx';
import VenueProvider from './context/VenueContext/VenueContext.tsx';
import AdminAuthProvider from './context/AdminContext/AdminContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <VenueProvider>
          <App />
        </VenueProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
