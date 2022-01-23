/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyProfile
// ====================================================

export interface GetMyProfile_GetMyProfile_user {
  __typename: "User";
  profilePhoto: string | null;
  fullName: string | null;
  lastName: string;
  firstName: string;
  email: string | null;
  isProtecting: boolean;
}

export interface GetMyProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: GetMyProfile_GetMyProfile_user | null;
}

export interface GetMyProfile {
  GetMyProfile: GetMyProfile_GetMyProfile;
}
