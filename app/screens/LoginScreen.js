import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";

//import statements for emailValidator and passwordValidator
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" }); /* email state*/
  const [password, setPassword] = useState({ value: "", error: "" }); /* password state*/

  const onLoginPressed = () => { /*function to handle login button press*/
    const emailError = emailValidator(email.value); /*emailError variable*/
    const passwordError = passwordValidator(password.value); /* passwordError variable*/
    if (emailError || passwordError) { /*if statement to check for errors in email and password*/
      setEmail({ ...email, error: emailError }); /*setEmail state updater function*/
      setPassword({ ...password, error: passwordError }); /* setPassword state updater function*/
      return; /* return statement to stop the function if there are errors*/
    }
    navigation.replace("ShortcutTabs"); /*changed navigation.navigate("HomeScreen") to navigation.replace("ShortcutTabs")*/
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome!</Header> 
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry 
      />
      
      <Button mode="contained" onPress={onLoginPressed}>
        Log in
      </Button>
      {/*Moved login button from being below forgot password from the source code to above forgot password*/}
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>FORGOT PASSWORD?</Text> {/*Update the text from the source code "Forgot your password?" to "FORGOT PASSWORD?"*/}
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text>Don't have an account yet?</Text> {/*Update the text from the source code "You do not have an account yet ?" to "Don't have an account yet?"*/}
      </View>
      {/*removed source code : <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}> and added button below*/}
      
      <Button mode="contained" onPress={() => navigation.navigate("RegisterScreen")}>
        Register
      </Button>  {/*added button to register from the source code*/}
    </Background>
  );
}

const styles = StyleSheet.create({

  forgotPassword: {
    width: "100%",
    alignItems: "center", /* Update the style from the source code alignItems: "flex-end",  to alignItems: "center" */
    textDecorationLine: "underline", /* added textDecorationLine: "underline" */
  }, 
  row: {
    flexDirection: "row",
    marginBottom: 10, /* changed marginBottom from 4 to 10 */
  },
  forgot: {
    fontSize: 12, /* added fontSize: 12 */
    marginVertical: 15, /* added marginVertical: 15 */
    color: theme.colors.secondary,
    textDecorationLine: "underline", /* added textDecorationLine: "underline" */
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
