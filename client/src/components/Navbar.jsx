import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineSearch, HiOutlineUser } from 'react-icons/hi'; // HeroIcons

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sage-green/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Left: Search (Visual Only) */}
                    <div className="hidden md:flex items-center space-x-4">
                        <HiOutlineSearch className="w-6 h-6 text-dark-brown" />
                    </div>

                    {/* Center: Logo */}
                    <Link to="/" className="text-3xl font-serif text-dark-brown tracking-widest font-bold">
                        TASTY TWINKLES
                    </Link>

                    {/* Right: Cart & Account */}
                    <div className="flex items-center space-x-6">
                        <button className="text-dark-brown hover:text-sage-green transition-colors">
                            <HiOutlineUser className="w-6 h-6" />
                        </button>
                        <button className="text-dark-brown hover:text-sage-green transition-colors relative">
                            <HiOutlineShoppingBag className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-sage-green text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
