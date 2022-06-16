import React from 'react';
import { Redirect } from 'react-router-dom';
import { token_name } from 'utils/tokenInfo';

const Logout = () => {

  localStorage.setItem(token_name, ``);

  return (
     <Redirect to="/admin/login"></Redirect>
  )
  
};

export default Logout;
