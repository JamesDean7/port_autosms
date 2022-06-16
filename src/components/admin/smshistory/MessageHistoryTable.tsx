import React from 'react'
import { checkArrayIncludes } from 'utils/utils';

interface IProps {
    table_head:any,
    table_data:any,
    mbhide_list:string[]
}

const MessageHistoryTable:React.FC<IProps> = ({table_head, table_data, mbhide_list}) => {

    const displayTableHead = () => {
        return Object.keys(table_head).map(function(key:any, index) {
            const mbhide = checkArrayIncludes(mbhide_list, key) ? 'listtable__mbhide' : '';
            return <td key={`tablehead_${index}`} className={`listtable__colname ${mbhide}`}>
                       { table_head[key] } 
                   </td>
        })
    }

    const displayTableCells = (tablecell:any) => {
        
        return Object.keys(table_head).map(function(key, index) {
            const mbhide = checkArrayIncludes(mbhide_list, key) ? 'listtable__mbhide' : '';

            if(key === 'serviceName') {
                return <td key={`tablecell_${index}`} className={`listtable__cell ${mbhide}`}>
                         <span className="listtable__tag">{ tablecell[key] }</span>
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

export default MessageHistoryTable
