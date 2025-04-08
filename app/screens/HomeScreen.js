import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Carousel from "react-native-snap-carousel";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";

const challenges = [
  { title: "Reduce Plastic Use", description: "Avoid single-use plastics for a week." },
  { title: "Save Water", description: "Take shorter showers and fix leaks." },
  { title: "Plant a Tree", description: "Contribute to reforestation efforts." },
  { title: "Go Meatless", description: "Try a plant-based diet for a day." },
];

export default function HomeScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <Background>
      <Logo />
      <Header>Welcome to EKO!</Header>
      <Text style={styles.cheekyMessage}>
        Pick a challenge and show the Earth some love! 🌍
      </Text>
      <Carousel
        data={challenges}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.8}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  cheekyMessage: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 20,
    color: "#555",
  },
});