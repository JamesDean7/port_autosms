import Icon from 'components/atom/Icon';
import React from 'react';

interface IProps {
    className?:string,
    blockTitle:string,
    blockContent:any,
}

const InputSidebarInfoBoxBlock:React.FC<IProps> = ({className="", blockTitle, blockContent}) => {
  return (
    <div className={`infobox__block ${className}`}>
         <div className="infobox__title">{blockTitle}</div>
        <div className="infobox__content">{blockContent}</div>
    </div>
  )
};

export default InputSidebarInfoBoxBlock;
