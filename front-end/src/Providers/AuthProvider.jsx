import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    getAuth, onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";


const auth = getAuth(app)

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axios = useAxiosPublic();
    const [dbUser, setDbUser] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const signOutUser = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

            if (currentUser) {
                // get token and get client 
                const userInfo = {
                    email: currentUser?.email
                }
                axios.post('/jwt', userInfo)
                    .then(async (res) => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }

                        // fetch mongodb user
                        const userRes = await axios.get(
                            `/users/${currentUser.email}`
                        );

                        setDbUser(userRes.data);
                        setLoading(false)
                    })
                    .catch(err => {
                        console.log(err);
                        setLoading(false);
                    });
            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }
        })

        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        dbUser,
        loading,
        createUser,
        signInUser,
        updateUserProfile,
        signOutUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;