import { TDateFormatHours } from "types/types";
import { months_kor } from "./calendarValues";

/* :::::::::::::::::::::

Validation

::::::::::::::::::::: */


export const checkEmail = (email:any) => {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

export const checkOnlyNumber = (target:any) => {
    return  /^\d+$/.test(target);
}

export const checkPhoneNumber = (phone:any) => {
    var number = phone.split('-').join('');
    var regPhone = /^((01[1|6|7|8|9])[0-9]+[0-9]{6,7})|(010[0-9][0-9]{7})$/;
    return regPhone.test(number);
}

export const checkIsEmpty = (target:any) => {
    if(target.length < 1) {
        return false;
    }
    return true;
}

export const checkLengthValid = (target:any, length:number) => {
    if(length) {
        if(target.length >= length) {
            return true
        }
        if(target.length < length) {
            return false
        }
    }
}

export const checkIsPastDay = (selectedDay:Date) => {
    const targetDate = selectedDay.setHours(0,0,0,0);
    const today = new Date().setHours(0,0,0,0);
    // 비교를 위한 time은 timestamp형식으로
    return targetDate < today ? true : false;
}

export const checkArrayIncludes = (arr:any, search:any) => {
    return arr.includes(search);
}


export const checkClassHas = (ele:any, classname:any) => {
    return ele.classList.contains(classname);
}



/* :::::::::::::::::::::

Array

::::::::::::::::::::: */

export const arrayElementRemove = (arr:any, remove:any) => {
    return arr.filter(function(itemList:any){
        return itemList !== remove
    })
}

export const arrayToStringWithComma = (arr:string[]) => {
    return arr.map(function(arrList:any, index:any){
        return arr.length-1 === index ? arrList : arrList + ', ';
    }).join('');
}




/* :::::::::::::::::::::

String

::::::::::::::::::::: */

export const stringTrucate = (content:any, num:number, dots?:boolean) => {
    return content.substring(0, num) + `${dots ? '...' : ''}`;
}





/* :::::::::::::::::::::

Convert

::::::::::::::::::::: */

export const returnHTML = (target:any) => {
    return target.innerHTML;
}

export const timeToAMPM = (time:number) => {

    if(time === 24) {
        const time_midnight = time - 12; 
        return `오전 ${time_midnight}시`;
    }
    if(time < 12) {
        return `오전 ${time}시`;
    }
    if(time >= 12) {
        const time_afternoon = time - 12; 
        return `오후 ${time_afternoon === 0 ? 12 : time_afternoon}시`;
    }
    
}

export const numberToTime = (time:number) => {

    if(time < 10) {
        return `0${time}:00`
    }else {
        return `${time}:00`;
    }

}

export const dateToAMPM = (date:Date) => {
    const _date = date;
    return timeToAMPM(_date.getHours());
}




/* :::::::::::::::::::::

Formmat

::::::::::::::::::::: */

export const removeWhiteSpace = (target:string) => {
    return target.replace(/\s/g, "");
}


export const monthFormat = (month:number) => {
    return months_kor[month];
}

export const priceFormat = (price:number)=> {
   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const dateInfoFormat = (date:Date, hours?:TDateFormatHours) => {

    let resultDate = '';
    const returnDate = new Date(date);
    const _year = returnDate.getFullYear();
    const _month = returnDate.getMonth();
    const _date = returnDate.getDate();
    resultDate = `${_year}년 ${monthFormat(_month)} ${_date}일`;
    if(hours) {
        const _hours = returnDate.getHours(); 
        resultDate = `${_year}년 ${monthFormat(_month)} ${_date}일 ${timeToAMPM(_hours)}`
    }
    return resultDate;

}




/* :::::::::::::::::::::

Calculate

::::::::::::::::::::: */

export const getArrayLength = (dataArr:any[]) => {
    return dataArr.length
}


export const compareDates = (dateA:Date, dateB:Date) => {

    if(!dateA || !dateB) {
        return false;
    }

    // dataA가 dateB보다 더 뒤에 날인가 체크
    if(dateA.getTime() > dateB.getTime()) {
        return true
    }
    return false;

}

export const getNextSmsSendDate = (lastSentDate:Date, period:number) => {

    const nextSendDate = new Date(lastSentDate.getFullYear(), lastSentDate.getMonth() + period, lastSentDate.getDate());
    const lastDayofnextSendDate = new Date(lastSentDate.getFullYear(), (lastSentDate.getMonth() + 1 ) + period, 0);

    // 타겟 달에 해당 날짜가 없어 그 다음날로 넘어갈 경우 타겟 달의 마지막날을 리턴.
    if(compareDates(nextSendDate, lastDayofnextSendDate)) {
        return lastDayofnextSendDate;
    }

    return nextSendDate;

}




/* :::::::::::::::::::::

Date

::::::::::::::::::::: */

export const getTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date();
    return new Date(tomorrow.setDate(today.getDate() + 1));
}

export const getYesterday = () => {
    const today = new Date();
    const yesterday = new Date();
    return new Date(yesterday.setDate(today.getDate() - 1));
}

export const setDateHours = (date:Date, hour:number) => {
    const new_date = date.setHours(hour);
    return new Date(new_date);
}

export const getTodayMidnight = () => {
    const t_midnight = new Date();
    return new Date(t_midnight.setHours(0));
}




/* ::::::::::::::::::::::::::::::::::::

    Pagination

:::::::::::::::::::::::::::::::::::: */


export const zeroBasedPaginationValue = (current:number) => {
    
    const currentMinus = current -1;
    if(currentMinus < 0) {
        return 0;
    }
    return currentMinus;
}


export const pagiInfoProcess = (data:any, pagination:any) => {

    const currentValue = pagination.current === 0 ? 1 : pagination.current;
    const pageTotalNum = Math.ceil(data / pagination.dataListNum);
    const blockTotalNum = Math.ceil(pageTotalNum / pagination.blockDisplayNum);
    const blockCurrent = Math.ceil(currentValue / pagination.blockDisplayNum);
    let firstPage = (blockCurrent * pagination.blockDisplayNum) - (pagination.blockDisplayNum - 1);
    let endPage = blockCurrent * pagination.blockDisplayNum;

    if(firstPage <= 1) {
        firstPage = 1;
    }

    if(endPage >= pageTotalNum) {
        endPage = pageTotalNum;
    }
 
    let pagiInfo = {
        current : currentValue,
        dataListNum : pagination.dataListNum,
        blockDisplayNum : pagination.blockDisplayNum,
        pageTotalNum : pageTotalNum,
        blockTotalNum : blockTotalNum,
        blockCurrent: blockCurrent,
        firstPage: firstPage,
        endPage:endPage
    }

    console.log(' :::::: Page Info Processed :::::: '); 
    console.log(pagiInfo); 

    return pagiInfo;

}


export const paginationHandler = (move:string, pageInfo:any, pagination:any) => {

    switch(move) {
        case 'next':
            return pageInfo.endPage + 1;
            
        case 'last':
            return pageInfo.pageTotalNum;

        case 'prev':
            return pageInfo.firstPage - pagination.blockDisplayNum;

        case 'first':
            return 1;

        default:
    }

}
