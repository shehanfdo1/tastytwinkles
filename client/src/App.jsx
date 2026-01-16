import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';

import ProductDetail from './components/ProductDetail';

import { FaInstagram, FaFacebookF } from 'react-icons/fa';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream font-sans text-dark-brown">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProductList />
            </>
          } />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-dark-brown text-cream py-10">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <h3 className="font-serif italic text-2xl">Tasty Twinkles</h3>
            <div className="text-sm font-light opacity-80 space-y-1">
              <p>19/5B St. Anne's Lane, Egodauyana, Moratuwa 10400, Sri Lanka</p>
              <p>075 880 0533</p>
              <p>Open 24 Hours • Every Day</p>
            </div>
            <div className="flex justify-center space-x-6 pt-4">
              <a href="https://www.instagram.com/tasty_twinkles/" target="_blank" rel="noopener noreferrer" className="hover:text-sage-green transition-colors text-2xl">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/p/Tasty-Twinkles-61560390877646/" target="_blank" rel="noopener noreferrer" className="hover:text-sage-green transition-colors text-xl">
                <FaFacebookF />
              </a>
            </div>
            <p className="text-xs tracking-widest opacity-60 pt-6">EST. 2026 • HANDCRAFTED WITH LOVE</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
