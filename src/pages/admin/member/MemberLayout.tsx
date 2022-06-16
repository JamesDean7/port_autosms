import React, { ChangeEvent, useContext, useState } from 'react'
import MemberTable from 'components/admin/member/MemberTable'
import SearchBar from 'components/search/SearchBar'
import InputLabeled from 'components/atom/InputLabeled'
import Button from 'components/atom/Button'
import { svg_person, svg_search } from 'assets/svg'
import MemberEditor from 'components/admin/member/MemberEditor'
import { ModalContext } from 'context/ContextList'
import { TMemberDataList, TMemberDisplayList, TMemberPageData, TMyServices, TPageDataOption } from 'pages/admin/member/Member'
import { TEditBarMode, TEditBarState, TModalAction, TPageDesc, TPageInfo, TPageSearchOption, TPagination } from 'types/types'
import Pagination from 'components/common/pagination/Pagination'
import { Q_MemberList_MemberList_items_myServices } from 'apollo/types'
import MemberServiceAdd, { TNewServiceObj } from 'components/admin/member/MemberServiceAdd'
import { compareDates, getArrayLength, getNextSmsSendDate } from 'utils/utils'
import MemberServiceEdit from 'components/admin/member/MemberServiceEdit'
import PageHead from 'components/layout/PageHead'
import PageContent from 'components/layout/PageContent'
import PageContentHead from 'components/layout/PageContentHead'
import PageContentBody from 'components/layout/PageContentBody'
import PageContentFoot from 'components/layout/PageContentFoot'
import DataNotFound from 'components/common/notice/DataNotFound'
import PageContentHeadBlock from 'components/layout/PageContentHeadBlock'
import PageContentTableWrap from 'components/layout/PageContentTableWrap'

export type TEditMember = {
    id:string,
    memberName:string | null,
    phone:string | null,
    address:string | null,
    services:any | null,
    extraMemo:string | null
}

export type TEditService = {
    itemId?:string,
    itemName:string | null,
    itemPeriods:number | null,
    itemPrice:number | null,
    startDate:Date | undefined,
    endDate:Date | undefined,
    nextEndDate?:Date | undefined,
    lastSmsSent:Date | undefined,
    nextSmsSend:Date | undefined,
}

export type TInputValueType = "number" | "string";

export interface TEditServiceParams extends Omit<Q_MemberList_MemberList_items_myServices, "__typenamets"> {
    itemId:string
}

interface IProps {
    pageData:TMemberPageData,
    pageInfo:TPageInfo<any, undefined>,
    pageDesc:TPageDesc,
    pageDataOption:TPageDataOption,
    graphAddmember:(memberinfo:any)=>void
    graphUpdateMember:(memberinfo:any)=>void
    graphDeleteMember:(memberid:any)=>void
    handlePageSearch:(action:TPageSearchOption, keyword:any) => void
    handlePagination:(currentPage:number) => void
}

const editServiceDefalt = {
    itemId:'',
    itemName:'',
    itemPeriods:1,
    itemPrice:0,
    startDate:new Date(),
    endDate:undefined,
    lastSmsSent:undefined,
    nextSmsSend:undefined
}

