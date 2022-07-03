//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./RoleControl.sol";

contract RoleBasedNFT is ERC721, ERC721URIStorage, RoleControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event MintedWithRole(
        address from,
        address to,
        uint256 tokenId,
        string tokenURI,
        bool isAdmin
    );


    // the name and symbol of the NFT respectively
    constructor() ERC721("RoleBasedNFT", "NFT") RoleControl(msg.sender) {
        console.log("Constructor: RoleBasedNFT created");
    }

    function createNFT(address receiver, string memory uri)
        public
        onlyAdmin
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(receiver, newItemId);
        _setTokenURI(newItemId, uri);

        emit MintedWithRole(msg.sender, receiver, newItemId, uri, isAdmin(msg.sender));

        // returns the id for the newly created token
        return newItemId;
    }

    /**
    * @dev Method that implements Rrc721.balanceOf(address) with onlyUser restriction
    */
    function balanceOfOwner(address owner) public view onlyUser returns (uint256) {
        return balanceOf(owner);
    }

    /**
    * @dev Method that implements Rrc721.balanceOf(address) with no restriction
    */
    function balanceOfOwnerOnlyAdmin(address owner) public view onlyAdmin returns (uint256) {
        return balanceOf(owner);
    }

    /**
    * @dev Method that implements Rrc721.balanceOf(address) with no restriction
    */
    function balanceOfOwnerAll(address owner) public view returns (uint256) {
        return balanceOf(owner);
    }
    /**
    * @dev Method that implements Rrc721.balanceOf(address) with no restriction
    */
    function balanceOfOwnerNotPayable(address owner) public view returns (uint256) {
        return balanceOf(owner);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}