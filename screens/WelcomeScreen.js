import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchMessage, setFetchMessage] = useState();

  //initialize context to get the contents
  const authCtx = useContext(AuthContext);
  //bind variable of token with the one in the context
  const token = authCtx.token;

  useEffect(() => {
    //sending the get request to firebase -> get request that includes user token for firebase to identify
    axios
      .get(
        "https://react-native-course-b49d6-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=" +
          token
      )
      .then((response) => {
        //setting the fetch message to the data retrieved from API
        setFetchMessage(response.data);
      });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>

      {/* displaying the message from the API (fetchMessage) */}
      <Text>{fetchMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
