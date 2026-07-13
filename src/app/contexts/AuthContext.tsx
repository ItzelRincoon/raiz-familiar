import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  familyCode: string | null;
  user: User | null;
  login: (code: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [familyCode, setFamilyCode] = useState<string | null>(() => {
    return localStorage.getItem('familyCode');
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (code: string) => {
    const cleanCode = code.trim();
    if (!cleanCode) return;

    // Inicia sesión anónima en Firebase (crea un usuario real en Auth)
    const credential = await signInAnonymously(auth);

    // Busca o crea el documento de la familia en Firestore
    const familyRef = doc(db, 'families', cleanCode);
    const familySnap = await getDoc(familyRef);

    if (!familySnap.exists()) {
      await setDoc(familyRef, {
        code: cleanCode,
        createdAt: serverTimestamp(),
        members: [credential.user.uid],
      });
    } else {
      await setDoc(
        familyRef,
        { members: [...(familySnap.data().members || []), credential.user.uid] },
        { merge: true }
      );
    }

    localStorage.setItem('familyCode', cleanCode);
    setFamilyCode(cleanCode);
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('familyCode');
    setFamilyCode(null);
  };

  const isAuthenticated = !!user && !!familyCode;

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, familyCode, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
