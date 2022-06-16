import React, {HTMLAttributes} from 'react'

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
}

const Button:React.FC<IButtonProps> = ({className, children, ...props}) => {

    const buttonClass = (className:string | undefined) => {
        if(!className) {
            return '';
        }
        if(className) {
            return className
        }
    }

    return (
         <button className={`btn ${buttonClass(className)}`} {...props}> 
            {children}
         </button>

    )
}

export default Button
