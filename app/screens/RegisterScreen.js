import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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
import { firstNameValidator, lastNameValidator} from "../helpers/nameValidator";
import {usernameValidator} from "../helpers/usernameValidator";
 {/*imported usernameValidator*/}

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState({ value: "", error: "" }); {/*added firstName state*/}
  const [lastName, setLastName] = useState({ value: "", error: "" }); {/*added lastName state*/}
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" }); {/*added username state*/}

  const onSignUpPressed = () => {
    const firstNameError = firstNameValidator(firstName.value); {/*added firstNameError variable*/}
    const lastNameError = lastNameValidator(lastName.value);  {/*added lastNameError variable*/}
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const usernameError = usernameValidator(username.value); {/*added usernameError variable*/}

    if (emailError || passwordError || firstNameError || lastNameError || usernameError) { /*added if statement to check for errors in username, first name, last name, email and password*/
      setFirstName({ ...firstName, error: firstNameError }); {/*added setFirstName state updater function*/}
      setLastName({ ...lastName, error: lastNameError }); {/*added setLastName state updater function*/}
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setUsername({ ...username, error: usernameError }); {/*added setUsername state updater function*/}
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeScreen" }],
    });
  };
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome to EKO!</Header> {/*Update the header from the source code "hello." to "Welcome to EKO!"*/}
      <Text>Please create an account to continue.</Text> {/*added text "Please create an account to continue."*/}
      <TextInput
        label="First Name"   
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: "" })} 
        error={!!firstName.error}
        errorText={firstName.error}
      /> 
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: "" })}
        error={!!lastName.error}
        errorText={lastName.error}
      />
      {/*added first name & last name  text input - the source code had one single field for Name*/}
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })} 
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="username"
      />
      {/*added username text input*/}
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
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 20 }}
      >
        Register 
        {/* Update the button from the source code "Next" to "Register"*/}
      </Button>
      <View style={styles.row}>
        <Text>Already have an account?</Text> {/*Update the text from the source code "I already have an account !" to "Already have an account?"*/}
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
