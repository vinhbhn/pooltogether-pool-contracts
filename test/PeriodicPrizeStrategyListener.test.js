const { expect } = require("chai")
const { ethers, gasLimit } = require('../js/ethers.provider')

let overrides = { gasLimit }

describe('PeriodicPrizeStrategyListener', () => {
  let listener
  let wallet
  let provider

  beforeEach(async () => {
    [wallet] = await ethers.getSigners()
    provider = ethers.provider
   
    const PeriodicPrizeStrategyListenerFactory = await ethers.getContractFactory("PeriodicPrizeStrategyListenerStub", wallet, overrides)
    listener = await PeriodicPrizeStrategyListenerFactory.deploy()
    await listener.deployed()
  })

  describe('supportsInterface()', () => {
    it('should support the prize strategy interface', async () => {
      expect(await listener.supportsInterface(ethers.utils.solidityKeccak256(['string'], ['afterPrizePoolAwarded(uint256,uint256)']).substring(0, 10)))
      expect(await listener.supportsInterface(ethers.utils.solidityKeccak256(['string'], ['supportsInterface(bytes4)']).substring(0, 10)))
    })
  })
})
