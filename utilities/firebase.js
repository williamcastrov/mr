import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyAMMgKMiGOdKRkbt1N6eYRu9vU0w1yM948",
  authDomain: "mercadorepuesto-3d05a.firebaseapp.com",
  projectId: "mercadorepuesto-3d05a",
  storageBucket: "mercadorepuesto-3d05a.appspot.com",
  messagingSenderId: "72658890331",
  appId: "1:72658890331:web:b2dd080f59dc198061197e"
};

// Exporto Firebase Inicializado
export default firebase.initializeApp(firebaseConfig);

//******************* Version de Firebase en Package.json
//"firebase": "^9.1.0",
