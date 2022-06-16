
import { svg_cancel_light, svg_pencil, svg_search } from 'assets/svg'
import Button from 'components/atom/Button'
import Icon from 'components/atom/Icon'
import Input from 'components/atom/Input'
import Label from 'components/atom/Label'
import CalendarCaption from 'components/calendar/CalendarCaption'
import InputSidebar from 'components/inputsidebar/InputSidebar'
import InputSidebarBody from 'components/inputsidebar/InputSidebarBody'
import InputSidebarHead from 'components/inputsidebar/InputSidebarHead'
import InputSidebarInputBlock from 'components/inputsidebar/InputSidebarInputBlock'
import InputSidebarBtn from 'components/inputsidebar/InputSidebarBtn'
import InputSidebarBtnWrap from 'components/inputsidebar/InputSidebarBtnWrap'
import { ModalContext } from 'context/ContextList'
import { TEditService, TEditServiceParams, TInputValueType } from 'pages/admin/member/MemberLayout'
import { TMemberDataList, TPageDataOption } from 'pages/admin/member/Member'
import React, { ChangeEvent, useContext, useRef, useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { TEditBarMode, TInterfaceToLiteral, TModalAction } from 'types/types'
import { days_kor } from 'utils/calendarValues'
import { compareDates, dateInfoFormat, getNextSmsSendDate } from 'utils/utils'
import InputSidebarCloseBtn from 'components/inputsidebar/InputSidebarCloseBtn'

export type TNewServiceObj = {
    itemId?:any,
    itemName:string | null,
    itemPeriods:number | null,
    itemPrice:number | null,
    startDate:Date | undefined,
    endDate:Date,
    lastSmsSent:Date | undefined,
    nextSmsSend:Date
}

interface IProps {
    memberEditbarMode:TEditBarMode,
    mode:TEditBarMode,
    icon:any,
    title:string,
    subtitle:string,
    dataOption:TPageDataOption,
    handleSetEditBarState:(mode:TEditBarMode)=>void
    handleModal:(action:TModalAction, modalname:string) => void
    handleServiceInfoAdd:(addService:TNewServiceObj)=> void
}

const MemberServiceAdd:React.FC<IProps> = ({memberEditbarMode, mode, icon, title, subtitle, dataOption, handleSetEditBarState, handleModal, handleServiceInfoAdd}) => {

    const [addService, setAddService] = useState<TEditService>({
        itemName:'',
        itemPeriods:1,
        itemPrice:0,
        startDate:new Date(),
        endDate:undefined,
        lastSmsSent:undefined,
        nextSmsSend:undefined
    });
    const [productSelectState, setProductSelectState] = useState(false);
    const productNameInput = useRef();

    const serviceEndDate = getNextSmsSendDate(new Date(addService.startDate!), addService.itemPeriods!);
    const servieSmsLastSent = addService.startDate;
    const servieSmsNextSend = getNextSmsSendDate(new Date(servieSmsLastSent!), addService.itemPeriods!);

    const newServiceObj:TNewServiceObj = {
        itemName:addService.itemName,
        itemPeriods:addService.itemPeriods,
        itemPrice:addService.itemPrice,
        startDate:addService.startDate,
        endDate:serviceEndDate,
        lastSmsSent:servieSmsLastSent,
        nextSmsSend:servieSmsNextSend
    }
 
    const handleDropdownBox = (productInfo:any) => {
        setAddService({
            ...addService,
            itemName:productInfo.name,
            itemPrice:productInfo.price,
        })
    }
    
    const handleAddService = (e:React.ChangeEvent<HTMLInputElement>, valuetype?:TInputValueType) => {

        if(valuetype === 'number') {
            setAddService({
                ...addService,
                [e.target.name]:parseInt(e.target.value)
            })
            // console.log(addService);
            return;
        }

        setAddService({
            ...addService,
            [e.target.name]:e.target.value
        })
        // console.log(addService);

    }

    const handleProductInfoDate = (date:Date) => {
        setAddService({
            ...addService,
            startDate:date
        })
    }

    const handleProductSelectState = (selectState:boolean) => {
        setProductSelectState(selectState)
    }

    const handleServiceAdd = () => {
        handleSetEditBarState(memberEditbarMode);
        handleModal('open' ,'modal_inputsidebar')
        handleServiceInfoAdd(newServiceObj)
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
                    inputLabel='상품'
                    inputType='text'
                    inputId='member_add_product'
                    inputName='itemName'
                    inputValue={addService.itemName}
                    onInputFocus={()=>{handleProductSelectState(true)}}
                >
                    <div className={`inputsidebar__dropbox ${productSelectState && 'on'}`}>
                        <div className="inputsidebar__dropoption inputsidebar--titleoption">등록상품선택</div>
                        {
                           dataOption.productList!.map(function(product, index){
                                return <div key={`option_${product.name}`}
                                            className="inputsidebar__dropoption" 
                                            onClick={(e)=>{
                                                handleProductSelectState(false)
                                                handleDropdownBox(product)
                                            }}>
                                            {product.name}
                                       </div>
                           })
                        }
                    </div>
                </InputSidebarInputBlock>
                <InputSidebarInputBlock
                    inputLabel='가격'
                    inputType='text'
                    inputId='member_add_price'
                    inputName='itemPrice'
                    inputValue={addService.itemPrice}
                    readOnly={true}
                    onInputChange={handleAddService}
                />
                <div className="inputsidebar__inputwrap">
                    <Label htmlFor="member_add_startdate" className="inputsidebar__label">등록일</Label>
                    <DayPickerInput 
                        value={dateInfoFormat(addService.startDate!)}
                        onDayChange={handleProductInfoDate}
                        dayPickerProps = {{
                            captionElement:<CalendarCaption />,
                            weekdaysShort:days_kor, 
                        }}
                        inputProps={{
                            name:"startDate",
                            id:"member_add_startdate",
                            className:"inputsidebar__daypicker",
                            autoComplete:"off",
                        }}
                    />
                </div>
                <InputSidebarInputBlock
                    inputLabel='등록개월'
                    inputType='text'
                    inputId='member_add_period'
                    inputName='itemPeriods'
                    inputValue={addService.itemPeriods}
                    onInputChange={(e)=>{handleAddService(e,'number')}}
                />
                <InputSidebarInputBlock
                    inputLabel='종료일'
                    inputType='text'
                    inputId='member_add_enddate'
                    inputName='endDate'
                    inputValue={dateInfoFormat(serviceEndDate)}
                    readOnly={true}
                />
                <InputSidebarInputBlock
                    inputLabel=''
                    inputType='hidden'
                    inputId='member_add_lastsmssent'
                    inputName='lastSmsSent'
                    inputValue={servieSmsLastSent}
                    readOnly={true}
                />
                <InputSidebarInputBlock
                    inputLabel=''
                    inputType='hidden'
                    inputId='member_edit_nextsmssent'
                    inputName='nextSmsSend'
                    inputValue={servieSmsNextSend}
                    readOnly={true}
                />
            </InputSidebarBody>
            <InputSidebarBtnWrap>
                <InputSidebarBtn 
                    buttonName='추가'
                    onButtonClick={()=>{handleServiceAdd()}}
                />
                <InputSidebarCloseBtn 
                    buttonName='취소'
                    onButtonClick={()=>{handleModal('open', 'modal_inputsidebar')}}
                />
            </InputSidebarBtnWrap>
        </InputSidebar>

    )
}

export default MemberServiceAdd
