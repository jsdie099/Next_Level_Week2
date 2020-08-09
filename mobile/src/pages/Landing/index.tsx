import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';
import landingImg from '../../assets/images/landing.png';

import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';



export default function Landing() {
    const {navigate} = useNavigation();
    const [totalConnections, setTotalConnections] = useState(0);
    useEffect(() => {
        api.get("/connections")
        .then((response)=>{
            setTotalConnections(Number(response.data));
        })
        .catch(error=>console.log(error))
    }, [])


    function handleNavigateToGiveClasses()
    {
        navigate("GiveClasses");
    }
    function handleNavigateToStudyPages()
    {
        navigate("Study");
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}> {/* Text é o único componente no react native que 
                herda as propriedades css do elemento Text pai */}
                    O que deseja fazer?
                </Text>
            </Text>
            <View style={styles.buttonsContainer}>
                <RectButton 
                    style={[styles.button, styles.buttonPrimary]} 
                    onPress={handleNavigateToStudyPages}
                >
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>
                        Estudar
                    </Text>
                </RectButton>
                <RectButton 
                    style={[styles.button, styles.buttonSecondary]} 
                    onPress={handleNavigateToGiveClasses}
                >
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>
                        Dar aula
                    </Text>
                </RectButton>
            </View>
            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
    )
}
