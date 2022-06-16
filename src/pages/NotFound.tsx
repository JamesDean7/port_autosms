import Button from 'components/atom/Button'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="notfound">
            <h1 className="notfound__title">페이지를 찾을 수 없습니다</h1>
            <div className="notfound__btnwrap">
                <Link to="/" className="notFound__btn">
                    돌아가기
                </Link>
            </div>
        </div>
    )
}

export default NotFound
