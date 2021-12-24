// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./IEcoswap.sol";

contract EcoBridge is Ownable{

    IEcoswap public ecsMinter;
    IERC20 public ecs;
    uint public txcount;

    event BridgeMint(uint indexed txId, address mintedTo, uint amount);
    event BridgeBurn(uint indexed txId, address mintedTo, uint amount);

    constructor(IEcoswap _ecsMinter, IERC20 _ecs){
        ecsMinter = _ecsMinter;
        ecs = _ecs;
    }


    function mintEco(address mintedTo, uint amount) external onlyOwner{

        ecsMinter.mint(mintedTo, amount);
        txcount += 1;
        emit BridgeMint(txcount ,mintedTo, amount);
    }

    function bridgeEco(address mintedTo, uint amount) external {
        
        ecs.transferFrom(msg.sender, address(this), amount);
        txcount += 1;
        emit BridgeBurn(txcount, mintedTo, amount);
    }

    function mintEcoOrigin(address mintedTo, uint amount) external onlyOwner{
        ecs.transfer(mintedTo, amount);
        txcount+=1;
        emit BridgeMint(txcount, mintedTo, amount);
    }


}