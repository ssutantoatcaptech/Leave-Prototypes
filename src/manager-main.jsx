import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ManagerApp from './ManagerApp';
import './styles.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={(import.meta.env.BASE_URL || '/') + 'manager-portal'}>
      <ScrollToTop />
      <ManagerApp />
    </BrowserRouter>
  </React.StrictMode>
);
