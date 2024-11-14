import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

const firebaseConfig = {
    apiKey: "AIzaSyD1fGhi8-tlsS6pYP0LAosVMDDVXlR0imU",
    authDomain: "city-fc013.firebaseapp.com",
    projectId: "city-fc013",
    storageBucket: "city-fc013.firebasestorage.app",
    messagingSenderId: "330866050479",
    appId: "1:330866050479:web:4560d43f5861e92220db5a",
    measurementId: "G-X0GXBDXQHC"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
