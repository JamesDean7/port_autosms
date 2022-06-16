import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string
}

const InputSidebar:React.FC<IProps> = ({children, className=""}) => {
  return (
    <div className={`inputsidebar ${className}`}>
      <div className="inputsidebar__container">
        {
            children
        }
      </div>
    </div>
  )
};

export default InputSidebar;
