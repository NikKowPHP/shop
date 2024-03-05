import { db } from "../firebase";
import { get } from "firebase/database";
import { collection, addDoc, getDocs } from "firebase/firestore";



  export async function fetch(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    // querySnapshot.forEach((doc) => {

    // });
    return querySnapshot;
  }
  export async function write(collectionName, data) {
    
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
