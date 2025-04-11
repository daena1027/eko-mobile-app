import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import { quizData } from '../config/quizData'; // Local static quiz data

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [disableOptions, setDisableOptions] = useState(false);
  const [fetchedQuizData, setFetchedQuizData] = useState([]); // State for fetched data

  // Fisher-Yates shuffle function to randomize quiz questions
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
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

        const shuffled = shuffleArray(fetchedData); // Shuffle the fetched data
        const selected = shuffled.slice(0, 10); // Select first 10 questions
        setFetchedQuizData(selected); // Set the selected questions to state
        console.log("Fetched Quiz Data: ", selected); // Log the fetched data for debugging
        setFetchedQuizData(fetchedData); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    };

    fetchQuizData();
  }, []); // Fetch data when component mounts

  // Handle answer selection
  const handleAnswer = (selectedOption) => { 
    if (selectedOption === fetchedQuizData[currentQuestion].correctAnswer) { // Check if the answer is correct
      setDisableOptions(true); // Disable options after selection
      setScore(score + fetchedQuizData[currentQuestion].points); // Add points for correct answer
    }

    // Move to next question or complete quiz
    if (currentQuestion < fetchedQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setDisableOptions(true);
    }
  };

  // Handle retaking the quiz
  const handleRetest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setDisableOptions(false);
  };

  // Function to transform options object to array
  const getOptions = (options) => {
    return Object.entries(options).map(([key, value]) => ({ key, value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.quizCard}>
        {fetchedQuizData.length > 0 ? (
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
                <Text style={styles.question}>{fetchedQuizData[currentQuestion].question}</Text>
                {getOptions(fetchedQuizData[currentQuestion].options).map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => handleAnswer(option.key)}
                    disabled={disableOptions}
                  >
                    <Text style={styles.buttonText}>{option.value}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  quizCard: {
    width: '100%',
    maxWidth: 400,
    minHeight: 300,
    padding: 20,
    borderWidth: 2,
    borderColor: '#4399E6',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 1, // Allow shrinking of the card if needed
    overflow: 'hidden', // Prevent content from overflowing
  },
  question: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    flexWrap: 'wrap', // Allow text to wrap if it's too long
  },
  option: {
    backgroundColor: '#4399E6',
    padding: 12,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexShrink: 1, // Allow options to shrink if needed
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
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
    width: '100%',
  },
  scrollableContent: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
  },
});

