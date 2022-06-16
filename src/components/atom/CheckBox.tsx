import React, { HTMLAttributes } from 'react'

interface IProps extends HTMLAttributes<HTMLInputElement> {
    id?:string,
    name?:string,
    className:string,
    defaultChecked?:boolean,
    value?:any,
}

const CheckBox:React.FC<IProps> = ({id, name, className, value, defaultChecked, placeholder, ...props}) => {
    return (
        <input type="checkbox" name={name} id={id} className={className} value={value} defaultChecked={defaultChecked} {...props} />
    )
}

export default CheckBox
