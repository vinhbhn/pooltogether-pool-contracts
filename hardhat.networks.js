const networks = {
  coverage: {
    url: 'http://127.0.0.1:8555',
    blockGasLimit: 200000000,
    allowUnlimitedContractSize: true
  },
  localhost: {
    chainId: 1,
    url: 'http://127.0.0.1:8545',
    allowUnlimitedContractSize: true
  }
}

if(process.env.ALCHEMY_URL && process.env.FORK_ENABLED){
  networks.hardhat = {
    chainId: 1,
    forking: {
      url: process.env.ALCHEMY_URL,
      blockNumber: 11981413
    },
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    },
    // allowUnlimitedContractSize: true
  }
} else {
  networks.hardhat = {
    allowUnlimitedContractSize: true
  }
}

if (process.env.HDWALLET_MNEMONIC) {
  networks.xdai = {
    chainId: 100,
    url: 'https://rpc.xdaichain.com/',
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }
  networks.poaSokol = {
    chainId: 77,
    url: 'https://sokol.poa.network',
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }
  networks.matic = {
    chainId: 137,
    url: 'https://rpc-mainnet.maticvigil.com',
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }
  networks.mumbai = {
    chainId: 80001,
    url: 'https://rpc-mumbai.maticvigil.com',
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }
  networks.oeth = {
    chainId: 10,
    url: 'https://mainnet.optimism.io/',
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }
  networks.ogor= {
    chainId: 420,
    url: 'https://goerli.optimism.io/',
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }
  networks.okov = {
    chainId: 69,
    url: 'https://kovan.optimism.io/',
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }
}

if (process.env.INFURA_API_KEY && process.env.HDWALLET_MNEMONIC) {
  networks.kovan = {
    url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }

  networks.ropsten = {
    url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }

  networks.rinkeby = {
    url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }

  networks.mainnet = {
    url: process.env.ALCHEMY_URL,
    accounts: {
      mnemonic: process.env.HDWALLET_MNEMONIC
    }
  }
} else {
  console.warn('No infura or hdwallet available for testnets')
}

module.exports = networks