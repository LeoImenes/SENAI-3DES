import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from "../../home";
import User from "../../user";
import { View } from "react-native";

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabs() {
  return (
      <View>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
    </View>
  );
}