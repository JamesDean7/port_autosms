import React from 'react'

interface IProps {
    htmlFor?:string
    className:string
}

const Label:React.FC<IProps> = ({htmlFor, className, children}) => {
    return (
        <label htmlFor={htmlFor} className={className}> { children } </label>
    )
}

export default Label
