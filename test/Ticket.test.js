// const { deployMockContract } = require('ethereum-waffle')

const { MockProvider } = require('@eth-optimism/plugins')
const { expect } = require('chai')
const hre = require('hardhat')
const { deployMockContract } = hre.waffle
const { ethers, gasLimit } = require('../js/ethers.provider')
const { AddressZero } = ethers.constants

const debug = require('debug')('ptv3:Ticket.test')
const toWei = (val) => ethers.utils.parseEther('' + val)
let overrides = { gasLimit }

describe('Ticket', function() {
  let ticket

  let controller

  beforeEach(async () => {
    [wallet, wallet2, wallet3, wallet4] = await ethers.getSigners()
  
    const TokenControllerInterface = await hre.artifacts.readArtifact("TokenControllerInterface")
    controller = await deployMockContract(wallet, TokenControllerInterface) 
    const Ticket = await ethers.getContractFactory("Ticket", wallet, overrides)
    
    ticket = await Ticket.deploy()

    await ticket.initialize("Name", "SYMBOL", 18, controller.address)
    
    // allow all transfers
    await controller.mock.beforeTokenTransfer.returns()
  })

  describe('chanceOf()', () => {
    it('be correct after minting', async () => {
      await controller.call(ticket, 'controllerMint', wallet.address, toWei('100'))
      expect(await ticket.chanceOf(wallet.address)).to.equal(toWei('100'))
    })

    it('should be correct after transfer', async () => {
      await controller.call(ticket, 'controllerMint', wallet.address, toWei('100'))
      
      await ticket.transfer(wallet3.address, toWei('20'))

      expect(await ticket.chanceOf(wallet.address)).to.equal(toWei('80'))
      expect(await ticket.chanceOf(wallet3.address)).to.equal(toWei('20'))
    })

    it('should do nothing when transferring to self', async () => {
      await controller.call(ticket, 'controllerMint', wallet.address, toWei('100'))
      
      await ticket.transfer(wallet.address, toWei('20'))

      expect(await ticket.chanceOf(wallet.address)).to.equal(toWei('100'))
    })

    it('should be correct after burning', async () => {
      await controller.call(ticket, 'controllerMint', wallet.address, toWei('100'))
      await controller.call(ticket, 'controllerBurn', wallet.address, toWei('33'))
      expect(await ticket.chanceOf(wallet.address)).to.equal(toWei('67'))
    })
  })

});
