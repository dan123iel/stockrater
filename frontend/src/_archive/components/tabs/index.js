import { lazy } from 'react';

// Lazy-loaded tab components — only bundled when first rendered
export const TabScorecard    = lazy(() => import('./TabScorecard'));
export const TabChart        = lazy(() => import('./TabChart'));
export const TabValuation    = lazy(() => import('./TabValuation'));
export const TabDCF          = lazy(() => import('./TabDCF'));
export const TabNews         = lazy(() => import('./TabNews'));
export const TabInsider      = lazy(() => import('./TabInsider'));
export const TabAI           = lazy(() => import('./TabAI'));
export const TabOwnership    = lazy(() => import('./TabOwnership'));
export const TabProfile      = lazy(() => import('./TabProfile'));
