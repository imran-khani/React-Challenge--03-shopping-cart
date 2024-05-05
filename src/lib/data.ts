export interface ProductTypes {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface DataResponse {
    products: ProductTypes[];
    total: number;
    skip: number;
    limit: number;
}

export async function getData() {
    try {
        const response = await fetch('https://dummyjson.com/products')
        const data = await response.json()
        return data
    } catch {
        throw new Error('Error fetching data')
    }
}