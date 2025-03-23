import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../core/theme";
import { db } from "../config/firebaseConfig"; // Adjust the path if needed
import { collection, getDocs } from "firebase/firestore";

export default function ChallengeScreen() {
  const [availableChallenges, setAvailableChallenges] = useState([]);  // Initially empty array
  const [loading, setLoading] = useState(true);  // To track loading state
  const navigation = useNavigation();

  // Fetch challenges from Firestore
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesRef = collection(db, "challengeData");  // Reference to the 'challenges' collection
        const querySnapshot = await getDocs(challengesRef);
        const challengesList = [];

        querySnapshot.forEach((doc) => {
          challengesList.push({ id: doc.id, ...doc.data() });
        });

        setAvailableChallenges(challengesList);
      } catch (error) {
        console.error("Error fetching challenges: ", error);
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };

    fetchChallenges();
  }, []);

  const handleJoinChallenge = (item) => {
    navigation.navigate("ChallengeProgressScreen", { challenge: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Challenges</Text>
      <Text style={styles.subtitle}>Select a challenge to join and track progress.</Text>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={availableChallenges}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleJoinChallenge(item)}>
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.challengeTitle}>{item.name}</Text>
                  <Text style={styles.challengeDescription}>{item.description}</Text>
                  <Text style={styles.challengePoints}>Points: {item.points}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 8,
    textAlign: "center",
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  challengeTitle: {
    fontSize: 18,
 fontWeight: "600",
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#444",
  },
  challengePoints: {
    fontSize: 12,
    color: "#777",
    marginTop: 8,
  },
});