const MemberLayout:React.FC<IProps> = ({pageData, pageInfo, pageDesc, pageDataOption, graphAddmember, graphUpdateMember, graphDeleteMember, handlePageSearch, handlePagination }) => {
    
    const [members, setMembers] = useState<string>();

    const [memberInfo, setMemberInfo] = useState<TEditMember>({
        id:"",
        memberName:"",
        phone:"",
        address:"",
        services:[],
        extraMemo:""
    });

    const [serviceSelectedData, setServiceSelectedData] = useState<TEditService>({
        ...editServiceDefalt
    });

    const [editService, setEditService] = useState<TEditService>({
        ...editServiceDefalt,
        nextEndDate:new Date()
    });

    const [editBarState, setEditBarState] = useState<TEditBarState>({
        mode:"add",
        title:"멤버추가",
        subtitle:"멤버를 추가할 수 있습니다"
    })

    const [serviceEditBarState, setServiceEditBarState] = useState<TEditBarState>({
        mode:"serviceadd",
        title:"이용 서비스 추가",
        subtitle:"이용 서비스를 추가할 수 있습니다"
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

    const handleMemberInfoAdd = () => {
        graphAddmember(memberInfo);
    }

    const handleMemberInfoUpdate = (memberid:any) => {
        console.log('update');
        console.log(memberInfo);
        graphUpdateMember(memberInfo);
    }

    const handleServiceUpdate = (editServiceInfo:TNewServiceObj) => {

        console.log('update request');
        console.log(editServiceInfo);

        console.log('original array');
        console.log(memberInfo.services);

        const newProduct = memberInfo.services.map(function(product:TMyServices){
            if(product.itemId === editService.itemId) {
                return { 
                    itemId:editServiceInfo.itemId,  
                    itemName:editServiceInfo.itemName,  
                    itemPeriods:editServiceInfo.itemPeriods,  
                    itemPrice:editServiceInfo.itemPrice,  
                    startDate:editServiceInfo.startDate,
                    endDate:editServiceInfo.endDate,
                    lastSmsSent: editServiceInfo.lastSmsSent,
                    nextSmsSend: editServiceInfo.nextSmsSend,
                }
            }
           return product
        });

        console.log('after filter')
        console.log(newProduct);

        setMemberInfo({
            ...memberInfo,
            services:[...newProduct]
        })

    }


    const handleMemberInfoDelete = (memberid:any) => {

        const chk_confirm = window.confirm('정말로 해당 멤버를 삭제 하시겠습니까?');
        if(chk_confirm) {
            graphDeleteMember(memberid);
        }

    }

    const handleSetEditBarState = (mode:TEditBarMode) => {
        
        if(mode === 'add') {
            setEditBarState({
                mode:"add",
                title:"멤버추가",
                subtitle:"멤버를 추가할 수 있습니다"
            })
        }

        if(mode === 'edit') {
            setEditBarState({
                mode:"edit",
                title:"정보수정",
                subtitle:"멤버정보를 수정할 수 있습니다"
            })
        }

        if(mode === 'serviceadd') {
            setServiceEditBarState({
                mode:"serviceadd",
                title:"이용 서비스 추가",
                subtitle:"이용중인 서비스를 추가할 수 있습니다"
            })
        }


        if(mode === 'serviceedit') {
            setServiceEditBarState({
                mode:"serviceedit",
                title:"이용 서비스 수정",
                subtitle:"서비스 정보를 수정할 수 있습니다"
            })
        }

    }


    const handleMemberSetInfo = (memberInfo:TMemberDataList) => {
        setMemberInfo({
            id:memberInfo.id,
            memberName:memberInfo.memberName!,
            phone:memberInfo.phone,
            address:memberInfo.address,
            services:[...memberInfo.services!],
            extraMemo:memberInfo.extraMemo
        })
    }

    const handleMemberSetInfoDefault = () => {
        setMemberInfo({
            id:"",
            memberName:"",
            phone:"",
            address:"",
            services:[],
            extraMemo:""
        })
    }

    const handleServiceInfoSet = (productInfo:TEditServiceParams) => {

        setEditService({
            itemId:productInfo.itemId,
            itemName:productInfo.itemName,
            itemPeriods:productInfo.itemPeriods,
            itemPrice:productInfo.itemPrice,
            startDate:productInfo.startDate,
            endDate:productInfo.endDate,
            lastSmsSent:productInfo.lastSmsSent,
            nextSmsSend:productInfo.nextSmsSend
        })
        setServiceSelectedData({
            itemId:productInfo.itemId,
            itemName:productInfo.itemName,
            itemPeriods:productInfo.itemPeriods,
            itemPrice:productInfo.itemPrice,
            startDate:productInfo.startDate,
            endDate:productInfo.endDate,
            lastSmsSent:productInfo.lastSmsSent,
            nextSmsSend:productInfo.nextSmsSend
        })
    }

    const handleServiceInfoSetDefault = () => {
        setEditService({
           ...editServiceDefalt
        })
    }

    const handleMemberInfo = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMemberInfo({
            ...memberInfo,
            [e.target.name]:e.target.value
        })
    }

    const handleEditService = (e:React.ChangeEvent<HTMLInputElement>, valuetype?:TInputValueType) => {

        if(valuetype === 'number') {
            setEditService({
                ...editService,
                [e.target.name]:parseInt(e.target.value)
            })
            return;
        }

        setEditService({
            ...editService,
            [e.target.name]:e.target.value
        })

    }

    const handleServiceEndDate = (date:Date) => {
        setEditService({
            ...editService,
            endDate:date
        })
    }

    const handleAddNewService = (addService:TNewServiceObj) => {
        setMemberInfo({
            ...memberInfo,
            services:[...memberInfo.services, addService]
        })
    }

    const handleNewService = () => {

        setEditService({
            ...editService,
            itemPrice:editService.itemPrice,
            endDate:editService.endDate,
            lastSmsSent:editService.lastSmsSent,
            nextSmsSend:editService.nextSmsSend
        })

        console.log(editService);

        setMemberInfo({
            ...memberInfo,
            services:[...memberInfo.services, editService]
        })

        console.log(memberInfo);

    }

    const table_mb_hide = ['smsList'];
    const dataLength = getArrayLength(pageData.member);

    // const nextSendDate = getNextSmsSendDate(new Date(), 2);
    // console.log(nextSendDate);

    console.log('member layout : ')
    console.log(memberInfo);
    

    return (
        <>
            <PageHead 
                title={pageDesc.title}
                subtitle={pageDesc.subtitle}
            />
            <PageContent>
                <PageContentHead>
                    <PageContentHeadBlock>
                        <SearchBar className="searchbar" 
                                handleSearch={handlePageSearch}>
                        </SearchBar>
                    </PageContentHeadBlock>
                    <PageContentHeadBlock>
                        <Button className="content__addbtn" 
                                onClick={()=>{
                                    handleMemberSetInfoDefault()
                                    handleSetEditBarState('add');
                                    handleModal('open', 'modal_inputsidebar')
                                }}>
                                추가하기
                        </Button>
                    </PageContentHeadBlock>
                </PageContentHead>

                {
                dataLength > 0 &&
                <>
                    <PageContentBody>
                        {
                            modalState.name === 'modal_inputsidebar' &&
                            <MemberEditor 
                                mode={editBarState.mode}
                                icon={svg_person}
                                title={editBarState.title}
                                subtitle={editBarState.subtitle}
                                inputData={memberInfo}
                                dataOption={pageDataOption}
                                handleServiceInfoSet={handleServiceInfoSet}
                                handleServiceInfoSetDefault={handleServiceInfoSetDefault}
                                handleModal={handleModal}
                                handleSetEditBarState={handleSetEditBarState}
                                handleInput={handleMemberInfo}
                                handleMemberInfoAdd={handleMemberInfoAdd}
                                handleMemberInfoUpdate={handleMemberInfoUpdate}
                            />
                        }
                        {
                            modalState.name === 'modal_producteadd' &&
                            <MemberServiceAdd 
                                memberEditbarMode={editBarState.mode}
                                mode={serviceEditBarState.mode}
                                icon={svg_person}
                                title={serviceEditBarState.title}
                                subtitle={serviceEditBarState.subtitle}
                                dataOption={pageDataOption}
                                handleSetEditBarState={handleSetEditBarState}
                                handleModal={handleModal}
                                handleServiceInfoAdd={handleAddNewService}
                            />
                        }
                        {
                            modalState.name === 'modal_productedit' &&
                            <MemberServiceEdit 
                                memberEditbarMode={editBarState.mode}
                                icon={svg_person}
                                title={serviceEditBarState.title}
                                subtitle={serviceEditBarState.subtitle}
                                inputData={editService}
                                serviceSelectedData={serviceSelectedData}
                                handleSetEditBarState={handleSetEditBarState}
                                handleModal={handleModal}
                                handleInput={handleEditService}
                                handleDateInput={handleServiceEndDate}
                                handleProductInfoUpdate={handleServiceUpdate}
                            />
                        }
                        <PageContentTableWrap>
                            <MemberTable
                                table_head={pageInfo.datalist}
                                table_data={pageData.member}
                                mbhide_list={table_mb_hide}
                                handleModal={handleModal}
                                handleSetEditBarState={handleSetEditBarState}
                                handleMemberSetInfo={handleMemberSetInfo}
                                handleMemberInfoDelete={handleMemberInfoDelete}
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
                dataLength === 0 &&
                <DataNotFound text="데이터가 존재하지 않습니다" />
            }
            </PageContent>
        </>
    )

}

export default MemberLayout
