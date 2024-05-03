import React from 'react';
import { View, Image, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Help() {
  return (
    <SafeAreaView style={{flex: 1}}>
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={{width: '100%', backgroundColor: '#E3E3E3', paddingLeft: 20, alignItems: 'center', height: 80, justifyContent: 'center'}}>
                <Text style={{fontSize: 30, color: '#740be3', fontWeight: 'bold'}}>
                    Como utilizar o app?
                </Text>  
            </View>

            <View style={{paddingBottom: 100}}>
                <View style={style.container}>
                    <Text style={style.txtStyle}>
                        O layout da aplicação possui um botão.
                    </Text>
                    <Image 
                        source={require('../../../assets/help/App.jpg')}
                        style={[style.img, style.imgApp]}
                    />
                </View>

                <View style={[style.container]}>
                    <Text style={style.txtStyle}>
                        Ao clicar no botão com o sinal de "+" é aberta a tela onde é criado um novo card.   
                    </Text>
                    <Image 
                        source={require('../../../assets/help/Adicionar.png')}
                        style={[style.img, style.imgAdicionar]}
                    />
                </View> 

                <View style={[style.container]}>
                    <Text style={style.txtStyle}>
                        Arrastando o card para a esquerda, é possível habilitar o botão de exclusão, e basta clicar no botão para o card referente seja apagado.   
                    </Text>
                    <Image 
                        source={require('../../../assets/help/excluir.png')}
                        style={[style.img, style.imgDeletar]}
                    />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}


const style = StyleSheet.create ({
  container: {
    backgroundColor: '#740be3', 
    margin: 10, 
    borderRadius: 20, 
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 40
  },

  txtStyle: {
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white'
  },

  img: {
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },

  imgApp: {
    width: 350, 
    height: 250,
  },

  imgAdicionar: {
    width: 350, 
    height: 600,
  },

  imgDeletar: {
    width: '99%', 
    height: 130,
  }

})
