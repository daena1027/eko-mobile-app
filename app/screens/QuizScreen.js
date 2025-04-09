import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore'; // Firestore methods
import { quizData } from '../config/quizData'; // Local static quiz data

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [disableOptions, setDisableOptions] = useState(false);
  const [fetchedQuizData, setFetchedQuizData] = useState([]); // State for fetched data

  // Function to upload quiz data to Firestore
  const uploadQuizData = async () => {
    try {
      const quizCollection = collection(db, "quizData"); // Reference to Firestore collection
      for (let i = 0; i < quizData.length; i++) {
        await addDoc(quizCollection, quizData[i]);
      }
      console.log("Quiz data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading quiz data: ", error);
    }
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
        setFetchedQuizData(fetchedData); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    };

    fetchQuizData();
  }, []); // Fetch data when component mounts

  // Handle answer selection
  const handleAnswer = (selectedOption) => {
    if (selectedOption === fetchedQuizData[currentQuestion].correctAnswer) {
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
                {fetchedQuizData[currentQuestion].options.map((option, index) => (
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

      {/* Button to upload quiz data */}
      <TouchableOpacity style={styles.uploadButton} onPress={uploadQuizData}>
        <Text style={styles.buttonText}>Upload Quiz Data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
    justifyContent: "center",
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
  uploadButton: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
});
