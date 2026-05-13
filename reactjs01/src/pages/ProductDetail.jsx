import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../util/axios-customize';
import ProductCard from '../components/common/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ShoppingCart, Heart, ShieldCheck, Truck, ChevronRight, Minus, Plus } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const res = await axios.get(`/v1/api/products/${id}`);
                const relatedRes = await axios.get(`/v1/api/products/${id}/related`);
                
                if (res && res.data) setProduct(res.data);
                if (relatedRes && relatedRes.data) setRelatedProducts(relatedRes.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchProductDetail();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!product) return <div className="flex justify-center items-center h-screen">Product not found</div>;

    const discount = product.originalPrice > product.price 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
        : 0;

    const handleQuantityChange = (type) => {
        if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        } else if (type === 'increase' && quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    return (
        <div className="bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Link to="/" className="hover:text-indigo-600">Trang chủ</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link to={`/search?category=${product.category?._id}`} className="hover:text-indigo-600">
                        {product.category?.name}
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 truncate">{product.name}</span>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
                        {/* Images Section */}
                        <div className="w-full overflow-hidden">
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#4f46e5',
                                    '--swiper-pagination-color': '#4f46e5',
                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="h-[400px] rounded-lg mb-4 bg-gray-100"
                            >
                                {product.images?.length > 0 ? (
                                    product.images.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide>
                                        <img src="https://via.placeholder.com/500" alt="Placeholder" className="w-full h-full object-contain" />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                            
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="h-24 product-thumbs"
                            >
                                {product.images?.map((img, index) => (
                                    <SwiperSlide key={index} className="cursor-pointer rounded-md overflow-hidden border-2 border-transparent opacity-60 hover:opacity-100 transition-opacity bg-gray-100">
                                        <img src={img} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col">
                            <div className="mb-2 text-sm text-indigo-600 font-semibold">{product.category?.name}</div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="text-sm text-gray-500 border-r pr-4">Đã bán: <span className="font-semibold text-gray-900">{product.sold}</span></div>
                                <div className="text-sm text-gray-500 border-r pr-4">Đánh giá: <span className="font-semibold text-gray-900">4.8/5</span> (120)</div>
                                <div className="text-sm text-gray-500">Tình trạng: <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>{product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</span></div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-col justify-center">
                                <div className="flex items-end space-x-4">
                                    <div className="text-3xl font-bold text-red-600">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                    </div>
                                    {discount > 0 && (
                                        <>
                                            <div className="text-lg text-gray-500 line-through mb-1">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                                            </div>
                                            <div className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-1">
                                                Giảm {discount}%
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Số lượng</h3>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center border border-gray-300 rounded-md bg-white">
                                        <button 
                                            onClick={() => handleQuantityChange('decrease')}
                                            disabled={quantity <= 1}
                                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <input 
                                            type="number" 
                                            value={quantity}
                                            readOnly
                                            className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none"
                                        />
                                        <button 
                                            onClick={() => handleQuantityChange('increase')}
                                            disabled={quantity >= product.stock}
                                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-500">{product.stock} sản phẩm có sẵn</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-4 mb-8 mt-auto">
                                <button 
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-indigo-50 text-indigo-600 border border-indigo-600 hover:bg-indigo-100 font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ShoppingCart className="h-5 w-5 mr-2" /> Thêm vào giỏ
                                </button>
                                <button 
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Mua ngay
                                </button>
                                <button className="p-3 border border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-500 rounded-lg transition-colors bg-white">
                                    <Heart className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Policy */}
                            <div className="grid grid-cols-2 gap-4 border-t pt-6">
                                <div className="flex items-center text-sm text-gray-600">
                                    <ShieldCheck className="h-5 w-5 text-indigo-500 mr-2" />
                                    Đổi trả trong 7 ngày
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Truck className="h-5 w-5 text-indigo-500 mr-2" />
                                    Miễn phí giao hàng
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">Mô tả sản phẩm</h2>
                    <div className="prose max-w-none text-gray-600">
                        <p className="whitespace-pre-line">{product.description}</p>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <span className="bg-indigo-600 w-2 h-8 mr-3 rounded-full"></span>
                                Sản Phẩm Tương Tự
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            <style jsx="true">{`
                .product-thumbs .swiper-slide-thumb-active {
                    opacity: 1 !important;
                    border-color: #4f46e5;
                }
            `}</style>
        </div>
    );
};

export default ProductDetail;
