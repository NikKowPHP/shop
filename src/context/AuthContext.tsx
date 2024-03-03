import {
	ReactNode,
	useContext,
	createContext,
	useState,
	useEffect,
} from "react";
import { auth } from "../firebase";
import { User } from "../types/user";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword
} from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth"; 

type AuthContextType = {
	currentUser: User | null;
	signup: (email: string, password: string) => Promise<any>;
	login: (email: string, password: string) => Promise<any>;
	resetPassword: (email: string) => Promise<any>;
	logout: () => Promise<any>;
	updateEmailForCurrentUser: (email: string) => Promise<any>;
	updatePasswordForCurrentUser: (password: string) => Promise<any>;
	isLoggedIn: boolean;
};

type AuthProviderProps = {
	children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [currentUser, setCurrentUser] = useState<FirebaseUser|null>(null);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	function signup(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function login(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function logout() {
		return signOut(auth);
	}
	function resetPassword(email: string) {
		return sendPasswordResetEmail(auth, email)
	}
	function updateEmailForCurrentUser(email) {
		return updateEmail(currentUser, email)
	}
	function updatePasswordForCurrentUser(password) {
		return updatePassword(currentUser, password)
	}


	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null)  => {
			
				setCurrentUser(user);
				user ? setIsLoggedIn(true) : setIsLoggedIn(false)

			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value: AuthContextType = {
		currentUser,
		signup,
		login,
		logout,
		resetPassword,
		updateEmailForCurrentUser,
		updatePasswordForCurrentUser,
		isLoggedIn,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
