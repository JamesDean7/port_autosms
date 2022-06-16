import React from 'react'
import { Link } from 'react-router-dom'
import { token_name } from 'utils/tokenInfo';

type TMenuList = {
    name:string,
    link:string,
}

interface IProps {
    title:string
    menuList:TMenuList[]
}

const Sidebar:React.FC<IProps> = ({title, menuList}) => {

    const currentNav = window.location.pathname;
    const handleLogOut = () => {
        const chkConfirm = window.confirm('정말로 로그아웃 하시겠습니까?');
        if(chkConfirm) {
            localStorage.setItem(token_name, ``);
            window.location.replace("/admin/login");
        }
    }

    return (
        <>
            <div className="sidebar pcmenu">
                <div className="sidebar__body">
                    <div className="sidebar__titlewrap">
                        <div className="sidebar__title">{title}</div>
                        <div className="sidebar__title sidebar__logout" >
                            <span onClick={handleLogOut}>로그아웃</span>
                        </div>
                    </div>
                    <ul className="sidebar__linkwrap cus_scroll">
                        {
                            menuList.map(function(menu:any, index:number){
                                return <li key={`sidebar_${index}`}>
                                            <Link to={`${menu.link}`} className={`sidebar__link ${currentNav === menu.link && 'on'}`}>
                                                {menu.name}
                                            </Link>
                                        </li>
                            })
                        }
                    </ul>
                </div>
                <div className="sidebar__foot">
                    <div className="sidebar__footwrap">
                        <p className="sidebar__footitle">예약은 잔다</p>
                        <p className="sidebar__footinfo">
                            세상의 모든 예약 솔루션 잔다
                        </p>
                        <div className="sidebar__footbtnwrap">
                            <a href="https://stayjanda.com/" className="sidebar__footbtn" target="_blank">
                                바로가기
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Sidebar
