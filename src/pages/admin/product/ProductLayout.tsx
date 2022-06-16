import { svg_person } from 'assets/svg'
import ProductEditor from 'components/admin/product/ProductEditor'
import ProductTable from 'components/admin/product/ProductTable'
import Button from 'components/atom/Button'
import DataNotFound from 'components/common/notice/DataNotFound'
import Pagination from 'components/common/pagination/Pagination'
import PageContent from 'components/layout/PageContent'
import PageContentBody from 'components/layout/PageContentBody'
import PageContentFoot from 'components/layout/PageContentFoot'
import PageContentHead from 'components/layout/PageContentHead'
import PageContentHeadBlock from 'components/layout/PageContentHeadBlock'
import PageContentSection from 'components/layout/PageContentSection'
import PageContentTableWrap from 'components/layout/PageContentTableWrap'
import PageHead from 'components/layout/PageHead'
import { ModalContext } from 'context/ContextList'
import { TServiceData, TProductDataList, TProductDisplayList, TProductPageData } from 'pages/admin/product/Product'
import React, { useContext, useState } from 'react'
import { TEditBarMode, TEditBarState, TModalAction, TPageDesc, TPageInfo, TPagination } from 'types/types'

export type TEditServiceData = {
    id:string,
    serviceName:string,
    servicePrice:any,
}

interface IProps {
    pageData:TProductPageData,
    pageDesc:TPageDesc,
    pageInfo:TPageInfo<any, undefined>,
    graphAddService:(memberinfo:any)=>void
    graphUpdateService:(serviceInfo:any)=>void
    graphDeleteProduct:(memberid:any)=>void
    handlePagination:(currentPage:number) => void
}

const ProductLayout:React.FC<IProps> = ({pageData, pageDesc, pageInfo, graphAddService, graphUpdateService, graphDeleteProduct, handlePagination}) => {

    const [serviceInfo, setServiceInfo] = useState<TEditServiceData>({
        id:"",
        serviceName:"",
        servicePrice:0,
    });

    const [editBarState, SetEditBarState] = useState<TEditBarState>({
        mode:"add",
        title:"상품추가",
        subtitle:"상품을 추가할 수 있습니다"
    })

    const {modalState, setModalState} = useContext(ModalContext);

    const handleModal = (action:TModalAction, modalname:string) => {

        if(action === 'open') {
            setModalState({
                name:modalname,
                active:true,
            })
        }
        if(action === 'close') {
            setModalState({
                name:'',
                active:false,
            })
        }
   
    }

    const handleSetEditBarState = (mode:TEditBarMode) => {
        if(mode === 'add') {
            SetEditBarState({
                mode:"add",
                title:"상품추가",
                subtitle:"상품을 추가할 수 있습니다"
            })
        }
        
        if(mode === 'edit') {
            SetEditBarState({
                mode:"edit",
                title:"상품수정",
                subtitle:"상품정보를 수정할 수 있습니다"
            })
        }

    }
    
    const initProductInfo = () =>{
        setServiceInfo({
            id:"",
            serviceName:"",
            servicePrice:0,
        })
    }

    const handleProductInfo = (e:React.ChangeEvent<HTMLInputElement>) => {
        setServiceInfo({
            ...serviceInfo,
            [e.target.name]:e.target.value
        })
    }

    const setMemberEditInfo = (memberInfo:TServiceData) => {
        setServiceInfo({
            id:memberInfo.id,
            serviceName:memberInfo.name,
            servicePrice:memberInfo.price,
        })
    }

    const handleServiceAdd = () => {
        console.log('add');
        console.log(serviceInfo);
        graphAddService(serviceInfo);
    }

    const handleServiceUpdate = () => {
        console.log('update');
        console.log(serviceInfo);
        graphUpdateService(serviceInfo);
    }

    const handleServiceDelete = (memberid:any) => {

        const chk_confirm = window.confirm('정말로 해당 상품을 삭제 하시겠습니까?');
        if(chk_confirm) {
            graphDeleteProduct(memberid);
        }

    }

    const pageDataLength = pageData.product.length;

    return (
        <>
            <PageHead 
                title={pageDesc.title}
                subtitle={pageDesc.subtitle}
            />
            <PageContent>
                <PageContentHead className="flexend">
                    <PageContentHeadBlock>
                        <Button className="content__addbtn" 
                                onClick={()=>{
                                    initProductInfo();
                                    handleSetEditBarState('add');
                                    handleModal('open', 'modal_inputsidebar')
                                }}>
                                추가하기
                        </Button>
                        </PageContentHeadBlock>
                </PageContentHead>
                {
                    pageDataLength > 0 &&
                    <>
                        <PageContentBody>
                            {
                                modalState.name === 'modal_inputsidebar' &&
                                <ProductEditor 
                                    mode={editBarState.mode}
                                    icon={svg_person}
                                    title={editBarState.title}
                                    subtitle={editBarState.subtitle}
                                    inputData={serviceInfo}
                                    handleModal={handleModal}
                                    handleInput={handleProductInfo}
                                    handleServiceAdd={handleServiceAdd}
                                    handleServiceUpdate={handleServiceUpdate}
                                />
                            }
                            <PageContentSection>
                                <PageContentTableWrap>
                                    <ProductTable
                                        table_head={pageInfo.datalist}
                                        tableData={pageData.product}
                                        handleModal={handleModal}
                                        handleSetEditBarState={handleSetEditBarState}
                                        setMemberEditInfo={setMemberEditInfo}
                                        handleServiceDelete={handleServiceDelete}
                                    />
                                </PageContentTableWrap>
                            </PageContentSection>
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
                    pageDataLength === 0 &&
                    <DataNotFound text="데이터가 존재하지 않습니다" />
                }
            </PageContent>
        </>
    )
}

export default ProductLayout
