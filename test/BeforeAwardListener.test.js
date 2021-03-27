const { expect } = require("chai")
const { ethers, gasLimit } = require('../js/ethers.provider')

let overrides = { gasLimit }

describe('BeforeAwardListener', () => {
  let listener
  let wallet
  let provider

  beforeEach(async () => {
    [wallet] = await ethers.getSigners()
    provider = ethers.provider
   
    const BeforeAwardListenerFactory = await ethers.getContractFactory("BeforeAwardListenerStub", wallet, overrides)
    listener = await BeforeAwardListenerFactory.deploy()
    await listener.deployed()
  })

  describe('supportsInterface()', () => {
    it('should support the BeforeAwardInterface', async () => {
      expect(await listener.supportsInterface(ethers.utils.solidityKeccak256(['string'], ['beforePrizePoolAwarded(uint256,uint256)']).substring(0, 10)))
      expect(await listener.supportsInterface(ethers.utils.solidityKeccak256(['string'], ['supportsInterface(bytes4)']).substring(0, 10)))
    })
  })
})
