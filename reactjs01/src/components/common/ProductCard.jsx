import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const discount = product.originalPrice > product.price 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
        : 0;

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group border border-gray-100">
            <Link to={`/product/${product._id}`} className="block relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <img 
                        src={product.images[0] || 'https://via.placeholder.com/300'} 
                        alt={product.name} 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.isNewProduct && (
                        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">MỚI</span>
                    )}
                    {discount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-{discount}%</span>
                    )}
                </div>
            </Link>
            
            <div className="p-4">
                <div className="mb-1 text-xs text-gray-500">{product.category?.name}</div>
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-indigo-600 h-10">
                        {product.name}
                    </h3>
                </Link>
                
                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <div className="text-lg font-bold text-red-600">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </div>
                        {discount > 0 && (
                            <div className="text-xs text-gray-500 line-through">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                            </div>
                        )}
                    </div>
                    
                    <button className="bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 p-2 rounded-full transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                    <span>Đã bán: {product.sold}</span>
                    <span>Tồn: {product.stock > 0 ? product.stock : 'Hết hàng'}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
