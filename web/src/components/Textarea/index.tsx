import React, {TextareaHTMLAttributes} from 'react'
import './style.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label:string;
    name:string;
}

export default function Textarea({label, name, ...rest}:TextareaProps) {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest} />
        </div>
    )
}
