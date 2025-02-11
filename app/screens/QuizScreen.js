import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const quizData = [
  {
    question: 'What is React?',
    options: ['Library', 'Framework', 'Language'],
    correctAnswer: 'Library',
  },
  {
    question: 'What is JavaScript?',
    options: ['Library', 'Framework', 'Language'],
    correctAnswer: 'Language',
  },
];

export default function QuizScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [disableOptions, setDisableOptions] = useState(false);

  const handleAnswer = (selectedOption) => {
    // Check if the selected option is correct
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question or finish the quiz
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Mark quiz as completed and stop interaction
      setQuizCompleted(true);
      setDisableOptions(true); // Disable options after quiz completion
    }
  };

  const handleRetest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setDisableOptions(false); // Re-enable options for the new quiz
  };

  return (
    <View style={styles.container}>
      <View style={styles.quizCard}>
        {quizCompleted ? (
          <View style={styles.completedSection}>
            <Text style={styles.score}>Your Score: {score}</Text>
            <TouchableOpacity
              style={styles.retestButton}
              onPress={handleRetest}
            >
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
                disabled={disableOptions} // Disable options when quiz is completed
              >
                <Text style={styles.buttonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#4399E6',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
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
