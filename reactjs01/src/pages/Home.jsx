import React, { useEffect, useState } from 'react';
import axios from '../util/axios-customize';
import ProductCard from '../components/common/ProductCard';
import { Gamepad2, Zap, Trophy, ShieldCheck } from 'lucide-react';

const Home = () => {
    const [homeData, setHomeData] = useState({
        newProducts: [],
        featuredProducts: [],
        saleProducts: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const res = await axios.get('/v1/api/products/home');
                if (res && res.data) {
                    setHomeData(res.data);
                }
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="bg-gray-50 pb-12">
            {/* Hero Banner */}
            <div className="bg-indigo-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            Nâng Tầm Trải Nghiệm <br />
                            <span className="text-indigo-400">Gaming Của Bạn</span>
                        </h1>
                        <p className="text-lg mb-8 text-gray-300">
                            Khám phá bộ sưu tập tay cầm chơi game cao cấp từ các thương hiệu hàng đầu: PlayStation, Xbox, Nintendo.
                        </p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
                            Mua Ngay
                        </button>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="bg-white py-8 border-b">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center p-4">
                            <Gamepad2 className="h-10 w-10 text-indigo-600 mb-3" />
                            <h3 className="font-semibold text-gray-900">Chính hãng 100%</h3>
                            <p className="text-sm text-gray-500">Đảm bảo chất lượng</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <Zap className="h-10 w-10 text-indigo-600 mb-3" />
                            <h3 className="font-semibold text-gray-900">Giao hàng hỏa tốc</h3>
                            <p className="text-sm text-gray-500">Nhận hàng trong 2h</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <ShieldCheck className="h-10 w-10 text-indigo-600 mb-3" />
                            <h3 className="font-semibold text-gray-900">Bảo hành 12 tháng</h3>
                            <p className="text-sm text-gray-500">Lỗi là đổi mới</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <Trophy className="h-10 w-10 text-indigo-600 mb-3" />
                            <h3 className="font-semibold text-gray-900">Đại lý ủy quyền</h3>
                            <p className="text-sm text-gray-500">Uy tín hàng đầu</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 space-y-16">
                {/* Khuyến Mãi */}
                {homeData.saleProducts?.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <span className="bg-red-500 w-2 h-8 mr-3 rounded-full"></span>
                                Khuyến Mãi Cực Hot
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {homeData.saleProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Sản Phẩm Mới */}
                {homeData.newProducts?.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <span className="bg-indigo-600 w-2 h-8 mr-3 rounded-full"></span>
                                Sản Phẩm Mới
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {homeData.newProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Bán Chạy */}
                {homeData.featuredProducts?.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <span className="bg-yellow-500 w-2 h-8 mr-3 rounded-full"></span>
                                Bán Chạy Nhất
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {homeData.featuredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Home;
