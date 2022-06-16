import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string
}

const PageContentBody:React.FC<IProps> = ({children, className=""}) => {
  return ( 
    <div className={`content__body ${className}`}>
        {
            children
        }
    </div>
  );
};

export default PageContentBody;
