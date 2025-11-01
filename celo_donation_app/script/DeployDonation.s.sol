// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import các công cụ "Script" của Foundry và contract của chúng ta
import {Script, console} from "forge-std/Script.sol";
import {Donation} from "../src/Donation.sol";

contract DeployDonation is Script {

    function run() public returns (Donation) {

        // Lấy private key từ biến môi trường (an toàn hơn)
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        // Bắt đầu "ghi" giao dịch
        vm.startBroadcast(deployerKey);

        // TRIỂN KHAI CONTRACT
        Donation donationContract = new Donation();

        // Dừng "ghi" giao dịch
        vm.stopBroadcast();

        // In địa chỉ contract ra terminal
        console.log("Donation Contract deployed to:", address(donationContract));

        return donationContract;
    }
}