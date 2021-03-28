const isOVM = process.env.MODE === 'OVM'

const ethers = isOVM ? require('hardhat').l2ethers : require('hardhat').ethers

console.log("isOVM: ", isOVM)
console.log('Provider: ', ethers.provider.connection)

const gasLimit = isOVM ? 9000000 : 9500000

// const provider = new ethers.providers.AlchemyProvider("goerli", "vqPR0ZGU7z3O9obib1UCvswuZXwzXl7u") 
// console.log(provider)

// chainID, provider
const chainId = isOVM ? 420 : 1

module.exports = { ethers, gasLimit, chainId, isOVM }