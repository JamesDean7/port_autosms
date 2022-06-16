import React, { useState } from 'react'
import { TPageDesc } from 'types/types';
import { pagiInfoProcess } from 'utils/utils';

const PAgeTemplate = () => {

    
    const [pagination, setPagination] = useState({
        current:1,
        dataListNum:3,
        blockDisplayNum:5,
    });


    /* ::::::::::::: Grpahql Request ::::::::::::: */



        
    /* ::::::::::::: Functions ::::::::::::: */

    
    const handlePagination = (currentPage:number) => {
        
        setPagination({
            ...pagination,
            current:currentPage
        })
    
    }


    /* ::::::::::::: Page Data Setting ::::::::::::: */

    const page_info:TPageDesc = {
        title:"이용자 관리",
        subtitle:"이용자를 추가, 확인, 수정, 삭제할 수 있는 페이지 입니다",
    }

    const page_displaylist:any = {
        checkBox:"",
        memberName:"이름 1",
        startDate:"등록날짜 / 기준일",
        serviceName:"등록 상품",
        servicePrice:"가격",
        servicePeriod:"등록 기간",
        smsSelected:"선택 문자",
        edit:"수정 및 삭제",
    }

    const page_data:any = [
        {
            id:1,
            memberName:"이름",
            startDate:"등록날짜 / 기준일",
            serviceName:"등록 상품",
            servicePrice:"가격",
            servicePeriod:1,
            smsSelected:"선택 문자",
        },
        {
            id:2,
            memberName:"이름 2",
            startDate:"등록날짜 / 기준일",
            serviceName:"등록 상품",
            servicePrice:"가격",
            servicePeriod:2,
            smsSelected:"선택 문자",
        },
        {
            id:3,
            memberName:"이름 3",
            startDate:"등록날짜 / 기준일",
            serviceName:"등록 상품",
            servicePrice:"가격",
            servicePeriod:1,
            smsSelected:"선택 문자",
        },
        {
            id:4,
            memberName:"이름 4",
            startDate:"등록날짜 / 기준일",
            serviceName:"등록 상품",
            servicePrice:"가격",
            servicePeriod:2,
            smsSelected:"선택 문자",
        },
        {
            id:5,
            memberName:"이름 5",
            startDate:"등록날짜 / 기준일",
            serviceName:"등록 상품",
            servicePrice:"가격",
            servicePeriod:3,
            smsSelected:"선택 문자",
        }
    ];

    const paginationInfo = pagiInfoProcess(page_data.length!, pagination);


    const page_pagination = {
        paginationState:pagination,
        paginationInfo:paginationInfo
    }


    return (
        <>
            
        </>
    )
}

export default PAgeTemplate
