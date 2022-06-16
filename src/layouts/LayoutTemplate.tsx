
import React from 'react'
import { TPageDesc } from 'types/types'

interface IProps {
    page_info:TPageDesc,
    page_displaylist:any,
    page_data:any,
    page_pagination:any,
    handlePagination:(currentPage:number) => void
}

const LayoutTemplate:React.FC<IProps> = ({page_info, page_displaylist, page_data, page_pagination, handlePagination}) => {
    return (
        <>
            <div className="page__head">
                <h1 className="page__title">{page_info.title}</h1>
                <p className="page__intro">{page_info.subtitle}</p>
            </div>
            <div className="page__body content">
                <div className="content__head">
                </div>
            </div>
            <div className="content__body">
                <section className="content__section"></section>
            </div>
            <div className="content__foot flexend">
            </div>
        </>
    )
}

export default LayoutTemplate
