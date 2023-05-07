// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Vault is Ownable  {
 
    bytes32 private password;

    constructor(bytes32 _password)  {
        password = _password;   
    }
    modifier checkThePassword(bytes32 _password) {
        require(password == _password,"Wrong Password");
        _;
    }  

    function deposite()  payable external onlyOwner{}     
    

    function withdraw(bytes32 _password) external checkThePassword(_password)  {
        payable(msg.sender).transfer(address(this).balance);
    }
            
}       
