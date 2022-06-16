import Button from 'components/atom/Button'
import CheckBox from 'components/atom/CheckBox'
import Label from 'components/atom/Label'
import { TMemberDataList, TMemberDisplayList } from 'pages/admin/member/Member'
import React from 'react'
import { TEditBarMode, TModalAction } from 'types/types'
import { checkArrayIncludes } from 'utils/utils'


interface IProps {
    table_head:TMemberDisplayList,
    table_data:TMemberDataList[],
    mbhide_list:string[],
    handleModal:(action:TModalAction, modalname:string)=>void,
    handleSetEditBarState:(mode:TEditBarMode)=>void,
    handleMemberSetInfo:(memberInfo:any)=>void,
    handleMemberInfoDelete:(memberid:any)=>void
}

const MemberTable:React.FC<IProps> = ({table_head, table_data, mbhide_list, handleModal, handleSetEditBarState, handleMemberSetInfo, handleMemberInfoDelete}) => {


    const handleEditMemeber = (memberInfo:any) => {
        handleSetEditBarState('edit');
        handleMemberSetInfo(memberInfo);
        handleModal('open', 'modal_inputsidebar')
    }

    const handleDeleteMemeber = (memberid:any) => {
        handleMemberInfoDelete(memberid);
    }
  
    const displayTableHead = () => {
        return (Object.keys(table_head) as Array<keyof typeof table_head>).map(function(key, index) {
            const mbhide = checkArrayIncludes(mbhide_list, key) ? 'listtable__mbhide' : '';
            if(key === "checkBox") {
                return <td key={`tablehead_${index}`} className={`listtable__colname checkbox ${mbhide}`}>
                            { table_head[key] } 
                       </td>
            }
            return <td key={`tablehead_${index}`} className={`listtable__colname ${mbhide}`}>
                       { table_head[key] } 
                   </td>
        })
    }

    const displayTableCells = (tablecell:any) => {
        
        return Object.keys(table_head).map(function(key, index) {
            const mbhide = checkArrayIncludes(mbhide_list, key) ? 'listtable__mbhide' : '';
            if(index === 0) {
                return <td key={`tablecell_${index}`} className={`listtable__cell ${mbhide}`}>
                          <div className="listtable__rowdeco"></div>
                          <Label className="listtable__label">
                            <CheckBox className="listtable__checkbox" value={tablecell.id} />
                          </Label>
                       </td>
            }

            if(key === 'serviceName') {
                return <td key={`tablecell_${index}`} className={`listtable__cell ${mbhide}`}>
                         <span className="listtable__tag">{ tablecell[key] }</span>
                       </td>
            }

            if(key === 'smsList') {
                return <td key={`tablecell_${index}`} className={`listtable__cell ${mbhide}`}>
                         <span className="listtable__tag">{ tablecell[key] }</span>
                       </td>
            }

            if(key === 'edit') {
                return <td key={`tablecell_${index}`} className={`listtable__cell ${mbhide}`}>
                           <Button className="listtable__btn" 
                                   onClick={()=>{handleEditMemeber(tablecell)}}
                           >수정</Button>
                           <Button className="listtable__btn delete"
                                   onClick={()=>{handleDeleteMemeber(tablecell.id)}}
                           >삭제</Button>
                       </td>
            }

            if(key === 'servies') {
                return <td key={`tablecell_${index}`} className={`listtable__cell ${mbhide}`}>
                            {
                                tablecell['products'].map(function(product:any, itemIndex:number){
                                    return  <span key={`itemname-${itemIndex}`} className="listtable__value">{ product['itemName'] }</span>
                                })
                            }
                        </td>
            }

            return <td key={`tablecell_${index}`} className={`listtable__cell ${mbhide}`}>
                      <span className="listtable__value">{ tablecell[key] }</span>
                   </td>
        })

    }

    const displayTableBody = () => {
        return table_data.map(function(tablecell:any, index:any){
            return  <tr key={`tablerow_${index}`} className="listtable__row">
                        { displayTableCells(tablecell) }
                    </tr>
        })
    }

    return (
        <table className="listtable">
            <thead className="listtable__thead">
                <tr className="listtable__colwrap">
                    { displayTableHead() }
                </tr>
            </thead>
            <tbody className="listtable__tbody">
                { displayTableBody() }
            </tbody>
        </table>
    )


}

export default MemberTable
