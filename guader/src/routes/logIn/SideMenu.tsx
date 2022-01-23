import { gql, useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { GetMyProfile } from '../../__generated__/GetMyProfile';
import { Container, Header } from '../logOut/OutHome';

const Mheader = styled.header`
 padding: 20px;
 background-color: white;
 height: 30%;
 display: flex;
 justify-content: space-around;
 align-items: center;
 `
const MPhoto = styled.div`
color: black;
`

const MContetns = styled.div``

const MSpan = styled.div`
 color: black;
 `

export const GET_MY_PROFILE = gql`
query GetMyProfile {
    GetMyProfile {
      ok
      error
      user {
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

export const Menubar = () => {
    const {data} = useQuery<GetMyProfile>(GET_MY_PROFILE)

    return(
        <Container>
            <Mheader>
                <MPhoto>profileImage</MPhoto>
                <MContetns>
                <MSpan>{data?.GetMyProfile.user?.fullName}</MSpan>
                <MSpan>12</MSpan>
                </MContetns>
            </Mheader>
        </Container>
    )
}