import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string
}

const PageContentFoot:React.FC<IProps> = ({children, className=""}) => {
  return ( 
    <div className={`content__foot ${className}`}>
        {
            children
        }
    </div>
  );
};

export default PageContentFoot;
