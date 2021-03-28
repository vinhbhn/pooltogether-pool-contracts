const { expect } = require("chai");
const hre = require('hardhat')
const { ethers, gasLimit } = require('../js/ethers.provider')

// const {  deployMockContract } = require('ethereum-waffle')
const {  deployMockContract } = hre.waffle

let overrides = { gasLimit }

describe('TicketProxyFactory', () => {

  let wallet, wallet2

  let controller

  let provider

  beforeEach(async () => {
    [wallet, wallet2] = await ethers.getSigners()
    provider = ethers.provider

    const TicketProxyFactory = await ethers.getContractFactory("TicketProxyFactory", wallet, overrides)
    factory = await TicketProxyFactory.deploy()

    const TokenControllerInterface = await hre.artifacts.readArtifact("TokenControllerInterface")
    controller = await deployMockContract(wallet, TokenControllerInterface.abi)
  })

  describe('create()', () => {
    it('should create a new prize pool', async () => {
      let tx = await factory.create(overrides)
      let receipt = await provider.getTransactionReceipt(tx.hash)
      let event = factory.interface.parseLog(receipt.logs[0])
      expect(event.name).to.equal('ProxyCreated')

      const ticket = await ethers.getContractAt("Ticket", event.args.proxy, wallet)

      await ticket.initialize(
        "NAME",
        "SYMBOL",
        18,
        controller.address, // controller
      )

      expect(await ticket.controller()).to.equal(controller.address)
    })
  })
})
