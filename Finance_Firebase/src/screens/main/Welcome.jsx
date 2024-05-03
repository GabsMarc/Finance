import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonAccount, ButtonInfo } from '../../components/Buttons';
import { ImagemWelcome } from '../../components/ImageWelcome';
import { TextWelcome } from '../../components/TextWelcome';



export function Welcome() {

  return (
    <SafeAreaView style={style.SafeArea}>

      <View style={{ flex: 1 }}>
        <ButtonInfo title={'Sobre'} screen={'Infos'} />
      </View>

      <View style={{ flex: 5, justifyContent: 'center' }}>
        <ImagemWelcome />
      </View>

      <View style={{ flex: 4 }}>
        <TextWelcome />
      </View>

      <View style={style.ButtonContainer}>
        <ButtonAccount title={'Entrar'} screen={'Login'} />
        <ButtonAccount title={'Criar conta'} screen={'Register'} />
      </View>
    </SafeAreaView>
  );
}


const style = StyleSheet.create({
  SafeArea: {
    flexGrow: 1,
    backgroundColor: '#7e22bb',

  },
  ButtonContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignSelf: 'center',
    paddingBottom: 20
  }


})