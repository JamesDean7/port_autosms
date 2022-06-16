import Icon from 'components/atom/Icon';
import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string,
}

const InputSidebarService:React.FC<IProps> = ({children, className=""}) => {
  return (
    <div className={`inputsidebar__servicewrap ${className}`}>
        {
            children
        }
    </div>
  )
};

export default InputSidebarService;
