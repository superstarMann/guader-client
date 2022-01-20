import React from 'react';
import {gql} from "@apollo/client"

export const GET_CHAT = gql`
query ExampleQuery {
  GetMyPlaces {
    ok
  }
}
`;

export const AddPlace = () => <span>AddPlace</span>