import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserStack } from './afterAuth/userStack.routes';
import { AuthStack } from './beforeAuth/authStack.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../config/firebaseconfig';



export default function Routes() {

    let userEmail = ''
    let userPassword = ''
    
    PersistLogin()

    async function PersistLogin() {
        userEmail = await AsyncStorage.getItem('_user1')
        userPassword = await AsyncStorage.getItem('_user2')

        if (userEmail && userPassword !== '') {
            await signInWithEmailAndPassword(FIREBASE_AUTH, userEmail, userPassword)
        }
    }
 
    const user = useAuth()

    return user ? <UserStack /> : <AuthStack />
}