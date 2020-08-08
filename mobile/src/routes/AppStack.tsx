import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const {Navigator, Screen} = createStackNavigator();

import Landing from '../pages/Landing'
import GivClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';


export default function AppStack() {

    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen component={Landing} name="Landing" />
                <Screen component={GivClasses} name="GiveClasses" />
                <Screen component={StudyTabs} name="Study" />
            </Navigator>
        </NavigationContainer>
    )
}
