import AdminLayout from 'layouts/admin/AdminLayout'
import MemberLayout, { TEditMember, TEditService } from 'pages/admin/member/MemberLayout'
import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { TPageSearchOption, TPageDesc, TPagination, TPageInfo } from 'types/types'
import { pagiInfoProcess, zeroBasedPaginationValue } from 'utils/utils'
import { M_MEMBER_CREATE, M_MEMBER_DELETE, M_MEMBER_UPDATE, Q_MEMBER_LIST, Q_MESSAGE_LIST, Q_PRODUCT_LIST } from 'apollo/query';
import { M_MemberCreate, M_MemberCreateVariables, M_MemberDelete, M_MemberDeleteVariables, M_MemberUpdate, M_MemberUpdateVariables, Q_MemberList, Q_MemberListVariables, Q_MemberList_MemberList_items_myServices, Q_Message, Q_MessageVariables, Q_ProductList, Q_ProductListVariables, _MemberSort } from 'apollo/types';
import Pageloading from 'components/common/loading/Pageloading';
import ErrorGraph from 'components/common/error/ErrorGraph';
import { ModalContext } from 'context/ContextList';
import { graphMutationFailed, updateFailed, updateSuccess } from 'utils/alerts';
import usePageSearch from 'hooks/usePageSearch';
import usePagination from 'hooks/usePagination';

export type TPageDataOption = {
    messageList:any[] | undefined,
    productList:any[] | undefined
}

export type TMemberDisplayList = {
    checkBox:string,
    memberName:string | null,
    products:string,
    edit:string,
}

export type TMyServices = Omit<Q_MemberList_MemberList_items_myServices, '__typename'>

export interface TMemberDataList extends Pick<TMemberDisplayList, 'memberName'> {
    id:string,
    services:TMyServices[] | null,
    phone:string | null,
    address:string | null,
    extraMemo:string | null
} 

export interface TMemberPageData {
    member:any
}

