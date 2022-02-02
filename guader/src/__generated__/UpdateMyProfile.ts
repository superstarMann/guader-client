/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMyProfile
// ====================================================

export interface UpdateMyProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface UpdateMyProfile {
  UpdateMyProfile: UpdateMyProfile_UpdateMyProfile;
}

export interface UpdateMyProfileVariables {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  profilePhoto?: string | null;
}
