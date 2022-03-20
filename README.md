# NFT LAND

A simple Fullstack NFT project using land as an NFT, users can mint lands, also buy and sell them

## TO RUN

  - Navigate to the app folder `cd app`
  - Create a .env file
  - Open the env.sample file and copy the Variable names to your env file
  - Replace the ${PRIVATE_KEY} variable value with your ropsten account Private Key
  - Replace the ${INFURA_PROJECT_ID} variable value with your infura project ID
  - Install the dependencies by running the command ``` yarn install ```

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## TO DEPLOY TO ROPSTEN NETWORK

Run 

```
npx run -network ropsten scripts/sample-script.js
```

## TO TEST

```
npx hardhat test
```