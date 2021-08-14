// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./PizzaCoin.sol";

contract PizzaToken is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, AccessControl, ERC721Burnable {
    using Counters for Counters.Counter;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public constant COIN_MINT_AMOUNT = 1;
    address public pizzaCoinAddr;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("PizzaToken", "PZZ") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        pizzaCoinAddr = _setupERC20();
    }

    function _setupERC20() private returns (address) {
        return address(new PizzaCoin());
    }

    function safeMint(address to, string memory _tokenURI) public {
        __safeMint(to, _tokenURI, true);
    }

    function __safeMint(address to, string memory _tokenURI, bool bypass) public {
        if (! bypass) require(hasRole(MINTER_ROLE, msg.sender));
        uint256 id = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, id);
        _setTokenURI(id, _tokenURI);
        _mintCoin(to, COIN_MINT_AMOUNT);
    }

    function _mintCoin(address to, uint256 amount) internal {
        IPizzaCoin(pizzaCoinAddr).mint(to, amount);
    }

    function getTokenAddress() public view returns (address) {
        return pizzaCoinAddr;
    }

    function pause() public {
        require(hasRole(PAUSER_ROLE, msg.sender));
        _pause();
    }

    function unpause() public {
        require(hasRole(PAUSER_ROLE, msg.sender));
        _unpause();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://pizzatoken.pizza/";
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
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
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
