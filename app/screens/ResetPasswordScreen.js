import React, { useState } from "react";

import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { emailValidator } from "../helpers/emailValidator";

export default function ResetPasswordScreen({ navigation }) { 
  const [email, setEmail] = useState({ value: "", error: "" }); /* email state*/

  const sendResetPasswordEmail = () => { /*function to handle reset password button press*/
    const emailError = emailValidator(email.value); /*emailError variable*/
    if (emailError) { /*if statement to check for errors in email*/
      setEmail({ ...email, error: emailError }); /*setEmail state updater function*/
      return; 
    }
    navigation.navigate("LoginScreen"); /*navigation to LoginScreen after successful reset password*/
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Reset your password.</Header>
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an email with the reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Reset {/*Update the text from the source code "Continue" to "Reset"*/}
      </Button>
    </Background>
  );
}
