// /src/screens/QuizScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../core/theme';
import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [disableOptions, setDisableOptions] = useState(false);
  const [quizData, setQuizData] = useState([]); // State to store quiz data

  // Function to handle answer selection
  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + quizData[currentQuestion].points); // Add points for correct answer
    }

    // Move to the next question or complete the quiz
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setDisableOptions(true);
    }
  };

  // Function to retake the quiz
  const handleRetest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setDisableOptions(false);
  };

  // Fetch quiz data from Firestore
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizData"));
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setQuizData(fetchedData); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    };

    fetchQuizData();
  }, []); // Fetch data on component mount

  return (
    <View style={styles.container}>
      <View style={styles.quizCard}>
        {quizData.length > 0 ? (
          <>
            {quizCompleted ? (
              <View style={styles.completedSection}>
                <Text style={styles.score}>Your Score: {score}</Text>
                <TouchableOpacity style={styles.retestButton} onPress={handleRetest}>
                  <Text style={styles.buttonText}>Retake Quiz</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.quizSection}>
                <Text style={styles.question}>{quizData[currentQuestion].question}</Text>
                {quizData[currentQuestion].options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => handleAnswer(option)}
                    disabled={disableOptions}
                  >
                    <Text style={styles.buttonText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        ) : (
          <Text>Loading quiz...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  quizCard: {
    width: '80%',
    maxWidth: 400,
    minHeight: 300,
    padding: 20,
    borderWidth: 2,
    borderColor: '#4399E6',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    fontSize: 18,
  },
  option: {
    backgroundColor: '#4399E6',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  retestButton: {
    backgroundColor: '#4399E6',
    padding: 10,
    alignItems: 'center',
  },
  completedSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
