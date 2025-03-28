import react from "react";
import {View, Text, StyleSheet} from "react-native";
import {theme} from "../core/theme";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import Header from "../components/Header";

export default function EducationalScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Header>Sustainability is cool!</Header>
            <Paragraph style={{textAlign: "center"}}>
                Learn about the environment and how you can help protect it!
            </Paragraph>
            <Button mode="contained" onPress={() => navigation.navigate("QuizScreen")}>
                Take Quiz
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate("VolunteerResourcesScreen")}>
                Volunteer Resources
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});