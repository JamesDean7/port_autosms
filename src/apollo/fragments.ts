import { gql } from '@apollo/client';

export const FRA_MEMBERDATA = gql`
    fragment fraMemberData on Member {
        _id
        createdAt
        updatedAt
        name
        phone
        address
        extraMemo
    }
`;

export const FRA_MYSERVICE = gql`
    fragment fraMyService on MyService  {
        itemId
        itemName
        itemPeriods
        itemPrice
        startDate
        endDate
        lastSmsSent
        nextSmsSend
    }
`;


