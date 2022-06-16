import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string
}

const PageContentHeadBlock:React.FC<IProps> = ({children, className=""}) => {
  return ( 
    <div className={`content__headblock ${className}`}>
        {
            children
        }
    </div>
  );
};

export default PageContentHeadBlock;
