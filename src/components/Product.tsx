import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import toast from "react-hot-toast";

interface ProductTypes {
    product: {
        id: number;
        title: string;
        thumbnail: string;
        price: number;
        total?: number;
    }
}


const Product = ({
    product
}: ProductTypes) => {

    const { addToCart, cartItems } = useContext(CartContext)
    const { id, title, thumbnail, price } = product;

    const addProduct = () => {
        if (!id || !title || !thumbnail || !price) return;

        
        // if product is already in cart, show a toast message
        const isProductInCart = cartItems?.find((item) => item.id === id);


        if (isProductInCart) {
            toast.error('Product already in cart')
            return;
        }

        
        if (addToCart) {
            addToCart({
                id,
                title,
                thumbnail,
                price,
                // add total price to cart
                total: price
            });
            toast.success('Product added to cart')
        }
    }
    return (
        <div className='flex justify-center items-center flex-col w-full dark:bg-black dark:text-white'>
            <div className="w-full h-full">
                <div className="bg-white border border-indigo-200 p-4 rounded-md h-full ">
                    <div className="flex gap-5 flex-col relative pb-5">
                        <div className="relative aspect-square overflow-hidden">
                            <img
                                className='object-cover object-center w-full h-full'
                                alt='product'
                                src={thumbnail}
                            />
                        </div>
                        <div className="flex gap-y-2 flex-col">
                            <span className='text-base'>
                                {title}
                            </span>
                            <span className='text-sm text-neutral-600'>
                                $ {price}
                            </span>
                            <button
                                onClick={addProduct}
                                className='bg-indigo-500 text-white py-2 px-4 rounded-md absolute bottom-0 mt-5'
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
