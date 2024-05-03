import React from 'react';
import { View } from 'react-native';
import { Account } from '../../components/Account';


const register = 0

export function Register() {
  return (
    <View>
        <Account
            type={register}
            buttonText={'Criar conta'}
            title={'Registro'}
        />
    </View>
  );
}