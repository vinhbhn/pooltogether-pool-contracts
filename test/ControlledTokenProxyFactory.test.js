const { expect } = require("chai");
const { ethers } = require('../js/ethers.provider')

describe('ControlledTokenProxyFactory', () => {
  let wallet, wallet2

  let provider

  beforeEach(async () => {
    [wallet, wallet2] = await ethers.getSigners()
    provider = ethers.provider
    const ControlledTokenProxyFactory = await ethers.getContractFactory("ControlledTokenProxyFactory", wallet)
    factory = await ControlledTokenProxyFactory.deploy()
  })

  describe('create()', () => {
    it('should create a new prize strategy', async () => {
      let tx = await factory.create()
      let receipt = await provider.getTransactionReceipt(tx.hash)
      let event = factory.interface.parseLog(receipt.logs[0])
      expect(event.name).to.equal('ProxyCreated')
    })
  })
})
