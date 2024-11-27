import web3 from "./web3";
import MyContract from "./contracts/FileStorage.json"; // Replace with the path to your contract JSON file

const loadContract = async () => {
    const networkId = await web3.eth.net.getId(); // Get the network ID (Ganache, for local, is usually 5777)
    const deployedNetwork = MyContract.networks[networkId]; // Match the contract to the network ID

    if (!deployedNetwork) {
        throw new Error("Contract not found on the current network!");
    }

    const contract = new web3.eth.Contract(
        MyContract.abi, // ABI
        deployedNetwork.address // Deployed contract address
    );

    return contract;
};

export default loadContract;
