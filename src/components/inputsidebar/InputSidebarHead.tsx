import Icon from 'components/atom/Icon';
import React from 'react';

interface IProps {
    children?:React.ReactNode | React.ReactNode[],
    className?:string,
    icon:any,
    title:string,
    subtitle:string
}

const InputSidebarHead:React.FC<IProps> = ({children, className="", icon, title, subtitle}) => {
  return (
    <div className="inputsidebar__head">
        <div className={`inputsidebar__iconwrap ${className}`}>
            <Icon parentTag="span"
                    parentClass="inputsidebar__icon"
                    icon={icon}
            />
        </div>
        <div className="inputsidebar__titlewrap">
            <h2 className="inputsidebar__title">{title}</h2>
            <p className='inputsidebar__subtitle'>{subtitle}</p>
        </div>
        {
            children
        }
    </div>
  )
};

export default InputSidebarHead;
