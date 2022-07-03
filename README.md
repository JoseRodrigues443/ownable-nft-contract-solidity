# Ownable NFT contract Hardhat Project

[![Merge CI](https://github.com/JoseRodrigues443/ownable-nft-contract-solidity/actions/workflows/merge.yaml/badge.svg)](https://github.com/JoseRodrigues443/ownable-nft-contract-solidity/actions/workflows/merge.yaml)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/JoseRodrigues443/ownable-nft-contract-solidity)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/JoseRodrigues443/ownable-nft-contract-solidity)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![node-current](https://img.shields.io/node/v/v)
![GitHub issues](https://img.shields.io/github/issues-raw/JoseRodrigues443/ownable-nft-contract-solidity)

This project demonstrates an `ERC721` contract usage alongside the `Ownable` access control tooling from openzeppelin.

- [Ownable NFT contract Hardhat Project](#ownable-nft-contract-hardhat-project)
- [How deploy and use](#how-deploy-and-use)
  - [Requirements](#requirements)
  - [Compile](#compile)
    - [Ownable Contract](#ownable-contract)
    - [Role Based System Contract](#role-based-system-contract)
- [Other tooling in the project](#other-tooling-in-the-project)

# How deploy and use

The following steps allow for the deploy and use of the contracts in the contract directory using a specified network.

## Requirements

- Create a .env file from the example provided (`cp .env.example .env`)
  - Needs Wallet Private and Public account (metamask is a good one to start)
  - Alchemy Node URL
  - Optional: Etherscan api key for better integration on the tool

## Compile

`make compile`

### Ownable Contract

See more information in [Ownable NFT doc page](./docs/ownable-nft.md)

### Role Based System Contract

See more information in [Role Based NFT doc page](./docs/role-based-nft.md)

# Other tooling in the project

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```
