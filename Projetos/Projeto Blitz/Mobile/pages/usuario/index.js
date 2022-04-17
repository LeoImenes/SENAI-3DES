import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import css from "./style"

export default function Usuario() {
    const[email,setEmail] = useState();
    const [senha,setSenha] = useState();
    const[mostrarUser,setUser] = useState();
    
        
        
        
    
 
    return(
        <View style={css.body} >
            <TextInput >

            </TextInput>
            <TouchableOpacity>
                <Text>Teste</Text>
            </TouchableOpacity>
        </View>
    )
}
