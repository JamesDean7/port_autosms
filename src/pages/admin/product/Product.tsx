import { useMutation, useQuery } from '@apollo/client';
import { M_PRODUCT_CREATE, M_PRODUCT_DELETE, M_PRODUCT_UPDATE, Q_PRODUCT_LIST } from 'apollo/query';
import { M_ProductCreate, M_ProductCreateVariables, M_ProductDelete, M_ProductDeleteVariables, M_ProductUpdate, M_ProductUpdateVariables, Q_ProductList, Q_ProductListVariables } from 'apollo/types';
import ErrorGraph from 'components/common/error/ErrorGraph';
import Pageloading from 'components/common/loading/Pageloading';
import { ModalContext } from 'context/ContextList';
import usePagination from 'hooks/usePagination';
import AdminLayout from 'layouts/admin/AdminLayout';
import ProductLayout, { TEditServiceData } from 'pages/admin/product/ProductLayout';
import React, { useContext, useState } from 'react'
import { TPageDesc, TPageInfo, TPagination } from 'types/types';
import { pagiInfoProcess, zeroBasedPaginationValue } from 'utils/utils';

export type TServiceData = {
    id:string,
    name:string,
    price:number
}

export type TProductPageData = {
    product:any,
}

export type TProductDisplayList = {
    checkBox:string,
    name:string,
    price:string | number,
    edit:string,
}

export interface TProductDataList extends Omit<TProductDisplayList, 'checkBox' | 'edit'> {
    id:number
} 


const Product = () => {

    const {modalState, setModalState} = useContext(ModalContext);

    const {pagination, handlePagination} = usePagination();

    const handleCloseModal = () => {
        setModalState({
            name:'',
            active:false,
        })
    }


    /* ::::::::::::: Grpahql Request ::::::::::::: */


    const { loading, error, data } = useQuery<Q_ProductList, Q_ProductListVariables>(
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

    const [mutationServiceCreate, {error:createError, data:createData }] = useMutation<M_ProductCreate, M_ProductCreateVariables>(
        M_PRODUCT_CREATE,
        { 
            variables: { 
              name:"",
              price:0
            },
            refetchQueries: [
                {
                    query:Q_PRODUCT_LIST, 
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
                if(!data.ProductCreate.ok) {
                    console.log(data.ProductCreate.error);
                    alert('?????? ?????? ??? ????????? ?????????????????????');
                    return false;
                }
                handleCloseModal();
                alert('????????? ??????????????? ?????? ???????????????');
            },
            onError(err){
                console.log(err);
                alert('??????????????? ?????????????????????');
                return false;
            }
        }
    );

    const [mutationServiceUpdate, {error:updateError, data:updateData }] = useMutation<M_ProductUpdate, M_ProductUpdateVariables>(
        M_PRODUCT_UPDATE,
        { 
            variables: { 
              id:"",
              name:"",
              price:0
            },
            refetchQueries: [
                {
                    query:Q_PRODUCT_LIST, 
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
                if(!data.ProductUpdate.ok) {
                    console.log(data.ProductUpdate.error);
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

    const [mutationProductDelete, {error:deleteError, data:deleteData }] = useMutation<M_ProductDelete, M_ProductDeleteVariables>(
        M_PRODUCT_DELETE,
        { 
            variables: { 
              id:"",
            },
            refetchQueries: [
                {
                    query:Q_PRODUCT_LIST, 
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
                if(!data.ProductDelete.ok) {
                    console.log(data.ProductDelete.error);
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



    /* ::::::::::::: Functions ::::::::::::: */

    const graphAddService = (memberinfo:TEditServiceData) => {
        mutationServiceCreate({
            variables:{
                name:memberinfo.serviceName,
                price:parseInt(memberinfo.servicePrice)
            }
        })
    }

    const graphUpdateService = (serviceInfo:TEditServiceData) => {

        mutationServiceUpdate({
            variables:{
                id:serviceInfo.id,
                name:serviceInfo.serviceName,
                price:parseInt(serviceInfo.servicePrice)
            }
        })

    }

    const graphDeleteProduct = (memberid:any) => {
        
        mutationProductDelete({
            variables:{
                id:memberid
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

    const pagedata_product = data?.ProductList.items.map(function(product, index){
        return {
            id:product._id,
            name:product.name,
            price:product.price
        }
    })

    const paginationInfo = pagiInfoProcess(pagedata_product?.length, pagination);

    const pageinfo_pagination:TPagination = {
        paginationState:pagination,
        paginationInfo:paginationInfo
    }

    const pageDesc:TPageDesc = {
        title:"?????? ??????",
        subtitle:"????????? ??????, ??????, ??????, ????????? ??? ?????? ????????? ?????????",
    }

    const pageinfo_datalist:TProductDisplayList = {
        checkBox:"",
        name:"??????",
        price:"??????",
        edit:"?????? ??? ??????",
    }

    const pageData:TProductPageData = {
        product:pagedata_product
    }

    const pageInfo:TPageInfo<any, undefined> = {
        datalist:pageinfo_datalist,
        search:undefined,
        pagination:pageinfo_pagination
    }

    return (
        <ProductLayout 
            pageDesc={pageDesc}
            pageData={pageData}
            pageInfo={pageInfo}
            graphAddService={graphAddService}
            graphUpdateService={graphUpdateService}
            graphDeleteProduct={graphDeleteProduct}
            handlePagination={handlePagination}
        />
    )
}

export default Product
