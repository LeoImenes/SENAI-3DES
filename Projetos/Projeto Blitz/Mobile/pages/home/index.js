import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ToastAndroid, Image } from 'react-native';
import { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

import MapView from 'react-native-maps';

export default function Home() {
    const [coord, setCoord] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })
    const [marcadores, setMarcadores] = useState([])
    

    useEffect(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            ToastAndroid.show('Localização negada', ToastAndroid.SHORT);
        }else {
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});

            console.log(location);
            setCoord({
                latitude:location.coords.latitude,
                longitude:location.coords.longitude
                
            });
        
            let posi = {
                coordenadas: location.coords.latitude + ',' + location.coords.longitude,
                alertum:{
                    tipo :"email",
                    descricao : "Minha localização"
                },
               imagem: require(`../../assets/App/Icons/senha.png`)
            }
            let arr = [];
            arr.push(posi)
            setMarcadores(arr);


        }
    }, []);

    

    useEffect(() => {
        fetch("http://10.87.207.20:3000/local")
        .then(resp => {
            return resp.json()
        }).then(data => {
            setMarcadores(data.usuario)
        }).catch(err => {
        })
    }, [marcadores])

    return(
        <View style={styles.container}>
            <MapView 
            style={styles.map} 
            region={{
                ...coord,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
            }}>
                { 
                    console.log(marcadores)
                    // marcadores.map((marcador, index)=>{
                    //     let loc = marcador.coordenadas.split(",");
                    //     let teste = "senha"
                    //     let imagem = require(`../../assets/App/Icons/${teste}.png`);
                    //     return(
                    //         <Marker key={index} coordinate={
                    //         { latitude: Number(loc[0]), 
                    //          longitude: Number(loc[1])}} 
                    //          title={marcador.alertum.tipo} 
                    //          description={""}>
                    //                <Image source={imagem} style={{width: 28, height: 28}}/>
                    //          </Marker>
                    //     )
                        
                    // })
                }
           
            </MapView>
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
});