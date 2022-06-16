import React, { Suspense } from 'react';
import logo from './logo.svg';
import { Route, Switch } from 'react-router';
import Login from './pages/admin/Login';
import Pageloading from 'components/common/loading/Pageloading';
import AdminLayout from 'layouts/admin/AdminLayout';

const MAIN = React.lazy(()=>import('pages/admin/Main'))
const ADMIN_LOGIN = React.lazy(()=>import('pages/admin/Login'))
const ADMIN_MEMBER = React.lazy(()=>import('pages/admin/member/Member'))
const ADMIN_PRODUCT = React.lazy(()=>import('pages/admin/product/Product'))
const ADMIN_MESSAGE = React.lazy(()=>import('pages/admin/sms/Message'))
const ADMIN_PAYMENTMEMO = React.lazy(()=>import('pages/admin/paymentMemo/PaymentMemo'))
const ADMIN_MESSAGEHISTORY = React.lazy(()=>import('pages/admin/smsHistory/MessageHistory'))
const NOTFOUND = React.lazy(()=>import('pages/NotFound'))


function App() {

  return (
    <Suspense fallback={<Pageloading text="Page Loading ..." />} >
      <Switch>
        <Route path="/" exact render={ ()=> { return <MAIN /> }} />
        <Route path="/admin/login" exact 
               render={ ()=> { return <ADMIN_LOGIN /> }} />
        <Route path="/admin/member" exact 
               render={ ()=> { return <AdminLayout><ADMIN_MEMBER /></AdminLayout> }} />
        <Route path="/admin/product" exact 
               render={ ()=> { return <AdminLayout><ADMIN_PRODUCT /></AdminLayout> }} />
        <Route path="/admin/sms" exact 
               render={ ()=> { return <AdminLayout><ADMIN_MESSAGE /></AdminLayout> }} />
        <Route path="/admin/paymentmemo" exact 
               render={ ()=> { return <AdminLayout><ADMIN_MESSAGEHISTORY /></AdminLayout> }} />
        <Route path="/admin/smshistory" exact 
               render={ ()=> { return <AdminLayout><ADMIN_PAYMENTMEMO /></AdminLayout> }} />
        <Route path="*" exact 
               render={ ()=> { return <NOTFOUND /> }} />
      </Switch>
    </Suspense>
  );

}

export default App;
