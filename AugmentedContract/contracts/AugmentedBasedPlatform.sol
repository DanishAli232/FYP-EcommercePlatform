// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Ecommerce {
    struct Transaction {
        string productname;
        uint256 amount;
        uint256 amountCollected;
        string sendername;
        address[] senders;
        address receiver;
    }
    // 0x5FbDB2315678afecb367f032d93F642f64180aa3
    mapping(address => uint256) public vendorBalance;
    // mapping(uint256 => Transaction) public transactions;
    Transaction[] public transactions;

    uint256 public transactionCount = 0;
    struct Transaction2 {
        string vendorname;
        address sender;
        uint256 amount;
        address receiver;
    }
    event adminTransfer(
        address sender,
        address receiver,
        uint amount,
        string vendorname
    );

    mapping(address => uint256) public adminBalance;
    // mapping(uint256 => Transaction2) public admintransactions;
    Transaction2[] public admintransactions;

    uint256 public transactionCount2 = 0;

    function payOrder(
        string memory _productname,
        uint256 _amount,
        string memory _sendername,
        address _receiver
    ) external payable returns (uint256) {
        // require(_amount == msg.value, "Amount sent must be equal to order amount");
        Transaction memory newTransaction = Transaction({
            productname: _productname,
            amount: _amount,
            amountCollected: 0,
            sendername: _sendername,
            senders: new address[](0),
            receiver: _receiver
        });

        // add the initial sender to the senders array
        // newTransaction.senders.push(_sender);

        transactions.push(newTransaction);
        vendorBalance[_receiver] += _amount;
        // transactions[transactionCount] = Transaction(_productname, _amount, _amount, "", new address[](0), _vendor);
        transactionCount++;
        return transactionCount - 1;
    }

    function addSender(uint256 _transactionIndex, address _sender) public {
        transactions[_transactionIndex].senders.push(_sender);
    }

    function withdrawFunds() external {
        uint256 balance = vendorBalance[msg.sender];
        require(balance > 0, "Vendor has no funds to withdraw");
        vendorBalance[msg.sender] = 0;
        payable(msg.sender).transfer(balance);
    }

    function getBalance(address vendor) external view returns (uint256) {
        return vendorBalance[vendor];
    }

    function addToBlockchain(
        string memory vendorname,
        address payable receiver,
        uint amount,
        address sender
    ) public {
        transactionCount2 += 1;
        adminBalance[receiver] += amount;
        admintransactions.push(
            Transaction2(vendorname, sender, amount, receiver)
        );

        emit adminTransfer(sender, receiver, amount, vendorname);
    }

    function getAllTransactions() public view returns (Transaction2[] memory) {
        return admintransactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount2;
    }
}
