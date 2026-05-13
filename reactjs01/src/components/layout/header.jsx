import React, { useContext } from 'react';
import { Menu } from 'antd';
import { UserOutlined, HomeOutlined, LoginOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setAuth({
            isAuthenticated: false,
            user: { email: "", name: "" },
        });
        navigate('/');
    };

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        ...(auth.isAuthenticated ? [{
            label: <Link to="/user">Users</Link>,
            key: 'user',
            icon: <UsergroupAddOutlined />,
        }] : []),
        {
            label: auth.isAuthenticated ? `Welcome, ${auth.user.name}` : 'Tài khoản',
            key: 'account',
            icon: <UserOutlined />,
            children: auth.isAuthenticated ? [
                {
                    label: <span onClick={handleLogout}>Đăng xuất</span>,
                    key: 'logout',
                }
            ] : [
                {
                    label: <Link to="/login">Đăng nhập</Link>,
                    key: 'login',
                },
                {
                    label: <Link to="/register">Đăng ký</Link>,
                    key: 'register',
                }
            ],
        },
    ];

    return <Menu mode="horizontal" items={items} />;
};

export default Header;