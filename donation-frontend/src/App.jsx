import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// Import "chia khoa" cua chung ta tu file constants.js
import { contractAddress, contractABI } from './constants.js';

import './App.css'; // Import file CSS (o buoc sau)

function App() {
  // Luu tru thong tin vi cua nguoi dung
  const [account, setAccount] = useState(null);
  // Luu tru doi tuong contract de tuong tac
  const [contract, setContract] = useState(null);
  // Luu tru so nguoi da quyen gop
  const [donorCount, setDonorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // De hien thi trang thai "dang cho"

  // Ham de ket noi vi MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Yeu cau MetaMask cho phep ket noi
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]); // Lay vi dau tien

        // Tao ket noi voi Celo blockchain
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Tao doi tuong Contract de chung ta co the goi ham
        const donationContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(donationContract);

      } catch (error) {
        console.error("Loi khi ket noi vi:", error);
      }
    } else {
      alert("Vui long cai dat MetaMask de su dung dApp nay!");
    }
  };

  // Ham de lay so luong nguoi quyen gop (goi ham 'getDonorCount' cua contract)
  const getDonorCount = async () => {
    if (contract) {
      try {
        const count = await contract.getDonorCount();
        setDonorCount(Number(count)); // Chuyen tu BigInt sang so
      } catch (error) {
        console.error("Loi khi lay so luong:", error);
      }
    }
  };

  // Ham de xu ly khi nguoi dung nhan nut "Quyen gop"
  const handleDonate = async () => {
    if (!contract) return;

    setIsLoading(true); // Bat trang thai "dang cho"
    try {
      // Dinh nghia so tien muon quyen gop (vi du: 0.01 CELO)
      // Celo giong Ethereum, co 18 so thap phan, nen chung ta dung parseEther
      const amount = ethers.parseEther("0.01");

      // Goi ham 'donate()' CUA CONTRACT va gui kem tien ({ value: amount })
      const tx = await contract.donate({ value: amount });

      // Cho giao dich duoc dao va xac nhan tren blockchain
      await tx.wait();

      alert("Quyen gop thanh cong! Cam on ban.");
      getDonorCount(); // Cap nhat lai so luong nguoi quyen gop
    } catch (error) {
      console.error("Giao dich quyen gop that bai:", error);
      alert("Quyen gop that bai!");
    }
    setIsLoading(false); // Tat trang thai "dang cho"
  };

  // Tu dong lay so luong nguoi quyen gop khi ket noi vi thanh cong
  useEffect(() => {
    // Kiem tra xem da ket noi Celo Sepolia chua
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId) => {
        // 44787 la Chain ID cua Celo Sepolia
        if (parseInt(chainId, 16) !== 44787) {
          alert("Vui long chuyen MetaMask sang mang Celo Sepolia Testnet.");
          setAccount(null); // Ngat ket noi neu sai mang
        }
      });
    }

    if (contract) {
      getDonorCount();
    }
  }, [contract]);

  // Day la phan HTML hien thi ra man hinh
  return (
    <div className="App">
      <header className="App-header">
        <h1>Du an Quyen gop tren Celo</h1>
        
        {/* Neu chua ket noi vi, hien thi nut "Ket noi" */}
        {!account ? (
          <button onClick={connectWallet}>Ket noi Vi MetaMask</button>
        ) : (
          /* Neu da ket noi, hien thi thong tin */
          <div className="donation-card">
            <p>Da ket noi voi vi:</p>
            <p className="account-address">{account.slice(0, 6)}...{account.slice(-4)}</p>
            
            <div className="donor-count">
              <p>So nguoi da quyen gop:</p>
              <h2>{donorCount}</h2>
            </div>
            
            <button onClick={handleDonate} disabled={isLoading}>
              {isLoading ? "Dang xu ly..." : "Quyen gop 0.01 CELO"}
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;