// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract SimpleStorage {
    // boolean, uint(only positive), int(positive or negative), address, bytes
    uint256 public favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    mapping(string => uint256) public nameToFavNum;

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
        // retrieve();
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // callData, memory, storage
    function addPerson(string calldata _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavNum[_name] = _favoriteNumber;
    }
}
