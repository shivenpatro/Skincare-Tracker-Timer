import React from 'react';
import { Info } from 'lucide-react';

export function ProductGuide() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-slide-in hover:shadow-xl transition-all">
      <div className="relative">
        <img
          src="/images/product-guide.jpeg"
          alt="Product amount guide from The Face Shop"
          className="w-full h-auto max-h-[400px] object-contain rounded-lg mb-4"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Product Amount Guide
          </h2>
          <p className="text-sm opacity-90">Learn the perfect amount for each skincare product</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {['Cleanser', 'Serum', 'Moisturizer'].map((product) => (
          <div key={product} className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all">
            <h3 className="font-medium text-purple-700">{product}</h3>
            <p className="text-sm text-purple-600">Pea-sized amount</p>
          </div>
        ))}
      </div>
    </div>
  );
}