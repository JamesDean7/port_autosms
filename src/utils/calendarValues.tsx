import { TDays_Keys } from "types/types";


export const days_kor = ['일','월', '화', '수', '목', '금', '토'];
export const schedule_key:TDays_Keys = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']; 
export const currentYear = new Date().getFullYear();
export const currentMonth = new Date().getMonth();
export const currentDay = new Date().getDay();
export const fromThisMonth = new Date(currentYear, currentMonth);
export const months_kor = [
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

