//SPDX-License-Identifer: MIT
pragma solidity ^0.8.6;




interface IEcoswap{
    
    function mint(address to, uint256 amount) external;

    function burn(uint256 amount) external;
}