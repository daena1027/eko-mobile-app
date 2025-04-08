// /src/config/firebaseLogic.js
import { db } from "./firebaseConfig"; // Firebase config
import { collection, addDoc } from "firebase/firestore"; // Firestore methods

// Import challenge and volunteer data
import { challengeData } from "./challengeData";
import { volunteerData } from "./volunteerData";
import { quizData } from "./quizData";

// Function to add challenges to Firestore
export const addChallengeData = async () => {
  try {
    for (let challenge of challengeData) {
      const docRef = await addDoc(collection(db, "challengeData"), challenge);
      console.log("Challenge added with ID: ", docRef.id);
    }
  } catch (error) {
    console.error("Error adding challenges: ", error);
  }
};

// Function to add volunteer opportunities to Firestore
export const addVolunteerData = async () => {
  try {
    for (let opportunity of volunteerData) {
      const docRef = await addDoc(collection(db, "volunteerData"), opportunity);
      console.log("Volunteer Opportunity added with ID: ", docRef.id);
    }
  } catch (error) {
    console.error("Error adding volunteer opportunities: ", error);
  }
};

export const addQuizData = async () => {
  try {
    for (let quiz of quizData) {
      const docRef = await addDoc(collection(db, "quizData"), quiz);
      console.log("Quiz added with ID: ", docRef.id);
    }
  } catch (error) {
    console.error("Error adding quizzes: ", error);
  }
}