// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CryptoCakez is ERC721Enumerable, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;

    constructor() ERC721("CryptoCakez", "CAKEZ"){}

    /** MINTING **/
    uint256 public constant MAX_SUPPLY = 2000;
    uint256 public constant PRICE = 20000000000000000;

    function mint() public payable nonReentrant {
        require(totalSupply() < MAX_SUPPLY, "No more minting");
        require(msg.value == PRICE, "Incorrect ETH value");

        _safeMint(_msgSender(), totalSupply());
    }

    /** URI HANDLING **/
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://cryptocakez.vercel.app/api/nft/";
    }

    /** PAYOUT **/
    address private constant PAYOUT_ADDRESS_1 =
        0xFebe5D9d639E76c9cC1f4184453bA39B07FE672E;

    address private constant PAYOUT_ADDRESS_2 =
        0xF6f1cb7EBa1bC24a4c7A9fd6F1E066a1F53CD9e2;

    function withdraw() public {
		bool test = (msg.sender == owner() || msg.sender == PAYOUT_ADDRESS_1 || msg.sender == PAYOUT_ADDRESS_2);
        require(test, "Nope");

        uint256 share = address(this).balance / 3;

        payable(owner()).transfer(share);
        payable(PAYOUT_ADDRESS_1).transfer(share);
        payable(PAYOUT_ADDRESS_2).transfer(share);
    }
}
