import React, { useState } from 'react';
import { Star, Leaf, Recycle, Shield, Filter } from 'lucide-react';
import productsData from './amazon-products.json';

const SustainableProducts = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Enhanced product data with sustainability features
  const enhancedProducts = productsData.map((product, index) => ({
    ...product,
    sustainabilityScore: Math.floor(Math.random() * 5) + 1,
    ecoFeatures: [
      'Recyclable packaging',
      'Carbon neutral shipping',
      'Sustainable materials',
      'Energy efficient',
      'Biodegradable',
      'Fair trade certified'
    ].slice(0, Math.floor(Math.random() * 3) + 1),
    category: ['electronics', 'home', 'clothing', 'beauty', 'sports'][Math.floor(Math.random() * 5)]
  }));

  const filteredProducts = enhancedProducts.filter(product => 
    filterCategory === 'all' || product.category === filterCategory
  ).sort((a, b) => {
    if (sortBy === 'rating') {
      const ratingA = parseFloat(a.rating) || 0;
      const ratingB = parseFloat(b.rating) || 0;
      return ratingB - ratingA;
    } else if (sortBy === 'sustainability') {
      return b.sustainabilityScore - a.sustainabilityScore;
    }
    return 0;
  });

  const RatingStars = ({ rating }) => {
    if (rating === 'N/A') return <span className="text-gray-400">No Rating</span>;
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative w-4 h-4">
            <Star className="absolute w-4 h-4 text-yellow-400" />
            <div className="absolute w-2 h-4 overflow-hidden">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const SustainabilityBadge = ({ score }) => {
    const getColor = (score) => {
      if (score >= 4) return 'bg-green-100 text-green-800 border-green-200';
      if (score >= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      return 'bg-orange-100 text-orange-800 border-orange-200';
    };

    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getColor(score)}`}>
        <Leaf className="w-3 h-3 mr-1" />
        Eco Score: {score}/5
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Recycle className="text-green-600" />
            Sustainable Products Marketplace
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover eco-friendly products that help reduce your carbon footprint and support sustainable living.
            Every purchase contributes to a greener future.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter by:</span>
            </div>
            
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home & Garden</option>
              <option value="clothing">Clothing</option>
              <option value="beauty">Beauty & Care</option>
              <option value="sports">Sports & Outdoor</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="rating">Sort by Rating</option>
              <option value="sustainability">Sort by Eco Score</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="relative pt-[100%]">
                <img
                  src={product.imageUrl || "/api/placeholder/400/320"}
                  alt="Sustainable product"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <SustainabilityBadge score={product.sustainabilityScore} />
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xl font-bold text-green-600">{product.price}</span>
                  <RatingStars rating={product.rating} />
                </div>

                <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 h-10">
                  {product.title || "Eco-Friendly Product"}
                </h3>

                {/* Eco Features */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                    <Shield className="w-3 h-3 mr-1 text-green-500" />
                    Sustainability Features:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {product.ecoFeatures.map((feature, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  🌱 Shop Sustainably
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Environmental Impact Footer */}
        <div className="mt-12 bg-green-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Making a Difference Together</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-green-100">Sustainable Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1M+</div>
              <div className="text-green-100">CO₂ Saved (kg)</div>
            </div>
            <div>
              <div className="text-3xl font-bold">25K+</div>
              <div className="text-green-100">Happy Eco-Warriors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainableProducts;