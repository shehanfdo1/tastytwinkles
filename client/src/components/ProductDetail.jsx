import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { HiOutlineUpload, HiOutlineCheck } from 'react-icons/hi';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [customText, setCustomText] = useState('');
    const [customPhoto, setCustomPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Derived state for availability could be added here
    // For now, we assume all future dates are available unless backend says no

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
                setProduct(res.data);
                if (res.data.variants.length > 0) setSelectedWeight(res.data.variants[0]);
            } catch (err) {
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handlePhotoChange = (e) => {
        setCustomPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedWeight) return alert("Please select a weight and date.");

        setSubmitting(true);
        const formData = new FormData();
        formData.append('customerName', 'Guest User'); // Mock user
        formData.append('customerEmail', 'guest@example.com');
        formData.append('customerPhone', '1234567890');
        formData.append('items', JSON.stringify([{
            product: product._id,
            weight: selectedWeight.weight,
            price: selectedWeight.price,
            quantity: 1
        }]));
        formData.append('totalAmount', selectedWeight.price);
        formData.append('pickupDate', selectedDate);
        formData.append('customText', customText);
        if (customPhoto) formData.append('customPhoto', customPhoto);

        try {
            // Send order data to backend
            await axios.post(`${import.meta.env.VITE_API_URL}/orders`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Order placed successfully!');
            navigate('/');
        } catch (err) {
            console.error("Error placing order:", err);
            alert('Failed to place order.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="space-y-4">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl border border-sage-green/20">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Details Section */}
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-serif text-dark-brown mb-2">{product.name}</h1>
                    <p className="text-lg text-gray-500 font-light">{product.description}</p>
                </div>

                {/* Weight Selection */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-dark-brown mb-3">Select Weight</h3>
                    <div className="flex space-x-4">
                        {product.variants.map((variant) => (
                            <button
                                key={variant.weight}
                                onClick={() => setSelectedWeight(variant)}
                                className={`px-6 py-2 rounded-full border transition-all ${selectedWeight?.weight === variant.weight
                                    ? 'bg-sage-green text-white border-sage-green shadow-md'
                                    : 'bg-transparent text-gray-600 border-gray-300 hover:border-sage-green'
                                    }`}
                            >
                                {variant.weight} - ${variant.price}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date Selection */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-dark-brown mb-3">Select Pickup Date</h3>
                    <div className="w-full">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            minDate={new Date()}
                            placeholderText="Select a date"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sage-green font-sans"
                            calendarClassName="font-sans border-sage-green rounded-lg shadow-xl"
                            dayClassName={date => "hover:bg-sage-green/20 rounded-full"}
                        />
                    </div>
                </div>

                {/* Customization */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Message (on cake)</label>
                        <textarea
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sage-green"
                            placeholder="Happy Birthday..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Reference Photo</label>
                        <div className="flex items-center space-x-4">
                            <label className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                                <HiOutlineUpload className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-600">Choose File</span>
                                <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                            </label>
                            {customPhoto && <span className="text-sm text-sage-green flex items-center"><HiOutlineCheck className="mr-1" /> Attached</span>}
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-4 bg-dark-brown text-white rounded-full font-bold tracking-widest hover:bg-sage-green transition-colors disabled:opacity-50"
                >
                    {submitting ? 'PROCESSING...' : `PRE-ORDER NOW - $${selectedWeight ? selectedWeight.price : 0}`}
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
