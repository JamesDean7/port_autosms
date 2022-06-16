import React from 'react'
import { paginationHandler } from 'utils/utils';

export type TPaginationMove = "next" | "last" | "prev" | "first";

interface IProps {
    pagePagination:any,
    handlePagination:(currentnum:number) => void
}

const Pagination:React.FC<IProps> = ({pagePagination, handlePagination}) => {

    const { paginationState, paginationInfo } = pagePagination;

    const handlePageCurrent = (current:number) => {
        handlePagination(current);
    }

    const handlePageMove = (move:string) => {
        const pagiMove = paginationHandler(move, paginationInfo, paginationState);
        handlePagination(pagiMove);
    }

    const displayPagination = () => {

        let navArr = [];

        for(let i = paginationInfo.firstPage; i <= paginationInfo.endPage; i++) {
            navArr.push(<button key={`page_${i}`} 
                                className={`pagination__btn ${paginationInfo.current === i && 'on'} ${i === paginationInfo.endPage && 'lastbtn'}`}
                                onClick={() => {handlePageCurrent(i)}}>
                                { i }
                        </button>)
        }

        return navArr;

    }

    return (
        <div className="pagination">
            {
                paginationInfo.firstPage !== 1 && 
                <>
                    <div className="pagination__first">
                        <button className="movebtn movebtn--left" 
                                onClick={() => { handlePageMove('first')}}>
                                처음으로
                        </button>
                    </div>
                    <div className="pagination__prev">
                        <button className="movebtn  movebtn--left" 
                                onClick={() => { handlePageMove('prev')}}>
                                이전
                        </button>
                    </div>
                </>
            }
            
            <div className="pagination__tabwrap">
                {
                    displayPagination()
                }
            </div>

            {
                paginationInfo.endPage != paginationInfo.pageTotalNum && 
                <>
                    <div className="pagination__next">
                        <button className="movebtn  movebtn--right"
                                onClick={() => { handlePageMove('next')}}>
                                다음
                        </button>
                    </div>
                    <div className="pagination__last">
                        <button className="movebtn  movebtn--right" 
                                onClick={() => { handlePageMove('last')}}>
                                끝으로
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export default Pagination
