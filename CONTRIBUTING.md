# Hướng Dẫn Đóng Góp Code (Contributing Guide)

Chào mừng bạn đến với dự án! Vui lòng đọc kỹ hướng dẫn này để bắt đầu công việc.

## Quy trình làm việc

### 1. Clone repository
Lấy mã nguồn về máy:
```bash
git clone <GITHUB_REPOSITORY_URL>
cd He_Thong_Tuyen_Dung_Noi_Bo
```

### 2. Setup environment
Tạo file môi trường từ file mẫu:
```bash
cp .env.example .env
```
(Sau này cập nhật thêm lệnh cài đặt cho backend và frontend).

### 3. Checkout develop
Luôn đảm bảo lấy code mới nhất từ nhánh tích hợp chính:
```bash
git switch develop
git pull origin develop
```

### 4. Create feature branch
Tạo nhánh mới từ `develop` để làm task của bạn:
```bash
git switch -c feature/tên-chức-năng
```
Ví dụ: `git switch -c feature/login-page`

### 5. Code
Tiến hành lập trình tính năng được giao. Đảm bảo tuân thủ các quy tắc trong `CODE_RULES.md`.

### 6. Test
Luôn test code trên máy của bạn trước khi chuyển sang bước tiếp theo. Đảm bảo ứng dụng vẫn build và chạy ổn định.

### 7. Commit
Commit code theo chuẩn Conventional Commits:
```bash
git add .
git commit -m "feat: add user login page UI"
```

### 8. Push
Trước khi push, nên update lại nhánh `develop`:
```bash
git fetch origin
git merge origin/develop
# (Xử lý conflict nếu có)
```
Sau đó đẩy nhánh của bạn lên GitHub:
```bash
git push -u origin feature/login-page
```

### 9. Create Pull Request
Vào giao diện GitHub, tạo Pull Request từ nhánh của bạn vào nhánh `develop`.
Điền đầy đủ các thông tin được yêu cầu trong PR Template.

### 10. Code Review
Gán ít nhất 1 thành viên khác làm reviewer. Lắng nghe phản hồi và chỉnh sửa code nếu cần.

### 11. CI
Đảm bảo tất cả các bài kiểm tra tự động (GitHub Actions) chạy thành công.

### 12. Merge
Khi PR đã được Approved và CI Pass, Team Lead hoặc Reviewer sẽ thực hiện quá trình Merge vào `develop`.
Sau khi merge thành công, bạn có thể xóa nhánh feature của mình.
