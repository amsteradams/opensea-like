var SellingFactory = artifacts.require("./SellingFactory.sol");
var Storage = artifacts.require("./Storage.sol");
var NftFactory = artifacts.require("./NftFactory.sol");
module.exports =async function(deployer) {
  try {
    await deployer.deploy(SellingFactory);
    const storage = await deployer.deploy(Storage);
    await deployer.deploy(NftFactory, storage.address);  
  } catch (error) {
    console.log(error);
  }
  
};
