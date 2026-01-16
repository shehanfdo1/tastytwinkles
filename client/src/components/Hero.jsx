import React from 'react';

const Hero = () => {
    return (
        <div className="relative h-[80vh] w-full overflow-hidden bg-cream flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="/images/Gemini_Generated_Image_k243ik243ik243ik.png"
                    alt="Aesthetic Cake Background"
                    className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Content Content using absolute positioning to center over the image */}
            <div className="relative z-10 text-center text-white space-y-6 max-w-2xl px-4">
                <h2 className="text-sm md:text-base uppercase tracking-[0.3em] font-sans text-cream/90">
                    Handcrafted - Premium - Fresh
                </h2>
                <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight">
                    The Art of <br /> Celebration
                </h1>
                <p className="text-lg md:text-xl font-light text-cream/90 max-w-lg mx-auto">
                    Aesthetic cakes designed for your most precious moments.
                </p>
                <button className="mt-8 px-8 py-3 bg-sage-green text-white rounded-full font-sans tracking-wider hover:bg-dark-brown transition-all duration-300 transform hover:scale-105">
                    SHOP CAKES
                </button>
            </div>
        </div>
    );
};

export default Hero;
