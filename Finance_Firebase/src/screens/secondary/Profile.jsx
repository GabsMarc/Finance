import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH, database } from '../../config/firebaseconfig';
import { signOut } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, getDocs, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Profile(props) {

    const [loading, setLoading] = useState(false)
    const [task, setTask] = useState([])

    useEffect(() => {
        getFinanceData()
    }, [])

    async function getFinanceData() {

        const userFilter = query(
            collection(database, "User"),
            where('uid', '==', FIREBASE_AUTH.currentUser.uid)
        )

        let querySnapshot = await getDocs(userFilter);

        let list = []
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        })


        let [firstItem] = list

        setTask(firstItem)
    }


    function SignOut() {

        setLoading(true)

        Alert.alert('Sair', 'Deseja sair da sua conta?', [
            {
                text: 'Não',
                onPress: () => setLoading(false)
            },
            {
                text: 'Sim',
                onPress: () => {
                    setTimeout(() => {
                        setLoading(false)
                        handledLogOut()
                        signOut(FIREBASE_AUTH)
                    }, 2000)
                }
            },
        ]);


    }

    async function handledLogOut() {

        await AsyncStorage.setItem('_user1', '')
        await AsyncStorage.setItem('_user2', '')
    }


    return (
        <LinearGradient
            colors={['#7e22bb', '#ffffff']}
            style={style.ProfileContainer}>
            <Image
                source={require('../../../assets/background.png')}
                style={style.image}
            />
            <LinearGradient style={style.Content}
                colors={['white', '#f2e9f3']}>
                <View style={style.InfoContainer}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25 }}>Olá </Text>
                        <Text style={style.TextName}>
                            {`${task.name} ${task.lastname}`}
                        </Text>
                    </View>
                    <View style={{ display: 'flex', gap: 15, paddingTop: 50 }}>
                        <View style={style.Infos}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                Nome
                            </Text>
                            <Text style={style.TextInfos}>
                                {task.name}
                            </Text>
                        </View>
                        <View style={style.Infos}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                Sobrenome
                            </Text>
                            <Text style={style.TextInfos}>
                                {task.lastname}
                            </Text>
                        </View>
                        <View style={style.Infos}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                Email
                            </Text>
                            <Text style={style.TextInfos}>
                                {task.email}
                            </Text>
                        </View>
                        <View style={style.Infos}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                Conta criada em
                            </Text>
                            <Text style={style.TextInfos}>
                                {task.createdAt}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={style.ButtonContainer}>
                    <TouchableOpacity
                        style={style.Button}
                        activeOpacity={0.5}
                        onPress={() => SignOut()}
                    >
                        <Text style={style.ButtonText}>
                            {loading ? 'Saindo...' : 'Desconectar'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </LinearGradient>
    );
}

const style = StyleSheet.create({
    ProfileContainer: {
        height: '100%',
        width: '100%',
        paddingBottom: 70,
    },

    image: {
        height: 700,
        width: '100%',
        position: 'absolute'
    },

    Content: {
        height: 490,
        width: '93%',
        bottom: 100,
        alignSelf: 'center',
        backgroundColor: '#e6e6e6',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        display: 'flex',
    },

    InfoContainer: {
        display: 'flex',
        flex: 3,
        padding: 10,
    },

    Infos: {
        backgroundColor: '#d3d1d1',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 5,
    },


    TextName: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    TextInfos: {
        fontSize: 20
    },

    ButtonContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },

    Button: {
        height: 50,
        width: '60%',
        backgroundColor: '#7e22bb',
        borderRadius: 10,
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',

    },

    ButtonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 18
    },

})