import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Share2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">CtrlStore</h3>
                        <p className="text-sm mb-4">
                            Chuyên cung cấp các loại tay cầm chơi game chính hãng cho PlayStation, Xbox, Nintendo và PC. Trải nghiệm đỉnh cao, bảo hành uy tín.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><Globe className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><Share2 className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Liên hệ</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 mr-2 text-indigo-500 shrink-0" />
                                <span>1 Võ Văn Ngân, Thủ Đức, TP. HCM</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 mr-2 text-indigo-500 shrink-0" />
                                <span>0123 456 789</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 mr-2 text-indigo-500 shrink-0" />
                                <span>support@ctrlstore.vn</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Chính sách</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="#" className="hover:text-white transition-colors">Chính sách bảo hành</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Chính sách đổi trả</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Chính sách giao hàng</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Bảo mật thông tin</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Đăng ký nhận tin</h3>
                        <p className="text-sm mb-4">Nhận thông tin về các chương trình khuyến mãi mới nhất.</p>
                        <form className="flex">
                            <input 
                                type="email" 
                                placeholder="Email của bạn" 
                                className="w-full px-3 py-2 text-gray-900 rounded-l-md focus:outline-none"
                            />
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors">
                                Gửi
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-gray-800 py-6">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} CtrlStore. Tất cả quyền được bảo lưu.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
