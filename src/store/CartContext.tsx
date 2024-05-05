import { createContext, useCallback, useState } from "react";

interface cartItems {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    total?: number;
}

interface CartContextType {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    cartItems?: cartItems[];
    addToCart?: (item: cartItems) => void;
    removeFromCart?: (id: number) => void;
}

export const CartContext = createContext<CartContextType>({
    isOpen: false,
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    onClose: () => { },
    onOpen: () => { }
});


export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState<cartItems[]>([])
    const onOpen = useCallback(() => {
        setTimeout(() => {
            setIsOpen(true)
        }, 300);
    }, [])

    const addToCart = (item: cartItems) => {
        localStorage.setItem('cart', JSON.stringify([...cartItems, item]))
        
        setCartItems([...cartItems, item])
    }

    const removeFromCart = (id: number) => {
        const filteredItems = cartItems.filter((item) => item.id !== id)
        setCartItems(filteredItems)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const contextValues = {
        onClose,
        onOpen,
        isOpen,
        cartItems,
        addToCart,
        removeFromCart
    }

    return (
        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>
    )
}