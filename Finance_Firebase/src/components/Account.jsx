import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FIREBASE_AUTH, addDoc, collection, database } from '../config/firebaseconfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


const login = 1
const register = 0

export function Account({ type, title, buttonText }) {
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)



    function openScreen(screen) {
        navigation.navigate(screen)
    }


    async function signIn() {

        if (email.length <= 0) {
            Alert.alert('Atenção', 'Email não informado!')
            return
        } else if (password.length <= 0) {
            Alert.alert('Atenção', 'Senha não informada!')
            return
        }

        setLoading(true)


        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
        } catch (error) {
            if (error.code === 'auth/invalid-login-credentials') {
                Alert.alert('Dados inválidos', 'Senha ou Email inválidos.')
            }
        } finally {
            await AsyncStorage.setItem('_user1', email);
            await AsyncStorage.setItem('_user2', password)
            setLoading(false)
        }

    }


    async function signUp() {

        if (name.length <= 0) {
            Alert.alert('Atenção', 'Nome não informado!')
            return
        } else if (lastname.length <= 0) {
            Alert.alert('Atenção', 'Sobrenome não informado!')
            return
        } else if (email.length <= 0) {
            Alert.alert('Atenção', 'Email não informado!')
            return
        } else if (password.length <= 0) {
            Alert.alert('Atenção', 'Senha não informada!')
            return
        }
        else if (password !== confirmPassword) {
            Alert.alert('Atenção', 'As senhas não são iguais!')
            return
        }

        setLoading(true)

        try {
            await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            updateProfile(FIREBASE_AUTH.currentUser, {
                displayName: name
            })
                .finally(
                    addFinance()
                )
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                Alert.alert('Email inválido', 'Esse email não existe.')
            } else if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Email em uso', 'Já existe um registro usando esse email.')
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Senha inválida.', 'É necessário ter pelo menos 6 digitos.')
            }
        } finally {
            setLoading(false)
        }
    }


    async function addFinance() {

        try {
            await addDoc(collection(database, "User"), {
                uid: FIREBASE_AUTH.currentUser.uid,
                name: name,
                lastname: lastname,
                email: email,
                createdAt: setDate()
            });
        } catch (error) {
            console.log('Ocorreu um erro ao adicionar as informações.', error);
        }
    }


    function setDate() {
        let date = new Date()

        let dia = date.getDate()
        let mes = date.getMonth() + 1
        let ano = date.getFullYear()

        dia = dia.toString().padStart(2, '0')
        mes = mes.toString().padStart(2, '0')

        return `${dia}/${mes}/${ano}`
    }


    function TypeAccount() {
        if (type === login) {
            return (
                <View style={style.InputContainer}>
                    <View style={style.InputBox}>
                        <TextInput
                            style={style.Input}
                            placeholder='Email'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            autoCapitalize={'none'}
                        />
                    </View>

                    <View style={style.InputBox}>
                        <TextInput
                            style={style.Input}
                            placeholder='Senha'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>

                    <Text
                        style={style.ButtonAccount}
                        onPress={() => openScreen('Register')}
                    >
                        Não tem uma conta?
                    </Text>
                </View>
            )
        } else if (type === register) {
            return (
                <View style={style.InputContainer}>
                    <View style={style.InputBox}>
                        <TextInput
                            style={style.Input}
                            placeholder='Nome'
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>

                    <View style={style.InputBox}>
                        <TextInput
                            style={style.Input}
                            placeholder='Sobrenome'
                            value={lastname}
                            onChangeText={(text) => setLastname(text)}
                        />
                    </View>

                    <View style={style.InputBox}>
                        <TextInput
                            style={style.Input}
                            placeholder='Email'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            autoCapitalize={'none'}
                        />
                    </View>

                    <View style={style.InputBox}>
                        <TextInput
                            style={style.Input}
                            placeholder='Senha'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={style.InputBox}>
                        <TextInput
                            style={style.Input}
                            placeholder='Confirmar a Senha'
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>

                    <Text
                        style={style.ButtonAccount}
                        onPress={() => openScreen('Login')}
                    >
                        Já tem uma conta?
                    </Text>
                </View>
            )
        }
    }


    function ButtonAccount(type) {
        if (type === login) {
            signIn()
        }

        else if (type === register) {
            signUp()
        }

    }



    return (
        <LinearGradient style={style.login}
            colors={['#7e22bb', '#ffffff']}>
            <Image
                source={require('../../assets/background.png')}
                style={style.image}
            />
            <View style={style.LoginContainer}>
                <Text style={style.Title}>{title}</Text>

                {TypeAccount()}

                <View style={style.ButtonContainer}>
                    <TouchableOpacity
                        style={style.Button}
                        activeOpacity={0.5}
                        onPress={() => ButtonAccount(type)}
                    >
                        <Text style={style.ButtonText}>
                            {loading ? <ActivityIndicator size={'large'} color={'white'} />
                                : buttonText}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </LinearGradient>
    );
}




const style = StyleSheet.create({
    login: {
        height: '100%'
    },

    image: {
        height: 700,
        width: '100%'
    },

    LoginContainer: {
        backgroundColor: 'white',
        height: 530,
        width: '93%',
        display: 'flex',
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
    },

    Title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 10
    },

    InputContainer: {
        display: 'flex',
        flexGrow: 2,
        justifyContent: 'center',
    },

    InputBox: {
        height: 40,
        width: '90%',
        backgroundColor: '#d3d1d1',
        display: 'flex',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 20
    },

    Input: {
        fontSize: 18,
        padding: 10
    },

    ButtonAccount: {
        color: '#740be3',
        display: 'flex',
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 5,
        fontSize: 16
    },

    ButtonContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center'
    },

    Button: {
        backgroundColor: '#7e22bb',
        width: '50%',
        height: 40,
        borderRadius: 10,
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center'
    },

    ButtonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20
    }
})