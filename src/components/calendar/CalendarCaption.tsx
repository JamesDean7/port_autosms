import React from 'react'

const months_kor = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
];


const CalendarCaption = ({date}:any) => {
    return (
        <div className="DayPicker-Caption" role="heading" aria-live="polite">
            <div>
                {
                    ` ${date.getFullYear()}년  ${months_kor[date.getMonth()]}`
                }
            </div>
        </div>
    )
}

export default CalendarCaption
