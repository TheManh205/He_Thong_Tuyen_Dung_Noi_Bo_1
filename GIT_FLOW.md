# Hướng Dẫn Git Flow - Hệ Thống Tuyển Dụng Nội Bộ

## 1. Mục đích
Tài liệu này định nghĩa quy trình Git chuẩn (Git Flow) mà toàn bộ team sẽ tuân thủ trong quá trình phát triển dự án.

## 2. Branch model
Dự án sử dụng mô hình Git nhánh với hai nhánh chính vĩnh viễn (`main` và `develop`) và các nhánh tạm thời.

## 3. main
- Chứa phiên bản ổn định, sẵn sàng chạy trên production.
- **Không bao giờ** code trực tiếp, không force push.
- Chỉ nhận code qua Pull Request từ `release` hoặc `hotfix`.

## 4. develop
- Là nhánh tích hợp chính.
- Các tính năng mới sẽ được hợp nhất vào đây trước khi release.
- **Không bao giờ** code trực tiếp, không force push.

## 5. feature/*
- Dùng cho các chức năng mới.
- Checkout từ: `develop`.
- Merge về: `develop`.
- Ví dụ: `feature/login`, `feature/candidate-management`.

## 6. fix/*
- Dùng để sửa bug thông thường (không phải trên production).
- Checkout từ: `develop`.
- Merge về: `develop`.
- Ví dụ: `fix/login-validation`.

## 7. release/*
- Dùng để chuẩn bị ra mắt một phiên bản mới.
- Checkout từ: `develop`.
- Merge về: `main` và `develop`.
- Ví dụ: `release/v1.0.0`.

## 8. hotfix/*
- Dùng để sửa lỗi khẩn cấp, nghiêm trọng trên production.
- Checkout từ: `main`.
- Merge về: `main` và `develop`.
- Ví dụ: `hotfix/security-patch`.

## 9. Branch naming
Tất cả nhánh phải:
- Chữ thường, dùng dấu `-` thay cho khoảng trắng.
- Không dùng tiếng Việt có dấu.
- Tên thể hiện rõ task.

## 10. Commit convention
Sử dụng format chuẩn: `<type>: <description>`
Các type hợp lệ: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`.
Ví dụ: `feat: implement login API`

## 11. Daily workflow
1. Lấy code mới nhất: `git switch develop` -> `git pull origin develop`
2. Tạo nhánh làm việc: `git switch -c feature/<task-name>`
3. Thường xuyên commit code với nội dung nhỏ, có ý nghĩa.
4. Cập nhật nhánh trước khi tạo PR: `git fetch origin` -> `git merge origin/develop`

## 12. Pull Request workflow
- Mọi nhánh phải được đẩy lên GitHub và tạo PR về `develop` (hoặc `main`).
- Điền đầy đủ thông tin theo PR template.

## 13. Code review
- Không tự approve PR của chính mình.
- Reviewer cần kiểm tra: logic, naming, kiến trúc, bảo mật, và test.

## 14. Conflict resolution
- Dev tự giải quyết conflict trên nhánh của mình.
- Không bao giờ dùng `git reset --hard` để bỏ qua code người khác.
- Sau khi xử lý conflict cần test cẩn thận rồi mới commit.

## 15. Merge rules
- Tính năng: `feature` -> `develop`
- Lỗi trên nhánh develop: `fix` -> `develop`
- Fix lỗi khẩn: `hotfix` -> `main` & `develop`
- **Tuyệt đối không:** `feature` -> `main`.

## 16. Emergency hotfix
1. `git switch main`
2. `git pull origin main`
3. `git switch -c hotfix/tên-lỗi`
4. Fix, test, commit, PR -> main & develop.

## 17. Release process
1. Nhóm lead tạo `release/vX.X.X` từ `develop`.
2. Kiểm tra lỗi (chỉ fix bug trên nhánh release, không thêm tính năng mới).
3. Merge vào `main` và `develop`.
4. Đánh tag phiên bản trên `main`.

## 18. Những điều tuyệt đối không được làm
- Không tự ý force push (`git push -f`).
- Không push trực tiếp lên `main` và `develop`.
- Không commit các thông tin mật (`.env`, password, API key).
- Không tự ý rebase các nhánh dùng chung.

## 19. Git commands cheat sheet
- Chuyển nhánh: `git switch <branch-name>`
- Tạo nhánh mới: `git switch -c <branch-name>`
- Xem trạng thái: `git status`
- Lấy code: `git pull origin <branch-name>`
- Cập nhật thông tin nhánh: `git fetch origin`
- Merge code: `git merge <branch-name>`
