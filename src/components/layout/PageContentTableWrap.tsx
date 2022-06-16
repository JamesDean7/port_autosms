import React from 'react';

interface IProps {
    children:React.ReactNode | React.ReactNode[],
    className?:string
}

const PageContentTableWrap:React.FC<IProps> = ({children, className=""}) => {
  return ( 
    <section className={`content__tablewrap ${className}`}>
        {
            children
        }
    </section>
  );
};

export default PageContentTableWrap;
