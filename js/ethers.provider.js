const isOVM = process.env.MODE === 'OVM'

const ethers = isOVM ? require('hardhat').l2ethers : require('hardhat').ethers

console.log("isOVM: ", isOVM)

const gasLimit = isOVM ? 9000000 : 9500000

// const provider = isOVM ? require('hardhat').l2provider : require('hardhat').ethers.provider

// chainID, provider
const chainId = isOVM ? 420 : 1

module.exports = { ethers, gasLimit, chainId }