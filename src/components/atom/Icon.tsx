import React, { HTMLAttributes } from 'react'

interface IProps extends HTMLAttributes<HTMLDivElement> {
    parentTag:"div" | "span"
    parentClass:string,
    icon:any
}

const Icon:React.FC<IProps> = ({parentTag, parentClass, icon, children}) => {

    if(parentTag === "div") {
        return (
            <div className={parentClass} dangerouslySetInnerHTML={{__html:icon}}></div>
        )
    }

    return (
        <span className={parentClass} dangerouslySetInnerHTML={{__html:icon}}></span>
    )

}

export default Icon
