import { createPublicClient, http, createWalletClient, WalletClient } from "viem";
import { sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { privateKeyToAccount,  } from "viem/accounts";

import * as dotenv from "dotenv";
dotenv.config();


const providerApiKey = process.env.INFURA_KEY ;
const deployerPrivateKey = process.env.PRIVATE_KEY ;
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(`https://sepolia.infura.io/v3/${providerApiKey}`),
});
const account= privateKeyToAccount(`0x${deployerPrivateKey}`);
const voter = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://sepolia.infura.io/v3/${providerApiKey}`),
});

async function main(){
    const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Parameters not provided");
  const contractAddress = parameters[0] as `0x${string}`;
  const delegateAddress= parameters[1] as `0x${string}`;

  if (contractAddress && delegateAddress) {
    console.log("Delegating vote to:", delegateAddress);
    const hash= await voter.writeContract({
        address: contractAddress,
        abi,
        functionName: "delegate",
        args: [delegateAddress],
        });
        console.log("Transaction hash:", hash);
        console.log("Waiting for confirmations...");
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        console.log("Transaction confirmed");
  }

  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  }); 