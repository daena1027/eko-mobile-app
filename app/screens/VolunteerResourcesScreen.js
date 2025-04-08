import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Linking, Alert, StyleSheet } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import { theme } from '../core/theme';
import { db } from "./firebaseConfig"; 
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

export default function VolunteerResourcesScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [volunteerOpportunities, setVolunteerOpportunities] = useState([]);

  useEffect(() => {
    // Fetch volunteer data from Firestore
    const fetchVolunteerData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'volunteerData')); 
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); 
        setVolunteerOpportunities(data);
        console.log('Fetched Volunteer Opportunities:', data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching volunteer opportunities:', error);
        setLoading(false);
      }
    };
  
    fetchVolunteerData();
  }, []);
  
  const handleOpenURL = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
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
                <Button onPress={() => handleOpenURL(item.website)} mode="text" style={styles.cardButton}>
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
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  cardFocus: {
    fontStyle: 'italic',
    color: theme.colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    color: theme.colors.text,
    textAlign: 'center',
  },
  cardButton: {
    color: theme.colors.primary,
  },
});
