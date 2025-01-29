import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export const signUp = async (email, password, fullName, phoneNumber) => {
  if (typeof window === "undefined") {
    console.error("Cognito SDK should only run in the client-side environment.");
    return;
  }

  const poolData = {
    UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID, // Ensure this is set correctly
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,      // Ensure this is set correctly
  };

  if (!poolData.UserPoolId || !poolData.ClientId) {
    console.error("UserPoolId or ClientId is missing");
    return;
  }

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const username = fullName; // Create a unique username

  const attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email,
    }),
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "phone_number",  // Correct attribute name for phone number
      Value: phoneNumber,
    }),
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "name",
      Value: fullName,
    }),
  ];

  try {
    await new Promise((resolve, reject) =>
      userPool.signUp(username, password, attributeList, [], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
    );
    console.log("Sign-up successful! A confirmation code has been sent to your email.");
    return true;
  } catch (error) {
    console.error("Sign-up error:", error);
    return false;
  }
};

export const confirmSignUp = async (username, confirmationCode) => {
console.log(username);
  const poolData = {
    UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  try {
    await new Promise((resolve, reject) =>
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
    );
    console.log("User confirmed successfully!");
    return true;
  } catch (error) {
    console.error("Confirmation error:", error);
    return false;
  }
};



export const signIn = async (usernameOrEmail, password) => {
  if (typeof window === "undefined") {
    console.error("Cognito SDK should only run in the client-side environment.");
    return;
  }

  const poolData = {
    UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  };

  if (!poolData.UserPoolId || !poolData.ClientId) {
    console.error("UserPoolId or ClientId is missing");
    return;
  }

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const userData = {
    Username: usernameOrEmail,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: usernameOrEmail,
    Password: password,
  });

  try {
    const result = await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          console.log("Sign-in successful!", session);
          resolve(session);
        },
        onFailure: (err) => {
          console.error("Sign-in error:", err);
          reject(err);
        },
        newPasswordRequired: (userAttributes) => {
          console.log("New password required:", userAttributes);
          reject({ message: "New password required", userAttributes });
        },
      });
    });

    return result;
  } catch (error) {
    return error;
  }
};