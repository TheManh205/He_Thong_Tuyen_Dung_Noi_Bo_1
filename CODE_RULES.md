# Quy Tắc Viết Code (Coding Rules)

Đây là các quy tắc chung, áp dụng cho toàn bộ dự án để đảm bảo mã nguồn dễ đọc, dễ bảo trì và mở rộng.

## Naming
- Sử dụng tên tiếng Anh, rõ ràng, có ý nghĩa cho biến, hàm, lớp.
- Tránh dùng các từ viết tắt tối nghĩa.

## Folder structure
- Tổ chức thư mục theo module hoặc tính năng.
- Tách biệt rõ các tầng logic (Controller, Service, Repository, UI Components,...).

## Clean Code
- Viết code dễ đọc, ưu tiên sự rõ ràng hơn là viết ngắn nhưng tối nghĩa.
- Không để lại code thừa, code bị comment out.

## Single Responsibility
- Một hàm/lớp/component chỉ nên làm một việc duy nhất.

## Error handling
- Luôn kiểm tra và bắt các ngoại lệ.
- Trả về thông báo lỗi thân thiện với người dùng và log lỗi chi tiết cho mục đích debug.

## Logging
- Log các sự kiện quan trọng và lỗi để theo dõi trên môi trường production.
- Tránh log thông tin nhạy cảm.

## Validation
- Validate dữ liệu đầu vào ở mọi nơi (cả Frontend và Backend).

## Security
- Không bao giờ lưu trữ mật khẩu dưới dạng plain text.
- Không tin tưởng dữ liệu đầu vào từ người dùng.
- Bảo vệ các API nhạy cảm.

## API conventions
- Thiết kế RESTful API chuẩn.
- Sử dụng HTTP status codes phù hợp.

## Database conventions
- Naming convention thống nhất (camelCase hoặc snake_case tuỳ theo tech stack).
- Đánh index hợp lý cho các trường hay tìm kiếm.

## Testing
- Khuyến khích viết Unit tests, Integration tests.

## Comment conventions
- Comment để giải thích "Tại sao" thay vì "Làm cái gì" nếu code đã tự giải thích rõ ràng.
- Ghi docstring cho các hàm phức tạp.
