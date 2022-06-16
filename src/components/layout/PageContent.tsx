import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string
}

const PageContent:React.FC<IProps> = ({children, className=""}) => {
  return ( 
    <div className={`page__body content ${className}`}>
      {
        children
      }
    </div>
  );
};

export default PageContent;
