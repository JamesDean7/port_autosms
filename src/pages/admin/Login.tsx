import { useMutation } from '@apollo/client';
import { M_LOGIN } from 'apollo/query';
import { M_Login, M_LoginVariables } from 'apollo/types';
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { token_name } from 'utils/tokenInfo';
import LoginForm from '../../components/login/LoginForm'

const Login = () => {

    const [loginState, setLoginState] = useState(false);

    const [mutationLogin, {error:loginError, data:loginData }] = useMutation<M_Login, M_LoginVariables>(
        M_LOGIN,
        { 
            variables: { 
              email:"",
              password:""
            },
            onCompleted(data) {
                if(!data.Login.ok) {
                    alert('로그인중 오류가 발생하였습니다');
                    console.log(data.Login.error); 
                    return false;
                }
                localStorage.setItem(token_name, `${data.Login.data?.token}`);
                setLoginState(true);
            },
            onError(err){
                console.log(err);
                alert('로그인에 실패하였습니다');
                return false;
            }
        }
    );


    const graphHandleLogin = (loginInfo:any) => {

        mutationLogin({
            variables:{
                email:loginInfo.email,
                password:loginInfo.password
            }
        })
    }

    return (
        <>
            {
                loginState &&
                    <Redirect to="/admin/member"></Redirect>
            }
            {
                !loginState &&
                    <LoginForm 
                        graphHandleLogin={graphHandleLogin}
                    />
            }
        </>
    )

 
}

export default Login
