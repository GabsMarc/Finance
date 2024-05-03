import React from 'react';
import { View } from 'react-native';
import { Account } from '../../components/Account';


const login = 1

export function Login() {
    return (
        <View >
            <Account
                type={login}
                buttonText={'Entrar'}
                title={'Entrar'}
            />
        </View>
    );
}