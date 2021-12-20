// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./IEcoswap.sol";

contract EcoBridge is AccessControl{

    bytes32 public constant MINTBURN_ROLE = keccak256("MINTBURN_ROLE");
    IEcoswap public ecsMinter;
    IERC20 public ecs;
    uint public txcount;

    event BridgeMint(address mintedTo, uint amount);
    event BridgeBurn(address mintedTo, uint amount);

    constructor(IEcoswap _ecsMinter, IERC20 _ecs){
        ecsMinter = _ecsMinter;
        ecs = _ecs;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }


    function mintEco(address mintedTo, uint amount) external{
        require(hasRole(MINTBURN_ROLE, msg.sender));

        ecsMinter.mint(mintedTo, amount);
        txcount += 1;
        emit BridgeMint(mintedTo, amount);
    }

    function bridgeEco(address mintedTo, uint amount) external {
        
        ecs.transferFrom(msg.sender, address(this), amount);
        ecsMinter.burn(amount);

        txcount += 1;
        emit BridgeBurn(mintedTo, amount);
    }


}