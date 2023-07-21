import { createContext, useEffect, useState } from "react";
import AsyncStorage  from "@react-native-async-storage/async-storage";

//initializing the context contents
export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
});

//main function that is for wrapping components that uses the context
function AuthContextProvider({children}){
    //state to set the authToken
    const [authToken, setAuthToken] = useState();

    //function to set the token when logging in
    function authenticate(token){
        setAuthToken(token);
        //store data locally, format: AsyncStorage.setItem('key', value);
        AsyncStorage.setItem('token', token);
    }

    //function to set token to null for logging out
    function logout(){
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    //values to use when calling from the context
    const value ={
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;