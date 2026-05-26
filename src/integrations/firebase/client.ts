import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

function getFirebaseApp() {
  // Avoid "Firebase app named '[DEFAULT]' already exists" in hot reload / tests.
  const apps = getApps();
  if (apps.length) return apps[0];

  const missing = Object.entries(firebaseConfig)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length) {
    throw new Error(
      `Missing Firebase environment variables: ${missing.join(", ")}. Connect Firebase in .env/Vite config.`,
    );
  }

  return initializeApp(firebaseConfig);
}

export const app = getFirebaseApp();
export const auth = getAuth(app);

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(params: {
  email: string;
  password: string;
  displayName?: string;
  sendVerificationEmail?: boolean;
}) {
  const { email, password, displayName, sendVerificationEmail = true } = params;
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  const user = cred.user;
  if (displayName) {
    try {
      await updateProfile(user, { displayName });
    } catch {
      // Non-fatal; profile update can fail depending on provider rules.
    }
  }

  if (sendVerificationEmail && user && !user.emailVerified) {
    try {
      await sendEmailVerification(user);
    } catch {
      // Non-fatal.
    }
  }

  return cred;
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export async function signOutUser() {
  return signOut(auth);
}

export function subscribeToAuthStateChanges(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

