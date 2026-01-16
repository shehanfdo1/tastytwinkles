import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="text-center py-20 text-dark-brown">Loading cakes...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-sans font-bold text-center mb-4 uppercase tracking-widest text-dark-brown">Our Collections</h2>
            <div className="w-20 h-1 bg-sage-green mx-auto mb-16"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id} className="group cursor-pointer">
                        <div className="relative overflow-hidden border border-sage-green/20 rounded-t-xl">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                            {!product.isAvailable && (
                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                    <span className="text-dark-brown font-bold tracking-widest border border-dark-brown px-4 py-2">SOLD OUT</span>
                                </div>
                            )}
                        </div>
                        <div className="bg-white p-6 border-x border-b border-sage-green/20 rounded-b-xl text-center group-hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-serif text-dark-brown mb-2">{product.name}</h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2 px-4">{product.description}</p>
                            <span className="inline-block px-6 py-2 border border-sage-green text-sage-green rounded-full text-sm font-medium tracking-wider group-hover:bg-sage-green group-hover:text-white transition-colors">
                                FROM ${product.variants[0]?.price}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
