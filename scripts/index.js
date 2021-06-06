module.exports = async function main(callback) {
    try {
        // Retrieve accounts from local node
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

        // Set up a Truffle contract, representing our deployed Box instance
        const Box = artifacts.require("Box");
        const box = await Box.deployed();

        // Send a transaction to store() a new value in the Box
        await box.store(Math.floor(Math.random() * 100));

        // Call the retrieve() function of the deployed Box contract
        const val = await box.retrieve();
        console.log("Box value is " + val.toString());

        // NOTE: In a real-world application, you may want to estimate the gas of your transactions,
        // and check a gas price oracle to know the optimal values to use on every transaction.

        callback(0);
    } catch (error) {
        console.error(error);
        callback(1);
    }
}