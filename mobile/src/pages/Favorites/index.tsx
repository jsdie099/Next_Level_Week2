import React, { useState } from 'react'
import { View, ScrollView } from 'react-native';
import PageHeader from '../../components/PageHeader';

import styles from './style';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    useFocusEffect(()=>{AsyncStorage.getItem("favorites").then((response)=>{if(response)setFavorites(JSON.parse(response));});});
    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>
            <ScrollView
                style={styles.teacherList}
            >
                {favorites.map((teacher:Teacher, index)=>{
                    return (<TeacherItem
                        teacher={teacher}
                        key={index}
                        favorited
                    />);
                })}
            </ScrollView>
        </View>
    )
}
