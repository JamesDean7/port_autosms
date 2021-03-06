import { useMutation, useQuery } from '@apollo/client';
import { M_PAYMENTMEMO_CREATE, M_PAYMENTMEMO_UPDATE, Q_PAYMENTMEMO_LIST } from 'apollo/query';
import { M_PaymentMemoCreate, M_PaymentMemoCreateVariables, M_PaymentMemoUpdate, M_PaymentMemoUpdateVariables, Q_PaymentMemoList, Q_PaymentMemoListVariables } from 'apollo/types';
import ErrorGraph from 'components/common/error/ErrorGraph';
import Pageloading from 'components/common/loading/Pageloading';
import { ModalContext } from 'context/ContextList';
import AdminLayout from 'layouts/admin/AdminLayout';
import PaymentMemoLayout from 'pages/admin/paymentMemo/PaymentMemoLayout';
import React, { useContext, useState } from 'react'
import { TPageDesc } from 'types/types';
import { pagiInfoProcess, zeroBasedPaginationValue } from 'utils/utils';

export type TPaymentMemo = {
    id:any,
    isUsed:boolean,
    memoTitle:string,
    memoDesc:string,
    memo:string,
}
export type TPaymentMemoDataList = Omit<TPaymentMemo, 'isUsed'>

const PaymentMemo = () => {

    const [pagination, setPagination] = useState({
        current:0,
        dataListNum:3,
        blockDisplayNum:5,
    });

    const {modalState, setModalState} = useContext(ModalContext);

    const handleCloseModal = () => {
        setModalState({
            name:'',
            active:false,
        })
    }

    /* ::::::::::::: Grpahql Request ::::::::::::: */

    const { loading, error, data } = useQuery<Q_PaymentMemoList, Q_PaymentMemoListVariables>(
        Q_PAYMENTMEMO_LIST,
        { 
            variables: { 
                pagingInput:{
                    pageIndex:zeroBasedPaginationValue(pagination.current),
                    pageItemCount:pagination.dataListNum
                }
            },
            fetchPolicy: 'cache-and-network'
        }
    );

    const [mutationMemoCreate, {error:createError, data:createData }] = useMutation<M_PaymentMemoCreate, M_PaymentMemoCreateVariables>(
        M_PAYMENTMEMO_CREATE,
        { 
            variables: { 
              memoTitle:"",
              memoDesc:"",
              memo:""
            },
            refetchQueries: [
                {
                    query:Q_PAYMENTMEMO_LIST, 
                    variables: { 
                        pagingInput :{
                            pageIndex:zeroBasedPaginationValue(pagination.current),
                            pageItemCount:pagination.dataListNum
                        }
                    },
                }
                
            ],
            onCompleted(data) {
                if(!data.PaymentMemoCreate.ok) {
                    console.log(data.PaymentMemoCreate.error);
                    alert('?????? ?????? ??? ????????? ?????????????????????');
                    return false;
                }
                alert('????????? ??????????????? ?????? ???????????????');
            },
            onError(err){
                console.log(err);
                alert('??????????????? ?????????????????????');
                return false;
            }
        }
    );


    const [mutationMemoUpdate, {error:updateError, data:updateData }] = useMutation<M_PaymentMemoUpdate, M_PaymentMemoUpdateVariables>(
        M_PAYMENTMEMO_UPDATE,
        { 
            variables: { 
              id:"",
              isUsed:false,
              memo:"",
              memoTitle:"",
              memoDesc:"",
            },
            refetchQueries: [
                {
                    query:Q_PAYMENTMEMO_LIST, 
                    variables: { 
                        pagingInput :{
                            pageIndex:zeroBasedPaginationValue(pagination.current),
                            pageItemCount:pagination.dataListNum
                        }
                    },
                }
                
            ],
            onCompleted(data) {
                if(!data.PaymentMemoUpdate.ok) {
                    console.log(data.PaymentMemoUpdate.error);
                    alert('?????? ???????????? ??? ????????? ?????????????????????');
                    return false;
                }
                handleCloseModal();
                alert('????????? ??????????????? ???????????? ???????????????');
            },
            onError(err){
                console.log(err);
                alert('??????????????? ?????????????????????');
                return false;
            }
        }
    );

        
    /* ::::::::::::: Functions ::::::::::::: */
    
    const graphCreateInitialSms = () => {
        mutationMemoCreate({
            variables:{
                memoTitle:"?????? ?????? ??????",
                memoDesc:"?????? ?????? ????????? ????????? ??? ????????????",
                memo:"?????? ?????? ????????? ??????",
                
            }
        })
    }


    const updateGraphPaymentMemo = (memoInfo:any) => {

        mutationMemoUpdate({
            variables:{
                id:memoInfo.id,
                isUsed:true,
                memoTitle:memoInfo.memoTitle,
                memoDesc:memoInfo.memoDesc,
                memo:memoInfo.memo
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

    const pagedata_paymentmemo = data?.PaymentMemoList.items.map(function(memo, index){
        return {
            id:memo._id,
            isUsed:memo.isUsed,
            memo:memo.memo,
            memoTitle:memo.memoTitle,
            memoDesc:memo.memoDesc
        }
    });

    const pageDesc:TPageDesc = {
        title:"?????? ?????? ??????",
        subtitle:"?????? ?????? ????????? ????????? ??? ????????????",
    }

    const pageData = {
        paymentmemo:pagedata_paymentmemo
    }

    return (
        <PaymentMemoLayout
            pageData={pageData}
            pageDesc={pageDesc}
            graphCreateInitialSms={graphCreateInitialSms}
            updateGraphPaymentMemo={updateGraphPaymentMemo}
        />
    )
}

export default PaymentMemo
