import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from "aws-amplify";
import awsConfig from './aws-exports.js';
// console.log("Amplify configuration: ", awsConfig);

// try {
console.log("Amplify configuration.....");
Amplify.configure({
  Auth: {

    Cognito: {
      identityPoolId: "ap-south-1:962747ad-b636-4557-9370-a4aa053b0684",
      region: "ap-south-1",
      userPoolId: "ap-south-1_dWi8OEkMb",
      userPoolWebClientId: "7f2gdvl427umj135siietkeorg",
      mandatorySignIn: true,
      loginWith: {
        oauth: {
          domain: "ap-south-1dwi8oekmb.auth.ap-south-1.amazoncognito.com", // Your Cognito domain
          scope: ["email", "openid", "phone"],
          redirectSignIn: "http://localhost:3000/", // Your local app
          redirectSignOut: "http://localhost:3000/",
          responseType: "code", // Authorization Code Grant
        },
      }
    }


  },

  Storage: {
    AWSS3: {
      bucket: "blockchain-storage--management",//bucket name
      region: "ap-south-1",//region name
      identityPoolId: "ap-south-1:962747ad-b636-4557-9370-a4aa053b0684"
    },
  }
});
console.log("Amplify successfully configured.");
// } catch (error) {
//   console.error("Amplify configuration error: ", error);
// }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
