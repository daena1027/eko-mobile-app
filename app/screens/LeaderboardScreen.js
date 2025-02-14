import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { theme } from '../core/theme';
import Leaderboard from "react-native-leaderboard";
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

    const oddRowColor = '#FFFFFF';
    const evenRowColor = '#4399E6';

    const renderRow = (item, index) => {
        const rowColor = index % 2 === 0 ? evenRowColor : oddRowColor;

            
        return (
            <View style={[styles.row, { backgroundColor: rowColor }]}>
                <Text style={styles.rank}>{index + 1}</Text>
                <Text style={styles.name}>{item.userName}</Text>
                <Text style={styles.score}>{item.score}</Text>
            </View>
        );
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <Leaderboard
                data={leaderboardData}
                sortBy='score'
                labelBy='userName'
                scoreBy='score'
                oddRowColor={oddRowColor}
                evenRowColor={evenRowColor} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:theme.colors.surface,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        textAlign: 'center',
    },
 
    name: {
        fontSize: 18,
    },
    score: {
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
