pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract CrowdFunding{
    using SafeMath for uint256;
    Project[] private projects;

    event ProjectStarted(
        address contractAddress,
        address projectStarter,
        string projectTitle,
        string projectDesc,
        uint256 deadline,
        uint256 globalAmount
    );


    function startProject(
        string calldata title,
        string calldata desc,
        uint durationInDays,
        uint amountToRaise
    ) external {
        uint raiseUntil = now.add(durationInDays.mul(1 days));
        Project newProject = new Project(msg.sender, title, desc, raiseUntil, amountToRaise);
        projects.push(newProject);
        emit ProjectStarted(
            address(newProject), 
            msg.sender, 
            title, 
            desc, 
            raiseUntil, 
            amountToRaise
        );
    }

    function returnAllProjects() external view returns(Project[] memory){
        return projects;
    }
}

contract Project{
    using SafeMath for uint256;
    enum State { 
        Fundraising, 
        Expired,
        Successful
    }

    // State variables

    address payable public creator;
    uint public amountGoal;
    uint public raiseBy;
    uint public completeAt;
    uint256 public curBalance;
    string public title;
    string public description;
    State public state = State.Fundraising;
    mapping(address => uint) public contributions;


    // Events

    event FundReceived(address contributor, uint amount, uint curTotal);
    event CreatorPaid(address recipient);

    modifier isState(State _state){
        require (state == _state);
        _;
    }

    modifier isCreator(){
        require (msg.sender == creator);
        _;
    }

    constructor(
        address payable projectStarter,
        string memory projectTitle,
        string memory projectDesc,
        uint fundRaisingDeadline,
        uint goalAmount
    ) public {
        creator = projectStarter;
        title = projectTitle;
        description = projectDesc;
        amountGoal = goalAmount;
        raiseBy = fundRaisingDeadline;
        curBalance = 0;
    }

    function contribute() external isState(State.Fundraising) payable {
        require(msg.sender != creator);
        contributions[msg.sender] = contributions[msg.sender].add(msg.value);
        curBalance = curBalance.add(msg.value);
        emit FundReceived(msg.sender, msg.value, curBalance);
        checkIfFundingCompleted();
    }

    function checkIfFundingCompleted() public {
        if(curBalance >= amountGoal){
            state = State.Successful;
            payOut();
        }
        else if(now > raiseBy){
            state = State.Expired;
        }

        completeAt = now;
    }

    function payOut() internal isState(State.Successful) returns (bool) {
        uint256 totalRaised = curBalance;
        curBalance = 0;

        if(creator.send(totalRaised)){
            emit CreatorPaid(creator);
            return true;
        }
        else{
            curBalance = totalRaised;
            state = State.Successful;
        }
        return false;
    }

    function getRefund() public isState(State.Expired) returns (bool) {
        require(contributions[msg.sender] > 0);

        uint amount = contributions[msg.sender];
        contributions[msg.sender] = 0;

        if(!msg.sender.send(amount)){
            contributions[msg.sender] = amount;
            return false;
        }
        else{
            curBalance = curBalance.sub(amount);
        }

        return true;
    }

    function getInfo() public returns (
        address payable projectStarter,
        string memory projectTitle,
        string memory projectDesc,
        uint256 deadline,
        State curState,
        uint256 curAmount,
        uint256 goalAmount
    ){
        projectStarter = creator;
        projectTitle = title;
        projectDesc = description;
        deadline = raiseBy;
        curState = state;
        curAmount = curBalance;
        goalAmount = amountGoal;
    }

}