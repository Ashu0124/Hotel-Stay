import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ClerkProvider} from "@clerk/clerk-react";
import { SearchProvider } from './context/SearchContext.jsx';
import { LoadingProvider } from './context/LoadingContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <LoadingProvider>
        <SearchProvider>
        <App />
        </SearchProvider>
        </LoadingProvider>
      </ClerkProvider>
  </StrictMode>,
)
