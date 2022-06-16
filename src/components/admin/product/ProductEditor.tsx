
import Button from 'components/atom/Button'
import Icon from 'components/atom/Icon'
import Input from 'components/atom/Input'
import Label from 'components/atom/Label'
import InputSidebar from 'components/inputsidebar/InputSidebar'
import InputSidebarBody from 'components/inputsidebar/InputSidebarBody'
import InputSidebarBtnWrap from 'components/inputsidebar/InputSidebarBtnWrap'
import InputSidebarCloseBtn from 'components/inputsidebar/InputSidebarCloseBtn'
import InputSidebarHead from 'components/inputsidebar/InputSidebarHead'
import InputSidebarInputBlock from 'components/inputsidebar/InputSidebarInputBlock'
import { ModalContext } from 'context/ContextList'
import { TProductDataList } from 'pages/admin/product/Product'
import { TEditServiceData } from 'pages/admin/product/ProductLayout'
import React, { ChangeEvent, useContext } from 'react'
import { TEditBarMode, TModalAction } from 'types/types'

interface IProps {
    mode:TEditBarMode,
    icon:any,
    title:string,
    subtitle:string,
    inputData:TEditServiceData,
    handleModal:(action:TModalAction, modalname:string) => void
    handleInput:(e:React.ChangeEvent<HTMLInputElement>)=> void
    handleServiceAdd:()=> void
    handleServiceUpdate:() => void
}

const ProductEditor:React.FC<IProps> = ({mode, icon, title, subtitle, inputData, handleModal, handleInput, handleServiceAdd, handleServiceUpdate}) => {

    const {modalState, setModalState} = useContext(ModalContext);

    const displayButton = () => {

        if(mode === 'add') {
            return  <Button className="inputsidebar__btn"
                            onClick={()=>{handleServiceAdd()}}>
                            추가
                    </Button>
        }
        if(mode === 'edit') {
            return <Button className="inputsidebar__btn"
                           onClick={()=>{handleServiceUpdate()}}>
                            수정
                    </Button>
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
                    inputLabel='상품이름'
                    inputType='text'
                    inputId='member_edit_name'
                    inputName='serviceName'
                    inputValue={inputData.serviceName}
                    onInputChange={handleInput}
                />
                <InputSidebarInputBlock
                    inputLabel='상품가격'
                    inputType='text'
                    inputId='member_edit_product'
                    inputName='servicePrice'
                    inputValue={inputData.servicePrice}
                    onInputChange={handleInput}
                />
            </InputSidebarBody>
            <InputSidebarBtnWrap>
                { displayButton() }
                <InputSidebarCloseBtn 
                    buttonName='취소'
                    onButtonClick={()=>{handleModal('close' ,'')}}
                />
            </InputSidebarBtnWrap>
        </InputSidebar>
    )
}

export default ProductEditor
