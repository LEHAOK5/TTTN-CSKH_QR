import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import IntakeForm from './pages/public/IntakeForm';
import Tracking from './pages/public/Tracking';
import HomeLanding from './pages/public/HomeLanding';

// Dummy HomeAdmin for now
function HomeAdmin() { return <div className="p-10 text-center">Admin Page</div>; }

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans text-slate-800 bg-white flex flex-col">
        {/* SECTION 01: HEADER & NAVBAR */}
        <header className="bg-[#0d457b] sticky top-0 z-50 shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-[#0d457b] flex items-center justify-center rounded font-bold text-xl" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                HH
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white uppercase leading-none tracking-tight">HungHau</span>
                <span className="text-xs text-green-400 font-semibold tracking-wider">IT SUPPORT</span>
              </div>
            </Link>

            {/* Menu */}
            <nav className="hidden lg:flex items-center text-xs font-bold text-white uppercase h-full">
              <Link to="/" className="px-3 xl:px-4 h-full flex items-center hover:text-green-400 transition-colors">Trang chủ</Link>
              <Link to="/" className="px-3 xl:px-4 h-full flex items-center hover:text-green-400 transition-colors">Giới thiệu</Link>
              
              {/* Dropdown: Dịch Vụ Máy Tính */}
              <div className="relative group h-full flex items-center px-3 xl:px-4 cursor-pointer">
                <span className="hover:text-green-400 transition-colors flex items-center gap-1">Dịch vụ máy tính ▾</span>
                <div className="absolute top-full left-0 bg-white text-slate-700 min-w-[220px] shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 border-t-2 border-green-500">
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Sửa chữa máy tính - laptop</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Phá pass Windows</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Bảo trì máy tính</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Vệ sinh máy tính</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Dịch vụ cài Win</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Cài đặt máy tính</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Cài đặt máy in</a>
                </div>
              </div>

              {/* Dropdown: Dịch Vụ Laptop */}
              <div className="relative group h-full flex items-center px-3 xl:px-4 cursor-pointer">
                <span className="hover:text-green-400 transition-colors flex items-center gap-1">Dịch vụ laptop ▾</span>
                <div className="absolute top-full left-0 bg-white text-slate-700 min-w-[220px] shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 border-t-2 border-green-500">
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Vệ sinh laptop</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Bán sạc laptop</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Thay pin laptop</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Thay màn hình laptop</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Thay bàn phím laptop</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Thay pin, phím, sạc, màn hình</a>
                </div>
              </div>

              {/* Dropdown: Cứu Dữ Liệu */}
              <div className="relative group h-full flex items-center px-3 xl:px-4 cursor-pointer">
                <span className="hover:text-green-400 transition-colors flex items-center gap-1">Cứu dữ liệu ▾</span>
                <div className="absolute top-full left-0 bg-white text-slate-700 min-w-[220px] shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 border-t-2 border-green-500">
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Cứu dữ liệu online - từ xa</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Cứu dữ liệu bị BitLocker</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Cứu dữ liệu bị format</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Cứu dữ liệu ổ cứng</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Cứu dữ liệu thẻ nhớ</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Cứu dữ liệu máy ảnh</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Cứu dữ liệu file bị ẩn</a>
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Cứu dữ liệu USB</a>
                </div>
              </div>

              {/* Dropdown: Sản Phẩm Cung Cấp */}
              <div className="relative group h-full flex items-center px-3 xl:px-4 cursor-pointer">
                <span className="hover:text-green-400 transition-colors flex items-center gap-1">Sản phẩm cung cấp ▾</span>
                <div className="absolute top-full left-0 bg-white text-slate-700 min-w-[200px] shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 border-t-2 border-green-500">
                  <a href="#" className="block px-5 py-2.5 hover:bg-slate-50 hover:text-[#0d457b] transition-colors normal-case font-semibold">Đang cập nhật...</a>
                </div>
              </div>

              <Link to="/" className="px-3 xl:px-4 h-full flex items-center hover:text-green-400 transition-colors">Liên hệ</Link>
            </nav>

            {/* Cổng Nội Bộ & Giỏ hàng */}
            <div className="flex items-center gap-4">
              <Link to="/intake" className="hidden lg:flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <span className="text-2xl group-hover:scale-110 transition-transform block">🛒</span>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-[#0d457b]">0</span>
                </div>
              </Link>
              
              <Link to="/admin" className="hidden md:inline-flex px-4 xl:px-6 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all text-sm shadow-md">
                Cổng KTV
              </Link>
              
              {/* Mobile Menu Button */}
              <button className="lg:hidden text-white text-2xl">
                ☰
              </button>
            </div>

          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<HomeLanding />} />
            
            {/* Các trang chạy API thật */}
            <Route path="/intake" element={<IntakeForm />} />
            <Route path="/track/:ticketCode" element={<Tracking />} />
            <Route path="/admin" element={<HomeAdmin />} />
          </Routes>
        </main>

        {/* SECTION 07: FOOTER */}
        <footer className="bg-[#0d457b] text-white py-12 border-t-4 border-green-500">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-white text-[#0d457b] flex items-center justify-center rounded text-xs font-bold" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    HH
                  </div>
                  Hệ sinh thái HungHau Holdings
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-4">
                  Cổng tiếp nhận và chăm sóc khách hàng nội bộ sửa chữa máy tính, điện thoại, thiết bị công nghệ. Hoạt động trên nền tảng số hóa QR thông minh.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-400">Địa chỉ bảo hành</h3>
                <ul className="text-blue-200 text-sm space-y-2">
                  <li>📍 Tòa nhà Lục Giác, Quận 3, TP.HCM</li>
                  <li>📍 Cơ sở Đại học Văn Hiến</li>
                  <li>📍 Chi nhánh phân phối HungHau</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-400">Liên hệ & Hỗ trợ</h3>
                <ul className="text-blue-200 text-sm space-y-2">
                  <li>📞 Hotline CSKH: 1900 xxxx</li>
                  <li>✉ Email: support@hunghau.vn</li>
                  <li>🌐 Website: hunghau.vn</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-blue-800 text-center text-blue-300 text-xs">
              <p>© {new Date().getFullYear()} Bản quyền thuộc về Công ty Cổ phần Lục Giác - Hệ sinh thái HungHau Holdings.</p>
              <p className="mt-1">Thiết kế chuẩn luồng UX/UI Mobile-first QR System.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
