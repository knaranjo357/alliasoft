import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PerformanceLanding from './PerformanceLanding.tsx';
import './index.css';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PerformanceLanding />
  </StrictMode>
);
