
import Button from 'components/atom/Button'
import CheckBox from 'components/atom/CheckBox'
import Icon from 'components/atom/Icon'
import Input from 'components/atom/Input'
import Label from 'components/atom/Label'
import InputSidebar from 'components/inputsidebar/InputSidebar'
import InputSidebarBody from 'components/inputsidebar/InputSidebarBody'
import InputSidebarBtnWrap from 'components/inputsidebar/InputSidebarBtnWrap'
import { InputSidebarCheckBoxBlock } from 'components/inputsidebar/InputSidebarCheckBoxBlock'
import InputSidebarCloseBtn from 'components/inputsidebar/InputSidebarCloseBtn'
import InputSidebarHead from 'components/inputsidebar/InputSidebarHead'
import { ModalContext } from 'context/ContextList'
import { TPaymentMemo } from 'pages/admin/paymentMemo/PaymentMemo'
import { TProductDataList } from 'pages/admin/product/Product'
import React, { ChangeEvent, useContext } from 'react'
import { TEditBarMode, TModalAction } from 'types/types'

interface IProps {
    icon:any,
    title:string,
    subtitle:string,
    inputData:TPaymentMemo,
    handleModal:(action:TModalAction, modalname:string) => void
    handleInput:(e:React.ChangeEvent<HTMLTextAreaElement>)=> void
    handleCheckBox:()=>void,
    handleMemberInfoUpdate:() => void
}

const PaymentMemoEditor:React.FC<IProps> = ({icon, title, subtitle, inputData, handleModal, handleInput, handleCheckBox, handleMemberInfoUpdate}) => {

    return (
        <InputSidebar>
            <InputSidebarHead 
                icon={icon}
                title={title}
                subtitle={subtitle}
            >
            </InputSidebarHead>
            <InputSidebarBody>
                <InputSidebarCheckBoxBlock
                    inputLabel='사용여부'
                    inputId='sms_edit_isused'
                    inputName='isUsed'
                    inputValue={inputData.isUsed}
                    checkState={inputData.isUsed}
                    onInputChange={handleCheckBox}
                />
                <div className="inputsidebar__inputwrap">
                    <Label htmlFor="memo_edit_memo" className="inputsidebar__label">SMS 내용</Label>
                    <textarea id="memo_edit_memo" name="memo" className="inputsidebar__textarea"
                    onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{handleInput(e)}}>{inputData.memo}</textarea>
                </div>
            </InputSidebarBody>
            <InputSidebarBtnWrap>
                <Button className="inputsidebar__btn"
                        onClick={()=>{handleMemberInfoUpdate()}}>
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

export default PaymentMemoEditor
