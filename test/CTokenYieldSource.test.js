const { expect } = require('chai')
const hre = require('hardhat')
const { ethers } = require('../js/ethers.provider')
// const { deployMockContract } = require('ethereum-waffle')
const { deployMockContract } = hre.waffle

describe('CTokenYieldSource', function() {
  let cToken
  let cTokenYieldSource

  let wallet
  let otherWallet

  beforeEach(async () => {
    [wallet, otherWallet] = await ethers.getSigners()

    const CTokenInterfaceArtifact = await hre.artifacts.readArtifact('CTokenInterface')        
    cToken = await deployMockContract(wallet, CTokenInterfaceArtifact.abi)
    
    const CTokenYieldSourceFactory = await ethers.getContractFactory("CTokenYieldSource", wallet)
    cTokenYieldSource = await CTokenYieldSourceFactory.deploy(cToken.address)
  })

  describe('balanceOf()', function() {
    it('should return 0 when empty', async () => {
      await cToken.mock.balanceOfUnderlying.returns('0')
      await cToken.mock.balanceOf.returns('0')
      expect(await cTokenYieldSource.callStatic.balanceOfToken(wallet.address)).to.equal('0')
    })
  });
});
