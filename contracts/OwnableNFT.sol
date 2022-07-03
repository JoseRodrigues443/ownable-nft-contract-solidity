//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Accessing the Ownable method ensures that only the creator of this Smart contract can interact with it
contract OwnableNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event Minted(
        address from,
        address to,
        uint256 tokenId,
        string tokenURI
    );


    // the name and symbol of the NFT respectively
    constructor() ERC721("OwnableNFT", "NFT") {
        console.log("Constructor: OwnableNFT created");
    }

    // Create a function to mint/create the NFT
    // receiver takes a type 18:54of address. This is the wallet address of the user we would like to transfer ownership of our newly minted NFT to.
    // tokenURI takes a string that contains metadata about the NFT

    function createNFT(address receiver, string memory uri)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(receiver, newItemId);
        _setTokenURI(newItemId, uri);

        emit Minted(msg.sender, receiver, newItemId, uri);

        // returns the id for the newly created token
        return newItemId;
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
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
