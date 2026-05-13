import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import UserPage from "./pages/user";
import Header from "./components/layout/header";
import axios from "./util/axios-customize";
import { AuthContext } from "./context/auth.context";

function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get('/v1/api/account');
        if (res && res.data) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.data.email,
              name: res.data.name
            }
          })
        }
      } catch (error) {
        console.log("Chưa đăng nhập hoặc token hết hạn");
      }
    }
    if (localStorage.getItem('access_token')) {
      fetchAccount();
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<div><h2>Trang chủ</h2><p>Xin chào đến với dự án MERN Stack!</p></div>} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;