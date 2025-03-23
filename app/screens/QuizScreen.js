import React, { useState } from 'react';
import { View, Text, FlatList, Linking, Alert, StyleSheet } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import { theme } from '../core/theme';

// Static volunteer opportunities data
const volunteerOpportunities = [
  {
    id: '1',
    title: 'The Ocean Cleanup – Volunteer Program',
    focus: 'Removing plastic pollution from oceans and rivers',
    description: 'Assist with community cleanups, support research, and raise awareness about ocean conservation.',
    website: 'https://theoceancleanup.com',
  },
  {
    id: '2',
    title: 'African Impact – Sustainable Development & Conservation',
    focus: 'Wildlife conservation, community sustainability, and eco-tourism',
    description: 'Work on protecting endangered species, sustainable farming, and environmental initiatives.',
    website: 'https://africanimpact.com',
  },
  {
    id: '3',
    title: 'ECO-V – Sustainable Living and Climate Action',
    focus: 'Sustainable agriculture, climate change awareness, and ecological restoration',
    description: 'Help with tree planting, organic farming, and climate education programs.',
    website: 'https://ecovlanka.org',
  },
];

export default function VolunteerResourcesScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  // Handle opening URLs
  const handleOpenURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Cannot open URL');
        }
      })
      .catch(() => Alert.alert('Error', 'Failed to open URL'));
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Volunteer Opportunities</Text>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={volunteerOpportunities}  
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardFocus}>{item.focus}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <Button onPress={() => handleOpenURL(item.website)} mode="text" color={theme.colors.primary}>
                  Visit Website
                </Button>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  cardFocus: {
    fontStyle: 'italic',
    color: theme.colors.text,
  },
  cardDescription: {
    color: theme.colors.text,
  },
});
