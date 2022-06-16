import { useQuery } from '@apollo/client';
import { Q_MESSAGEHISTORY_LIST } from 'apollo/query';
import { Q_MessageHistoryList, Q_MessageHistoryListVariables } from 'apollo/types';
import ErrorGraph from 'components/common/error/ErrorGraph';
import Pageloading from 'components/common/loading/Pageloading';
import usePagination from 'hooks/usePagination';
import AdminLayout from 'layouts/admin/AdminLayout';
import MessageHistoryLayout from 'pages/admin/smsHistory/MessageHistoryLayout';
import React, { useState } from 'react'
import { TPageDesc } from 'types/types';
import { TMappedTypeGenerics } from 'types/typeUtils';
import { pagiInfoProcess, zeroBasedPaginationValue } from 'utils/utils';

export type TSmsHistory = {
    id:string,
    memberName:string,
    serviceName:string,
    sentDate:Date,
    sentMessage:string
}
export type THistoryDataListOmit = Omit<TSmsHistory, 'id'>;
export type THistoryDataList = TMappedTypeGenerics<THistoryDataListOmit>;

export interface ISmsHistoryHistoryPageData {
    smshistory:TSmsHistory[]
}

const SmsHistory = () => {

    const {pagination, handlePagination} = usePagination();


    /* ::::::::::::: Grpahql Request ::::::::::::: */

    const { loading, error, data } = useQuery<Q_MessageHistoryList, Q_MessageHistoryListVariables>(
        Q_MESSAGEHISTORY_LIST,
        { 
            variables: { 
               pagingInput :{
                   pageIndex:zeroBasedPaginationValue(pagination.current),
                   pageItemCount:pagination.dataListNum
               }
            },
            fetchPolicy: 'cache-first'
        }
    );


        
    /* ::::::::::::: Functions ::::::::::::: */

        



    /* ::::::::::::: Loading / Error Check ::::::::::::: */

    if (loading) return <Pageloading text={'page loading ...'} />
    if (error) { 
        return <ErrorGraph 
                    errorMessage={error.message} 
                    errorName={error.name}
                /> 
    }
    



    /* ::::::::::::: Page Data Setting ::::::::::::: */

    const pageDesc:TPageDesc = {
        title:"문자 발송 내역",
        subtitle:"이용자를 추가, 확인, 수정, 삭제할 수 있는 페이지 입니다",
    }

    const pageinfo_datalist:THistoryDataList = {
        memberName:"이름",
        serviceName:"등록 상품",
        sentDate:"보낸날짜",
        sentMessage:"선택 문자",
    }

    const pagedata_smshistory = data!.MessageHistoryList.items.map(function(history, index){
        return {
            id:history._id,
            memberName:history.username,
            serviceName:history.serviceName,
            sentDate:history.sentDate,
            sentMessage:history.sentMessage
        }
    })

    const paginationInfo = pagiInfoProcess(pagedata_smshistory!.length, pagination);


    const page_pagination = {
        paginationState:pagination,
        paginationInfo:paginationInfo
    }

    const pageData:ISmsHistoryHistoryPageData = {
        smshistory:pagedata_smshistory
    }

    const pageInfo = {
        datalist:pageinfo_datalist,
        pagination:page_pagination
    }


    return (
        <MessageHistoryLayout 
            pageData={pageData}
            pageInfo={pageInfo}
            pageDesc={pageDesc}
            handlePagination={handlePagination}
        />
    )
}

export default SmsHistory
