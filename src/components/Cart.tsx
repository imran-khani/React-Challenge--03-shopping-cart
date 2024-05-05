import { X } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../store/CartContext"
import toast from "react-hot-toast"

const Cart = () => {

    // get the cart context
    const { isOpen, onClose, cartItems, removeFromCart } = useContext(CartContext)

    const [showModal, setShowModal] = useState(isOpen)

    // set the cart modal to default state
    useEffect(() => {
        setShowModal(isOpen)
    }, [])


    // remove item from cart
    const handleRemove = (id: number) => {
        if (removeFromCart) removeFromCart(id);
        toast.success('Item removed from cart')
    }

    // keep the cart modal false if it is not open
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-50 bg-neutral-800/20 overflow-x-hidden overflow-y-auto"
        >
            <div className={`absolute right-0 h-full bg-white p-4 w-1/3 
        transition-all duration-300
        ${showModal ? 'translate-x-full' : 'translate-x-0'}
        `}>
                <span
                    title="Close Cart"
                    className="absolute right-5 cursor-pointer"

                >
                    <X size={30} onClick={onClose} />
                </span>
                <div className="flex gap-y-3 flex-col py-24">
                    {
                        !cartItems || cartItems.length === 0 ? <div>No items in cart</div> : (
                            cartItems?.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-row gap-x-2 w-full">
                                    <div className="relative">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded-lg aspect-square"
                                        />
                                        <div className="flex flex-col gap-y-1">
                                            <span className="font-bold">{item.title}</span>
                                        </div>
                                        <button
                                            className="bg-red-500 mt-2 text-white py-2 px-4 rounded-md"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
                {
                    !cartItems || cartItems.length === 0 ? null : (
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">Total: $100</span>
                            <button
                            onClick={() => toast.error('You are poor 😂')}
                            className="bg-indigo-500 text-white py-2 px-4 rounded-md">
                                Checkout
                            </button>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Cart