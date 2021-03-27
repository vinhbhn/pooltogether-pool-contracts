const { expect } = require("chai")
const { ethers, gasLimit } = require('../js/ethers.provider')

let overrides = { gasLimit }

describe('StakePrizePoolProxyFactory', () => {

  let wallet

  let provider

  beforeEach(async () => {
    [wallet] = await ethers.getSigners()
    provider = ethers.provider
   
    const StakePrizePoolProxyFactory = await ethers.getContractFactory("StakePrizePoolProxyFactory", wallet, overrides)
    factory = await StakePrizePoolProxyFactory.deploy()
  })

  describe('create()', () => {
    it('should create a new prize strategy', async () => {
      let tx = await factory.create(overrides)
      let receipt = await provider.getTransactionReceipt(tx.hash)
      let event = factory.interface.parseLog(receipt.logs[0])
      expect(event.name).to.equal('ProxyCreated')
    })
  })
})
