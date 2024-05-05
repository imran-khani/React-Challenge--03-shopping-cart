import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './store/ThemeContext.tsx'
import Cart from './components/Cart.tsx'
import { CartProvider } from './store/CartContext.tsx'
import ToastProvider from './components/ToastProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <ToastProvider />
            <CartProvider>
                <Cart />
                <App />
            </CartProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
