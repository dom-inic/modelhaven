import React from 'react';
import { ExternalLink } from 'lucide-react';
import { AIProduct } from '../../types';

interface ProductCardProps {
  product: AIProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* <div className="h-48 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div> */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-blue-900">{product.name}</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        {product.pricing && (
          <div className="text-sm text-gray-500 mb-4">
            Pricing: {product.pricing}
          </div>
        )}
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600"
        >
          Visit Website
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}