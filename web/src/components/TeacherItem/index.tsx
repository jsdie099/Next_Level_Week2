import React from 'react'
import './style.css';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

interface TeacherItemProps{
    teacher: {
        id:number;
        name: string;
        avatar: string;
        subject:string;
        bio:string;
        cost:number;
        whatsapp: string;
    }
}



export default function TeacherItem(props:TeacherItemProps) {

    function createNewConnection()
    {
        api.post("connections", {user_id: props.teacher.id})
        .catch(error=>console.log(error))
    }

    return (        
        <article className="teacher-item">
            <header>
                <img src={props.teacher.avatar} alt={props.teacher.name}/>
                <div>
                    <strong>{props.teacher.name}</strong>
                    <span>{props.teacher.subject}</span>
                </div>
            </header>
            <p>
                {props.teacher.bio}
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {props.teacher.cost}</strong>
                </p>
                <a onClick={e=>createNewConnection()} href={`https://wa.me/55${props.teacher.whatsapp}`} target="__blank">
                    <img src={whatsappIcon} alt="WhatsApp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}
