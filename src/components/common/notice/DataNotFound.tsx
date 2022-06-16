import React from 'react';

interface IProps {
    text:string
}

const DataNotFound:React.FC<IProps> = ({text}) => {
  return (
    <div className="notice">
        <div className="notice__datanotfound">{text}</div>
    </div>
  )
};

export default DataNotFound;
