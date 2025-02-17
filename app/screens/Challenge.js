import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChallengeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Challenge Screen</Text>
            {/* Add your challenge components here */}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default ChallengeScreen;