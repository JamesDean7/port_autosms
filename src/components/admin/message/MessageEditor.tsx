
import Button from 'components/atom/Button'
import CheckBox from 'components/atom/CheckBox'
import Icon from 'components/atom/Icon'
import Input from 'components/atom/Input'
import Label from 'components/atom/Label'
import InputSidebar from 'components/inputsidebar/InputSidebar'
import InputSidebarBtnWrap from 'components/inputsidebar/InputSidebarBtnWrap'
import { InputSidebarCheckBoxBlock } from 'components/inputsidebar/InputSidebarCheckBoxBlock'
import InputSidebarCloseBtn from 'components/inputsidebar/InputSidebarCloseBtn'
import InputSidebarHead from 'components/inputsidebar/InputSidebarHead'
import InputSidebarInputBlock from 'components/inputsidebar/InputSidebarInputBlock'
import { ModalContext } from 'context/ContextList'
import { TProductDataList } from 'pages/admin/product/Product'
import React, { ChangeEvent, useContext } from 'react'
import { TEditBarMode, TModalAction } from 'types/types'

interface IProps {
    icon:any,
    title:string,
    subtitle:string,
    inputData:any,
    handleModal:(action:TModalAction, modalname:string) => void
    handleInput:(e:React.ChangeEvent<HTMLTextAreaElement>)=> void
    handleCheckBox:() => void
    handleMemberInfoAdd:()=> void
    handleSMSUpdate:() => void
}

const SmsEditor:React.FC<IProps> = ({icon, title, subtitle, inputData, handleModal, handleInput, handleCheckBox, handleMemberInfoAdd, handleSMSUpdate}) => {

    const {modalState, setModalState} = useContext(ModalContext);

    return (
        <InputSidebar>
            <InputSidebarHead 
                icon={icon}
                title={title}
                subtitle={subtitle}
            ></InputSidebarHead>
                <InputSidebarInputBlock
                    className="readonly"
                    inputLabel='SMS'
                    inputType='text'
                    inputId='sms_edit_title'
                    inputName='smsTitle'
                    inputValue={inputData.smsTitle}
                    readOnly={true}
                />
                <InputSidebarInputBlock
                    className="readonly"
                    inputLabel='설명'
                    inputType='text'
                    inputId='sms_edit_description'
                    inputName='smsDesc'
                    inputValue={inputData.smsDesc}
                    readOnly={true}
                />
                <InputSidebarCheckBoxBlock
                    inputLabel='사용여부'
                    inputId='sms_edit_isused'
                    inputName='isUsed'
                    inputValue={inputData.isUsed}
                    checkState={inputData.isUsed}
                    onInputChange={handleCheckBox}
                />
                <div className="inputsidebar__inputwrap">
                    <Label htmlFor="sms_edit_content" className="inputsidebar__label">SMS 내용</Label>
                    <textarea id="sms_edit_content" name="smsContent" className="inputsidebar__textarea"
                    onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{handleInput(e)}}>{inputData.smsContent}</textarea>
                </div>
                <InputSidebarBtnWrap>
                    <Button className="inputsidebar__btn"
                            onClick={()=>{handleSMSUpdate()}}>
                            수정
                    </Button>
                    <InputSidebarCloseBtn 
                        buttonName='취소'
                        onButtonClick={()=>{handleModal('close' ,'')}}
                    />
                </InputSidebarBtnWrap>
        </InputSidebar>
    )
}

export default SmsEditor
