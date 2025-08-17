import React, { useState } from 'react';
import { Plus, Upload, DollarSign, Tag, Package, Leaf, Star, Edit, Trash2, Eye } from 'lucide-react';

const SellProducts = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    description: '',
    ecoFeatures: [],
    images: []
  });

  // Dummy listed products for demonstration
  const [listedProducts] = useState([
    {
      id: 1,
      title: "Bamboo Water Bottle - Eco-Friendly & Reusable",
      price: "$25.99",
      category: "Home & Kitchen",
      condition: "New",
      description: "100% bamboo construction, leak-proof design, perfect for reducing plastic waste.",
      ecoFeatures: ["Biodegradable", "Plastic-free", "Sustainable materials"],
      image: "https://thumbs.dreamstime.com/b/sustainable-living-reusable-bag-water-bottle-utensils-eco-friendly-pouch-perfect-zero-waste-lifestyle-flat-lay-image-370023755.jpg",
      status: "Active",
      views: 124,
      likes: 18
    },
    {
      id: 2,
      title: "Solar-Powered LED Garden Lights (Set of 6)",
      price: "$45.00",
      category: "Electronics",
      condition: "Like New",
      description: "Solar-powered outdoor lighting system, weather-resistant, automatic on/off.",
      ecoFeatures: ["Solar powered", "Energy efficient", "Weather resistant"],
      image: "https://www.solarsphere.in/wp-content/uploads/2024/06/8164UkHY1yL._SL1500_.jpg",
      status: "Active",
      views: 89,
      likes: 12
    },
    {
      id: 3,
      title: "Organic Cotton Tote Bags (Pack of 3)",
      price: "$18.50",
      category: "Fashion",
      condition: "New",
      description: "GOTS certified organic cotton, durable construction, perfect for grocery shopping.",
      ecoFeatures: ["Organic cotton", "Reusable", "Fair trade"],
      image: "https://i.etsystatic.com/25519571/r/il/157b76/3752030588/il_570xN.3752030588_d4f0.jpg",
      status: "Sold",
      views: 156,
      likes: 23
    },
    {
      id: 4,
      title: "Recycled Plastic Outdoor Furniture Set",
      price: "$299.99",
      category: "Furniture",
      condition: "Good",
      description: "Made from 100% recycled ocean plastic, weather-resistant, UV-protected.",
      ecoFeatures: ["Recycled materials", "Ocean plastic", "Weather resistant"],
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
      status: "Active",
      views: 67,
      likes: 9
    }
  ]);


  const ecoFeatureOptions = [
    "Biodegradable", "Recyclable", "Solar powered", "Energy efficient", 
    "Sustainable materials", "Fair trade", "Organic", "Plastic-free",
    "Carbon neutral", "Renewable energy", "Upcycled", "Compostable"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEcoFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      ecoFeatures: prev.ecoFeatures.includes(feature)
        ? prev.ecoFeatures.filter(f => f !== feature)
        : [...prev.ecoFeatures, feature]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', formData);
    setShowAddForm(false);
    setFormData({
      title: '',
      price: '',
      category: '',
      condition: '',
      description: '',
      ecoFeatures: [],
      images: []
    });
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
          product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {product.status}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-2xl font-bold text-green-600 mb-2">{product.price}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.ecoFeatures.slice(0, 2).map((feature, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {product.views} views
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {product.likes} likes
          </span>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-1">
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-1">
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Package className="text-green-600" />
            Sell Your Sustainable Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Turn your eco-friendly items into income while helping others live sustainably. 
            List your products and join our green marketplace community.
          </p>
        </div>

        {/* Add Product Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600  text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            List New Product
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Leaf className="text-green-600" />
              Add Your Sustainable Product
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Eco-friendly bamboo smartphone case"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="25.99"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="fashion">Fashion & Accessories</option>
                    <option value="furniture">Furniture</option>
                    <option value="beauty">Beauty & Personal Care</option>
                    <option value="sports">Sports & Outdoors</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Condition</option>
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your product's features, benefits, and sustainability aspects..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Sustainability Features</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {ecoFeatureOptions.map((feature) => (
                    <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.ecoFeatures.includes(feature)}
                        onChange={() => handleEcoFeatureToggle(feature)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Product Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="mt-4 inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    Choose Files
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                >
                  List Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Your Listed Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Tag className="text-green-600" />
            Your Listed Products ({listedProducts.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Seller Stats */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Seller Dashboard</h2>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">4</div>
              <div className="text-sm text-gray-600">Products Listed</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <div className="text-sm text-gray-600">Items Sold</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-600 mb-2">436</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">62</div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>
          </div>
        </div>

        {/* Tips for Sellers */}
        <div className="mt-8 bg-green-500/80  text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Tips for Successful Selling</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">📸 High-Quality Photos</h3>
              <p className="text-sm text-green-100">Use clear, well-lit photos from multiple angles to showcase your product's condition and features.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🌱 Highlight Eco-Features</h3>
              <p className="text-sm text-green-100">Emphasize sustainability aspects like recyclable materials, energy efficiency, or carbon footprint reduction.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">💰 Competitive Pricing</h3>
              <p className="text-sm text-green-100">Research similar products to set fair prices that reflect both value and environmental benefits.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">📝 Detailed Descriptions</h3>
              <p className="text-sm text-green-100">Provide comprehensive information about condition, usage, and any wear to build buyer trust.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🚚 Eco-Friendly Shipping</h3>
              <p className="text-sm text-green-100">Use recycled packaging materials and offer carbon-neutral shipping options when possible.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">⭐ Build Your Reputation</h3>
              <p className="text-sm text-green-100">Respond promptly to inquiries and provide excellent customer service to earn positive reviews.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProducts;