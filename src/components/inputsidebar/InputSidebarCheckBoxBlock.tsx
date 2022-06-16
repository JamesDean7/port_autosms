import CheckBox from 'components/atom/CheckBox';
import Label from 'components/atom/Label';
import React, { ChangeEvent } from 'react';

interface IProps {
    className?:string,
    inputLabel:string,
    inputId:string,
    inputName:any,
    inputValue:any,
    checkState:boolean,
    onInputChange?:(e:ChangeEvent<HTMLInputElement>)=>void
}

export const InputSidebarCheckBoxBlock:React.FC<IProps> = ({className, inputLabel, inputId, inputName, inputValue, checkState, onInputChange}) => {
  return (
    <div className={`inputsidebar__inputwrap ${className}`}>
        <span className="inputsidebar__label">{inputLabel}</span>
        <div className="inputsidebar__checkboxwrap checkbox">
            <CheckBox name={inputName} id={inputId} className="checkbox__input" value={inputValue} defaultChecked={checkState} onChange={onInputChange}
            />
            <Label htmlFor={inputId} className="checkbox__label">
                <div className="checkbox__mark"></div>
            </Label>
        </div>
    </div>
  )
};
