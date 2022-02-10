/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditPlace
// ====================================================

export interface EditPlace_EditPlace {
  __typename: "EditPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface EditPlace {
  EditPlace: EditPlace_EditPlace;
}

export interface EditPlaceVariables {
  editPlaceId: number;
  isFav?: boolean | null;
}
