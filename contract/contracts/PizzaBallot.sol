// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PizzaCoin.sol";

contract PizzaBallot is AccessControl {
    bytes32 public constant CHAIRPERSON_ROLE = keccak256("CHAIRPERSON_ROLE");

    address PizzaCoin;
//    uint256 start_voting = 1621616896;
//    uint256 end_voting = 1621636896;
    address public owner;

    struct Voter {
        bool voted;
        address delegate;
        uint vote;
    }

    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    mapping(address => Voter) public voters;

    Proposal[] public proposals;

    constructor(bytes32[] memory proposalNames, address _PizzaCoin) 
    {
        owner = msg.sender;
        PizzaCoin = _PizzaCoin;
        //ProposalFactoryAddress = factory;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CHAIRPERSON_ROLE, msg.sender);
        
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function totalSupply() public view returns(uint256){
        return IPizzaCoin(PizzaCoin).totalSupply();
    }

    function transferERC20(address recipient, uint256 amount) public returns(bool) {
       return IPizzaCoin(PizzaCoin).transfer(recipient, amount);
    }
    
    function balanceOfTokenBallot(address account) public view returns(uint256) {
        return IPizzaCoin(PizzaCoin).balanceOf(account);
    }

    function grantChairPersonRole(address account) public onlyRole(CHAIRPERSON_ROLE) { 
        grantRole(CHAIRPERSON_ROLE, account);
    }
 
    function giveRightToVote(address voter) public onlyRole(CHAIRPERSON_ROLE) {
        require(hasRole(CHAIRPERSON_ROLE, msg.sender), "Only chairperson can give right to vote.");
        require(!voters[voter].voted, "The voter already voted.");
        require(balanceOfTokenBallot(voter) == 0);
        transferERC20(voter, 1);
    }

    function delegate(address to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");
        require(to != msg.sender, "Self-delegation is disallowed.");

        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            require(to != msg.sender, "Found loop in delegation.");
        }
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            proposals[delegate_.vote].voteCount += balanceOfTokenBallot(msg.sender);
        } else {
            transferERC20(to, balanceOfTokenBallot(msg.sender));
            //burnERC20(msg.sender, balanceOfTokenBallot(msg.sender));
        }
    }

    function vote(uint proposal) public {
//        require(block.timestamp >= start_voting, "The vote didn't start yet to vote");
        Voter storage sender = voters[msg.sender];
        require(balanceOfTokenBallot(msg.sender) != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        proposals[proposal].voteCount += balanceOfTokenBallot(msg.sender);
    }


    function winningProposal() public view returns (uint winningProposal_)
    {
//        require(block.timestamp <= end_voting, "The vote didn't finish yet to return a winner");
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() public view
            returns (bytes32 winnerName_)
    {
//        require(block.timestamp <= end_voting, "The vote didn't finish yet to return a winner");
        winnerName_ = proposals[winningProposal()].name;
    }
}
