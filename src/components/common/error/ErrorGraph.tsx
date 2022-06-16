import React from 'react'
import { Redirect } from 'react-router-dom'

interface IProps {
    errorMessage:string,
    errorName:string
}

const ErrorGraph:React.FC<IProps> = ({errorMessage, errorName}) => {

    if(errorMessage == "로그인 해주십시요") {
        return <Redirect to="/admin/login"></Redirect>
    }

    return (
        <div className="error">
            <div className="error__container">
                {errorMessage}
            </div>
        </div>
    )
}

export default ErrorGraph
