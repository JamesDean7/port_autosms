import Icon from 'components/atom/Icon';
import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string,
}

const InputSidebarInfoBox:React.FC<IProps> = ({children, className=""}) => {
  return (
    <div className={`inputsidebar__infobox infobox ${className}`}>
        {
            children
        }
    </div>
  )
};

export default InputSidebarInfoBox;
