import React from 'react'
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png';

import styles from './style';


export default function GivClasses() {

    const {goBack} = useNavigation();

    function handleNavigateBack()
    {
        goBack();
    }

    return (
        <>
            <View style={styles.container} >
                <ImageBackground 
                    resizeMode='contain'  
                    style={styles.content} 
                    source={giveClassesBackgroundImage}
                >
                    <Text style={styles.title}>
                        Quer ser um Proffy?
                    </Text>
                    <Text style={styles.description}>
                        Para começar, você precisa se cadastrar como professor na nossa plataforma web
                    </Text>
                </ImageBackground>
                <RectButton style={styles.okButton} onPress={handleNavigateBack}>
                    <Text style={styles.okButtonText}>
                        Tudo bem
                    </Text>
                </RectButton>
            </View>
        </>
    )
}
