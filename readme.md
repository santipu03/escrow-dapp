# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/server` - contains the server that stores the deployed smart contracts
4. `/tests` - contains tests for the solidity contract

## Demo

This is an image of the page when is active
![image](https://user-images.githubusercontent.com/90318659/209812599-4c0c398f-be58-4f97-8b74-dd27ac7c26da.png)


## Setup

Install dependencies in the top-level directory with `yarn`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Server

`cd` into the `/server` directory and run `yarn`

To run the server run `node index` from the `/server` directory. Now the smart contracts that you deploy will be saved in the server as long as it's active.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



