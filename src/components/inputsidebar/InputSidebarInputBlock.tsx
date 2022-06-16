import Icon from 'components/atom/Icon';
import Input from 'components/atom/Input';
import Label from 'components/atom/Label';
import { TEditMember } from 'pages/admin/member/MemberLayout';
import React, { ChangeEvent } from 'react';
import { TInputType } from 'types/types';
import { of } from 'zen-observable';

interface IProps {
    children?:React.ReactNode | React.ReactNode[]
    className?:string,
    inputLabel:string,
    inputType:TInputType,
    inputId:string,
    inputName:any,
    inputValue:any,
    placeholder?:string,
    readOnly?:boolean,
    onInputChange?:(e:ChangeEvent<HTMLInputElement>)=>void
    onInputFocus?:()=>void
}


const InputSidebarInputBlock:React.FC<IProps> = ({children, className="", inputLabel, inputType, inputId, inputName, inputValue, placeholder='',readOnly=false, onInputChange, onInputFocus}) => {

  if(readOnly) {
    return <div className={`inputsidebar__inputwrap ${className}`}>
              <Label htmlFor={`${inputId}`} className="inputsidebar__label">{inputLabel}</Label>
              <Input type={inputType} name={`${inputName}`} id={`${inputId}`} className="inputsidebar__input" value={inputValue}    placeholder={placeholder} readOnly={true} />
              {
                children
              }
           </div>
  }

  if(onInputFocus) {
    return <div className={`inputsidebar__inputwrap ${className}`}>
              <Label htmlFor={`${inputId}`} className="inputsidebar__label">{inputLabel}</Label>
              <Input type={inputType} name={`${inputName}`} id={`${inputId}`} className="inputsidebar__input" value={inputValue} placeholder={placeholder} readOnly={true} onFocus={onInputFocus} />
              {
                children
              }
          </div>
  }

  return (
      <div className={`inputsidebar__inputwrap ${className}`}>
          <Label htmlFor={`${inputId}`} className="inputsidebar__label">{inputLabel}</Label>
          <Input type={inputType} name={`${inputName}`} id={`${inputId}`} className="inputsidebar__input" value={inputValue} placeholder={placeholder} readOnly={readOnly} onChange={(e:ChangeEvent<HTMLInputElement>)=>{onInputChange!(e)}} 
          />
          {
            children
          }
      </div>
  )
};

export default InputSidebarInputBlock;
