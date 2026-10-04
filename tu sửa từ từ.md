# KẾ HOẠCH TU SỬA TỪ TỪ: CẬP NHẬT THANH ĐIỀU HƯỚNG (NAVBAR)

Dựa trên yêu cầu và các hình ảnh bạn vừa cung cấp, tôi đã lên kế hoạch chi tiết để cập nhật thanh Menu (Navigation Bar) của hệ thống. Kế hoạch này sẽ biến thanh Menu hiện tại trở nên đồ sộ, chuyên nghiệp và có các menu thả xuống (Dropdown) y hệt như các trang web dịch vụ máy tính lớn (như Tin Học Tấn Phát).

---

## 🎯 1. Mục Tiêu Tu Sửa
- **Bổ sung đầy đủ các danh mục:** Từ Trang chủ, Giới thiệu, đến các Dịch vụ chuyên sâu, Sản phẩm, Liên hệ và Giỏ hàng.
- **Tạo hiệu ứng Dropdown (Thả xuống):** Khi người dùng rê chuột (hover) vào các mục Dịch vụ, một danh sách các dịch vụ con sẽ mượt mà hiện ra.
- **Tích hợp Giỏ hàng:** Thêm icon Giỏ hàng có gắn số lượng `0` nổi bật ở góc phải menu.

---

## 📝 2. Cấu Trúc Menu Mới Cần Cập Nhật (Vào file `App.jsx`)

Cấu trúc Menu ngang màu Xanh Dương sẽ được thay đổi như sau:

1. **TRANG CHỦ**
2. **GIỚI THIỆU**
3. **DỊCH VỤ MÁY TÍNH ▾** (Dropdown)
   - Sửa chữa máy tính - laptop
   - Phá pass Windows
   - Bảo trì máy tính
   - Vệ sinh máy tính
   - Dịch vụ cài Win
   - Cài đặt máy tính
   - Cài đặt máy in
4. **DỊCH VỤ LAPTOP ▾** (Dropdown)
   - Vệ sinh laptop
   - Bán sạc laptop
   - Thay pin laptop
   - Thay màn hình laptop
   - Thay bàn phím laptop
   - Thay pin, bàn phím, sạc, màn hình laptop
5. **CỨU DỮ LIỆU ▾** (Dropdown)
   - Cứu dữ liệu online - từ xa
   - Cứu dữ liệu bị BitLocker
   - Cứu dữ liệu bị format
   - Cứu dữ liệu ổ cứng
   - Cứu dữ liệu thẻ nhớ
   - Cứu dữ liệu máy ảnh
   - Cứu dữ liệu file bị ẩn
   - Cứu dữ liệu USB
6. **SẢN PHẨM CUNG CẤP ▾** (Dropdown - Có thể để trống các mục con trước)
7. **LIÊN HỆ**
8. **🛒 GIỎ HÀNG (0)** (Căn lề phải, có biểu tượng giỏ hàng và vòng tròn đỏ hiện số 0)

---

## 💻 3. Kỹ Thuật Áp Dụng (Tailwind CSS)
- **Menu Cấp 1:** Sẽ dùng `flex`, chữ in hoa (uppercase), font đậm (bold), chữ màu trắng, khi hover sẽ chuyển màu nền hoặc màu chữ sang màu Cam/Xanh sáng hơn.
- **Dropdown Cấp 2:** 
  - Sử dụng thẻ `group` của Tailwind kết hợp `absolute` và `hidden group-hover:block` để khi rê chuột vào Menu Cấp 1, hộp thoại Cấp 2 mới thả xuống.
  - Hộp Dropdown Cấp 2 sẽ có nền Trắng, chữ Xanh hoặc Đen, đổ bóng (shadow-lg), mỗi dòng khi hover sẽ tô nền xám nhẹ (`hover:bg-slate-100`).
- **Lưu ý:** Các menu này hiện tại sẽ là *Mockup* (Trưng bày), khi bấm vào không chuyển trang (href="#"), nhằm giữ đúng tinh thần "Vỏ ảo, Lõi thật" của dự án. 

---

> **⚠️ TÌNH TRẠNG HIỆN TẠI:**
> Tôi đã ghi nhận toàn bộ thông tin và tạo thành công file Kế hoạch này. **Tuyệt đối chưa có bất kỳ dòng code nào trong `App.jsx` hay các file khác bị thay đổi.**
> 
> Bạn hãy mở file `tu sửa từ từ.md` lên đọc và kiểm tra kỹ danh sách Menu thả xuống. Nếu tất cả đã đúng ý bạn, hãy phản hồi để tôi bắt đầu tiến hành "Tu sửa từ từ" vào source code nhé!
