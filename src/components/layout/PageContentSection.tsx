import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string
}

const PageContentSection:React.FC<IProps> = ({children, className=""}) => {
  return ( 
    <div className={`content__section ${className}`}>
        {
            children
        }
    </div>
  );
};

export default PageContentSection;
