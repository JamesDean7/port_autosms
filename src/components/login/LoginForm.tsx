import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
    graphHandleLogin:(loginInfo:any)=>void
}

const LoginForm:React.FC<IProps> = ({graphHandleLogin}) => {

   const [loginInfo, setLoginInfo] = useState({
       email:"",
       password:""
   });
   
   const handleLogin = () => {
        graphHandleLogin(loginInfo)
   }

   const handleEnterTrigger = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            handleLogin();
        }
   }

   const handleLoginInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]:e.target.value
        })
   }

    return (
        <div className="login login--fullheight">
            <div className="login__container">

                <div className="login__introblock">
                    <h1 className="login__intro">잔다 알람이</h1>
                    <div className="login__desc">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1
                    </div>
                    {/* <Link to="/member" className="login__btn transparent">
                        회원가입
                    </Link> */}
                    <div className="login__deco1"></div>
                </div>

                <div className="login__inputblock">
                    <div className="login__titlewrap">
                        <h2 className="login__title">Login</h2>
                        <div className="login__titledeco"></div>
                    </div>
                
                    <div className="login__inputwrap">
                        <label htmlFor="login_email" className="login__inputlabel"></label>
                        <input type="text" id="login_email" name="email" className="login__input" placeholder="로그인" autoComplete="off" 
                        onChange={handleLoginInfo} onKeyDown={handleEnterTrigger} />
                    </div>

                    <div className="login__inputwrap">
                        <label htmlFor="login_pw" className="login__inputlabel"></label>
                        <input type="text" id="login_pw" name="password" className="login__input" placeholder="비밀번호" autoComplete="off" 
                        onChange={handleLoginInfo} onKeyDown={handleEnterTrigger} />
                    </div>
                
                    <div className="login__btnwrap">
                        <button className="login__btn" onClick={handleLogin}>
                            로그인
                        </button>
                    </div>

                    <div className="login__deco2"></div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default LoginForm
