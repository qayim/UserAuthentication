import { useState, useContext } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  //state to trigger the loading when authenticating
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  //variable to access auth context
  const authCtx = useContext(AuthContext);

  //sends the data to the db to create user
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      //login() returns the token from auth.js
      const token = await login(email, password);
      //bind the token to the context
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
