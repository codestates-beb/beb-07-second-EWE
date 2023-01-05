// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

// import './EWEToken.sol';

interface ERC20Interface {
  function totalSupply() external view returns (uint256);

  function balanceOf(address account) external view returns (uint256);

  function transfer(address recipient, uint256 amount) external returns (bool);

  function approve(address spender, uint256 amount) external returns (bool);

  function allowance(address owner, address spender)
    external
    view
    returns (uint256);

  function transferFrom(
    address spender,
    address recipient,
    uint256 amount
  ) external returns (bool);

  event Transfer(address indexed from, address indexed to, uint256 amount);
  event Transfer(
    address indexed spender,
    address indexed from,
    address indexed to,
    uint256 amount
  );
  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 oldAmount,
    uint256 amount
  );
}

contract EWEToken is ERC20Interface {
  mapping(address => uint256) private _balances;
  mapping(address => mapping(address => uint256)) public _allowances;

  uint256 public _totalSupply;
  string public _name;
  string public _symbol;
  uint8 public _decimals;
  uint256 private E18 = 1000000000000000000;

  constructor(string memory getName, string memory getSymbol) {
    _name = getName;
    _symbol = getSymbol;
    _decimals = 18;
    _totalSupply = 100000000 * E18;
    _balances[msg.sender] = _totalSupply; // 추가
  }

  function name() public view returns (string memory) {
    return _name;
  }

  function symbol() public view returns (string memory) {
    return _symbol;
  }

  function decimals() public view returns (uint8) {
    return _decimals;
  }

  function totalSupply() external view virtual override returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account)
    external
    view
    virtual
    override
    returns (uint256)
  {
    return _balances[account];
  }

  function transfer(address recipient, uint256 amount)
    public
    virtual
    override
    returns (bool)
  {
    _transfer(msg.sender, recipient, amount);
    emit Transfer(msg.sender, recipient, amount);
    return true;
  }

  function allowance(address owner, address spender)
    external
    view
    override
    returns (uint256)
  {
    return _allowances[owner][spender];
  }

  function approve(address spender, uint256 amount)
    external
    virtual
    override
    returns (bool)
  {
    uint256 currentAllowance = _allowances[msg.sender][spender];
    require(
      _balances[msg.sender] >= amount,
      'ERC20: The amount to be transferred exceeds the amount of tokens held by the owner.'
    );
    _approve(msg.sender, spender, currentAllowance, amount);
    return true;
  }

  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external virtual override returns (bool) {
    _transfer(sender, recipient, amount);
    emit Transfer(msg.sender, sender, recipient, amount);
    uint256 currentAllowance = _allowances[sender][msg.sender];
    require(
      currentAllowance >= amount,
      'ERC20: transfer amount exceeds allowance'
    );
    _approve(sender, msg.sender, currentAllowance, currentAllowance - amount);
    return true;
  }

  function transferFromForNft(
    address sender,
    address recipient,
    uint256 amount
  ) external virtual returns (bool) {
    _transfer(sender, recipient, amount);
    emit Transfer(msg.sender, sender, recipient, amount);
    uint256 currentAllowance = _allowances[sender][recipient];
    require(
      currentAllowance >= amount,
      'ERC20: transfer amount exceeds allowance'
    );
    _approve(sender, recipient, currentAllowance, currentAllowance - amount);
    return true;
  }

  function _transfer(
    address sender,
    address recipient,
    uint256 amount
  ) internal virtual {
    require(sender != address(0), 'ERC20: transfer from the zero address');
    require(recipient != address(0), 'ERC20: transfer to the zero address');
    uint256 senderBalance = _balances[sender];
    require(senderBalance >= amount, 'ERC20: transfer amount exceeds balance');
    _balances[sender] = senderBalance - amount;
    _balances[recipient] += amount;
  }

  function _approve(
    address owner,
    address spender,
    uint256 currentAmount,
    uint256 amount
  ) internal virtual {
    require(owner != address(0), 'ERC20: approve from the zero address');
    require(spender != address(0), 'ERC20: approve to the zero address');
    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, currentAmount, amount);
  }
}

contract EWENFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string public baseTokenURI;
  EWEToken public token;
  uint256 public nftPrice;

  constructor() ERC721('EWENFT', 'EWENFT') {
    nftPrice = 1;
    baseTokenURI = 'https://ewe-metadata.s3.ap-northeast-2.amazonaws.com/';
  }

  function connectionTestWithTransfer(address recipient, uint256 amount)
    public
    returns (bool)
  {
    token.transfer(recipient, amount);
    return true;
  }

  function mintNFT(address recipient) public onlyOwner returns (uint256) {
    require(token.balanceOf(recipient) > nftPrice);
    token.transferFromForNft(recipient, msg.sender, nftPrice);
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

  function getTokenId() public view returns (uint256) {
    uint256 currentTokenId = _tokenIds.current();
    return currentTokenId;
  }

  function getPrice() public view returns (uint256) {
    return nftPrice;
  }

  function getToken() public view returns (EWEToken) {
    return token;
  }

  function setToken(address tokenAddress) public onlyOwner returns (bool) {
    require(tokenAddress != address(0x0), 'Invalid tokenAddress');
    token = EWEToken(tokenAddress);
    return true;
  }
}
