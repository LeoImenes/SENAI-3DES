import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ToastAndroid, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';
import * as ImagePicker from 'expo-image-picker'
import css from "./style"

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cadastrando, setCadastrando] = useState(false);

    const [imagem, setImagem] = useState(require('../../assets/App/images/user.png'));

    useEffect(async ()=>{
        if(await AsyncStorage.getItem('userdata') !== null){
            navigation.navigate('Main')
        }
    })

    const autenticar = () => {
        let usuario = {
            email: email,
            senha: md5(senha),
        }
        fetch("http://10.87.207.20:3000/login", {

            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(usuario)
        })
            .then(resp => { return resp.json() })
            .then(async data => {
                if (data.length > 0) {
                    await AsyncStorage.setItem('userdata', JSON.stringify(data[0]));
                    navigation.navigate("Main");
                } else {
                    ToastAndroid.show("Email ou Senha Invalidos", ToastAndroid.SHORT)
                }
            })
    }

    const selecionarImagem = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.cancelled && result.base64.length < 59500) {
            setImagem({
                uri: result.uri
            })
        } else if (!result.cancelled) {
            ToastAndroid.show("Selecione outra imagem", ToastAndroid.SHORT)
        }

    }

    const habilitarCadastro = () => {
        setCadastrando(true)
    }

    const cadastrar = () => {
        let usuario = {
            email: email,
            senha: md5(senha),
            foto: (imagem.uri !== undefined) ? imagem.uri : ''

        }

        fetch("http://10.87.207.20:3000/usuario",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => {return response.json()})
        .then(async data => {
            if(data.id === undefined) {
                ToastAndroid.show("Falha ao cadastrar", ToastAndroid.SHORT)
                setCadastrando(false)
            }else{
                await AsyncStorage.setItem('userdata', JSON.stringify(data))
                navigation.navigate('Main')
            }
        })
    }


    return (
        <View style={css.body}>
            <Image source={imagem} style={{ width: 128, height: 128 }} />
            <TextInput value={email} onChangeText={setEmail} style={{ backgroundColor: 'lightblue',  width: 128, height:"5%", marginBottom:10}} />
            <TextInput value={senha} onChangeText={setSenha} style={{ backgroundColor: 'lightblue',  width: 128, height:"5%",marginBottom:10}} />

            {

                (cadastrando) ?
                    <TouchableOpacity hidden={true} onPress={() => { selecionarImagem() }}>
                        <Image source={require("../../assets/App/images/camera.png")} style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => { habilitarCadastro() }}>
                        <Text>Cadastrar-se</Text>
                    </TouchableOpacity>
            }

            <TouchableOpacity onPress={() => cadastrar()} >
                <Text>{(cadastrando)? "Cadastrar":"Login"}</Text>
            </TouchableOpacity>
        </View>
    )




}