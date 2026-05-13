import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../util/axios-customize';
import ProductCard from '../components/common/ProductCard';
import FilterSidebar from '../components/common/FilterSidebar';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

const ProductSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const keyword = searchParams.get('keyword') || '';
    const category = searchParams.get('category') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const sort = searchParams.get('sort') || '';
    const page = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams(searchParams);
                const res = await axios.get(`/v1/api/products?${params.toString()}`);
                
                if (res && res.data) {
                    setProducts(res.data.products);
                    setPagination({
                        page: res.data.page,
                        totalPages: res.data.totalPages,
                        total: res.data.total
                    });
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        window.scrollTo(0, 0);
    }, [searchParams]);

    const handleSortChange = (e) => {
        const newParams = new URLSearchParams(searchParams);
        if (e.target.value) {
            newParams.set('sort', e.target.value);
        } else {
            newParams.delete('sort');
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('page', newPage.toString());
            setSearchParams(newParams);
        }
    };

    return (
        <div className="bg-gray-50 py-8 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Search Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {keyword ? `Kết quả tìm kiếm cho "${keyword}"` : 'Tất cả sản phẩm'}
                        </h1>
                        <p className="text-gray-500">Hiển thị {products.length} trên tổng {pagination.total} sản phẩm</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                        <button 
                            className="md:hidden flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700"
                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        >
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Bộ lọc
                        </button>
                        
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 hidden md:inline">Sắp xếp:</span>
                            <select 
                                value={sort}
                                onChange={handleSortChange}
                                className="border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                                <option value="">Mới nhất</option>
                                <option value="price_asc">Giá tăng dần</option>
                                <option value="price_desc">Giá giảm dần</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className={`md:w-1/4 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
                        <FilterSidebar searchParams={searchParams} setSearchParams={setSearchParams} />
                    </div>

                    {/* Product List */}
                    <div className="md:w-3/4">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">Loading...</div>
                        ) : products.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {products.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                                
                                {/* Pagination */}
                                {pagination.totalPages > 1 && (
                                    <div className="flex justify-center mt-12 mb-8">
                                        <nav className="flex items-center space-x-2">
                                            <button 
                                                onClick={() => handlePageChange(pagination.page - 1)}
                                                disabled={pagination.page === 1}
                                                className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            
                                            {[...Array(pagination.totalPages)].map((_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => handlePageChange(i + 1)}
                                                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                                                        pagination.page === i + 1 
                                                            ? 'bg-indigo-600 text-white border border-indigo-600' 
                                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                            
                                            <button 
                                                onClick={() => handlePageChange(pagination.page + 1)}
                                                disabled={pagination.page === pagination.totalPages}
                                                className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </nav>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                                <p className="text-gray-500">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
                                <button 
                                    onClick={() => setSearchParams(new URLSearchParams())}
                                    className="mt-6 text-indigo-600 font-medium hover:text-indigo-800"
                                >
                                    Xóa tất cả bộ lọc
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSearch;
