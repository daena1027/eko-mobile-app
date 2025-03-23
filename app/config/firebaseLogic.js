// /src/config/firebaseLogic.js
import { db } from "./firebaseConfig"; // Firebase config
import { collection, addDoc } from "firebase/firestore"; // Firestore methods

// Import challenge and volunteer data
import { challengeData } from "./challengeData";
import { volunteerData } from "./volunteerData";

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
