'use client';

import React from 'react';
import { Product } from '@/types/product';

interface RelatedProductsProps {
  currentProductId: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId
}) => {
  // Mock related products data
  const relatedProducts = [
    {
      id: 'primer-001',
      name: 'Premium Primer',
      image: 'https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 34.99,
      rating: 4.7
    },
    {
      id: 'brush-set-001',
      name: 'Professional Brush Set',
      image: 'https://images.pexels.com/photos/1838564/pexels-photo-1838564.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 79.99,
      rating: 4.9
    },
    {
      id: 'roller-kit-001',
      name: 'Premium Roller Kit',
      image: 'https://images.pexels.com/photos/6508390/pexels-photo-6508390.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 45.99,
      rating: 4.6
    },
    {
      id: 'color-samples-001',
      name: 'Color Sample Kit',
      image: 'https://images.pexels.com/photos/3682293/pexels-photo-3682293.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 12.99,
      rating: 4.8
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-4">
            Complete Your Project
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Essential tools and products to ensure professional results with your paint project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-[#2C2C2C] mb-2 group-hover:text-[#5B7B7A] transition-colors duration-200">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#2C2C2C]">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-3 h-3 ${
                            star <= product.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{product.rating}</span>
                  </div>
                </div>

                <button className="w-full mt-3 py-2 bg-[#5B7B7A] text-white font-medium rounded-lg hover:bg-[#5B7B7A]/90 transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};