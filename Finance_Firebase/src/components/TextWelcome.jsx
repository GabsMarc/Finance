import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export function TextWelcome() {
  return (
    <View>
        <Text style={style.txtLogo}>
            Finance
        </Text>
        <Text style={style.txt}>
            Os seus gastos na palma da sua mão !   
        </Text>
    </View>
  );
}

const style = StyleSheet.create ({
    txtLogo: {
        fontSize: 50,
        marginLeft: 20,
        fontWeight: 'bold',
        color: 'white',
        
    },

    txt: {
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        color: 'white'
    }   
})