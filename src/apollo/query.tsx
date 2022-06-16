import { gql } from "@apollo/client";
import { FRA_MEMBERDATA, FRA_MYSERVICE } from "./fragments";


/* ::::::::::::: Login ::::::::::::: */

export const M_LOGIN = gql`
  mutation M_Login(
    $email:String!,
    $password:String!,
  ) 
  {
    Login(
      email:$email,
      password:$password,
    )
    {
      ok
      error
      data {
        token
        _id
        name
      }
    }
}`;



/* ::::::::::::: Member ::::::::::::: */
  
export const Q_MEMBER_LIST = gql`
  ${FRA_MEMBERDATA}
  ${FRA_MYSERVICE}
  query Q_MemberList(
    $sort:[_MemberSort!]
    $filter:_MemberFilter
    $pagingInput: OffsetPagingInput!
  ) 
  {
    MemberList(
      sort:$sort
      filter:$filter
      pagingInput:$pagingInput
    ){
        pageInfo {
          pageIndex
        }
        items {
          ...fraMemberData
          myServices {
            ...fraMyService
          }
        }
    }
}`;


export const M_MEMBER_CREATE = gql`
  ${FRA_MEMBERDATA}
  ${FRA_MYSERVICE}
  mutation M_MemberCreate(
    $name:String!,
    $myServices: [MyServiceInput!]!,
    $phone:String!,
    $address:String!,
    $extraMemo:String!
  ) 
  {
    MemberCreate(
      name:$name,
      myServices:$myServices,
      phone:$phone,
      address:$address,
      extraMemo:$extraMemo
    )
    {
      ok
      error
      data {
       ...fraMemberData
        myServices {
          ...fraMyService
        }
      }
    }
}`;


export const M_MEMBER_UPDATE = gql`
  ${FRA_MEMBERDATA}
  ${FRA_MYSERVICE}
  mutation M_MemberUpdate(
    $id:String!
    $name:String!,
    $myServices: [MyServiceInput!]!,
    $phone:String,
    $extraMemo:String,
    $address:String
  ) 
  {
    MemberUpdate(
      id:$id,
      name:$name,
      myServices:$myServices,
      phone:$phone,
      extraMemo:$extraMemo,
      address:$address
    )
    {
      ok
      error
      data {
        ...fraMemberData
        myServices {
          ...fraMyService
        }
      }
    }
}`;


export const M_MEMBER_DELETE = gql`
  ${FRA_MEMBERDATA}
  mutation M_MemberDelete(
    $id:String!
  ) 
  {
    MemberDelete(
      id:$id,
    )
    {
      ok
      error
      data {
        ...fraMemberData
      }
    }
}`;





/* ::::::::::::: Product ::::::::::::: */

export const Q_PRODUCT_LIST = gql`
  query Q_ProductList(
    $filter:_ProductFilter
    $pagingInput: OffsetPagingInput!
  ) 
  {
    ProductList(
      filter:$filter
      pagingInput:$pagingInput
    ){
        pageInfo {
          pageIndex
        }
        items {
          _id
          name
          price
        }
    }
}`;


export const M_PRODUCT_CREATE = gql`
  mutation M_ProductCreate(
    $name:String!,
    $price:Float!,
  ) 
  {
    ProductCreate(
      name:$name,
      price:$price,
    )
    {
      ok
      error
      data {
        name
        price
      }
    }
}`;


export const M_PRODUCT_UPDATE = gql`
  mutation M_ProductUpdate(
    $id:String!,
    $name:String!,
    $price:Float!,
  ) 
  {
    ProductUpdate(
      id:$id,
      name:$name,
      price:$price,
    )
    {
      ok
      error
      data {
        name
        price
      }
    }
}`;


export const M_PRODUCT_DELETE = gql`
  mutation M_ProductDelete(
    $id:String!
  ) 
  {
    ProductDelete(
      id:$id,
    )
    {
      ok
      error
      data {
        name
        price
      }
    }
}`;


