import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import {
  getDoc,
  doc,
  database,
  updateDoc
} from '../../config/firebaseconfig';
import React, { useState, useEffect, useRef } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { Feather } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'


export function EditCard({ navigation, route }) {

  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('')
  const [Value, setValue] = useState(0)
  const [loading, setLoading] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    getTask()
  }, [])


  async function getTask() {
    const docSnap = await getDoc(doc(database, 'Finances', `${route.params.id}`));
    let lista = []

    lista = [docSnap.data()]

    setTitle(`${lista.map((lista) => lista.title)}`)
    setDescription(`${lista.map((lista) => lista.description)}`)

    let [value] = lista
    setValue(value.value)

  }


  async function update(value) {

    setLoading(true)
    
    ToastAndroid.show('Alteração salva com sucesso!', ToastAndroid.SHORT)

    await updateDoc(doc(database, "Finances", `${route.params.id}`), {
      title: Title,
      description: Description,
      value: value
    })

    setTimeout(() => {
      setLoading(false)
    }, 1500)

  }


  function updateTask() {

    if (Title.length <= 0) {
      Alert.alert('Título não informado!')
      return
    } else if (Description.length <= 0) {
      Alert.alert('Descrição não informada!')
      return
    }

    if (typeof Value === 'string') {
      update(inputRef.current.getRawValue())
    } else {
      update(Value)
    }

  }


  function getValue() {

    if (Value !== 0) {
      return (
        <TextInputMask
          type={'money'}
          value={Value}
          style={[style.textValue, { fontWeight: 'bold' }]}
          editable={false}
        />
      )
    } else {
      return (
        <Text style={[style.textValue, { color: '#ff0000' }]}>
          Nenhum valor informado.
        </Text>
      )
    }
  }



  return (
    <View style={style.container}>
      <View style={style.cardArea}>
        <Animatable.View style={style.card}
          animation='fadeInDown'
          delay={300}
        >
          <View style={style.cardStyle}>

            <View style={{ flex: 2, padding: 10, }}>
              <Text style={style.Description}>Título: </Text>
              <Text style={style.cardText}>
                {Title}
              </Text>
            </View>

            <View style={{ flex: 3, padding: 10, }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={style.Description}>Valor:</Text>
                {getValue()}
              </View>
            </View>

            <View style={style.viewDescription}>
              <Text style={style.cardDescription}>
                {Description}
              </Text>
            </View>

          </View>
        </Animatable.View>
      </View>
      <Animatable.View style={style.updateArea}
        animation='fadeIn'
        delay={300}
      >

        <View>
          <Text style={style.updateTitle}>Informe abaixo o novo valor dos campos!</Text>
        </View>

        <View style={{ alignContent: 'center' }}>


          <View style={[{}, style.input]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TextInput
                placeholder='Informe o novo Título'
                value={Title}
                onChangeText={(title) => { setTitle(title) }}
                style={{ flex: 1, fontSize: 17 }}
              />
              <TouchableOpacity
                onPress={() => { setTitle('') }}
              >
                <Feather
                  name='x'
                  size={30}
                  color={'#740be3'}
                  style={{ paddingTop: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>


          <View style={[{}, style.input]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TextInput
                placeholder='Informe a nova Descrição'
                value={Description}
                onChangeText={(description) => { setDescription(description) }}
                style={{ flex: 1, fontSize: 17 }}
              />
              <TouchableOpacity
                onPress={() => { setDescription('') }}
              >
                <Feather
                  name='x'
                  size={30}
                  color={'#740be3'}
                  style={{ paddingTop: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>


          <View style={[{}, style.input]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TextInputMask
                ref={inputRef}
                placeholder='Informe um Valor'
                type={'money'}
                value={Value}
                onChangeText={(value) => { setValue(value) }}
                keyboardType='numeric'
                style={{ flex: 1, fontSize: 17 }}
              />
            </View>
          </View>


          <View style={{ alignItems: 'center', paddingTop: 50 }}>
            <TouchableOpacity
              style={style.buttonSave}
              onPress={updateTask}
            >
              <Text style={{ fontSize: 18 }}>
                {loading
                  ? <ActivityIndicator size={'large'} color={'#7e22bb'} />
                  : 'Salvar'
                }

              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </Animatable.View>
    </View>
  );
}



const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7e22bb',

  },

  cardArea: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#E3E3E3',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingTop: 20,

  },

  card: {
    backgroundColor: '#7e22bb',
    width: '85%',
    height: 220,
    borderRadius: 13,
    alignSelf: 'center',
    elevation: 50,

  },

  cardStyle: {
    flex: 1,

  },

  Description: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingRight: 10

  },

  cardText: {
    fontSize: 18,
    paddingLeft: 10,
    color: 'white'
  },

  cardDescription: {
    fontSize: 18,
    color: 'white',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  textValue: {
    color: '#22de18',
    fontSize: 20,
  },

  viewDescription: {
    flex: 3,
    backgroundColor: 'gray',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },

  updateArea: {
    flex: 3,
    backgroundColor: '#7e22bb',
    paddingTop: 50
  },

  updateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingBottom: 20,
    color: 'white'

  },

  input: {
    margin: 10,
    height: 50,
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    backgroundColor: '#E3E3E3',
  },

  buttonSave: {
    width: '30%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30

  },


})