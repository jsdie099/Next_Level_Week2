import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-community/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';

import styles from './style';
import api from '../../services/api';


export default function TeacherList() {
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false); 
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [time, setTime] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [week_day, setWeekDay] = useState<string>("0");
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

    function formatTime(time:any)
    {
        const timestamp = time.nativeEvent.timestamp;
        if(timestamp !== undefined)
        {
            const currentDate = new Date(timestamp);
            const selectedHour = currentDate.getHours();
            const selectedMinutes = 
                (currentDate.getMinutes()>9)
                    ?
                currentDate.getMinutes()
                    :
                "0"+currentDate.getMinutes(); 
            setTime(`${selectedHour}:${selectedMinutes}`);
        }
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
                                <View style={styles.input}>
                                    <Picker
                                        style={{
                                            backgroundColor:'#fff', 
                                            color:"#b4b4b4"
                                        }}
                                        onValueChange={(week_day)=>setWeekDay(week_day.toString())}
                                        mode="dropdown"
                                        itemStyle={{paddingHorizontal:30}}
                                        selectedValue={week_day}
                                    >
                                        <Picker.Item label="Selecione um dia" value="-1" />
                                        <Picker.Item label="Domingo" value="0"/>
                                        <Picker.Item label="Segunda-feira" value="1"/>
                                        <Picker.Item label="Terça-feira" value="2"/>
                                        <Picker.Item label="Quarta-feira" value="3"/>
                                        <Picker.Item label="Quinta-feira" value="4"/>
                                        <Picker.Item label="Sexta-feira" value="5"/>
                                        <Picker.Item label="Sábado" value="6" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <RectButton 
                                    style={styles.input} 
                                    onPress={e=>{
                                            setShowTimePicker(true);
                                            setTimeout(()=>{setShowTimePicker(false);},500);
                                        }}
                                >
                                    <Text style={{color:'#b4b4b4', fontSize:16}}>
                                        {time ? time:'Qual o horário?'}
                                    </Text>
                                </RectButton>
                                {showTimePicker && 
                                    (<RNDateTimePicker
                                        is24Hour
                                        mode="time"
                                        display="default"
                                        value={new Date()} 
                                        onChange={time=>formatTime(time)}
                                    />)
                                    
                                }
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
