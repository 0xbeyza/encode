import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
import { createPublicClient, http, createWalletClient, formatEther, toHex, hexToString } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";
dotenv.config();



const providerApiKey = process.env.INFURA_KEY ;
const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://sepolia.infura.io/v3/${providerApiKey}`),
  });
async function main() {
    const parameters = process.argv.slice(2);
    if (!parameters || parameters.length < 1)
        throw new Error("Parameters not provided");
    const contractAddress = parameters[0] as `0x${string}`;
    console.log("The contract address is:", contractAddress);
  if (contractAddress) {
    
    const winner = (await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: "winnerName",
        args: [],
      })) as any[];
      const name = hexToString(winner[0], { size: 32 });
      console.log( "The winner proposal is:", winner);
    
  
}


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  }); 