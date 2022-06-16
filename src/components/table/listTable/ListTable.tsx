
import React from 'react'
import Button from 'components/atom/Button'
import Input from 'components/atom/Input'
import SearchBar from 'components/search/SearchBar'
import CheckBox from 'components/atom/CheckBox'

interface IProps {
    table_head:any,
    table_data:any
}

const ListTable:React.FC<IProps> = ({table_head, table_data}) => {

    const displayTableHead = () => {
        return Object.keys(table_head).map(function(key:any, index) {
            if(key === "checkBox") {
                return <td key={`tablehead_${index}`} className="listtable__colname checkbox">
                            { table_head[key] } 
                       </td>
            }
            return <td key={`tablehead_${index}`} className="listtable__colname">
                       { table_head[key] } 
                   </td>
        })
    }

    const displayTableCells = (tablecell:any) => {
        
        return Object.keys(table_head).map(function(key, index) {

            if(index === 0) {
                return <td className="listtable__cell">
                          <div className="listtable__rowdeco"></div>
                          <label>
                            <CheckBox id={""} className="listtable__checkbox" value={""} />
                          </label>
                       </td>
            }

            if(key === 'serviceName') {
                return <td key={`tablecell_${index}`} className="listtable__cell">
                         <span className="listtable__tag">{ tablecell[key] }</span>
                       </td>
            }

            if(key === 'smsList') {
                return <td key={`tablecell_${index}`} className="listtable__cell">
                         <span className="listtable__tag">{ tablecell[key] }</span>
                       </td>
            }

            if(key === 'edit') {
                return <td key={`tablecell_${index}`} className="listtable__cell">
                           <Button className="listtable__btn">수정</Button>
                           <Button className="listtable__btn delete">삭제</Button>
                       </td>
            }

            return <td key={`tablecell_${index}`} className="listtable__cell">
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
        <>
            <table className="listtable">
                <thead className="listtable__thead">
                    <tr className="listtable__colwrap">
                        {  displayTableHead() }
                    </tr>
                </thead>
                <tbody className="listtable__tbody">
                    {  displayTableBody() }
                </tbody>
            </table>
        </>
    )
}

export default ListTable
