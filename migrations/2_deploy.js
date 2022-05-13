var mockERC721 = artifacts.require("./mockERC721.sol");

module.exports = function(deployer) {
  deployer.deploy(mockERC721);
};
