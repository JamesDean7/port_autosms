import Button from 'components/atom/Button'
import CheckBox from 'components/atom/CheckBox'
import Label from 'components/atom/Label'
import { TProductDataList, TProductDisplayList } from 'pages/admin/product/Product'
import React from 'react'
import { TEditBarMode, TModalAction } from 'types/types'
import { checkArrayIncludes } from 'utils/utils'


interface IProps {
    table_head:TProductDisplayList,
    tableData:any[],
    mbhide_list?:string[],
    handleModal:(action:TModalAction, modalname:string)=>void,
    handleSetEditBarState:(mode:TEditBarMode)=>void,
    setMemberEditInfo:(memberInfo:any)=>void,
    handleServiceDelete:(memberid:any)=>void
}

const ProductTable:React.FC<IProps> = ({table_head, tableData, mbhide_list, handleModal, handleSetEditBarState, setMemberEditInfo, handleServiceDelete}) => {

    const handleEditMemeber = (memberInfo:any) => {
        handleSetEditBarState('edit');
        setMemberEditInfo(memberInfo);
        handleModal('open', 'modal_inputsidebar')
    }

    const handleDeleteMemeber = (memberid:any) => {
        handleServiceDelete(memberid);
    }
  
    const displayTableHead = () => {
        return (Object.keys(table_head) as Array<keyof typeof table_head>).map(function(key, index) {

            let mbhide = '';
            if(mbhide_list) {
                mbhide = checkArrayIncludes(mbhide_list, key) ? 'listtable__mbhide' : '';
            }

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
        
        return (Object.keys(table_head) as Array<keyof typeof table_head>).map(function(key, index) {

            let mbhide = '';
            if(mbhide_list) {
                mbhide = checkArrayIncludes(mbhide_list, key) ? 'listtable__mbhide' : '';
            }

            if(index === 0) {
                return <td key={`tablecell_${index}`} className={`listtable__cell ${mbhide}`}>
                          <div className="listtable__rowdeco"></div>
                          <Label className="listtable__label">
                            <CheckBox className="listtable__checkbox" />
                          </Label>
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

            return <td key={`tablecell_${index}`} className={`listtable__cell ${mbhide}`}>
                      <span className="listtable__value">{ tablecell[key] }</span>
                   </td>
        })

    }

    const displayTableBody = () => {

        return tableData.map(function(tablecell, index){
            return  <tr key={`tablerow_${index}`} className="listtable__row">
                        { displayTableCells(tablecell) }
                    </tr>
        })
    }

    console.log('table');
    console.log(tableData);

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

export default ProductTable
