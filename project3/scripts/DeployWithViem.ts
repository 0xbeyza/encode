import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
import { createPublicClient, http, createWalletClient, formatEther, toHex, hexToString } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";


dotenv.config();
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

const providerApiKey = process.env.INFURA_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY ;

async function main() {
 /* const proposals = process.argv.slice(2);
  if (!proposals || proposals.length < 1)
    throw new Error("Proposals not provided");*/
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://sepolia.infura.io/v3/${providerApiKey}`),
  });
  
  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const deployer = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://sepolia.infura.io/v3/${providerApiKey}`),
  });

  console.log("\nDeploying Ballot contract");
  const hash = await deployer.deployContract({
    abi,
    bytecode: bytecode as `0x${string}`,
    args: [PROPOSALS.map((prop) => toHex(prop, { size: 32 }))],
  });
  console.log("Transaction hash:", hash);
  console.log("Waiting for confirmations...");
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Ballot contract deployed to:", receipt.contractAddress);

  /*console.log("Proposals: ");
  if (receipt.contractAddress) {
    for (let index = 0; index < PROPOSALS.length; index++) {
      const proposal = (await publicClient.readContract({
        address: receipt.contractAddress,
        abi,
        functionName: "proposals",
        args: [BigInt(index)],
      })) as any[];
      const name = hexToString(proposal[0], { size: 32 });
      console.log({ index, name, proposal });
    }
  } else {
    console.error("Contract address is null or undefined");
  }
 */
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
