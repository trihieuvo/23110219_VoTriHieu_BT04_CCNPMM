import React, { useEffect, useState } from 'react';
import axios from '../../util/axios-customize';

const FilterSidebar = ({ searchParams, setSearchParams }) => {
    const [categories, setCategories] = useState([]);
    
    // Extract current filters from URL
    const currentCategory = searchParams.get('category') || '';
    const currentMinPrice = searchParams.get('minPrice') || '';
    const currentMaxPrice = searchParams.get('maxPrice') || '';

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/v1/api/categories');
                if (res && res.data) {
                    setCategories(res.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        // Reset to page 1 on filter change
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    const handlePriceChange = (e) => {
        e.preventDefault();
        const min = e.target.minPrice.value;
        const max = e.target.maxPrice.value;
        
        const newParams = new URLSearchParams(searchParams);
        if (min) newParams.set('minPrice', min);
        else newParams.delete('minPrice');
        
        if (max) newParams.set('maxPrice', max);
        else newParams.delete('maxPrice');
        
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    const clearFilters = () => {
        const newParams = new URLSearchParams();
        if (searchParams.get('keyword')) {
            newParams.set('keyword', searchParams.get('keyword'));
        }
        setSearchParams(newParams);
        // Clear inputs manually since they are uncontrolled
        const minInput = document.querySelector('input[name="minPrice"]');
        const maxInput = document.querySelector('input[name="maxPrice"]');
        if (minInput) minInput.value = '';
        if (maxInput) maxInput.value = '';
    };

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-lg font-bold text-gray-900">Bộ Lọc</h2>
                <button 
                    onClick={clearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                    Xóa tất cả
                </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">Danh mục</h3>
                <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input 
                            type="radio" 
                            name="category"
                            checked={currentCategory === ''}
                            onChange={() => handleFilterChange('category', '')}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <span className="text-gray-700">Tất cả</span>
                    </label>
                    {categories.map(cat => (
                        <label key={cat._id} className="flex items-center space-x-3 cursor-pointer">
                            <input 
                                type="radio" 
                                name="category"
                                checked={currentCategory === cat._id}
                                onChange={() => handleFilterChange('category', cat._id)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="text-gray-700">{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-4">Khoảng giá (VNĐ)</h3>
                <form onSubmit={handlePriceChange} className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <input 
                            type="number" 
                            name="minPrice"
                            defaultValue={currentMinPrice}
                            placeholder="Từ"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <span className="text-gray-500">-</span>
                        <input 
                            type="number" 
                            name="maxPrice"
                            defaultValue={currentMaxPrice}
                            placeholder="Đến"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-indigo-50 text-indigo-600 border border-indigo-200 py-2 rounded-md hover:bg-indigo-100 transition-colors font-medium text-sm"
                    >
                        Áp dụng
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FilterSidebar;
