const awsConfig = {
    Auth: {

        // Cognito: {
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
        // }


    },

    Storage: {
        AWSS3: {
            bucket: "blockchain-storage--management",//bucket name
            region: "ap-south-1",//region name
            identityPoolId: "ap-south-1:962747ad-b636-4557-9370-a4aa053b0684"
        },
    },
};

export default awsConfig;