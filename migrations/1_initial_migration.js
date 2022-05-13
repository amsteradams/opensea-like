var SellingFactory = artifacts.require("./SellingFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SellingFactory);
};
