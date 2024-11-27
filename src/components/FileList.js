// //File List and download page 

// import React, { useEffect, useState } from "react";
// import { list, getUrl } from "@aws-amplify/storage";


// const FileList = () => {
//     const [files, setFiles] = useState([]);

//     useEffect(() => {

//         const fetchFiles = async () => {
//             try {
//                 const result = await list("");
//                 setFiles(results);

//             }
//             catch (error) {
//                 console.error("Error in fetching the files :", error);
//             }
//         };
//         fetchFiles();
//     }, []);

//     const downloadFile = async (key) => {
//         try {
//             const url = await getUrl(key);
//             window.open(url, "_blank");
//         } catch (error) {
//             console.error("Error in downloading the files:", error);
//         }

//     };
//     return (
//         <div>
//             <h2>FILE LIST</h2>
//             <ul>
//                 {files.map((file) => (
//                     <li key={file.key}>
//                         {file.key}{" "}
//                         <button onClick={() => downloadFile(file.key)}>Download</button>
//                     </li>
//                 ))}
//             </ul>

//         </div>
//     );
// };
// export default FileList;
import React, { useEffect, useState } from "react";
import { getUrl } from "@aws-amplify/storage";
import web3 from "../web3";  // Assuming this is the Web3 setup you did for your project
import loadContract from "../loadContract";  // Assuming this is where your contract is loaded

const FileList = ({ account }) => {
    const [fileHashes, setFileHashes] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFileHashes = async () => {
            try {
                const contract = await loadContract(); // Load the contract
                const hashes = await contract.methods.getFileHashes(account).call(); // Get file hashes from blockchain
                setFileHashes(hashes);
                console.log("File Hashes: ", hashes);
            } catch (error) {
                console.error("Error fetching file hashes from blockchain: ", error);
            }
        };

        fetchFileHashes();
    }, [account]);

    // Function to download a file from AWS S3
    const downloadFile = async (key) => {
        try {
            const url = await getUrl(key);  // Get the file URL from S3
            window.open(url, "_blank");  // Open the file in a new tab
        } catch (error) {
            console.error("Error downloading the file: ", error);
        }
    };

    return (
        <div>
            <h2>File List</h2>
            <ul>
                {fileHashes.map((hash, index) => (
                    <li key={index}>
                        <strong>File Hash: </strong>{hash}
                        <button onClick={() => downloadFile(hash)}>Download</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
