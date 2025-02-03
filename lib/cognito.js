import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";


var usersub;

// Sign Up
export const signUp = async (email, password, fullName, phoneNumber) => {
  if (typeof window === "undefined") {
    console.error(
      "Cognito SDK should only run in the client-side environment."
    );
    return;
  }

  const poolData = {
    UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID, // Ensure this is set correctly
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID, // Ensure this is set correctly
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
      Name: "phone_number", // Correct attribute name for phone number
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
        console.log(result.userSub);
        usersub = result.userSub;
      })
    );
    console.log(
      "Sign-up successful! A confirmation code has been sent to your email."
    );
    return true;
  } catch (error) {
    console.error("Sign-up error:", error);
    return false;
  }
};

// Confirm Sign Up
export const confirmSignUp = async (
  username,
  confirmationCode,
  phoneNumber,
  email
) => {
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
        console.log("User confirmed successfully!");
        // create user in database
        createEESRecord(phoneNumber, email, username);
      })
    );

    return true;
  } catch (error) {
    console.error("Confirmation error:", error);
    return false;
  }
};

// Create user in database
export async function createEESRecord(phoneNumber, email, username) {
  const apiUrl =
    "https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_Create_Record";

  const requestData = {
    UserID: usersub,
    Name: username,
    Email: email,
    Phone: phoneNumber,
    Type: "User",
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Sign In
export const signIn = async (usernameOrEmail, password) => {
  if (typeof window === "undefined") {
    console.error(
      "Cognito SDK should only run in the client-side environment."
    );
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
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username: usernameOrEmail,
      Password: password,
    }
  );

  try {
    const result = await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          console.log("Sign-in successful!");
          console.log("Sign-in successful!", session.idToken.payload);
          console.log(
            "Sign-in successful!",
            session.idToken.payload["cognito:groups"][0]
          );

          var role = session.idToken.payload["cognito:groups"][0];
          var name_user = session.idToken.payload.name;
          var email_user = session.idToken.payload.email;

          // Setting values to local storage
          localStorage.setItem("name_user", name_user);
          localStorage.setItem("email_user", email_user);

          // Getting values from local storage
          let name = localStorage.getItem("name_user");
          let email = localStorage.getItem("email_user");

          console.log(name);
          console.log(email);
          if (role == "Admin") {
            console.log("Admin");
            window.location.href = "/admin/dashboard";
          } else {
            console.log("FrontOffice");
            window.location.href = "/frontoffice/dashboard";
          }
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

// Forgot Password Request
export const forgotPassword = async (usernameOrEmail) => {
  if (typeof window === "undefined") {
    console.error(
      "Cognito SDK should only run in the client-side environment."
    );
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

  try {
    await new Promise((resolve, reject) =>
      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          console.log("Forgot password request successful!", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error("Forgot password error:", err);
          reject(err);
        },
      })
    );

    console.log("A confirmation code has been sent to your email.");
    return true;
  } catch (error) {
    console.error("Forgot password error:", error);
    return false;
  }
};

// Confirm Forgot Password
export const confirmForgotPassword = async (
  usernameOrEmail,
  verificationCode,
  newPassword
) => {
  if (typeof window === "undefined") {
    console.error(
      "Cognito SDK should only run in the client-side environment."
    );
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

  try {
    await new Promise((resolve, reject) =>
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: (data) => {
          console.log("Password reset successful!", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error("Password reset error:", err);
          reject(err);
        },
      })
    );

    console.log("Password has been successfully reset.");
    return true;
  } catch (error) {
    console.error("Password reset error:", error);
    return false;
  }
};
