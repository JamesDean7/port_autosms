import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string
}

const PageContentHead:React.FC<IProps> = ({children, className=""}) => {
  return ( 
    <div className={`content__head ${className}`}>
        {
            children
        }
    </div>
  );
};

export default PageContentHead;
