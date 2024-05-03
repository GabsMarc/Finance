import React, { useRef, useState } from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    TextInput,
    Alert
} from 'react-native';

import {
    database,
    collection,
    addDoc,
    FIREBASE_AUTH,
} from '../config/firebaseconfig'
import { TextInputMask } from 'react-native-masked-text';


export default function AddItem(props) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)

    const inputRef = useRef(null)


    async function addFinance() {

        if (title.length <= 0) {
            Alert.alert('Título não informado!')
            return
        } else if (description.length <= 0) {
            Alert.alert('Descrição não informada!')
            return
        }


        if (typeof value === 'string') {
            AddDoc(inputRef.current.getRawValue())
        } else {
            AddDoc(value)
        }

        setTitle('')
        setDescription('')
        setValue(0)
    }

    async function AddDoc(value) {

        await addDoc(collection(database, "Finances"), {
            title: title,
            description: description,
            value: value,
            uid: FIREBASE_AUTH.currentUser.uid,
            status: true
        })

    }



    return (
        <Modal transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onCloseModal}
            animationType='slide'>
            <TouchableWithoutFeedback
                onPress={props.onCloseModal}
            >
                <View style={style.overlay}></View>
            </TouchableWithoutFeedback>
            <View style={style.container}>
                <Text style={style.header}>Criar nova Finança</Text>

                <View style={{ paddingTop: 15 }}>
                    <Text style={style.title}>Titulo</Text>
                    <TextInput style={style.input}
                        placeholder='Informe o título'
                        onChangeText={(title) => setTitle(title)}
                        value={title}
                    />
                </View>


                <View style={{ paddingTop: 15 }}>
                    <Text style={style.title}>Descrição</Text>
                    <TextInput style={style.input}
                        placeholder='Descrição da finança'
                        maxLength={60}
                        onChangeText={(description) => setDescription(description)}
                        value={description}
                    />
                </View>
                <View style={{ paddingTop: 15 }}>
                    <Text style={style.title}>Valor</Text>
                    <TextInputMask
                        ref={inputRef}
                        type={'money'}
                        placeholder='Informe um Valor'
                        keyboardType='numeric'
                        onChangeText={(value) => { setValue(value) }}
                        value={value}
                        style={style.input}
                    />
                </View>

                <View style={style.buttons}>
                    <TouchableOpacity onPress={props.onCloseModal}>
                        <Text style={[style.button, { backgroundColor: '#ff3b3b' }]}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addFinance}
                        onPressOut={props.onCloseModal}
                    >
                        <Text style={[style.button, { backgroundColor: '#7e22bb' }]}>Salvar</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}


const style = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    container: {
        flex: 2,
        backgroundColor: 'white',
    },

    header: {
        fontSize: 22,
        backgroundColor: '#7e22bb',
        color: 'white',
        textAlign: 'center',
        padding: 15,
    },

    title: {
        fontSize: 20,
        marginLeft: 20,
    },

    input: {
        width: '90%',
        height: 45,
        marginTop: 10,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 15,
        alignSelf: 'center',
        backgroundColor: '#E3E3E3',
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    button: {
        margin: 30,
        paddingTop: 7,
        fontSize: 18,
        height: 40,
        width: 110,
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },

})