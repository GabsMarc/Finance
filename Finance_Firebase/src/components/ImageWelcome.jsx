import React from 'react';
import { View, StyleSheet, Image } from 'react-native';


export function ImagemWelcome() {
  return (
    <Image 
        source={require('../../assets/FinanceLogo.png')}
        style={style.img}
    />
  );
}


const style = StyleSheet.create ({
    img: {
      height: 200,
      width: 400,
      alignSelf:'center',
      
    }
  
  })