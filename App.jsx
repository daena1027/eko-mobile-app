// /App.jsx
import React, { useEffect } from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme } from "./app/core/theme";
import { addQuizData } from "./app/config/firebaseLogic";
import { StartScreen, LoginScreen, QuizScreen, RegisterScreen, ResetPasswordScreen, HomeScreen, LeaderboardScreen, EducationalScreen, SettingsScreen, UserProfile, VolunteerResourcesScreen, ChallengeScreen, ChallengeProgressScreen } from "./app/screens";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarIcon: () => <AntDesign name="home" size={24} color={theme.colors.primary} /> 
        }}
      /> 
      {/* Other tabs */}
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    addQuizData(); // Optionally upload quiz data when the app starts
  }, []); // Runs once when the app loads

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="ShortcutTabs" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
