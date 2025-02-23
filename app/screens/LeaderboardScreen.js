import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LeaderboardScreen() {
    const [leaderboardData, setLeaderboardData] = useState([
        { userName: 'Nat255', score: 100 },
        { userName: 'Mike512', score: 90 },
        { userName: 'earthlig653', score: 80 },
        { userName: 'waterbender', score: 70 },
        { userName: 'firebender', score: 60 },
        { userName: 'airbender', score: 50 },
        { userName: 'paperplane14653', score: 40 },
        { userName: 'waterway52', score: 30 },
        { userName: 'grassongrass451', score: 20 },
        { userName: 'airnomad', score: 10 },
    ]);

    const getMedal = (rank) => {
        if (rank === 1) {
            return "🥇"; // Gold Medal
        } else if (rank === 2) {
            return "🥈"; // Silver Medal
        } else if (rank === 3) {
            return "🥉"; // Bronze Medal
        } else {
            return ""; // No medal for others
        }
    }

    const getRowColor = (index) => {
        return index % 2 === 0 ? '#f0f8ff' : '#ffffff'; // Alternate between light blue and white
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            
            {/* Loop through the leaderboard data and display the userName, score, and medals */}
            {leaderboardData.map((item, index) => (
                <View key={index} style={[styles.row, { backgroundColor: getRowColor(index) }]}>
                    <Text style={styles.rank}>{index + 1}</Text>
                    <Text style={styles.medal}>{getMedal(index + 1)}</Text>
                    <Text style={styles.name}>{item.userName}</Text>
                    <Text style={styles.score}>{item.score}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white', // Light gray background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
    },
    score: {
        fontSize: 18,
    },
    medal: {
        fontSize: 26, 
        textAlign: 'center',
        width: 30,
    },
});
