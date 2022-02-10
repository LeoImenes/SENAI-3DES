import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ToastAndroid, Image, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

import MapView from 'react-native-maps';

export default function Home() {
    const tipo = [
        "",
        "",
        require(`../../assets/App/Icons/3.png`),
        require(`../../assets/App/Icons/4.png`),
        require(`../../assets/App/Icons/5.png`),
        require(`../../assets/App/Icons/6.png`),
        require(`../../assets/App/Icons/7.png`),
        require(`../../assets/App/Icons/8.png`)
    ]
    const [coord, setCoord] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })
    const [marcadores, setMarcadores] = useState([])
    const [showModal, setModal] = useState(false)
    const [valuePicker, setValuePicker] = useState()
    const [coorAlerta, setcoordAlerta] = useState("")


    useEffect(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            ToastAndroid.show('Localização negada', ToastAndroid.SHORT);
        } else {
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });

            console.log(location);
            setCoord({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude

            });

            let posi = {
                coordenadas: location.coords.latitude + ',' + location.coords.longitude,
                alertum: {
                    tipo: "email",
                    descricao: "Minha localização"
                },
                imagem: require(`../../assets/App/Icons/loca.png`)
            }
            let arr = [];
            arr.push(posi)
            setMarcadores(arr);
            carregarAlertas();
        }
    }, []);

    const carregarAlertas = () => {
        fetch("http://10.87.207.20:3000/local")
            .then(res => { return res.json() })
            .then(data => {
                let tempArr = marcadores;
                data.forEach(item => {
                    item.image = tipo[item.alertum.id - 1]
                    tempArr.push(item)
                })
                setMarcadores(tempArr)
            })
    }
const cadastrarAlerta = ()=>{
    console.log(valuePicker)
}

const sebastiao = (e) =>{
    
    console.log(e.nativeEvent.coordinate.latitude)
    console.log(e.nativeEvent.coordinate.longitude)

    let coord = e.nativeEvent.coordinate.latitude + "," + e.nativeEvent.coordinate.longitude

    setcoordAlerta(coord)

    setshowModal(true)
}


    // useEffect(() => {
    //     fetch("http://10.87.207.20:3000/local")
    //     .then(resp => {
    //         return resp.json()
    //     }).then(data => {
    //         setMarcadores(data.usuario)
    //     }).catch(err => {
    //     })
    // }, [marcadores])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    ...coord,
                    latitudeDelta: 0.0065,
                    longitudeDelta: 0.00065,
                }}  onPress={sebastiao}>
                   
                {

                    marcadores.map((marcador, index) => {
                        // console.log(marcador)
                        let loc = marcador.coordenadas.split(',');

                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: Number(loc[0]),
                                    longitude: Number(loc[1]),
                                }}
                                title={marcador.alertum.tipo}
                                description={""}
                            >
                                <Image source={marcador.image} style={styles.marcador} />
                            </Marker>
                        )
                    })
                }
            </MapView>
            <Modal visible={showModal}>
                <Picker selectedValue={valuePicker} onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <TouchableOpacity onPress={() => cadastrarAlerta()}>
                    <Text>Cadastrar alerta </Text>
                </TouchableOpacity>
            </Modal>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    marcador: {
        width: 32,
        height: 32
    }
});