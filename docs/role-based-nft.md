# Admin mint

```bash

  $ACCOUNT_1_PUBLIC=0x15d34....
  $ACCOUNT_1_PRIVATE=0x15d34....
  $ACCOUNT_2_PUBLIC=0x15d34....
  $ACCOUNT_2_PRIVATE=0x15d34....
  $ACCOUNT_3_PUBLIC=0x15d34....
  $ACCOUNT_3_PRIVATE=0x15d34....


```

## Compile

`make compile`

## Deploy contract

```bash

    npx hardhat run scripts/deploy_admin.ts --network ropsten

```

### Output

```bash

No need to generate any newer typings.
Deploying contracts with the account: 0x158BFbb9281794461d670E93b6De0C8a98F79CfE
Account balance: 4125024969095391544
Contract deployed to: 0x8372bd3394E5222376339155E043Cb958a0129EE
Account balance: 4121304130541377144


```

## Mint With Account2 not Admin (should fail)

```bash

    node scripts/mint.js --name RoleControl --contract 0x8372bd3394E5222376339155E043Cb958a0129EE --metadata QmSdnyBWHJ2y9cDLHi6mWyX2ND77KnvURckQHsC7SpdS8U --public $ACCOUNT_2_PUBLIC --private $ACCOUNT_2_PRIVATE

```

### Output

```bash

Contract Path: ../artifacts/contracts/RoleControl.sol/RoleControl.json
Account:  0x41cC9D5AB0e74Ce6a6998EBC7b7C9805C96dfF0a
The hash of your transaction is:  0x437dd33cd804daf20eb614451a2ceb10a2f9eb3b40200564e2541cf7b3e05acb
Check Alchemy's Mempool to view the status of your transaction!
(node:31552) UnhandledPromiseRejectionWarning: Error: Transaction has been reverted by the EVM:
{
  "blockHash": "0x11bc8205c16ff91319314e9e56b7eb9c69ae10758835ae39e4b76c6a36f77cef",

```

## Add Account2 as USER using Account1

```bash

    node scripts/add_administered.js --name RoleControl --contract 0x8372bd3394E5222376339155E043Cb958a0129EE --public $ACCOUNT_1_PUBLIC --private $ACCOUNT_1_PRIVATE --add $ACCOUNT_2_PUBLIC --role USER

```

### Output

```bash

private $ACCOUNT_1_PRIVATE --add $ACCOUNT_2_PUBLIC --role USER
Contract Path: ../artifacts/contracts/RoleControl.sol/RoleControl.json
Account:  0x158BFbb9281794461d670E93b6De0C8a98F79CfE
The hash of your transaction is:  0xefe74783babebf689ed686f553053745c40384cf0fd7c332e07a6bbb5ad24140
Check Alchemy's Mempool to view the status of your transaction!

```

## Run balanceOfOwner (with onlyOwner modifier) with Account2 (should be allowed)

```bash

    node scripts/see_balance_administered.js --name RoleControl --contract 0x8372bd3394E5222376339155E043Cb958a0129EE --public $ACCOUNT_2_PUBLIC --private $ACCOUNT_2_PRIVATE --owner $ACCOUNT_1_PUBLIC

```

### Output - SUCCESS

```bash

Contract Path: ../artifacts/contracts/RoleControl.sol/RoleControl.json
Account:  0x41cC9D5AB0e74Ce6a6998EBC7b7C9805C96dfF0a
The hash of your transaction is:  0x2fe85b73c480285916766b8e80592b0c204ae72eec5465c8d848b7dea2cc15de
Check Alchemy's Mempool to view the status of your transaction!


```

## Mint With Account2 when not Admin (should fail)

```bash

    node scripts/mint.js --name RoleControl --contract 0x8372bd3394E5222376339155E043Cb958a0129EE --metadata QmSdnyBWHJ2y9cDLHi6mWyX2ND77KnvURckQHsC7SpdS8U --public $ACCOUNT_2_PUBLIC --private $ACCOUNT_2_PRIVATE

```

### Output - Error

```bash

Contract Path: ../artifacts/contracts/RoleControl.sol/RoleControl.json
Account:  0x41cC9D5AB0e74Ce6a6998EBC7b7C9805C96dfF0a
The hash of your transaction is:  0x9c467481dc792ef3c57182c7543a88a7441a28c71784797f91871961172f40e3
Check Alchemy's Mempool to view the status of your transaction!
(node:23676) UnhandledPromiseRejectionWarning: Error: Transaction has been reverted by the EVM:

```

## Remove Account 2

```bash

    node scripts/remove_user_administered.js --name RoleControl --contract 0x8372bd3394E5222376339155E043Cb958a0129EE --public $ACCOUNT_1_PUBLIC --private $ACCOUNT_1_PRIVATE --account $ACCOUNT_2_PUBLIC


```

### Output

```bash

Contract Path: ../artifacts/contracts/RoleControl.sol/RoleControl.json
Account:  0x158BFbb9281794461d670E93b6De0C8a98F79CfE
Account to remove:  0x41cC9D5AB0e74Ce6a6998EBC7b7C9805C96dfF0a
The hash of your transaction is:  0xba305cb90fd43e7d77808cce0c38e28acefd652293f36a285ffe77e6a908d337
Check Alchemy's Mempool to view the status of your transaction!


```

## Run balanceOfOwner (with onlyOwner modifier) with Account2 (should not be allowed)

```bash

    node scripts/see_balance_administered.js --name RoleControl --contract 0x8372bd3394E5222376339155E043Cb958a0129EE --public $ACCOUNT_2_PUBLIC --private $ACCOUNT_2_PRIVATE --owner $ACCOUNT_1_PUBLIC

```

### Output - Error

```bash

Contract Path: ../artifacts/contracts/RoleControl.sol/RoleControl.json
Account:  0x41cC9D5AB0e74Ce6a6998EBC7b7C9805C96dfF0a
The hash of your transaction is:  0x733b04cc0c7c3ce78b8ce12cf1201b4831dd13a8815e933fe294210247e374fc
Check Alchemy's Mempool to view the status of your transaction!
(node:7636) UnhandledPromiseRejectionWarning: Error: Transaction has been reverted by the EVM:
{
  "transactionHash": "0x733b04cc0c7c3ce78b8ce12cf1201b4831dd13a8815e933fe294210247e374fc",


```