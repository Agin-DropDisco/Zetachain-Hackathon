import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const sageContract = "Sage";
const sageNFTContract = "SageNFT";

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  if (hre.network.name !== "athens") {
    throw new Error(
      '🚨 Please use the "athens" network to deploy to ZetaChain.'
    );
  }

  const [signer] = await hre.ethers.getSigners();
  console.log(`🔑 Using account: ${signer.address}\n`);

  console.log("🚀 Start Deploying Sage Token");
  const SageContract = await hre.ethers.getContractFactory(sageContract);
  const SageContractInstance = await SageContract.deploy();
  await SageContractInstance.deployed();

  console.log("🚀 Start Deploying SageNFT");
  const SageNFTContract = await hre.ethers.getContractFactory(sageNFTContract);
  const SageNFTContractInstance = await SageNFTContract.deploy();
  await SageNFTContractInstance.deployed();
  
  console.log("");

  console.log(`📜 Sage Address: ${SageContractInstance.address}
🌍 Explorer: https://explorer.zetachain.com/address/${SageContractInstance.address}
`);

 console.log(`📜 SageNFT Address: ${SageNFTContractInstance.address}
🌍 Explorer: https://explorer.zetachain.com/address/${SageNFTContractInstance.address}
`);

};

task("deploy", "Deploy the contract").setAction(main);