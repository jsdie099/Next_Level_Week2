import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const {Navigator, Screen} = createStackNavigator();

import Landing from '../pages/Landing'

export default function AppStack() {

    return (
        <NavigationContainer>
            <Navigator>
                <Screen component={Landing} name="Landing" />
            </Navigator>
        </NavigationContainer>
    ) 
}
