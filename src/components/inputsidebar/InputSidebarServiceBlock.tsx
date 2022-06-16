import Icon from 'components/atom/Icon';
import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string,
    onBlockClick:()=>void
}

const InputSidebarServiceBlock:React.FC<IProps> = ({children, className="", onBlockClick}) => {
  return (
    <div className={`inputsidebar__serviceblock ${className}`} onClick={onBlockClick}>
        {
            children
        }
    </div>
  )
};

export default InputSidebarServiceBlock;
