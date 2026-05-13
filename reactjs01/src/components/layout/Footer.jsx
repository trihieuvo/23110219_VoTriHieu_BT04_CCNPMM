import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Share2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">THStore</h3>
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
                                <span>0372008321</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 mr-2 text-indigo-500 shrink-0" />
                                <span>hieu981.vn@gmail.com</span>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>

            <div className="border-t border-gray-800 py-6">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} THStore.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
