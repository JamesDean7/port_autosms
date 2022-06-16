import React, { useState } from 'react'
import { TPageSearchOption } from 'types/types';

export type TUsePageSearch = {
    name:string | undefined
}

const usePageSearch = () => {
    
    const [pageSearch, setPageSearch] = useState<TUsePageSearch>({
        name:undefined
    });

    const handlePageSearch = (action:TPageSearchOption, keyword:any) => {
        
        console.log('search requested!')
        if(action === 'search') {
            setPageSearch({
                ...pageSearch,
                name:keyword
            })
        }

    }

    return {pageSearch, handlePageSearch}
}

export default usePageSearch
