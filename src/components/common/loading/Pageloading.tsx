import React from 'react'

interface IProps {
    text:string
}

const Pageloading:React.FC<IProps> = ({text}) => {
    return (
        <div>
            {text}
        </div>
    )
}

export default Pageloading
