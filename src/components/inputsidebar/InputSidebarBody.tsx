import Icon from 'components/atom/Icon';
import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string,
}

const InputSidebarBody:React.FC<IProps> = ({children, className=""}) => {
  return (
    <div className={`inputsidebar__body ${className}`}>
        {
            children
        }
    </div>
  )
};

export default InputSidebarBody;
