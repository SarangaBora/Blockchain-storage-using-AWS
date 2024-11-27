import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import '@aws-amplify/ui-react/styles.css';
import web3 from "./web3"; // Import Web3.js setup
import loadContract from "./loadContract"; // Import contract loader


const App = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initBlockchain = async () => {
      try {
        // Request accounts from MetaMask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]); // Set the first account
        console.log("Connected Account:", accounts[0]);

        // Load the smart contract
        const loadedContract = await loadContract();
        setContract(loadedContract);
        console.log("Contract Loaded:", loadedContract);
      } catch (err) {
        console.error("Error connecting to blockchain:", err);
      }
    };

    initBlockchain();
  }, []);
  return (
    <div>
      <h1>Welcome to BlockStorage </h1>
      <p>Connected Blockchain Account: {account}</p>
      {/* Pass the contract and account to child components */}
      <FileUpload contract={contract} account={account} />
      <FileList contract={contract} account={account} />
    </div>
  );
};

export default withAuthenticator(App);
