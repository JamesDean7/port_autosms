/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_Login
// ====================================================

export interface M_Login_Login_data {
  __typename: "Admin";
  token: string;
  _id: string;
  name: string | null;
}

export interface M_Login_Login {
  __typename: "LoginResponse";
  ok: boolean;
  error: string | null;
  data: M_Login_Login_data | null;
}

export interface M_Login {
  Login: M_Login_Login;
}

export interface M_LoginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Q_MemberList
// ====================================================

export interface Q_MemberList_MemberList_pageInfo {
  __typename: "OffsetPagingInfo";
  /**
   * 선택한 페이지 번호
   */
  pageIndex: number;
}

export interface Q_MemberList_MemberList_items_myServices {
  __typename: "MyService";
  itemId: string | null;
  itemName: string | null;
  itemPeriods: number | null;
  itemPrice: number | null;
  startDate: any;
  endDate: any | null;
  lastSmsSent: any | null;
  nextSmsSend: any | null;
}

export interface Q_MemberList_MemberList_items {
  __typename: "Member";
  _id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  phone: string | null;
  address: string | null;
  extraMemo: string | null;
  myServices: Q_MemberList_MemberList_items_myServices[] | null;
}

export interface Q_MemberList_MemberList {
  __typename: "OffsetPagenatedMemberData";
  pageInfo: Q_MemberList_MemberList_pageInfo | null;
  items: Q_MemberList_MemberList_items[];
}

export interface Q_MemberList {
  MemberList: Q_MemberList_MemberList;
}

