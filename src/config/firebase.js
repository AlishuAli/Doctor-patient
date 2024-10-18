
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBGezpEq0Q5DPFj7SAtfFbb3zcOqyT9_jY",
  authDomain: "sylani-92f2c.firebaseapp.com",
  projectId: "sylani-92f2c",
  storageBucket: "sylani-92f2c.appspot.com",
  messagingSenderId: "235825136680",
  appId: "1:235825136680:web:08fb110977fcf7571be11d",
  measurementId: "G-0LEKSKYW70"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const  database=getFirestore(app)
export const storage=getStorage(app)
