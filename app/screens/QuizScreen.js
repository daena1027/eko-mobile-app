import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import { quizData } from '../config/quizData'; // Local static quiz data

export default function QuizScreen() { // QuizScreen component
  // State variables for quiz
  const [currentQuestion, setCurrentQuestion] = useState(0); // Current question index
  const [score, setScore] = useState(0); // User score
  const [quizCompleted, setQuizCompleted] = useState(false); // Quiz completion status
  const [disableOptions, setDisableOptions] = useState(false); // Disable options after selection
  const [fetchedQuizData, setFetchedQuizData] = useState([]); // State for fetched data

  // Fisher-Yates shuffle function to randomize quiz questions
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) { // Randomize the array
      // Generate a random index between 0 and i
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array; // Return the shuffled array
  };

  // Fetch quiz data from Firestore
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizData")); // Fetch data from Firestore
        const fetchedData = []; // Array to hold fetched data
        querySnapshot.forEach((doc) => { 
          fetchedData.push(doc.data()); 
        });

        const shuffled = shuffleArray(fetchedData); // Shuffle the fetched data
        const selected = shuffled.slice(0, 10); // Select first 10 questions
        setFetchedQuizData(selected); // Set the selected questions to state
        console.log("Fetched Quiz Data: ", selected); // Log the fetched data for debugging
        setFetchedQuizData(fetchedData); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching quiz data: ", error); // Log error if fetching fails
      }
    };

    fetchQuizData();
  }, []); // Fetch data 

  // Handle answer selection
  const handleAnswer = (selectedOption) => { 
    if (selectedOption === fetchedQuizData[currentQuestion].correctAnswer) { // Check if the answer is correct
      setDisableOptions(true); // Disable options after selection
      setScore(score + fetchedQuizData[currentQuestion].points); // Add points for correct answer
    }

    // Move to next question or complete quiz
    if (currentQuestion < fetchedQuizData.length - 1) { // Check if there are more questions
      setCurrentQuestion(currentQuestion + 1); // Move to next question
    } else { // If no more questions, complete the quiz
      setQuizCompleted(true); // Set quiz as completed
      setDisableOptions(true); // Disable options
    }
  };

  // Handle retaking the quiz
  const handleRetest = () => {
    setCurrentQuestion(0); // Reset current question to 0
    setScore(0); // Reset score to 0
    setQuizCompleted(false); // Set quiz as not completed
    setDisableOptions(false); // Enable options again
  };

  // Function to transform options object to array
  const getOptions = (options) => {
    return Object.entries(options).map(([key, value]) => ({ key, value })); 
  };

  // Display the quiz card with question and options
  return ( 
    <View style={styles.container}> {/* Main container for the quiz screen */}
      <View style={styles.quizCard}> {/* Card for displaying quiz question and options */}
        {fetchedQuizData.length > 0 ? ( // Check if quiz data is available
          <>
            {quizCompleted ? ( // If quiz is completed, show score and retake button
              <View style={styles.completedSection}> 
                <Text style={styles.score}>Your Score: {score}</Text>
                <TouchableOpacity style={styles.retestButton} onPress={handleRetest}>
                  <Text style={styles.buttonText}>Retake Quiz</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.quizSection}> 
                <Text style={styles.question}>{fetchedQuizData[currentQuestion].question}</Text> {/* Display current question */}
                {getOptions(fetchedQuizData[currentQuestion].options).map((option, index) => ( // Map through options and display them
                  <TouchableOpacity 
                    key={index} // Option key
                    style={styles.option} // Option button style
                    onPress={() => handleAnswer(option.key)} // Handle answer selection
                    disabled={disableOptions} // Disable options if selected
                  >
                    <Text style={styles.buttonText}>{option.value}</Text> {/* Display option value */}
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
    minHeight: 375,
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
    padding: 15,
    marginBottom: 12,
    width: '100%',
    borderRadius: 5,
    flexWrap: 'wrap', // Allow text to wrap if it's too long
    overflow: 'hidden', // Prevent content from overflowing
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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

