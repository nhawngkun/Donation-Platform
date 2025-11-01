CeloDonation dApp

Who are you:
-Đào Duy Thắng.
-Nguyễn Khánh Duy 


🚀 Mô tả Dự án
CeloDonation là một trang web quyên góp (dApp) đơn giản chạy trên Celo Sepolia Testnet.

Người dùng có thể kết nối ví MetaMask của họ để gửi tiền (CELO) quyên góp. Trang web hiển thị công khai tổng số tiền và tổng số người đã quyên góp theo thời gian thực.

Contract (hợp đồng thông minh) được viết bằng Solidity (Foundry) và trang web được viết bằng React (Vite).

🌟 Tầm nhìn
Tầm nhìn của dự án là tạo ra một nền tảng từ thiện minh bạch 100%. Bằng cách sử dụng blockchain Celo, chúng ta loại bỏ phí ngân hàng và thời gian chờ đợi. Điều này xây dựng niềm tin, vì mọi người đều có thể thấy tiền đang ở đâu, đảm bảo nó đến được đúng nơi cần đến.

💻 Kế hoạch Phát triển (Ngắn gọn)
Dự án có 2 phần:

Smart Contract (Backend - Solidity):

Một contract đơn giản với 3 hàm chính:

donate(): Hàm payable để nhận tiền CELO.

withdraw(): Hàm onlyOwner (chỉ chủ sở hữu) mới gọi được để rút tiền.

getDonorCount(): Hàm view để bất kỳ ai cũng có thể xem có bao nhiêu người đã quyên góp.

Giao diện (Frontend - React):

Một trang web React đơn giản:

Nút "Kết nối Ví" (dùng MetaMask).

Nút "Quyên góp 0.01 CELO" (gọi hàm donate()).

Hiển thị số liệu (tổng tiền, tổng số người) bằng cách gọi các hàm view.

Hiển thị mã QR chứa địa chỉ contract.

Triển khai (Deployment):

Contract được triển khai lên Celo Sepolia bằng Foundry.

Frontend được triển khai công khai lên Vercel.

⚙️ Cách Cài đặt (Installation)
Đây là cách để bạn chạy dự án này trên máy của mình.

1. Backend (Contract)
Bash

# 1. Di chuyen vao thu muc contract
cd celo_donation_app

# 2. Cai dat thu vien (neu ban chua co)
# (Cach don gian nhat la copy thu muc 'lib' tu du an mau)

# 3. Dat Private Key cua ban
export PRIVATE_KEY=0x<PRIVATE_KEY_CUA_BAN>

# 4. Trien khai contract
forge script script/DeployDonation.s.sol:DeployDonation --rpc-url celo-sepolia --broadcast
Sau khi chạy, hãy copy địa chỉ contract mới của bạn.

2. Frontend (Trang web)
Bash

# 1. Di chuyen vao thu muc frontend
cd ../donation-frontend

# 2. Cai dat cac goi phu thuoc
npm install
npm install ethers react-qr-code

# 3. Cap nhat dia chi contract
# Mo file 'src/constants.js' va dan dia chi contract moi cua ban vao.

# 4. Chay de test (local)
npm run dev

# 5. Trien khai cong khai (deploy)
vercel --prod
