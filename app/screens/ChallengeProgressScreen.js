import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { theme } from "../core/theme";  // You can keep this if you want to use your custom theme colors

export default function ChallengeProgressScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { challenge } = route.params;

  const [status, setStatus] = useState(challenge.status);
  const [isStarted, setIsStarted] = useState(false); // New state to track if challenge is started

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (newStatus === "In Progress") {
      setIsStarted(true); // Challenge has started
    }
    // Update the challenge status and points (you can also update the database here)
    // For simplicity, we're just navigating back for now
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{challenge.name}</Text>
      <Text style={styles.description}>{challenge.description}</Text>

      <Text style={styles.status}>Current Status: {status}</Text>

      <View style={styles.buttonContainer}>
        {!isStarted ? (  // If challenge hasn't started yet, show "Start Challenge"
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handleStatusChange("In Progress")}
          >
            <Text style={styles.buttonText}>Start Challenge</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => handleStatusChange("Completed")}
            >
              <Text style={styles.buttonText}>Complete Challenge</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button} 
              onPress={() => handleStatusChange("Saved for Later")}
            >
              <Text style={styles.buttonText}>Save for Later</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: theme.colors.primary,
  },
  description: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  status: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#2c7a7b", // Change to a color that fits your app
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: 250,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
