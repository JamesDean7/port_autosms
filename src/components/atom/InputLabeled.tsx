import React, { HTMLAttributes } from 'react'

interface IProps extends HTMLAttributes<HTMLInputElement> {
    labelClass:string,
    inputClass:string,
    type:"text" | "password" | "checkbox",
    value?:any,
    placeholder:any,
    autoComplete?:"off" | "on"
}

const InputLabeled:React.FC<IProps> = ({labelClass, inputClass, type, placeholder, value, autoComplete, ...props}) => {

    if(value) {
        return (
            <label className={labelClass}>
                <input type={type} className={inputClass} placeholder={placeholder} value={value} autoComplete={autoComplete} 
                       {...props} />
            </label>
        )
    }

    /*

        
        

    */
   

    return (
        <label className={labelClass}>
            <input type={type} className={inputClass} placeholder={placeholder} autoComplete={autoComplete} {...props} />
        </label>
    )

}

export default InputLabeled
