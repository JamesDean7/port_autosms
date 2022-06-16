import Icon from 'components/atom/Icon';
import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string,
}

const InputSidebarServiceBlockInfo:React.FC<IProps> = ({children, className=""}) => {
  return (
    <div className={`inputsidebar__service ${className}`}>
        {
            children
        }
    </div>
  )
};

export default InputSidebarServiceBlockInfo;
