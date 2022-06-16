
import MessageHistoryTable from 'components/admin/smshistory/MessageHistoryTable'
import DataNotFound from 'components/common/notice/DataNotFound';
import Pagination from 'components/common/pagination/Pagination';
import PageContent from 'components/layout/PageContent';
import PageContentBody from 'components/layout/PageContentBody';
import PageContentFoot from 'components/layout/PageContentFoot';
import PageContentHead from 'components/layout/PageContentHead';
import PageContentTableWrap from 'components/layout/PageContentTableWrap';
import PageHead from 'components/layout/PageHead';
import { ISmsHistoryHistoryPageData, THistoryDataList, TSmsHistory } from 'pages/admin/smsHistory/MessageHistory';
import React from 'react'
import { TPageDesc } from 'types/types'

interface IProps {
    pageData:ISmsHistoryHistoryPageData,
    pageInfo:any,
    pageDesc:TPageDesc,
    handlePagination:(currentPage:number) => void
}

const MessageLayout:React.FC<IProps> = ({pageData, pageInfo,  pageDesc, handlePagination}) => {

    const table_mb_hide = ['smsList'];

    const displayDataLength = pageData.smshistory.length;

    return (
        <>
            <PageHead 
                title={pageDesc.title}
                subtitle={pageDesc.subtitle}
            />
            <PageContent>
                <PageContentHead>
                </PageContentHead>
                {
                    displayDataLength > 0 &&
                    <>
                        <PageContentBody>
                            <PageContentTableWrap>
                                <MessageHistoryTable
                                    table_head={pageInfo.datalist}
                                    table_data={pageData.smshistory}
                                    mbhide_list={table_mb_hide}
                                />
                            </PageContentTableWrap>

                        </PageContentBody>
                        <PageContentFoot
                            className='flexend'
                        >
                            <Pagination 
                                pagePagination={pageInfo.pagination}
                                handlePagination={handlePagination}
                            />
                        </PageContentFoot>
                    </>
                }
                {
                    displayDataLength === 0 &&
                    <PageContentBody>
                        <DataNotFound text='데이터가 존재 하지 않습니다'></DataNotFound>
                    </PageContentBody>
                }
            </PageContent>
            
        </>
    )
}

export default MessageLayout
