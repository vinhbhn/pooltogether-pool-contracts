const { expect } = require("chai");
const { ethers, gasLimit } = require('../js/ethers.provider')

let overrides = { gasLimit }

describe('MultipleWinnersProxyFactory', () => {
  let wallet, wallet2

  let provider

  beforeEach(async () => {
    [wallet, wallet2] = await ethers.getSigners()
    provider = ethers.provider
    const MultipleWinnersProxyFactory = await ethers.getContractFactory("MultipleWinnersProxyFactory", wallet, overrides)
   
    factory = await MultipleWinnersProxyFactory.deploy()
  })

  describe('create()', () => {
    it('should create a new multiple winners strat', async () => {
      let tx = await factory.create(overrides)
      let receipt = await provider.getTransactionReceipt(tx.hash)
      let event = factory.interface.parseLog(receipt.logs[0])
      expect(event.name).to.equal('ProxyCreated')
    })
  })
})
