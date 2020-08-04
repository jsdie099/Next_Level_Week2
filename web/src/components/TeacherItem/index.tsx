import React from 'react'
import './style.css';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
export default function TeacherItem() {
    return (        
        <article className="teacher-item">
            <header>
                <img src="https://avatars3.githubusercontent.com/u/50682281?s=460&u=fe1c748535db4fa86ed36c2703b61606ed874c55&v=4" alt="Juliano Paulo"/>
                <div>
                    <strong>Juliano Paulo</strong>
                    <span>Química</span>
                </div>
            </header>
            <p>
                Entusiasta das melhores tecnologias de química avançada. <br/><br/>
                Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências
                Mais de 200 mil pessoas já passaram por uma das minhas explosões.
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 20,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="WhatsApp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}
