/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EmailSignUp
// ====================================================

export interface EmailSignUp_EmailSignUp {
  __typename: "EmailSignUpResponse";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface EmailSignUp {
  EmailSignUp: EmailSignUp_EmailSignUp;
}

export interface EmailSignUpVariables {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: string;
  phoneNumber: string;
  profilePhoto: string;
}
