import { svg_search } from 'assets/svg'
import Button from 'components/atom/Button'
import InputLabeled from 'components/atom/InputLabeled'
import React, { HTMLAttributes, useState } from 'react'
import { TPageSearchOption } from 'types/types'

interface IProps {
    className:string
    handleSearch:(action:TPageSearchOption, keyword:any)=>void
}

const SearchBar:React.FC<IProps> = ({className, handleSearch}) => {

    const [searchKeyword, setSearchKeywrod] = useState('');

    const handleSearchKeyword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeywrod(e.target.value);
    }

    const handlePressEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
        console.log('down');
        if(e.code === "Enter" || e.code === "NumpadEnter") {
            handleSearch("search", searchKeyword)
        }
    }

    return (
        <div className={className}>
            <InputLabeled 
                labelClass={"searchbar__label"}
                type="text"
                inputClass={"searchbar__input"}
                placeholder={"이름별 검색 ..."}
                value={""}
                autoComplete={"off"}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleSearchKeyword(e)}}
                onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>)=>{handlePressEnter(e)}}
            />
            <Button className="searchbar__button"
                    onClick={()=>{handleSearch("search", searchKeyword)}}>
                <span className="searchbar__svgwrap" dangerouslySetInnerHTML={{__html:svg_search}}></span>
            </Button>
        </div>
    )
}

export default SearchBar
