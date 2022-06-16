import React, { HTMLAttributes } from 'react'
import { TInputType } from 'types/types'

interface IProps extends HTMLAttributes<HTMLInputElement> {
    type:TInputType, 
    id:string,
    className:string,
    name:string,
    value?:any,
    placeholder?:string,
    autoComplete?:"off" | "on"
    readOnly?:boolean
}

const Input:React.FC<IProps> = ({type, id, className, name, value, placeholder, autoComplete, readOnly, ...props}) => {

    if(value){
        return (
            <input type={type} name={name} id={id} className={className} value={value} placeholder={placeholder} autoComplete={autoComplete} {...props} readOnly={readOnly} />
        )
    }

    return (
        <input type={type} name={name} id={id} className={className}  placeholder={placeholder} autoComplete={autoComplete} {...props} readOnly={readOnly} />
    )
    
}

export default Input
