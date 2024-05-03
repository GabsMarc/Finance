import React, { useEffect, useRef } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ToastAndroid
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInputMask } from 'react-native-masked-text'
import { deleteDoc, database, doc } from '../config/firebaseconfig'
import { Feather, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


export default props => {

    
    useEffect(() => {

    }, [props.status, props.refreshData])
    



    async function onDeleteTask() {
        await deleteDoc(doc(database, 'Finances', props.id))
        props.refreshData(true)
    }


    function getRightContent() {
        return (
            <TouchableOpacity style={style.right}
                onPress={onDeleteCard}
            >
                <Icon name='trash' size={30} color='white' />
            </TouchableOpacity>
        )
    }


    function getLeftContent() {
        return (
            <TouchableOpacity style={style.left}
                onPress={onDisableCard}
            >
                <AntDesign name='creditcard' size={30} color='white' />
            </TouchableOpacity>
        )
    }


    function onDisableCard() {
        Alert.alert('Alterar registro', props.status ? 'Deseja marcar a conta como paga?' : 'Deseja desmarcar a conta como paga?', [
            {
                text: 'Não',
            },
            {
                text: 'Sim',
                onPress: () => {
                    props.alterCardStatus(props.id, props.status)
                }
            },
        ]);
    }


    function onDeleteCard() {
        Alert.alert('Excluir registro', 'Deseja excluir o registro?', [
            {
                text: 'Não',
            },
            {
                text: 'Sim',
                onPress: () => {
                    onDeleteTask()
                }

            },
        ]);
    }


    function getValue() {

        if (props.value != '') {
            return (
                <TextInputMask
                    type={'money'}
                    value={props.value}
                    style={{ fontSize: 17, color: props.status ? 'green' : 'gray' }}
                    editable={false}
                />
            )
        } else {
            return (
                <Text style={{ fontSize: 17, color: props.status ? '#ff0000' : 'gray' }}>
                    Nenhum valor informado.
                </Text>
            )
        }
    }


    function alterCard() {

        const navigation = useNavigation()

        function openScreen(id) {
            navigation.navigate('EditCard', { id: id, refreshData: props.refreshData() })
        }

        return (

            props.status ? <TouchableOpacity key={props.id} style={style.edit} onPress={() => {
                Alert.alert('Alteração', 'Deseja fazer uma alteração no Card selecionado?', [
                    {
                        text: 'Não',
                    },
                    {
                        text: 'Sim',
                        onPress: () => openScreen(props.id)
                    },
                ]);
            }}>
                <Feather
                    name='edit'
                    size={25}
                    color={'#740be3'}
                />
            </TouchableOpacity>
                : <View key={props.id} style={style.edit} onPress={() => {
                }}>
                    <Feather
                        name='edit'
                        size={25}
                        color={'gray'}
                    />
                </View>
        )
    }



    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent}>
                <View style={style.card}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', }}>
                            <Image source={props.status ? require('../../assets/Icon/credit-card.png') : require('../../assets/Icon/credit-card-gray.png')} style={style.imgIcon} />
                        </View>
                        <View style={{ flex: 4 }}>
                            <View style={{ flex: 3, flexDirection: 'row' }}>
                                <View style={{ flex: 6, }}>
                                    <Text style={[style.cardTitle, { color: props.status ? '#740be3' : 'gray' }]}>
                                        {props.title}
                                    </Text>
                                    {getValue()}
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', gap: 20 }}>
                                    {alterCard()}
                                </View>
                            </View>
                            <View style={{ flex: 2, marginTop: -10 }}>
                                <Text style={{ fontSize: 17, paddingRight: 45, color: props.status ? 'black' : 'gray' }}>
                                    {props.description}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}



const style = StyleSheet.create({
    card: {
        height: 120,
        backgroundColor: '#E3E3E3',
        margin: 10,
        borderRadius: 20,

    },

    cardTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 5,
    },

    imgIcon: {
        height: 80,
        width: 80,
    },

    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        borderRadius: 20
    },

    left: {
        backgroundColor: '#00ad00',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 18,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        borderRadius: 20
    },

    edit: {
        height: 30,
        width: 30,
        borderRadius: 50,
        marginRight: 10,
        marginTop: 10
    },

})
