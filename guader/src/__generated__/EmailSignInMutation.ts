/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EmailSignInMutation
// ====================================================

export interface EmailSignInMutation_EmailSignIn {
  __typename: "EmailSignInResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInMutation {
  EmailSignIn: EmailSignInMutation_EmailSignIn;
}

export interface EmailSignInMutationVariables {
  email: string;
  password: string;
}
