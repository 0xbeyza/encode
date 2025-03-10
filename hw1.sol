// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

interface IHelloWorld {
    function helloWorld() external view returns (string memory);

    function setText(string calldata newText) external;

    function transferOwnership(address newOwner) external;
}

contract Test {
    function changeText(string memory text, address target) public {
        IHelloWorld helloWorld = IHelloWorld(target);
        helloWorld.setText(text);
    }

    function transferOwnershipToNewOwner(address id, address newOwner) public {
        IHelloWorld helloWorld = IHelloWorld(id);
        helloWorld.transferOwnership(newOwner);
    }

    function getText(address target) public view returns (string memory) {
        IHelloWorld helloWorld = IHelloWorld(target);
        return helloWorld.helloWorld();
    }
}
