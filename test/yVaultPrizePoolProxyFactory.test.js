const { expect } = require("chai");
const { ethers, gasLimit } = require('../js/ethers.provider')

let overrides = { gasLimit }

describe('yVaultPrizePoolProxyFactory', () => {

  let wallet, wallet2

  let provider

  beforeEach(async () => {
    [wallet, wallet2] = await ethers.getSigners()
    provider = ethers.provider
    const yVaultPrizePoolProxyFactory = await ethers.getContractFactory("yVaultPrizePoolProxyFactory", wallet, overrides)
  
    factory = await yVaultPrizePoolProxyFactory.deploy()
  })

  describe('create()', () => {
    it('should create a new prize pool', async () => {
      let tx = await factory.create(overrides)
      let receipt = await provider.getTransactionReceipt(tx.hash)
      let event = factory.interface.parseLog(receipt.logs[0])
      expect(event.name).to.equal('ProxyCreated')
    })
  })
})
