
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router'
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')!).render(
    <CookiesProvider>
        <AppRouter/>
    </CookiesProvider>
)
