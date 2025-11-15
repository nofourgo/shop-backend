Cài NodeJS
Phiên bản đang dùng 24.11.0
Chú ý, BE fake nên không có auth hay middleware

Mở terminal
npm i

** Chuẩn bị database
Cách 1: Chuẩn bị tài khoản Mongo
B1: Tạo CLusters và lấy link connect gắn vào .env
MONGO_URI="{link mongo}"
B2: Xác nhận IP để có thể liên kết
B3: Chạy 3 file seed bằng lệnh
 node .\seed\seedTypeOf.js
 node .\seed\seedData.js
 node .\seed\seedProduct.js

B4: Khởi chạy BE tại cổng 3000 (Có thể chỉnh trong .env nhưng cần đổi lại trong FE) bằng lệnh
npx nodemon server.js    

Cách 2: Inbox để ứng viên duyệt IP không phải tạo tài khoản mongo và nhận link connect, không cần phải chạy 3 file seed nữa