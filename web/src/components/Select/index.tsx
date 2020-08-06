import React, {SelectHTMLAttributes} from 'react'
import './style.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label:string;
    name:string;
    options: Array<{
        value:string;
        label:string;
    }>;
}

export default function Select({label, name, options, ...rest}:SelectProps) {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select id={name} defaultValue={''} {...rest} >
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map((option)=>(<option key={option.value} value={option.value}>{option.label}</option>))}
            </select>
        </div>
    )
}