/* ::::::::::::: Message ::::::::::::: */

export const Q_MESSAGE_LIST = gql`
  query Q_Message(
    $pagingInput: OffsetPagingInput!
  ) 
  {
    Message(pagingInput:$pagingInput){
      pageInfo {
        pageIndex
      }
      items {
        _id
        isDeleted
        smsTitle
        smsDesc
        smsContent
        sendBefore
        isUsed
      }
    }
  }`;

 export const M_MESSAGE_CREATE = gql`
  mutation M_MessageCreate(
    $smsTitle:String!,
    $smsDesc:String!,
    $smsContent:String!,
    $isUsed:Boolean!,
    $sendBefore:Float!,
  ) 
  {
    MessageCreate(
      smsTitle:$smsTitle
      smsDesc:$smsDesc
      smsContent:$smsContent
      isUsed:$isUsed,
      sendBefore:$sendBefore,
    )
    {
      ok
      error
      data {
        _id
        isDeleted
        smsContent
        sendBefore
        isUsed
      }
    }
}`;


export const M_MESSAGE_UPDATE = gql`
mutation M_MessageUpdate(
  $id:String!,
  $isUsed:Boolean!,
  $sendBefore:Float!,
  $smsTitle:String!,
  $smsDesc:String!,
  $smsContent:String!,
) 
{
  MessageUpdate(
    id:$id,
    isUsed:$isUsed,
    sendBefore:$sendBefore,
    smsTitle:$smsTitle,
    smsDesc:$smsDesc,
    smsContent:$smsContent
  )
  {
    ok
    error
    data {
      _id
      isDeleted
      smsContent
      sendBefore
      isUsed
    }
  }
}`;


export const M_MESSAGE_DELETE = gql`
mutation M_MessageDelete(
  $id:String!,
) 
{
  MessageDelete(
    id:$id,
  )
  {
    ok
    error
    data {
      _id
      isDeleted
      smsContent
      sendBefore
      isUsed
    }
  }
}`;




/* ::::::::::::: Payment Memo ::::::::::::: */

export const Q_PAYMENTMEMO_LIST = gql`
  query Q_PaymentMemoList (
    $pagingInput: OffsetPagingInput!
  )
  {
    PaymentMemoList (pagingInput:$pagingInput)
    {
      pageInfo {
        pageIndex
      }
      items {
        _id
        memo
        isUsed
        memoTitle
        memoDesc 
      }
    }
  }`;


 export const M_PAYMENTMEMO_CREATE = gql`
  mutation M_PaymentMemoCreate(
    $memoTitle:String!,
    $memoDesc:String!,
    $memo:String!,
  ) 
  {
    PaymentMemoCreate(
      memoTitle:$memoTitle,
      memoDesc:$memoDesc,
      memo:$memo,
    )
    {
      ok
      error
      data {
        _id
        memo
        isUsed
      }
    }
}`;


export const M_PAYMENTMEMO_UPDATE = gql`
mutation M_PaymentMemoUpdate(
  $id:String!,
  $isUsed:Boolean!,
  $memoTitle:String!,
  $memoDesc:String!,
  $memo:String!
) 
{
  PaymentMemoUpdate(
    id:$id,
    isUsed:$isUsed,
    memoTitle:$memoTitle,
    memoDesc:$memoDesc,
    memo:$memo,
  )
  {
    ok
    error
    data {
      memo
      isUsed
    }
  }
}`;



/* ::::::::::::: Sms History ::::::::::::: */

export const Q_MESSAGEHISTORY_LIST = gql`
  query Q_MessageHistoryList(
    $pagingInput: OffsetPagingInput!
  ) 
  {
    MessageHistoryList(pagingInput:$pagingInput){
      pageInfo {
        pageIndex
      }
      items {
        _id
        username
        serviceName
        sentDate
        sentMessage
      }
    }
  }`;





