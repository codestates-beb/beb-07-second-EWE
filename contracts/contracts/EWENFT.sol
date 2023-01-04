// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

// import './EWEToken.sol';

contract EWENFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string public baseTokenURI;
  IERC20 token;
  uint256 public nftPrice;

  constructor() ERC721('EWENFT', 'EWENFT') {
    nftPrice = 1;
    baseTokenURI = 'https://ewe-metadata.s3.ap-northeast-2.amazonaws.com/';
  }

  function mintNFT(address recipient) public onlyOwner returns (uint256) {
    require(token.balanceOf(recipient) > nftPrice);
    token.transferFrom(recipient, msg.sender, nftPrice);
    // uint256 currentAllowance = _allowances[sender][msg.sender];
    // token.transfer(recipient,  nftPrice);

    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    string memory tokenURI = string.concat(
      baseTokenURI,
      Strings.toString(newItemId),
      '.json'
    );
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, tokenURI);

    return newItemId;
  }

  function getPrice() public view returns (uint256) {
    return nftPrice;
  }

  function getToken() public view returns (IERC20) {
    return token;
  }

  function setToken(address tokenAddress) public onlyOwner returns (bool) {
    require(tokenAddress != address(0x0), 'Invalid tokenAddress');
    token = IERC20(tokenAddress);
    return true;
  }
}
