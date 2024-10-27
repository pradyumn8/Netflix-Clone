import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyAfU15k3Gscz7FE2iar3zd2v3MHA-dxay4",
    authDomain: "netflix-clone-a2fcd.firebaseapp.com",
    projectId: "netflix-clone-a2fcd",
    storageBucket: "netflix-clone-a2fcd.appspot.com",
    messagingSenderId: "718607813766",
    appId: "1:718607813766:web:dc807fd5b73999a5c71507",
    measurementId: "G-YCSR7PR4D9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };
