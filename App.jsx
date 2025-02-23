import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme } from "./app/core/theme";
import {
  StartScreen,
  LoginScreen,
  QuizScreen,
  RegisterScreen,
  ResetPasswordScreen,
  HomeScreen,
  LeaderboardScreen,
  EducationalScreen,
  SettingsScreen,
  UserProfile,
  ChatScreen,
} from "./app/screens";

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
      <Tab.Screen 
      name="Learn More" 
      component={EducationalStack} 
      options={{
        tabBarIcon: () => <AntDesign name="book" size={24} color={theme.colors.primary} />
      }}
    />
      <Tab.Screen 
      name="Leaderboard" 
      component={LeaderboardScreen} 
      options={{
        tabBarIcon: () => <AntDesign name="Trophy" size={24} color={theme.colors.primary} />
      }}
    />
      <Tab.Screen 
      name="Settings" 
      component={SettingsStack} 
      options={{
        tabBarIcon: () => <AntDesign name="setting" size={24} color={theme.colors.primary} />
      }}
      />
   
    </Tab.Navigator>
  );
}

function EducationalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EducationalScreen" component={EducationalScreen} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen"screenOptions={{headerShown: false}}>
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
