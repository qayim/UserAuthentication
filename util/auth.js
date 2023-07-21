import axios from "axios";

//API_KEY from database inside project settings
const API_KEY = "AIzaSyArHPbawq4SNn2FtkxvkvbPm6cEBSGZCgk";

export async function authenticate(mode, email,password){
  //url is dynamically produced depends on the mode/type of function triggered
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  //send and catch the request for authentication
  const response = await axios.post(url, {
    email: email,
    password: password,
    //returnSecureToken should always sends true
    returnSecureToken: true,
  });

  //getting the token from the response
  const token = response.data.idToken;
  return token;
}

//function to create a new user
export  function createUser(email, password) {
  return authenticate('signUp', email, password);
}

//function to handle user sign in
export  function login(email, password){
  return authenticate('signInWithPassword', email, password);
}
