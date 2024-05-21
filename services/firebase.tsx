import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
export const FirebaseAuth = getAuth();
export const db = getFirestore();

export const Authentication = () => {
  return FirebaseAuth;
};

export const SignUp = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const user = (
      await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    ).user;
    const uid = user.uid;
    await setDoc(doc(db, "users", uid), {
      username: username,
    });
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error (${errorCode}): ${errorMessage}`);
  }
};

export const SignIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(FirebaseAuth, email, password);
};

export const SignOut = async () => {
  await SignOut();
};

export const GetSignInErrorMessage = (code: any) => {
  switch (code) {
    case "auth/user-not-found":
      return "Email not registered";
    case "auth/wrong-password":
      return "Wrong password";
    default:
      return "Incorrect email or password";
  }
};

export const GetSignUpErrorMessage = (code: any) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email has been registered";
    default:
      return "An error occurred during the sign up process";
  }
};

export const getUsername = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData.username;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error: any) {
    console.error("Error getting document:", error);
    return null;
  }
};

export const SaveScore = async (
  userId: string,
  correct: number,
  incorrect: number
) => {
  const finalScore = correct * 20;

  try {
    await setDoc(
      doc(db, "users", userId),
      { correct: correct, incorrect: incorrect, score: finalScore },
      { merge: true }
    );
  } catch (error) {
    console.error("Error saving score to Firestore:", error);
  }
};

export const getScore = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      return {
        correct: userData.correct,
        incorrect: userData.incorrect,
        score: userData.score,
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error: any) {
    console.error("Error getting document:", error);
    return null;
  }
};

interface UserScore {
  userId: string;
  username: string;
  score: number;
}

export const getAllScores = async (): Promise<UserScore[] | null> => {
  try {
    const scores: UserScore[] = [];
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const userScores: UserScore = {
        userId: doc.id,
        username: userData.username,
        score: userData.score,
      };
      scores.push(userScores);
    });

    return scores;
  } catch (error: any) {
    console.error("Error getting scores:", error);
    return null;
  }
};
export const sendHaiToFirestore = async () => {
  try {
    await setDoc(doc(db, "hai", "default"), {
      message: "Hai from Firestore!",
    });
    console.log("Data 'hai' berhasil disimpan di Firestore");
  } catch (error) {
    console.error("Gagal menyimpan data 'hai' di Firestore:", error);
    throw new Error("Failed to send 'hai' to Firestore");
  }
};
