# Hệ Thống Tuyển Dụng Nội Bộ

## 1. Project Overview
Dự án Xây dựng hệ thống tuyển dụng nội bộ chuyên nghiệp.

## 2. Mục tiêu
Cung cấp một nền tảng thống nhất và hiệu quả để quản lý toàn bộ quy trình tuyển dụng nội bộ, từ khâu đăng tuyển, quản lý ứng viên, cho đến việc tổ chức phỏng vấn và đánh giá.

## 3. Phạm vi
Hệ thống bao gồm các module chính:
- Quản lý tin tuyển dụng.
- Quản lý hồ sơ ứng viên.
- Sắp xếp và theo dõi lịch phỏng vấn.
- Đánh giá và quyết định tuyển dụng.

## 4. Architecture Overview
(To be updated based on system design decisions)

## 5. Repository Structure
```
/
├── backend/            # Backend API
├── frontend/           # Frontend Web Application
├── database/           # Database scripts & migrations
├── devops/             # Deployment & Docker configuration
├── docs/               # Project documentation
└── .github/            # GitHub Actions and templates
```

## 6. Technology Stack
- **Frontend**: React, TypeScript
- **Backend**: Java

## 7. Development Setup
### Frontend
- Yêu cầu: Node.js, npm/yarn/pnpm.
- Di chuyển vào thư mục `frontend` và cài đặt dependencies.

### Backend
- Yêu cầu: Java JDK (ví dụ JDK 17/21), Maven/Gradle.
- Di chuyển vào thư mục `backend` để build và chạy ứng dụng.

## 8. Environment Variables
Vui lòng copy file `.env.example` thành `.env` và điền các giá trị cần thiết. Tuyệt đối không commit file `.env` lên repository.

## 9. Git Flow
Dự án sử dụng Git Flow. Xem chi tiết tại [GIT_FLOW.md](./GIT_FLOW.md).

## 10. Branch Naming
- `feature/<tên-tính-năng>`
- `fix/<tên-lỗi>`
- `release/<phiên-bản>`
- `hotfix/<tên-lỗi-nghiêm-trọng>`

## 11. Commit Convention
Áp dụng [Conventional Commits](https://www.conventionalcommits.org/).

## 12. Pull Request
Mọi thay đổi trên `main` và `develop` đều phải thông qua PR. 

## 13. Code Review
PR phải được review bởi ít nhất một thành viên khác trước khi merge.

## 14. Testing
(To be defined)

## 15. Team Members
- TBD

## 16. Documentation
Các tài liệu liên quan có thể tìm thấy tại thư mục `docs/`.
