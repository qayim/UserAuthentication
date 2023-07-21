import { useState, useContext } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  //state to trigger the loading when authenticating
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  //variable to access auth context
  const authCtx = useContext(AuthContext);

  //sends the data to the db to create user
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      //createUser() returns token from auth.js
      const token = await createUser(email, password);
      //bind the token to the context
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user, please check you input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  //to link the signupHandler we use onAuthenticate to bind the input from user
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
