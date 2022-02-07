import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import Login from "./pages/login/index"
import Main from "./pages/main/index"
import Home from "./pages/home/index"
import User from "./pages/usuario/index"


const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer screenOptions={{headerShown: false}}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="User" component={User}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
