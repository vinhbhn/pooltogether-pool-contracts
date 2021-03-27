const { expect } = require('chai')
const { ethers, gasLimit } = require('../js/ethers.provider')

const debug = require('debug')('ptv3:UInt256ArrayExposed.test')

let overrides = { gasLimit }

describe('UInt256ArrayExposed', function() {

  let array

  beforeEach(async () => {
    [wallet, wallet2, wallet3, wallet4] = await ethers.getSigners()    
  })

  describe('remove()', () => {
    it('should error when index is out of range', async () => {
      const UInt256ArrayExposed = await ethers.getContractFactory("UInt256ArrayExposed", wallet, overrides)

      // array = await deployContract(wallet, UInt256ArrayExposed, [[1, 2, 3, 4]], overrides)
      array = await UInt256ArrayExposed.deploy([1,2,3,4])

      await expect(array.remove(5)).to.be.revertedWith("UInt256Array/unknown-index")
    })

    it('should work', async () => {
      const UInt256ArrayExposed = await ethers.getContractFactory("UInt256ArrayExposed", wallet, overrides)
      array = await UInt256ArrayExposed.deploy([1,2,3,4])

      await array.remove(2)

      expect((await array.toArray()).map(s => s.toString())).to.deep.equal(['1', '2', '4'])
    })
  })

});
