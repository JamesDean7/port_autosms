import React from 'react';

interface IProps {
    className?:string,
    title:string,
    subtitle:string,
}

const PageHead:React.FC<IProps> = ({className="", title, subtitle}) => {
  return (
    <div className={`page__head ${className}`}>
        <h1 className="page__title">{title}</h1>
        <p className="page__intro">{subtitle}</p>
    </div>
  )
};

export default PageHead;
