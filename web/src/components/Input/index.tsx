import React, {InputHTMLAttributes} from 'react'
import './style.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label:string;
    name:string
}

export default function Input({label, name, ...rest}:InputProps) {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
    )
}
