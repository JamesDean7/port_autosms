import React, { useState } from 'react';

const usePagination = () => {

    const [pagination, setPagination] = useState({
        current:0,
        dataListNum:10,
        blockDisplayNum:5,
    });

    const handlePagination = (currentPage:number) => {
        setPagination({
            ...pagination,
            current:currentPage
        })
    }

  return {pagination, setPagination, handlePagination};

};

export default usePagination;
