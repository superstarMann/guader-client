/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePlace
// ====================================================

export interface DeletePlace_DeletePlace {
  __typename: "DeletePlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface DeletePlace {
  DeletePlace: DeletePlace_DeletePlace;
}

export interface DeletePlaceVariables {
  placeId: number;
}
