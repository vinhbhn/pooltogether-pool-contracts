const { expect } = require('chai')
const { ethers, gasLimit } = require('../js/ethers.provider')

const toWei = ethers.utils.parseEther

const debug = require('debug')('ptv3:ExtendedSafeCastExposed.test')

let overrides = { gasLimit }

describe('ExtendedSafeCastExposed', function() {
  let cast

  const MAX_112 = '5192296858534827628530496329220096' // 2**112
  const MAX_96 = '79228162514264337593543950336' // 2**96

  beforeEach(async () => {
    [wallet, wallet2, wallet3, wallet4] = await ethers.getSigners()
    const ExtendedSafeCastExposed = await ethers.getContractFactory("ExtendedSafeCastExposed", wallet, overrides)
   
    cast = await ExtendedSafeCastExposed.deploy()
  })

  describe('toUint112()', () => {
    it('should safely cast smaller numbers', async () => {
      expect(await cast.toUint112('24')).to.equal('24')
    })

    it('should throw on overflow', async () => {
      await expect(cast.toUint112(MAX_112)).to.be.revertedWith("SafeCast: value doesn't fit in an uint112")
    })
  })

  describe('toUint96()', () => {
    it('should safely cast smaller numbers', async () => {
      expect(await cast.toUint96('24')).to.equal('24')
    })

    it('should throw on overflow', async () => {
      await expect(cast.toUint96(MAX_96)).to.be.revertedWith("SafeCast: value doesn't fit in an uint96")
    })
  })
});
