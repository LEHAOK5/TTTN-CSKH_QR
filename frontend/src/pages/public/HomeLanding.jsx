import React from 'react';
import { Link } from 'react-router-dom';

function HomeLanding() {
  return (
    <div className="font-sans text-slate-800 bg-white">
      {/* SECTION 02: HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d457b] to-[#1a7f45] py-20 lg:py-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 text-white">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Sửa chữa thiết bị nhanh chóng – <br/>
                <span className="text-green-400">Chỉ một lần quét mã!</span>
              </h1>
              <p className="text-lg lg:text-xl text-blue-100 mb-8 opacity-90 max-w-lg">
                Hệ thống tiếp nhận yêu cầu bảo hành/sửa chữa thiết bị thông minh. Không cần xếp hàng chờ đợi, hãy quét mã QR tại quầy Lễ tân để tạo phiếu ngay.
              </p>
              <div className="flex gap-4">
                <a href="#how-it-works" className="px-8 py-4 bg-white text-[#0d457b] font-bold rounded-full hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl">
                  Xem hướng dẫn nộp phiếu
                </a>
                <Link to="/intake" className="px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all shadow-lg hover:shadow-xl animate-pulse">
                  Tạo Phiếu Ngay
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center relative">
              {/* Abstract Visual for Mockup */}
              <div className="w-72 h-[500px] bg-slate-800 rounded-[3rem] border-8 border-slate-900 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="w-full h-12 bg-slate-900 flex justify-center items-center">
                  <div className="w-20 h-4 bg-slate-800 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 text-center">
                   <div className="w-40 h-40 border-4 border-dashed border-green-500 flex items-center justify-center mb-6 rounded-xl relative">
                     <div className="w-full h-1 bg-green-500 absolute top-1/2 animate-ping opacity-50"></div>
                     <span className="text-4xl">📱</span>
                   </div>
                   <h3 className="font-bold text-lg text-[#0d457b]">Quét QR tại quầy</h3>
                   <p className="text-sm text-slate-500 mt-2">Mở Camera và hướng vào mã QR của Lễ Tân</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-green-500/20 blur-3xl"></div>
      </section>

      {/* SECTION 03: QUY TRÌNH HOẠT ĐỘNG (HOW IT WORKS) */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0d457b]">3 Bước báo lỗi thiết bị siêu tốc</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Chỉ tốn chưa tới 1 phút để hoàn tất quy trình gửi máy, giúp bạn và Kỹ thuật viên tiết kiệm tối đa thời gian.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-slate-200 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-green-500 text-4xl mb-6">
                📷
              </div>
              <h3 className="text-xl font-bold text-[#0d457b] mb-3">1. Quét QR tại quầy</h3>
              <p className="text-slate-600">Sử dụng điện thoại quét mã QR động tại quầy Lễ tân (Mã bảo mật thay đổi sau mỗi 15 phút).</p>
            </div>
            
            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#0d457b] text-4xl mb-6">
                📝
              </div>
              <h3 className="text-xl font-bold text-[#0d457b] mb-3">2. Điền Form thông tin</h3>
              <p className="text-slate-600">Nhập Họ tên, Số điện thoại và mô tả ngắn gọn lỗi của thiết bị ngay trên điện thoại của bạn.</p>
            </div>
            
            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-green-500 text-4xl mb-6">
                👨‍🔧
              </div>
              <h3 className="text-xl font-bold text-[#0d457b] mb-3">3. Bàn giao thiết bị</h3>
              <p className="text-slate-600">Đưa thiết bị cho KTV. Phiếu của bạn sẽ ngay lập tức xuất hiện trên hệ thống với trạng thái Pending.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: DANH MỤC THIẾT BỊ HỖ TRỢ */}
      <section className="py-16 bg-white overflow-hidden border-y border-slate-100">
        <div className="container mx-auto px-6 text-center mb-10">
          <h2 className="text-2xl font-bold text-[#0d457b]">Chuyên tiếp nhận các dòng thiết bị</h2>
        </div>
        {/* Auto-scrolling logo band mockup */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-12 items-center w-max animate-[scroll_20s_linear_infinite]">
            {['Dell', 'HP', 'Apple', 'Samsung', 'Asus', 'Acer', 'Lenovo', 'MSI', 'Dell', 'HP', 'Apple', 'Samsung'].map((brand, idx) => (
              <div key={idx} className="text-3xl font-black text-slate-300 hover:text-[#0d457b] transition-colors uppercase tracking-widest cursor-pointer px-8">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05: ƯU ĐIỂM HỆ THỐNG BẢO MẬT */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0d457b]">Nhanh chóng, An toàn và Bảo mật tuyệt đối</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-64 h-64 bg-green-100 rounded-full flex items-center justify-center text-6xl shadow-inner">
                ⏳
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-[#0d457b] mb-4">Mã QR Động 15 Phút</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Hệ thống áp dụng công nghệ tạo phiên độc quyền. Mỗi mã QR tại quầy chỉ có hiệu lực trong vòng 15 phút. Sau thời gian này, mã sẽ tự động hủy và tạo mới, ngăn chặn hoàn toàn việc khách hàng copy mã mang về nhà gửi yêu cầu giả mạo.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-64 h-64 bg-blue-100 rounded-full flex items-center justify-center text-6xl shadow-inner">
                🛡️
              </div>
            </div>
            <div className="w-full md:w-1/2 text-right">
              <h3 className="text-2xl font-bold text-[#0d457b] mb-4">Tường Lửa Chống SPAM</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Hệ thống Backend được bảo vệ bởi công nghệ Rate Limiting tiên tiến. Chúng tôi giới hạn số lượng tạo phiếu tối đa 10 lần / 10 phút từ cùng một thiết bị, đảm bảo cơ sở dữ liệu luôn sạch sẽ và nhân viên KTV không bị quá tải bởi các yêu cầu rác.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06: KHU VỰC DÀNH CHO LỄ TÂN & KTV */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-[#0d457b] rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
             {/* Background decorative */}
             <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30"></div>
             
             <h2 className="text-3xl lg:text-4xl font-bold mb-6 relative z-10">Cổng quản lý dành cho nhân viên</h2>
             <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto relative z-10">
               Khu vực nội bộ dành riêng cho Lễ Tân và Kỹ Thuật Viên của HungHau. Vui lòng sử dụng tài khoản được cấp để tiếp nhận vé yêu cầu (tickets) và cập nhật tiến độ.
             </p>
             <Link to="/admin" className="inline-block px-10 py-5 bg-green-500 text-white font-bold text-xl rounded-full hover:bg-green-600 transition-all shadow-lg hover:shadow-xl relative z-10 w-full md:w-auto">
               Đăng nhập ca trực
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomeLanding;
