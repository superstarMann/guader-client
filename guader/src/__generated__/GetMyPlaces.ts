/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyPlaces
// ====================================================

export interface GetMyPlaces_GetMyPlaces_places {
  __typename: "Place";
  id: number;
  name: string;
  userId: number;
  address: string;
}

export interface GetMyPlaces_GetMyPlaces {
  __typename: "GetMyPlacesResponse";
  ok: boolean;
  places: (GetMyPlaces_GetMyPlaces_places | null)[] | null;
  error: string | null;
}

export interface GetMyPlaces {
  GetMyPlaces: GetMyPlaces_GetMyPlaces;
}
