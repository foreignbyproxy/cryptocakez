// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CryptoCakez is ERC721Enumerable, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;

    constructor(string memory customBaseURI_) ERC721("CryptoCakez", "CAKEZ") {
        customBaseURI = customBaseURI_;
    }

    /** MINTING **/
    uint256 public constant MAX_SUPPLY = 2000;

    uint256 public constant PRICE = 20000000000000000;

    function mint() public payable nonReentrant {
        require(totalSupply() < MAX_SUPPLY, "Exceeds max supply");

        require(msg.value >= PRICE, "Insufficient payment, 0.02 ETH per item");

        _safeMint(_msgSender(), totalSupply());
    }

    /** ACTIVATION **/
    bool public saleIsActive = true;
    function setSaleIsActive(bool saleIsActive_) external onlyOwner {
        saleIsActive = saleIsActive_;
    }

    /** URI HANDLING **/
    string private customBaseURI;
    function setBaseURI(string memory customBaseURI_) external onlyOwner {
        customBaseURI = customBaseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return customBaseURI;
    }

    /** PAYOUT **/
    address private constant PAYOUT_ADDRESS_1 =
        0x70997970C51812dc3A010C7d01b50e0d17dc79C8;

    address private constant PAYOUT_ADDRESS_2 =
        0x70997970C51812dc3A010C7d01b50e0d17dc79C8;

    function withdraw() public {
		bool test = (msg.sender == owner() || msg.sender == PAYOUT_ADDRESS_1 || msg.sender == PAYOUT_ADDRESS_2);
        require(test, "Nope");

        uint256 share = address(this).balance / 3;

        payable(owner()).transfer(share);
        payable(PAYOUT_ADDRESS_1).transfer(share);
        payable(PAYOUT_ADDRESS_2).transfer(share);
    }
}