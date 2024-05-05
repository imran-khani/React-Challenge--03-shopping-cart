import './App.css';
import { useState, useEffect, useContext } from 'react';
import Product from './components/Product';
import { LucideShoppingCart } from 'lucide-react';
import { CartContext } from './store/CartContext';
import { ProductTypes, getData } from './lib/data';

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { onOpen } = useContext(CartContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container mx-auto py-24'>
            <span className="fixed top-10 right-10 cursor-pointer" onClick={onOpen}>
                <LucideShoppingCart size={50} />
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {products.map((product: ProductTypes) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default App;
