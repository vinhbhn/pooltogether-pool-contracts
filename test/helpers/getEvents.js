const { ethers } = require('../../js/ethers.provider')

async function getEvents(contract, tx) {
  let receipt = await ethers.provider.getTransactionReceipt(tx.hash)
  return receipt.logs.reduce((parsedEvents, log) => {
    try {
      parsedEvents.push(contract.interface.parseLog(log))
    } catch (e) {}
    return parsedEvents
  }, [])
}

module.exports = { getEvents }
