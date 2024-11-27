import Web3 from "web3";
import fileStorageABI from "../../build/contracts/FileStorage.json"; // Adjust path if needed

// Connect to Ganache's RPC server
const web3 = new Web3("http://127.0.0.1:7545");

// Replace this with your deployed contract address from Ganache
const contractAddress = "0x4e633eeA17807f13ed254968742A1aC5687aD92A";//will need to change every reset


// Create a contract instance
const fileStorage = new web3.eth.Contract(fileStorageABI.abi, contractAddress);

export default fileStorage;
