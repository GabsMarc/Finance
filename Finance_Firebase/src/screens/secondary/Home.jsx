import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonIcon } from '../../components/Buttons';
import { Feather } from '@expo/vector-icons'
import Itens from '../../components/Itens';
import AddItem from '../../components/AddItem';
import { database, collection, getDocs, FIREBASE_AUTH, } from '../../config/firebaseconfig';
import * as Animatable from 'react-native-animatable'
import { doc, query, updateDoc, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function Home() {

  const [task, setTask] = useState([])
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [valueCard, setValueCard] = useState([]);



  useEffect(() => {
    getFinanceData()
    getValueData()
  }, [])

  useEffect(() => {
    setFilter(
      Object.values(task).filter((title) =>
        title.title.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, task])


  async function getFinanceData() {

    const userFilter = query(
      collection(database, "Finances"),
      where('uid', '==', FIREBASE_AUTH.currentUser.uid)
    )

    let querySnapshot = await getDocs(userFilter)

    let list = []


    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id })
    })

    setTask(list)
  }


  async function getValueData() {

    const userFilter = query(
      collection(database, "Finances"),
      where('uid', '==', FIREBASE_AUTH.currentUser.uid),
      where('status', '==', true)
    )

    let querySnapshot = await getDocs(userFilter)

    let list = []

    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id })
    })

    setValueCard(list)
    getValue()
  }


  async function alterCardStatus(idItem, status) {

    let updateInfo = doc(database, "Finances", idItem);

    await updateDoc(updateInfo, {
      status: !status
    }).then(() => refreshData(true))
  }


  function refreshData(onRefresh) {

    if (onRefresh === true) {
      setRefreshing(true)
      setTimeout(() => {
        getFinanceData()
        getValueData()
        setRefreshing(false)
      }, 500);
    }
  }


  function onCloseModal() {
    setModalVisible(false)
    refreshData(true)
  }


  function getValue() {

    const list = []
    let sum = 0

    valueCard.map(e => {
      list.push(e.value)
    })

    for (let i = 0; i < list.length; i++) {
      sum += list[i]
    }

    return `Total: R$${sum.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    })}`

  }


  return (
    <SafeAreaView style={style.safeArea}>
      <AddItem isVisible={modalVisible}
        onCloseModal={onCloseModal}
      />
      <View style={style.HeaderContainer}>
        <View style={{ flexGrow: 5 }}>
          <Text style={[style.title, { fontSize: 32 }]}>
            Finance
          </Text>
        </View>
        <View style={{ flexGrow: 1, justifyContent: 'flex-end', paddingBottom: 5 }}>
          <Text style={[style.title, { fontSize: 25 }]}>
            {getValue()}
          </Text>
        </View>
      </View>
      <View style={[{ flex: 8, backgroundColor: 'white' }]}>
        <View style={{ height: 70 }}>
          <View style={[{ justifyContent: 'center' }, style.input]}>
            <Feather
              name='search'
              size={30}
              color={'#7e22bb'}
              style={{ flex: 1, paddingLeft: 15, paddingRight: 5, alignSelf: 'center' }}
            />
            <TextInput
              placeholder='Pesquisar bloco'
              style={{ flex: 7, fontSize: 17 }}
              onChangeText={setSearch}

            />
          </View>
          <View style={style.ButtonStyle}>
            <ButtonIcon
              image={require('../../../assets/botao-adicionar-white.png')}
              height={50}
              width={50}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
        <Animatable.View style={{ flex: 1, }}
          animation="fadeInUp"
          delay={400}
        >
          <ScrollView
            style={{ marginBottom: '12%' }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => refreshData(true)}
                colors={["#740be3"]}
                style={{}}
              />
            }>

            {
              filter.map((tasks) => {
                return (
                  <Itens title={tasks.title} description={tasks.description} value={tasks.value} status={tasks.status} id={tasks.id} refreshData={refreshData} alterCardStatus={(id, status) => alterCardStatus(id, status)} />
                )
              })
            }
          </ScrollView>
        </Animatable.View>
      </View>

    </SafeAreaView>
  )
};


const style = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: '#7e22bb'
  },

  HeaderContainer: {
    backgroundColor: '#7e22bb',
    height: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },

  title: {
    color: 'white',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    marginTop: 20,
  },

  ButtonAdd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,

  },

  ButtonStyle: {
    backgroundColor: '#740be3',
    position: 'absolute',
    right: 15,
    top: 10,
    borderRadius: 30,
    height: 50,
    width: 50,
  },

  input: {
    backgroundColor: '#E3E3E3',
    height: 50,
    margin: 10,
    marginRight: 75,
    marginLeft: 15,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  card: {
    height: 110,
    backgroundColor: '#E3E3E3',
    margin: 10,
    borderRadius: 20

  },

  cardTitle: {
    color: '#740be3',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 5,
  },

  imgIcon: {
    height: 80,
    width: 80,
  },

})