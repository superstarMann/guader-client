import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { GetMyProfile } from '../__generated__/GetMyProfile';

const GET_MY_PROFILE = gql`
query GetMyProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        profilePhoto
        fullName
        lastName
        firstName
        email
        isProtecting
      }
    }
  }
`


export const useMe = () => {
    return useQuery<GetMyProfile>(GET_MY_PROFILE)
}