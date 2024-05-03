import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../config/firebaseconfig';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuth() {
    const [user, setUser] = useState()

    
    useEffect(() => {

        onAuthStateChanged(FIREBASE_AUTH, (_user) => {
            setUser(_user)
        })

    }, [])

    return (
        user
    )

}