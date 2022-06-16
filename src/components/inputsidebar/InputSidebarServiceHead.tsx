import Icon from 'components/atom/Icon';
import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string,
    title:string,
    subtitle:string
}

const InputSidebarServiceHead:React.FC<IProps> = ({children, className="", title, subtitle}) => {
  return (
      <>
        <div className={`inputsidebar__titlewrap ${className}`}>
            <h2 className="inputsidebar__title">{title}</h2>
            <p className='inputsidebar__subtitle'>{subtitle}</p>
        </div>
        {
            children
        }
      </>
  )
};

export default InputSidebarServiceHead;
