import React, { useState } from'react'
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useMe } from './useMe';
import { TOGGLE_PROTECT_MUTATION } from '../routes/logIn/sideRoutes/SideMenu';
import { ToggleWalkingMode, ToggleWalkingModeVariables } from '../__generated__/ToggleWalkingMode';
import styled from 'styled-components';

const ToggleMain = styled.div`
display: flex;
gap: 10px;
`

const ToggleBtn = styled.button`
border: none;
cursor: pointer;
border-radius: 1rem;
padding: 3px 5px;
background-color: #f1c40f;
`

const Status = styled.span`

`

export const ToggleStatus= () => {
    const client = useApolloClient()
    const {data: userData} = useMe();
    const [isToggle, setIsToggle] = useState(false);
    const [toggleWalkingMode] = useMutation<ToggleWalkingMode, ToggleWalkingModeVariables>(TOGGLE_PROTECT_MUTATION)
    const onAClick = (userId: any) => {
        setIsToggle(!isToggle)
        toggleWalkingMode({
            variables:{
                userId
            }
        })
        if(!isToggle && userData?.GetMyProfile.user){
            client.writeFragment({
                id: `User:${userData.GetMyProfile.user.id}`,
                fragment: gql`
                fragment StartProtect on User {
                    isProtecting
                  }
                `,
                data:{
                    isProtecting: true
                }
            })
        }else if(isToggle && userData?.GetMyProfile.user){
            client.writeFragment({
                id: `User:${userData.GetMyProfile.user.id}`,
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
        <ToggleMain>
            <Status>{`Status: ${isToggle ? "Guader" : "User"}`}</Status>
            <ToggleBtn onClick={() => onAClick(userData?.GetMyProfile.user?.id)}>{
              userData?.GetMyProfile.user?.isProtecting ? (
                <span>Stop Protecting</span>):(
                <span>Start Protecting</span>)}
            </ToggleBtn>
        </ToggleMain>
      )
  }