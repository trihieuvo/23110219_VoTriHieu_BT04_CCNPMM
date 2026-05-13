# MERN Stack Project - CCNPMM

Dự án này bao gồm hai phần chính: Backend (ExpressJS) và Frontend (ReactJS).

## Cấu trúc thư mục
- `expressjs01/`: Mã nguồn phía Server (Node.js/Express)
- `reactjs01/`: Mã nguồn phía Client (React/Vite)

---

## 1. Hướng dẫn cài đặt

Bạn cần cài đặt các thư viện cần thiết cho cả hai thư mục:

### Backend
```bash
cd expressjs01
npm install
```

### Frontend
```bash
cd reactjs01
npm install
```

---

## 2. Hướng dẫn chạy ứng dụng

Để ứng dụng hoạt động, bạn cần khởi chạy cả Backend và Frontend cùng lúc.

### Bước 1: Chạy Backend
Mở một terminal mới:
```bash
cd expressjs01
npm run dev
```
*Backend sẽ chạy tại: http://localhost:8080*

### Bước 2: Chạy Frontend
Mở một terminal khác:
```bash
cd reactjs01
npm run dev
```
*Frontend sẽ chạy tại: http://localhost:5173*

---

## 3. Cấu hình môi trường (.env)

Dự án đã bao gồm các file `.env` cơ bản. Nếu cần thay đổi:
- **Backend**: Kiểm tra file `expressjs01/.env` (Cấu hình Port, MongoDB URL, JWT Secret).
- **Frontend**: Kiểm tra file `reactjs01/.env` (Cấu hình `VITE_BACKEND_URL`).

## 4. Các tính năng đã thực hiện
- Đăng ký / Đăng nhập người dùng.
- Xác thực bằng JWT (JSON Web Token).
- Quản lý trạng thái đăng nhập với React Context.
- Hiển thị danh sách người dùng (User Page) sử dụng Ant Design Table.
