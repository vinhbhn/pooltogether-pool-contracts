const { expect } = require("chai");
const hre = require('hardhat')
const { ethers, gasLimit } = require('../js/ethers.provider')

// const { deployMockContract } = require('ethereum-waffle')
const { deployMockContract } = hre.waffle
const { AddressZero } = ethers.constants

const overrides = { gasLimit }

const debug = require('debug')('ptv3:Reserve.test')

describe('Reserve', () => {

  let wallet, wallet2

  let provider
  let reserve

  beforeEach(async () => {
    [wallet, wallet2] = await ethers.getSigners()
    provider = ethers.provider
    const Reserve = await ethers.getContractFactory("Reserve", wallet, overrides)

    reserve = await Reserve.deploy()
  })

  describe('setRateMantissa()', () => {
    it('should set the rate mantissa', async () => {
      await expect(reserve.setRateMantissa('1000'))
        .to.emit(reserve, 'ReserveRateMantissaSet')
        .withArgs('1000')

      expect(await reserve.rateMantissa()).to.equal('1000')
    })

    it('should not be callable by anyone else', async () => {
      await expect(reserve.connect(wallet2).setRateMantissa('1000'))
        .to.be.revertedWith("Ownable: caller is not the owner")
    })
  })

  describe('withdrawReserve', () => {
    it('should only be callable by the owner', async () => {
      await expect(reserve.connect(wallet2).withdrawReserve(wallet.address, wallet.address))
        .to.be.revertedWith("Ownable: caller is not the owner")
    })

    it('should be callable by the owner', async () => {
      const PrizePoolInterface = await hre.artifacts.readArtifact("PrizePoolInterface")
   
      const prizePool = await deployMockContract(wallet, PrizePoolInterface.abi)

      await prizePool.mock.withdrawReserve.withArgs(wallet.address).returns('10')

      await reserve.withdrawReserve(prizePool.address, wallet.address)
    })
  })

  describe('reserveRateMantissa()', () => {
    it('should return 0 if not set', async () => {
      expect(await reserve.reserveRateMantissa(AddressZero)).to.equal('0')
    })

    it('should return if set', async () => {
      await reserve.setRateMantissa('1000')

      expect(await reserve.reserveRateMantissa(AddressZero)).to.equal('1000')
    })
  })
})
