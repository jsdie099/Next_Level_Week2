import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';



import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';

import styles from './style';
import api from '../../services/api';


export default function TeacherList() {
    const [isFilterVisible, setIsFilterVisible] = useState(false); 
    const [favorites, setFavorites] = useState<number[]>([]);
    const [time, setTime] = useState("");
    const [subject, setSubject] = useState("");
    const [week_day, setWeekDay] = useState("");
    const [teachers, setTeachers] = useState<Teacher[]>([]);



    function loadFavorites()
    {
        AsyncStorage.getItem("favorites").then((response)=>{
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher)=>{return teacher.id})
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    function handleToggleFiltersVisible()
    {
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFiltersSubmit(){
        loadFavorites();
        if(time.length>0 && subject.length>0 && week_day.length>0)
        {
            await api.get("classes",{
                params:{
                    time,
                    week_day,
                    subject,
                }
            })
            .then((response)=>{
                setTeachers(response.data);
                setIsFilterVisible(false);
            })
            .catch(error=>console.log(error))
        }
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather
                            name="filter"
                            size={20}
                            color="#fff"
                        />
                    </BorderlessButton>
                )}
            >
                {isFilterVisible && 
                    (<View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                            defaultValue={subject}
                            onChangeText={text=>setSubject(text)}
                        />
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                    defaultValue={week_day}
                                    onChangeText={text=>setWeekDay(text)}
                                />      
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    
                                    style={styles.input}
                                    placeholder="Qual o o horário?"
                                    placeholderTextColor="#c1bccc"
                                    defaultValue={time}
                                    onChangeText={text=>setTime(text)}
                                />      
                            </View>
                        </View>
                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>)
                }
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
            >
                {teachers.map((teacher: Teacher, index)=>{
                    return (
                        <TeacherItem 
                            key={index} 
                            teacher={teacher} 
                            favorited={favorites.includes(teacher.id)} 
                        />
                    );
                })}                
            </ScrollView>
        </View>
    )
}
