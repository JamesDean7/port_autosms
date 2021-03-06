import { svg_cancel_light, svg_pencil, svg_search } from 'assets/svg'
import Button from 'components/atom/Button'
import CheckBox from 'components/atom/CheckBox'
import Icon from 'components/atom/Icon'
import Input from 'components/atom/Input'
import Label from 'components/atom/Label'
import InputSidebar from 'components/inputsidebar/InputSidebar'
import InputSidebarBody from 'components/inputsidebar/InputSidebarBody'
import InputSidebarBtn from 'components/inputsidebar/InputSidebarBtn'
import InputSidebarBtnWrap from 'components/inputsidebar/InputSidebarBtnWrap'
import InputSidebarCloseBtn from 'components/inputsidebar/InputSidebarCloseBtn'
import InputSidebarHead from 'components/inputsidebar/InputSidebarHead'
import InputSidebarInputBlock from 'components/inputsidebar/InputSidebarInputBlock'
import InputSidebarService from 'components/inputsidebar/InputSidebarService'
import InputSidebarServiceBlock from 'components/inputsidebar/InputSidebarServiceBlock'
import InputSidebarServiceBlockInfo from 'components/inputsidebar/InputSidebarServiceBlockInfo'
import InputSidebarServiceHead from 'components/inputsidebar/InputSidebarServiceHead'
import { ModalContext } from 'context/ContextList'
import { TMemberDataList } from 'pages/admin/member/Member'
import React, { ChangeEvent, useContext } from 'react'
import { TEditBarMode, TModalAction } from 'types/types'

interface IProps {
    mode:TEditBarMode,
    icon:any,
    title:string,
    subtitle:string,
    inputData:TMemberDataList,
    dataOption:any,
    handleServiceInfoSet:(productInfo:any) => void,
    handleServiceInfoSetDefault:()=>void,
    handleModal:(action:TModalAction, modalname:string) => void
    handleSetEditBarState:(mode:TEditBarMode)=>void
    handleInput:(e:React.ChangeEvent<HTMLInputElement>)=> void
    handleMemberInfoAdd:()=> void
    handleMemberInfoUpdate:(memberid:any) => void
}

const MemberEditor:React.FC<IProps> = ({mode, icon, title, subtitle, inputData, dataOption, handleServiceInfoSet, handleServiceInfoSetDefault, handleModal, handleSetEditBarState, handleInput, handleMemberInfoAdd, handleMemberInfoUpdate}) => {

    const {modalState, setModalState} = useContext(ModalContext);

    const handleServiceCreate = () => {
        handleSetEditBarState("serviceadd")
        handleModal('open', 'modal_producteadd')
        handleServiceInfoSetDefault()
    }

    const handleServiceUpdate = (service:any) => {
        handleSetEditBarState("serviceedit")
        handleModal('open', 'modal_productedit')
        handleServiceInfoSet(service)
    }

    const displayButton = () => {

        if(mode === 'add') {
            return <InputSidebarBtn 
                        buttonName='??????'
                        onButtonClick={()=>{handleMemberInfoAdd()}}
                    />
        }
        if(mode === 'edit') {
            return <InputSidebarBtn 
                        buttonName='??????'
                        onButtonClick={()=>{handleMemberInfoUpdate(inputData.id)}}
                    />
        }

    }

    return (
            <InputSidebar>
                <InputSidebarHead 
                    icon={icon}
                    title={title}
                    subtitle={subtitle}
                >
                </InputSidebarHead>
                <InputSidebarBody>
                    <InputSidebarInputBlock
                        inputLabel='??????'
                        inputType='text'
                        inputId='member_edit_name'
                        inputName='memberName'
                        inputValue={inputData.memberName}
                        onInputChange={handleInput}
                    />
                    <InputSidebarInputBlock
                        inputLabel='?????????'
                        inputType='text'
                        inputId='member_edit_phone'
                        inputName='phone'
                        inputValue={inputData.phone}
                        onInputChange={handleInput}
                    />
                    <InputSidebarInputBlock
                        inputLabel='??????'
                        inputType='text'
                        inputId='member_edit_address'
                        inputName='address'
                        inputValue={inputData.address}
                        onInputChange={handleInput}
                    />
                </InputSidebarBody>
                <InputSidebarService>
                    <InputSidebarServiceHead 
                        title='???????????? ?????????'
                        subtitle='???????????????????????? ?????? ????????? ??? ????????????'
                    >
                    </InputSidebarServiceHead>
                    {
                        inputData.services &&
                            inputData.services!.map(function(service, index){
                                return  <InputSidebarServiceBlock 
                                            key={`serviceblock-${index}`}
                                            onBlockClick={()=>{handleServiceUpdate(service)}}
                                        >
                                            <InputSidebarServiceBlockInfo>{service.itemName}</InputSidebarServiceBlockInfo>
                                            <InputSidebarServiceBlockInfo>{service.itemPeriods} ??????</InputSidebarServiceBlockInfo>
                                        </InputSidebarServiceBlock>
                            })
                      
                    }
                    <InputSidebarServiceBlock 
                        className='center'
                        onBlockClick={handleServiceCreate}
                    >
                        <InputSidebarServiceBlockInfo>????????? ??????</InputSidebarServiceBlockInfo>
                    </InputSidebarServiceBlock>
                </InputSidebarService>
                <InputSidebarBtnWrap>
                    { displayButton() }
                    <InputSidebarCloseBtn 
                        buttonName='??????'
                        onButtonClick={()=>{handleModal('close' ,'')}}
                    />
                </InputSidebarBtnWrap>
            </InputSidebar>
    )
}

export default MemberEditor
