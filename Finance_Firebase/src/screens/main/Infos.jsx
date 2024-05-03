import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonReturn } from '../../components/Buttons';


export function Infos() {
  return (
    <SafeAreaView style={style.SafeArea}>

        <View style={[style.btnReturn, {flex: 1}]}>
            <ButtonReturn screen={'Welcome'} image={require('../../../assets/ReturnWhite.png')}/>
        </View>

        <View style={{flex: 6, backgroundColor: 'white'}}>
            <View style={style.txtInfos}>
                <Text style={[style.title, {paddingLeft: 20, paddingTop: 20}]}>
                    Qual a finalidade do Finance?  
                </Text> 
                <Text style={[style.text, {paddingLeft: 30}]}>
                    Com o Aplicativo Finance, o gerenciamente de suas Finanças fica simples e prático, possibilitando que você, usuário, possa acompanhar seus investimentos e gastos.
                </Text>
                <Text style={[style.text, {paddingLeft: 30, paddingTop: 50}]}>
                    Em poucos cliques é possível deixar o Finance do jeito que você deseja!
                </Text>
            </View>
        </View>
    </SafeAreaView>
  );

}

const style = StyleSheet.create ({
  
  SafeArea: {
    flex: 1, 
    backgroundColor: '#740be3'
  },

  txtInfos: {
    flexGrow: 1,
    backgroundColor: '#740be3',
    margin: 30,
    marginBottom: 150,
    borderRadius: 30,
    elevation: 10,
    
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    color: 'white'
  },

  text: {
    fontSize: 27,
    padding: 10,
    color: 'white'
  },

  btnReturn: {
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20
  },
})

