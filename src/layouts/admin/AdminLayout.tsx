import Sidebar from 'components/sidebar/Sidebar'
import { ModalContext } from 'context/ContextList';
import React, { useState } from 'react'
import 'styles/admin/admin.scss'

interface IProps {
   children:React.ReactNode | React.ReactNode[]
}

const AdminLayout:React.FC<IProps> = ({children}) => {
    
    const [commonValue, setCommonValue] = useState<any>({
        role:'',
        isLogged:false
    });

    const [modalState, setModalState] = useState({
        modal:'',
        active:false
    });

    const menuList = [
        {name:"멤버관리", link:"/admin/member"},
        {name:"상품관리", link:"/admin/product"},
        {name:"문자설정", link:"/admin/sms"},
        {name:"문자발송내역", link:"/admin/paymentmemo"},
        {name:"안내메모설정", link:"/admin/smshistory"}
    ]
    return (
        <ModalContext.Provider value={{modalState, setModalState}}>
            <div id="admin" className="page">
                <div className={`bgfilter ${modalState.active && 'on'}`}></div>
                <Sidebar 
                    title={"관리자"}
                    menuList={menuList}
                />
                <div className="page__container">
                    {
                        children
                    }
                </div>
            </div>
        </ModalContext.Provider>
    )
}

export default AdminLayout
