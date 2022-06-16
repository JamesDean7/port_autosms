import Button from 'components/atom/Button';
import Icon from 'components/atom/Icon';
import React from 'react';
import { TModalAction } from 'types/types';

interface IProps {
    className?:string,
    buttonName:string,
    onButtonClick:()=>void
}

const InputSidebarBtn:React.FC<IProps> = ({className="", buttonName, onButtonClick}) => {
  return (
    <Button className={`inputsidebar__btn ${className}`}
            onClick={onButtonClick}>
        {buttonName}
    </Button>
  )
};

export default InputSidebarBtn;
