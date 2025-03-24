import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
    }
  },

};

export default config;
//give voting rights
//cast vote
//delegate vote
//query results