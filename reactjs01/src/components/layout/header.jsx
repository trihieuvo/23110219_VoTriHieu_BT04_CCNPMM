import React, { useContext, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { ShoppingCart, User, Search, LogOut, Menu, X } from 'lucide-react';

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setAuth({
            isAuthenticated: false,
            user: { email: "", name: "" },
        });
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            CtrlStore
                        </Link>
                    </div>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:block flex-1 max-w-xl mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm tay cầm..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </form>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">Trang chủ</Link>
                        <Link to="/search" className="text-gray-600 hover:text-indigo-600 font-medium">Sản phẩm</Link>
                        
                        <div className="flex items-center space-x-4 border-l pl-4">
                            <Link to="/cart" className="text-gray-600 hover:text-indigo-600 relative">
                                <ShoppingCart className="h-6 w-6" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">0</span>
                            </Link>

                            {auth.isAuthenticated ? (
                                <div className="relative group">
                                    <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 font-medium">
                                        <User className="h-6 w-6" />
                                        <span>{auth.user.name}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block border">
                                        <div className="px-4 py-2 text-sm text-gray-500 border-b">{auth.user.email}</div>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tài khoản</Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                                            <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex space-x-2">
                                    <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">Đăng nhập</Link>
                                    <span className="text-gray-300">|</span>
                                    <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">Đăng ký</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-indigo-600">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 py-3">
                        <form onSubmit={handleSearch} className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </form>
                        <div className="space-y-1 pb-3 border-b">
                            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Trang chủ</Link>
                            <Link to="/search" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Sản phẩm</Link>
                            <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center">
                                <ShoppingCart className="h-5 w-5 mr-2" /> Giỏ hàng (0)
                            </Link>
                        </div>
                        <div className="pt-3">
                            {auth.isAuthenticated ? (
                                <>
                                    <div className="px-3 py-2">
                                        <p className="text-base font-medium text-gray-800">{auth.user.name}</p>
                                        <p className="text-sm font-medium text-gray-500">{auth.user.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50 flex items-center">
                                            <LogOut className="h-5 w-5 mr-2" /> Đăng xuất
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-1">
                                    <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Đăng nhập</Link>
                                    <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-gray-50">Đăng ký</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;