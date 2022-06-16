
export type TDays_Keys = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
export type TDateFormatHours = "withHour"; 
export type TModalAction = "open" | "close";


/* ::::::::::::: Generics ::::::::::::: */

export type TInterfaceToLiteral<T> = keyof T;




/* ::::::::::::: Common Types ::::::::::::: */


export type TPageDesc = {
    title:any
    subtitle:any
}

export type TPageInfo<DATALIST, SEARCH> = {
    datalist:DATALIST,
    search?:SEARCH,
    pagination:any
}

export type TPagination = {
    paginationState:any,
    paginationInfo:any
}

export type TEditBarMode = "add" | "edit" | "serviceadd" | "serviceedit" ;

export type TEditBarState = {
    mode:TEditBarMode,
    title:string,
    subtitle:string
}

export type TPageSearchOption = "search" | "filter";

export type TInputType = "text" | "number" | "password" | "hidden" | "checkbox";


/* ::::::::::::: Admin - Member ::::::::::::: */



/* ::::::::::::: Admin - Product ::::::::::::: */




/* ::::::::::::: Admin - SMS ::::::::::::: */




/* ::::::::::::: Admin - SMS Histroy ::::::::::::: */




/* ::::::::::::: Admin - PaymentMemo ::::::::::::: */