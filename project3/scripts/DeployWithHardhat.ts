import { viem } from "hardhat";
import { toHex, hexToString, formatEther} from "viem";
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("Proposals: ");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  // TODO
  const publicClient = await viem.getPublicClient();
  const [deployer, otherAccount] = await viem.getWalletClients();
  const ballotContract = await viem.deployContract("Ballot", [
        PROPOSALS.map((prop) => toHex(prop, { size: 32 })),
    ]);
  console.log(`Deployed contract at ${ballotContract.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});