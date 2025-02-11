import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const LeaderboardScreen = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    
    useEffect(() => {
    // Fetch leaderboard data from an API or database
    // Currently using mock data for testing. Will replace with real data fetching later.
        const fetchData = async () => {
            // Replace later with real data fetching
            const data = [
                { id: '1', name: 'User1', score: 100 },
                { id: '2', name: 'User2', score: 90 },
                { id: '3', name: 'User3', score: 80 },
            ];
            setLeaderboardData(data);
        };

        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
        </View>
    ); 
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <FlatList
                data={leaderboardData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    name: {
        fontSize: 18,
    },
    score: {
        fontSize: 18,
    },
});

export default LeaderboardScreen;