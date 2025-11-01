// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import này sẽ hoạt động vì chúng ta đã cấu hình remappings.txt
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Donation is ReentrancyGuard {

    address public owner;
    mapping(address => uint256) public totalDonations;
    address[] public allDonors;

    constructor() {
        owner = msg.sender; // msg.sender là ví triển khai (bạn)
    }

    // Hàm để nhận quyên góp
    function donate() public payable nonReentrant {
        require(msg.value > 0, "Ban phai gui it nhat > 0 CELO");

        if (totalDonations[msg.sender] == 0) {
            allDonors.push(msg.sender);
        }

        totalDonations[msg.sender] += msg.value;
    }

    // Hàm để bạn (chủ) rút tiền
    function withdraw() public {
        require(msg.sender == owner, "Ban khong phai la chu so huu");

        uint256 balance = address(this).balance;
        require(balance > 0, "Khong co gi de rut");

        (bool success, ) = owner.call{value: balance}("");
        require(success, "Rut tien that bai");
    }

    // Hàm để xem có bao nhiêu người đã quyên góp
    function getDonorCount() public view returns (uint256) {
        return allDonors.length;
    }
}