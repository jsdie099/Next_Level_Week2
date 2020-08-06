import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';


import TeacherItem from '../../components/TeacherItem';

import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './style.css';

interface Teacher{
    id:number;
    name: string;
    avatar: string;
    subject:string;
    bio:string;
    cost:number;
    whatsapp: string;
}

export default function TeacherList() {

    const [subject, setSubject] = useState("");
    const [time, setTime] = useState("");
    const [week_day, setWeekDay] = useState("");
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    async function searchTeachers(e:FormEvent)
    {
        e.preventDefault();
        await api.get("classes",{
            params:{
                time,
                week_day,
                subject,
            }
        })
        .then((response)=>{
            setTeachers(response.data);
            console.log(response.data);
        })
        .catch(error=>console.log(error))
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={e=>searchTeachers(e)}>
                    <Select 
                        onChange={e=>setSubject(e.target.value)}
                        name="subject" 
                        label="Matéria"
                        required
                        options = {[
                            {value: 'Química', label:'Química'},
                            {value: 'Artes', label:'Artes'},
                            {value: 'Matemática', label:'Matemática'},
                            {value: 'Biologia', label:'Biologia'},
                            {value: 'Ciências', label:'Ciências'},
                            {value: 'Educação física', label:'Educação física'},
                            {value: 'História', label:'História'},
                        ]}
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        onChange={e=>setWeekDay(e.target.value)}
                        required
                        options = {[
                            {value: '0', label:'Domingo'},
                            {value: '1', label:'Segunda-feira'},
                            {value: '2', label:'Terça-feira'},
                            {value: '3', label:'Quarta-feira'},
                            {value: '4', label:'Quinta-feira'},
                            {value: '5', label:'Sexta-feira'},
                            {value: '6', label:'Sábado'},
                        ]}
                    />
                    
                    <Input 
                        name="time" 
                        onChange={e=>setTime(e.target.value)} 
                        type="time" 
                        required
                        label="Hora"
                        defaultValue={time}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher, index)=>{
                    return (
                        <TeacherItem
                            key={index}
                            teacher={teacher} 
                        />
                    );
                })}
            </main>

        </div>
    )
}