export interface Q_MemberListVariables {
  sort?: _MemberSort[] | null;
  filter?: _MemberFilter | null;
  pagingInput: OffsetPagingInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_MemberCreate
// ====================================================

export interface M_MemberCreate_MemberCreate_data_myServices {
  __typename: "MyService";
  itemId: string | null;
  itemName: string | null;
  itemPeriods: number | null;
  itemPrice: number | null;
  startDate: any;
  endDate: any | null;
  lastSmsSent: any | null;
  nextSmsSend: any | null;
}

export interface M_MemberCreate_MemberCreate_data {
  __typename: "Member";
  _id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  phone: string | null;
  address: string | null;
  extraMemo: string | null;
  myServices: M_MemberCreate_MemberCreate_data_myServices[] | null;
}

export interface M_MemberCreate_MemberCreate {
  __typename: "MemberResponse";
  ok: boolean;
  error: string | null;
  data: M_MemberCreate_MemberCreate_data | null;
}

export interface M_MemberCreate {
  MemberCreate: M_MemberCreate_MemberCreate;
}

export interface M_MemberCreateVariables {
  name: string;
  myServices: MyServiceInput[];
  phone: string;
  address: string;
  extraMemo: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_MemberUpdate
// ====================================================

export interface M_MemberUpdate_MemberUpdate_data_myServices {
  __typename: "MyService";
  itemId: string | null;
  itemName: string | null;
  itemPeriods: number | null;
  itemPrice: number | null;
  startDate: any;
  endDate: any | null;
  lastSmsSent: any | null;
  nextSmsSend: any | null;
}

export interface M_MemberUpdate_MemberUpdate_data {
  __typename: "Member";
  _id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  phone: string | null;
  address: string | null;
  extraMemo: string | null;
  myServices: M_MemberUpdate_MemberUpdate_data_myServices[] | null;
}

export interface M_MemberUpdate_MemberUpdate {
  __typename: "MemberResponse";
  ok: boolean;
  error: string | null;
  data: M_MemberUpdate_MemberUpdate_data | null;
}

export interface M_MemberUpdate {
  MemberUpdate: M_MemberUpdate_MemberUpdate;
}

export interface M_MemberUpdateVariables {
  id: string;
  name: string;
  myServices: MyServiceInput[];
  phone?: string | null;
  extraMemo?: string | null;
  address?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_MemberDelete
// ====================================================

export interface M_MemberDelete_MemberDelete_data {
  __typename: "Member";
  _id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  phone: string | null;
  address: string | null;
  extraMemo: string | null;
}

export interface M_MemberDelete_MemberDelete {
  __typename: "MemberResponse";
  ok: boolean;
  error: string | null;
  data: M_MemberDelete_MemberDelete_data | null;
}

export interface M_MemberDelete {
  MemberDelete: M_MemberDelete_MemberDelete;
}

export interface M_MemberDeleteVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Q_ProductList
// ====================================================

export interface Q_ProductList_ProductList_pageInfo {
  __typename: "OffsetPagingInfo";
  /**
   * 선택한 페이지 번호
   */
  pageIndex: number;
}

export interface Q_ProductList_ProductList_items {
  __typename: "Product";
  _id: string;
  name: string;
  price: number;
}

export interface Q_ProductList_ProductList {
  __typename: "OffsetPagenatedProductData";
  pageInfo: Q_ProductList_ProductList_pageInfo | null;
  items: Q_ProductList_ProductList_items[];
}

export interface Q_ProductList {
  ProductList: Q_ProductList_ProductList;
}

export interface Q_ProductListVariables {
  filter?: _ProductFilter | null;
  pagingInput: OffsetPagingInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_ProductCreate
// ====================================================

export interface M_ProductCreate_ProductCreate_data {
  __typename: "Product";
  name: string;
  price: number;
}

export interface M_ProductCreate_ProductCreate {
  __typename: "ProductResponse";
  ok: boolean;
  error: string | null;
  data: M_ProductCreate_ProductCreate_data | null;
}

export interface M_ProductCreate {
  ProductCreate: M_ProductCreate_ProductCreate;
}

export interface M_ProductCreateVariables {
  name: string;
  price: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_ProductUpdate
// ====================================================

export interface M_ProductUpdate_ProductUpdate_data {
  __typename: "Product";
  name: string;
  price: number;
}

export interface M_ProductUpdate_ProductUpdate {
  __typename: "ProductResponse";
  ok: boolean;
  error: string | null;
  data: M_ProductUpdate_ProductUpdate_data | null;
}

export interface M_ProductUpdate {
  ProductUpdate: M_ProductUpdate_ProductUpdate;
}

export interface M_ProductUpdateVariables {
  id: string;
  name: string;
  price: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_ProductDelete
// ====================================================

export interface M_ProductDelete_ProductDelete_data {
  __typename: "Product";
  name: string;
  price: number;
}

export interface M_ProductDelete_ProductDelete {
  __typename: "ProductResponse";
  ok: boolean;
  error: string | null;
  data: M_ProductDelete_ProductDelete_data | null;
}

export interface M_ProductDelete {
  ProductDelete: M_ProductDelete_ProductDelete;
}

export interface M_ProductDeleteVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Q_Message
// ====================================================

export interface Q_Message_Message_pageInfo {
  __typename: "OffsetPagingInfo";
  /**
   * 선택한 페이지 번호
   */
  pageIndex: number;
}

export interface Q_Message_Message_items {
  __typename: "Message";
  _id: string;
  isDeleted: boolean | null;
  smsTitle: string;
  smsDesc: string;
  smsContent: string;
  sendBefore: number;
  isUsed: boolean;
}

export interface Q_Message_Message {
  __typename: "OffsetPagenatedMessageData";
  pageInfo: Q_Message_Message_pageInfo | null;
  items: Q_Message_Message_items[];
}

export interface Q_Message {
  Message: Q_Message_Message;
}

export interface Q_MessageVariables {
  pagingInput: OffsetPagingInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_MessageCreate
// ====================================================

export interface M_MessageCreate_MessageCreate_data {
  __typename: "Message";
  _id: string;
  isDeleted: boolean | null;
  smsContent: string;
  sendBefore: number;
  isUsed: boolean;
}

export interface M_MessageCreate_MessageCreate {
  __typename: "MessageResponse";
  ok: boolean;
  error: string | null;
  data: M_MessageCreate_MessageCreate_data | null;
}

export interface M_MessageCreate {
  MessageCreate: M_MessageCreate_MessageCreate;
}

export interface M_MessageCreateVariables {
  smsTitle: string;
  smsDesc: string;
  smsContent: string;
  isUsed: boolean;
  sendBefore: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_MessageUpdate
// ====================================================

export interface M_MessageUpdate_MessageUpdate_data {
  __typename: "Message";
  _id: string;
  isDeleted: boolean | null;
  smsContent: string;
  sendBefore: number;
  isUsed: boolean;
}

export interface M_MessageUpdate_MessageUpdate {
  __typename: "MessageResponse";
  ok: boolean;
  error: string | null;
  data: M_MessageUpdate_MessageUpdate_data | null;
}

export interface M_MessageUpdate {
  MessageUpdate: M_MessageUpdate_MessageUpdate;
}

export interface M_MessageUpdateVariables {
  id: string;
  isUsed: boolean;
  sendBefore: number;
  smsTitle: string;
  smsDesc: string;
  smsContent: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_MessageDelete
// ====================================================

export interface M_MessageDelete_MessageDelete_data {
  __typename: "Message";
  _id: string;
  isDeleted: boolean | null;
  smsContent: string;
  sendBefore: number;
  isUsed: boolean;
}

export interface M_MessageDelete_MessageDelete {
  __typename: "MessageResponse";
  ok: boolean;
  error: string | null;
  data: M_MessageDelete_MessageDelete_data | null;
}

export interface M_MessageDelete {
  MessageDelete: M_MessageDelete_MessageDelete;
}

export interface M_MessageDeleteVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Q_PaymentMemoList
// ====================================================

export interface Q_PaymentMemoList_PaymentMemoList_pageInfo {
  __typename: "OffsetPagingInfo";
  /**
   * 선택한 페이지 번호
   */
  pageIndex: number;
}

export interface Q_PaymentMemoList_PaymentMemoList_items {
  __typename: "PaymentMemo";
  _id: string;
  memo: string;
  isUsed: boolean;
  memoTitle: string;
  memoDesc: string;
}

export interface Q_PaymentMemoList_PaymentMemoList {
  __typename: "OffsetPagenatedPaymentMemoData";
  pageInfo: Q_PaymentMemoList_PaymentMemoList_pageInfo | null;
  items: Q_PaymentMemoList_PaymentMemoList_items[];
}

export interface Q_PaymentMemoList {
  PaymentMemoList: Q_PaymentMemoList_PaymentMemoList;
}

export interface Q_PaymentMemoListVariables {
  pagingInput: OffsetPagingInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_PaymentMemoCreate
// ====================================================

export interface M_PaymentMemoCreate_PaymentMemoCreate_data {
  __typename: "PaymentMemo";
  _id: string;
  memo: string;
  isUsed: boolean;
}

export interface M_PaymentMemoCreate_PaymentMemoCreate {
  __typename: "PaymentMemoResponse";
  ok: boolean;
  error: string | null;
  data: M_PaymentMemoCreate_PaymentMemoCreate_data | null;
}

export interface M_PaymentMemoCreate {
  PaymentMemoCreate: M_PaymentMemoCreate_PaymentMemoCreate;
}

export interface M_PaymentMemoCreateVariables {
  memoTitle: string;
  memoDesc: string;
  memo: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: M_PaymentMemoUpdate
// ====================================================

export interface M_PaymentMemoUpdate_PaymentMemoUpdate_data {
  __typename: "PaymentMemo";
  memo: string;
  isUsed: boolean;
}

export interface M_PaymentMemoUpdate_PaymentMemoUpdate {
  __typename: "PaymentMemoResponse";
  ok: boolean;
  error: string | null;
  data: M_PaymentMemoUpdate_PaymentMemoUpdate_data | null;
}

export interface M_PaymentMemoUpdate {
  PaymentMemoUpdate: M_PaymentMemoUpdate_PaymentMemoUpdate;
}

export interface M_PaymentMemoUpdateVariables {
  id: string;
  isUsed: boolean;
  memoTitle: string;
  memoDesc: string;
  memo: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Q_MessageHistoryList
// ====================================================

export interface Q_MessageHistoryList_MessageHistoryList_pageInfo {
  __typename: "OffsetPagingInfo";
  /**
   * 선택한 페이지 번호
   */
  pageIndex: number;
}

export interface Q_MessageHistoryList_MessageHistoryList_items {
  __typename: "MessageHistory";
  _id: string;
  username: string;
  serviceName: string;
  sentDate: any;
  sentMessage: string;
}

export interface Q_MessageHistoryList_MessageHistoryList {
  __typename: "OffsetPagenatedMessageHistoryData";
  pageInfo: Q_MessageHistoryList_MessageHistoryList_pageInfo | null;
  items: Q_MessageHistoryList_MessageHistoryList_items[];
}

export interface Q_MessageHistoryList {
  MessageHistoryList: Q_MessageHistoryList_MessageHistoryList;
}

export interface Q_MessageHistoryListVariables {
  pagingInput: OffsetPagingInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: fraMemberData
// ====================================================

export interface fraMemberData {
  __typename: "Member";
  _id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  phone: string | null;
  address: string | null;
  extraMemo: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: fraMyService
// ====================================================

export interface fraMyService {
  __typename: "MyService";
  itemId: string | null;
  itemName: string | null;
  itemPeriods: number | null;
  itemPrice: number | null;
  startDate: any;
  endDate: any | null;
  lastSmsSent: any | null;
  nextSmsSend: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Auto generated sort type
 */
export enum _MemberSort {
  createdAt__asc = "createdAt__asc",
  createdAt__desc = "createdAt__desc",
  name__asc = "name__asc",
  name__desc = "name__desc",
}

export interface MyServiceInput {
  itemId?: string | null;
  startDate: any;
  endDate?: any | null;
  itemName?: string | null;
  itemPeriods?: number | null;
  itemPrice?: number | null;
  lastSmsSent?: any | null;
  nextSmsSend?: any | null;
}

export interface OffsetPagingInput {
  pageIndex: number;
  pageItemCount: number;
}

export interface _MemberFilter {
  AND?: _MemberFilter[] | null;
  elemMatch?: _MemberFilter | null;
  OR?: _MemberFilter[] | null;
  name__eq?: string | null;
  name__not_eq?: string | null;
  name__contains?: string | null;
  myServices_itemId__eq?: string | null;
  myServices_itemId__not_eq?: string | null;
  myServices_itemName__eq?: string | null;
  myServices_itemName__not_eq?: string | null;
  isDeleted__eq?: string | null;
  isDeleted__not_eq?: string | null;
}

export interface _ProductFilter {
  AND?: _ProductFilter[] | null;
  elemMatch?: _ProductFilter | null;
  OR?: _ProductFilter[] | null;
  name__eq?: string | null;
  name__not_eq?: string | null;
  price__eq?: string | null;
  price__not_eq?: string | null;
  price__gte?: string | null;
  price__lte?: string | null;
  isDeleted__eq?: string | null;
  isDeleted__not_eq?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
