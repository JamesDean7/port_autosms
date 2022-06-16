import { useMutation, useQuery } from '@apollo/client';
import { M_MESSAGE_CREATE, M_MESSAGE_UPDATE, Q_MESSAGEHISTORY_LIST, Q_MESSAGE_LIST } from 'apollo/query';
import { M_MessageCreate, M_MessageCreateVariables, M_MessageDelete, M_MessageDeleteVariables, M_MessageUpdate, M_MessageUpdateVariables, Q_MemberList, Q_Message, Q_MessageHistoryList, Q_MessageHistoryListVariables, Q_MessageVariables } from 'apollo/types';
import ErrorGraph from 'components/common/error/ErrorGraph';
import Pageloading from 'components/common/loading/Pageloading';
import { ModalContext } from 'context/ContextList';
import AdminLayout from 'layouts/admin/AdminLayout';
import MessageLayout, { TEditSmsInfo } from 'pages/admin/sms/MessageLayout';
import React, { useContext, useState } from 'react'
import { TPageDesc, TPageInfo } from 'types/types';
import { pagiInfoProcess, zeroBasedPaginationValue } from 'utils/utils';

export type TMessage = {
    id:any,
    isUsed:boolean,
    title:string,
    description:string,
    content:string,
    sendBefore:number,
}

export type TPageDataMessage = {
    sms:TMessage
}


const Message = () => {

    const {modalState, setModalState} = useContext(ModalContext);

    const [pagination, setPagination] = useState({
        current:1,
        dataListNum:3,
        blockDisplayNum:5,
    });

    const handleCloseModal = () => {
        setModalState({
            name:'',
            active:false,
        })
    }

    /* ::::::::::::: Grpahql Request ::::::::::::: */

    const { loading, error, data } = useQuery<Q_Message,Q_MessageVariables>(
        Q_MESSAGE_LIST,
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


    const [mutationSmsCreate, {error:createError, data:createData }] = useMutation<M_MessageCreate, M_MessageCreateVariables>(
        M_MESSAGE_CREATE,
        { 
            variables: { 
                smsTitle:'',
                smsDesc:"",
                smsContent:"",
                isUsed:true,
                sendBefore:1,
            },
            onCompleted(data) {
                if(!data.MessageCreate.ok) {
                    console.log(data.MessageCreate.error);
                    alert('SMS 생성 중 오류가 발생하였습니다');
                    return false;
                }
                console.log(data.MessageCreate.data);
            },
            onError(err){
                console.log(err);
                alert('SMS 생성에 실패하였습니다');
                return false;
            }
        }
    );

    const [mutationMessageUpdate, {error:updateError, data:updateData }] = useMutation<M_MessageUpdate, M_MessageUpdateVariables>(
        M_MESSAGE_UPDATE,
        { 
            variables: { 
                id:"",
                isUsed:true,
                sendBefore:1,
                smsTitle:"",
                smsDesc:"",
                smsContent:""
            },
            onCompleted(data) {
                if(!data.MessageUpdate.ok) {
                    console.log(data.MessageUpdate.error);
                    alert('SMS 수정 중 오류가 발생하였습니다');
                    return false;
                }
                handleCloseModal();
                alert('SMS 수정이 완료되었습니다');
            },
            onError(err){
                console.log(err);
                alert('SMS 수정에 실패하였습니다');
                return false;
            }
        }
    );

    
    const [mutationMessageDelete, {error:deleteError, data:deleteData }] = useMutation<M_MessageDelete, M_MessageDeleteVariables>(
        M_MESSAGE_CREATE,
        { 
            variables: { 
                id:"",
            },
            onCompleted(data) {

            },
            onError(err){
                return false;
            }
        }
    );


    /* ::::::::::::: Default ::::::::::::: */

    const smsDefault = [
        {
            id:1,
            isUsed:true,
            title:"하루전 메시지 내용",
            description:"하루 전 보낼 메시지를 작성합니다",
            content:"하루 전 보내지는 메시지 내용입니다",
            sendBefore:1,
        },
        {
            id:2,
            isUsed:false,
            title:"이틀전 메시지 내용",
            description:"이틀 전 보낼 메시지를 작성합니다",
            content:"이틀 전 보내지는 메시지 내용입니다",
            sendBefore:2,
        },
        {
            id:3,
            isUsed:true,
            title:"삼일전 메시지 내용",
            description:"삼일 전 보낼 메시지를 작성합니다",
            content:"삼일 전 보내지는 메시지 내용입니다",
            sendBefore:3,
        },
    ];


    /* ::::::::::::: Functions ::::::::::::: */

    const updateGraphSmsState = (memberid:any, memberinfo:any) => {
        
    }

    const graphCreateInitialSms = () => {

        smsDefault.forEach(function(sms, index){
            mutationSmsCreate({
                variables:{
                    smsTitle:sms.title,
                    smsDesc:sms.description,
                    smsContent:sms.content,
                    isUsed:sms.isUsed,
                    sendBefore:sms.sendBefore,
                }
            })
        })

    }

    const graphUpdateSmsContent = (smsInfo:TEditSmsInfo) => {

        console.log('update request');
        console.log(smsInfo);

        mutationMessageUpdate({
            variables:{
                id:smsInfo.id,
                isUsed:smsInfo.isUsed,
                sendBefore:smsInfo.sendBefore,
                smsTitle:smsInfo.smsTitle,
                smsDesc:smsInfo.smsDesc,
                smsContent:smsInfo.smsContent
            }
        })

    }


    /* ::::::::::::: Loading / Error Check ::::::::::::: */

    if (loading) return <Pageloading text={'page loading ...'} />
    if (error) { 
        return <ErrorGraph 
                 errorMessage={error.message} 
                 errorName={error.name}
               /> 
    }



    /* ::::::::::::: Page Data Setting ::::::::::::: */

    const pagedata_sms = data?.Message.items.map(function(sms, index){
        return {
            id:sms._id,
            isUsed:sms.isUsed,
            title:sms.smsTitle,
            desc:sms.smsDesc,
            content:sms.smsContent,
            sendBefore:sms.sendBefore
        }
    })

    const pageDesc:TPageDesc = {
        title:"이용자 관리",
        subtitle:"이용자를 추가, 확인, 수정, 삭제할 수 있는 페이지 입니다",
    }

    const paginationInfo = pagiInfoProcess(pagedata_sms!.length, pagination);

    const pageinfo_pagination = {
        paginationState:pagination,
        paginationInfo:paginationInfo
    }

    console.log('sms data');
    console.log(data);
    
    const pageData = {
        sms:pagedata_sms
    }

    const pageInfo:TPageInfo<any, undefined> = {
        datalist:undefined,
        search:undefined,
        pagination:pageinfo_pagination
    }

    return (
        <MessageLayout 
            pageData={pageData}
            pageInfo={pageInfo}
            pageDesc={pageDesc}
            updateGraphSmsState={updateGraphSmsState}
            graphCreateInitialSms={graphCreateInitialSms}
            graphUpdateSmsContent={graphUpdateSmsContent}
        />
    )
}

export default Message
