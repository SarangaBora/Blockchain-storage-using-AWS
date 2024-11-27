import React, { useState } from "react";
import { uploadData } from "@aws-amplify/storage";
import CryptoJS from "crypto-js";


const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }


        try {
            // Step 1: Generate a file hash
            const reader = new FileReader();
            reader.onload = async (e) => {
                const fileContent = e.target.result;
                const fileHash = CryptoJS.SHA256(fileContent).toString(); // Generate hash
                console.log("File Hash:", fileHash);

                // Step 2: Store the file hash in the blockchain
                await contract.methods.storeFileHash(fileHash).send({ from: account });
                setMessage("File uploaded and hash stored successfully!");
            };
            reader.readAsBinaryString(file); // Read file content
        } catch (err) {
            console.error("Error uploading file:", err);
            setMessage("Error uploading file or storing hash.");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
};

export default FileUpload;