const Member = () => {

    const {pageSearch, handlePageSearch} = usePageSearch();

    const {pagination, handlePagination} = usePagination();

    const {modalState, setModalState} = useContext(ModalContext);

    const closeModal = () => {
        console.log('close modal !!!');
        setModalState({
            name:'',
            active:false,
        })
    }

    /* ::::::::::::: Grpahql Request ::::::::::::: */

    const { loading:productLoading, error:productError, data:productData } = useQuery<Q_ProductList, Q_ProductListVariables>(
        Q_PRODUCT_LIST,
        { 
            variables: { 
                filter:{
                    isDeleted__eq:"false"
                },
               pagingInput :{
                   pageIndex:zeroBasedPaginationValue(pagination.current),
                   pageItemCount:pagination.dataListNum
               }
            },
            fetchPolicy: 'cache-and-network'
        }
    );

    const { loading:loadingMessage, error:errorMessage, data:dataMessage } = useQuery<Q_Message,Q_MessageVariables>(
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


    const { loading, error, data } = useQuery<Q_MemberList,Q_MemberListVariables>(
        Q_MEMBER_LIST,
        { 
            variables: { 
                sort:[_MemberSort.createdAt__desc],
                filter:{
                    name__contains:pageSearch.name,
                    isDeleted__eq:"false"
                },
               pagingInput :{
                   pageIndex:zeroBasedPaginationValue(pagination.current),
                   pageItemCount:pagination.dataListNum
               }
            },
            fetchPolicy: 'cache-and-network'
        }
    );


    const [mutationMemberCreate, {error:createError, data:createData }] = useMutation<M_MemberCreate, M_MemberCreateVariables>(
        M_MEMBER_CREATE,
        { 
            variables: { 
              name:"",
              extraMemo:"",
              myServices:[],
              phone:"",
              address:""
            },
            refetchQueries: [
                {
                    query:Q_MEMBER_LIST, 
                    variables: { 
                        filter:{
                            isDeleted__eq:"false"
                        },
                        pagingInput :{
                            pageIndex:zeroBasedPaginationValue(pagination.current),
                            pageItemCount:pagination.dataListNum
                        }
                    },
                }
                
            ],
            onCompleted(data) {
                console.log('befoer add');
                console.log(modalState);
                alert('멤버가 정상적으로 추가 되었습니다');
                closeModal();
            },
            onError(err){
                console.log(err);
            }
        }
    );


    const [mutationMemberUpdate, {error:updateError, data:updateData }] = useMutation<M_MemberUpdate, M_MemberUpdateVariables>(
        M_MEMBER_UPDATE,
        { 
            variables: { 
              id:"",
              name:"",
              extraMemo:"",
              myServices:[],
              phone:"",
              address:""
            },
            refetchQueries: [
                {
                    query:Q_MEMBER_LIST, 
                    variables: { 
                        filter:{
                            isDeleted__eq:"false"
                        },
                        pagingInput :{
                            pageIndex:zeroBasedPaginationValue(pagination.current),
                            pageItemCount:pagination.dataListNum
                        }
                    },
                }
                
            ],
            onCompleted(data) {
                console.log('update completed');
                if(data.MemberUpdate.ok === true) {
                    updateSuccess();
                    closeModal();
                }
                if(data.MemberUpdate.ok === false) {
                    updateFailed(data.MemberUpdate.error);
                }

            },
            onError(err){
                console.log(err);
                graphMutationFailed(err, 'mutationMemberUpdate');
                return false;
            }
        }
    );

    
    const [mutationDeleteMamber, {error:deleteError, data:deleteData }] = useMutation<M_MemberDelete, M_MemberDeleteVariables>(
        M_MEMBER_DELETE,
        { 
            variables: { 
              id:""
            },
            refetchQueries: [
                {
                    query:Q_MEMBER_LIST, 
                    variables: { 
                        filter:{
                            isDeleted__eq:"false"
                        },
                        pagingInput :{
                            pageIndex:zeroBasedPaginationValue(pagination.current),
                            pageItemCount:pagination.dataListNum
                        }
                    },
                }
                
            ],
            onCompleted(data) {
                alert('멤버가 정상적으로 삭제 되었습니다');
                closeModal();
            },
            onError(err){
                console.log(err);
            }
        }
    );



    /* ::::::::::::: Functions ::::::::::::: */

    const graphAddmember = (memberinfo:TEditMember) => {
        mutationMemberCreate({
            variables: { 
                name:memberinfo.memberName!,
                extraMemo:memberinfo.extraMemo!,
                myServices:[...memberinfo.services],
                phone:memberinfo.phone!,
                address:memberinfo.address!
              },
        })
    }

    const graphUpdateMember = (memberinfo:TEditMember) => {

        let updateServices = memberinfo.services.map(function(service:TEditService, index:any){
            return {
                itemId:service.itemId,
                itemName:service.itemName,
                itemPeriods:service.itemPeriods,
                itemPrice:service.itemPrice,
                startDate:service.startDate,
                endDate:service.endDate,
                lastSmsSent: service.lastSmsSent,
                nextSmsSend: service.nextSmsSend,
            }
        })

        mutationMemberUpdate({
            variables:{
                id:memberinfo.id,
                name:memberinfo.memberName!,
                myServices:[...updateServices],
                phone:memberinfo.phone,
                extraMemo:memberinfo.extraMemo,
                address:memberinfo.address
            }
        })

    }

    const graphDeleteMember = (memberid:any) => {
        mutationDeleteMamber({variables:{id:memberid}})
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

    const padeDesc:TPageDesc = {
        title:"이용자 관리",
        subtitle:"이용자를 추가, 확인, 수정, 삭제할 수 있는 페이지 입니다",
    }

    const pageinfo_datalist:TMemberDisplayList = {
        checkBox:"",
        memberName:"이름",
        products:"등록 상품",
        edit:"수정 및 삭제",
    }

    const pagedata_member = data!.MemberList.items.map(function(member, index){
        return {
            id:member._id,
            memberName:member.name,
            phone:member.phone,
            address:member.address,
            services:member.myServices,
            extraMemo:member.extraMemo
        }
    });


    const pageDataOption:TPageDataOption = {
        messageList:dataMessage?.Message.items,
        productList:productData?.ProductList.items
    }

    const paginationInfo = pagiInfoProcess(pagedata_member.length!, pagination);

    const page_pagination:TPagination = {
        paginationState:pagination,
        paginationInfo:paginationInfo
    }

    const pageData:TMemberPageData = {
        member:pagedata_member
    }

    const pageInfo:TPageInfo<any, undefined> = {
        datalist:pageinfo_datalist,
        search:undefined,
        pagination:page_pagination
    }

    return (

        <MemberLayout 
            pageData={pageData}
            pageInfo={pageInfo}
            pageDesc={padeDesc}
            pageDataOption={pageDataOption}
            graphAddmember={graphAddmember}
            graphUpdateMember={graphUpdateMember}
            graphDeleteMember={graphDeleteMember}
            handlePageSearch={handlePageSearch}
            handlePagination={handlePagination}
        />

    )
}

export default Member
