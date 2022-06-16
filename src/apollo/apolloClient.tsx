import React from 'react'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat  } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import dotenv from "dotenv"
import { token_name } from 'utils/tokenInfo';
import {createUploadLink } from 'apollo-upload-client';

dotenv.config({
    path: "../../env"
})

const httpLink:any = createUploadLink({ 
  // uri: `${process.env.REACT_APP_SERVER_URI}`,
  uri: `${'http://localhost:4000/graphql'}`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${localStorage.getItem(token_name)} || null`,
      }
    });
    return forward(operation);
})
  
const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
});
  
export default client;
