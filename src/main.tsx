import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PerformanceLanding from './PerformanceLanding.tsx';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PerformanceLanding />
  </StrictMode>
);
