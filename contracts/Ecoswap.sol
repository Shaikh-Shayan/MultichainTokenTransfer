// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract Ecoswap is ERC20, ERC20Burnable, Ownable, AccessControl {
    
    event Mint(address to, uint amount);
    bytes32 public constant MINT_ROLE = keccak256("MINT_ROLE");

    constructor() ERC20("Ecoswap", "ECO") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    

    function mint(address to, uint256 amount) public {
        require(hasRole(MINT_ROLE, msg.sender));
        _mint(to, amount);
        emit Mint(to, amount);
    }
}