
import { svg_cancel_light, svg_pencil, svg_search } from 'assets/svg'
import Button from 'components/atom/Button'
import Icon from 'components/atom/Icon'
import Input from 'components/atom/Input'
import Label from 'components/atom/Label'
import CalendarCaption from 'components/calendar/CalendarCaption'
import InputSidebar from 'components/inputsidebar/InputSidebar'
import InputSidebarBody from 'components/inputsidebar/InputSidebarBody'
import InputSidebarBtn from 'components/inputsidebar/InputSidebarBtn'
import InputSidebarBtnWrap from 'components/inputsidebar/InputSidebarBtnWrap'
import InputSidebarCloseBtn from 'components/inputsidebar/InputSidebarCloseBtn'
import InputSidebarHead from 'components/inputsidebar/InputSidebarHead'
import InputSidebarInfoBox from 'components/inputsidebar/InputSidebarInfoBox'
import InputSidebarInfoBoxBlock from 'components/inputsidebar/InputSidebarInfoBoxBlock'
import InputSidebarInputBlock from 'components/inputsidebar/InputSidebarInputBlock'
import { ModalContext } from 'context/ContextList'
import { TEditService, TEditServiceParams, TInputValueType } from 'pages/admin/member/MemberLayout'
import { TMemberDataList, TPageDataOption } from 'pages/admin/member/Member'
import React, { ChangeEvent, useContext, useRef, useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { TEditBarMode, TInterfaceToLiteral, TModalAction } from 'types/types'
import { isBuffer } from 'util'
import { days_kor } from 'utils/calendarValues'
import { compareDates, dateInfoFormat, getNextSmsSendDate } from 'utils/utils'
import { TNewServiceObj } from './MemberServiceAdd'

interface IProps {
    memberEditbarMode:TEditBarMode,
    icon:any,
    title:string,
    subtitle:string,
    inputData:TEditService,
    serviceSelectedData:TEditService,
    handleSetEditBarState:(mode:TEditBarMode)=>void
    handleModal:(action:TModalAction, modalname:string) => void
    handleInput:(e:React.ChangeEvent<HTMLInputElement>, valuetype?:TInputValueType)=> void
    handleDateInput:(date:Date) => void
    handleProductInfoUpdate:(memberid:any) => void
}

const MemberServiceEdit:React.FC<IProps> = ({memberEditbarMode, icon, title, subtitle, inputData, serviceSelectedData, handleSetEditBarState, handleModal, handleInput, handleDateInput, handleProductInfoUpdate}) => {

    const serviceNextEndDate = getNextSmsSendDate(new Date(inputData.endDate!), inputData.itemPeriods!);
    const serviceSmsNextSend = getNextSmsSendDate(new Date(inputData.endDate!), inputData.itemPeriods!);

    const editServiceObj:TNewServiceObj = {
        itemName:inputData.itemName,
        itemPeriods:inputData.itemPeriods,
        itemPrice:inputData.itemPrice,
        startDate:inputData.endDate,
        endDate:serviceNextEndDate,
        lastSmsSent:inputData.endDate,
        nextSmsSend:serviceSmsNextSend
    }

    const handleServiceUpdate = () => {
        handleSetEditBarState(memberEditbarMode);
        handleModal('open' ,'modal_inputsidebar')
        handleProductInfoUpdate(editServiceObj)
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
                <InputSidebarInfoBox>
                    <InputSidebarInfoBoxBlock 
                        blockTitle='상품'
                        blockContent={serviceSelectedData.itemName}
                    />
                     <InputSidebarInfoBoxBlock 
                        blockTitle='가격'
                        blockContent={serviceSelectedData.itemPrice}
                    />
                     <InputSidebarInfoBoxBlock 
                        blockTitle='등록일'
                        blockContent={dateInfoFormat(serviceSelectedData.startDate!)}
                    />
                    <InputSidebarInfoBoxBlock 
                        blockTitle='등록개월'
                        blockContent={`${serviceSelectedData.itemPeriods} 개월`}
                    /> 
                    <InputSidebarInfoBoxBlock 
                        blockTitle='종료일'
                        blockContent={dateInfoFormat(serviceSelectedData.endDate!)}
                    /> 
                </InputSidebarInfoBox>

                <div className="inputsidebar__inputwrap">
                    <Label htmlFor="member_edit_startdate" className="inputsidebar__label">등록연장</Label>
                    <DayPickerInput 
                        value={dateInfoFormat(inputData.endDate!)}
                        onDayChange={(date)=>{handleDateInput(date)}}
                        dayPickerProps = {{
                            captionElement:<CalendarCaption />,
                            weekdaysShort:days_kor, 
                        }}
                        inputProps={{
                            name:"endDate",
                            id:"member_edit_startdate",
                            className:"inputsidebar__daypicker",
                            autoComplete:"off",
                        }}
                    />
                </div>
                <InputSidebarInputBlock
                    inputLabel='연장개월'
                    inputType='text'
                    inputId='member_edit_period'
                    inputName='itemPeriods'
                    inputValue={inputData.itemPeriods}
                    onInputChange={(e)=>{handleInput(e,'number')}}
                />
                <InputSidebarInputBlock
                    inputLabel='연장이후 종료일'
                    inputType='text'
                    inputId='member_edit_nextenddate'
                    inputName='nextEndDate'
                    inputValue={dateInfoFormat(serviceNextEndDate)}
                    readOnly={true}
                />
                <InputSidebarInputBlock
                    inputLabel=''
                    inputType='hidden'
                    inputId='member_edit_lastsmssent'
                    inputName='lastSmsSent'
                    inputValue={inputData.lastSmsSent}
                    readOnly={true}
                />
                <InputSidebarInputBlock
                    inputLabel=''
                    inputType='hidden'
                    inputId='member_edit_nextsmssent'
                    inputName='nextSmsSend'
                    inputValue={serviceSmsNextSend}
                    readOnly={true}
                />
            </InputSidebarBody>
            <InputSidebarBtnWrap>
                <InputSidebarBtn 
                    buttonName='수정'
                    onButtonClick={handleServiceUpdate}
                />
                <InputSidebarCloseBtn 
                    buttonName='취소'
                    onButtonClick={()=>{handleModal('open', 'modal_inputsidebar')}}
                />
            </InputSidebarBtnWrap>
        </InputSidebar>


    )
}

export default MemberServiceEdit
