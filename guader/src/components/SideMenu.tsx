import React, { useState } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Container } from '../routes/logOut/OutHome';
import { Link } from 'react-router-dom';
import { useMe } from './useMe';

const Mheader = styled.header`
 padding-top: 60px;
 padding-bottom: 50px;
 padding-left: 30px;
 display: flex;
 `
const MPhoto = styled.div`
text-align: center;
font-size: 2.25rem;
line-height: 2.5rem;
`

const MContetns = styled.div`
padding-left: 10px;
text-align: center;
`

const Mtitle = styled.div`
padding-left: 5px;
font-size: 1.25rem;
line-height: 1.75rem;
`

const MSpan = styled.div`
font-size: 0.875rem;
line-height: 1.25rem;
`

const MLink = styled(Link)`
font-size: 1.125rem;
line-height: 1.75rem;
margin-left: 10px;
padding: 15px 0px;
`

const MTrue = styled.div`
font-size: 1.125rem;
line-height: 1.75rem;
padding: 10px 0px;
`

const MFalse = styled.div`
font-size: 1.125rem;
line-height: 1.75rem;
padding: 10px 0px;
`

const MItemts =styled.div`
display: flex;
flex-direction: column;
`

export const TOGGLE_PROTECT_MUTATION = gql`
mutation ToggleWalkingMode($userId: Int!) {
  ToggleWalkingMode(userId: $userId) {
    ok
    error
  }
}
`

export const Menubar = () => {
  const client = useApolloClient()
  const {data} = useMe();
  const [isToggle, setIsToggle] = useState(false);
  const onClick = () => {
      setIsToggle(!isToggle)
      if(!isToggle && data?.GetMyProfile.user){
        client.writeFragment({
          id: `User:${data?.GetMyProfile.user?.id}`,
          fragment: gql`
              fragment StartProtect on User {
                isProtecting
              }
          `,
          data:{
            isProtecting: true
          }
        })
      }else if(isToggle && data?.GetMyProfile.user?.id){
        client.writeFragment({
          id: `User${data?.GetMyProfile.user?.id}`,
          fragment: gql`
          fragment StopProtect on User{
            isProtecting
          }
          `,
          data:{
            isProtecting: false
          }
        })
      }
    }
    return(
        <Container>
            <Mheader>
                <MPhoto><FontAwesomeIcon icon={faUserCircle}/></MPhoto>
                <MContetns>
                <Mtitle>{data?.GetMyProfile.user?.fullName}</Mtitle>
                <MSpan>{data?.GetMyProfile.user?.email}</MSpan>
                </MContetns>
            </Mheader>
            <MItemts>
            <MLink to="/trips">Your Trips</MLink>
            <MLink to="/settings">Settings</MLink>
            <MLink to="/">Start Protecting</MLink>
            <button onClick={onClick}>{isToggle ? (
              <MTrue>Stop Protecting</MTrue>
            ): (<MFalse>Start Protecting</MFalse>)}</button>
            <MLink to="/">
              {data?.GetMyProfile.user?.isProtecting ? "true": "false"}
            </MLink>
            </MItemts>
        </Container>
    )
}