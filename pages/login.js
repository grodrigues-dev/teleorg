import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../shared/components/Header';
import Loader from '../shared/components/Loader';
import { realizarLogin } from '../shared/services/api';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
} from 'react-native';


export default function Login({ navigation }) {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState('');

    const Logar = () => {
        setLoading(true)
        realizarLogin({
            login,
            senha
        }).then(data => {
            if(!data.token){
                setLoading(false)
                return alert('Usuário ou senha inválidos');
            }
            AsyncStorage.setItem('token', data.token, ()=> {
                navigation.navigate('Home');
            });
        }).catch(()=>{
            setLoading(false)
            alert('Usuário ou senha inválidos');
        })
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.containerLogin}>
                <Text style={styles.text}>Login</Text>
                <TextInput style={styles.input} placeholder="Usuário" value={login} onChangeText={e => setLogin(e)} />
                <TextInput style={styles.input} placeholder="Senha" value={senha} secureTextEntry={true}  onChangeText={e => setSenha(e)} />
                <TouchableHighlight>
                    <Text style={styles.button} onPress={ Logar }>Entrar</Text>
                </TouchableHighlight>
            </View>
            <Loader showModal={loading}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    containerLogin : {
        backgroundColor: '#1538A1',
        width: '100%',
        marginTop: 100,
        alignItems: 'center',
        padding: 20
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: "bold"
    },
    input: {
        backgroundColor: "#fff",
        marginTop: 20,
        borderRadius: 5,
        width: 288,
        padding: 10,
        fontSize: 20
    },
    button: {
        borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 25,
        width: 188,
        textAlign: "center",
        padding: 6,
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    link: {
        color: "#fff",
        fontSize: 18,
        textDecorationLine: "underline",
        paddingTop: 15
    }
})

