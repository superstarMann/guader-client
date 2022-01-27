import React, { useState } from'react'
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useMe } from './useMe';
import { TOGGLE_PROTECT_MUTATION } from './SideMenu';
import { ToggleWalkingMode, ToggleWalkingModeVariables } from '../__generated__/ToggleWalkingMode';

export const MainMenu = () => {
    const client = useApolloClient()
    const {data: userData} = useMe();
    const onCompleted = () => {
        console.log(userData?.GetMyProfile.ok)
    }
    const [isToggle, setIsToggle] = useState(false);
    const [toggleWalkingMode] = useMutation<ToggleWalkingMode, ToggleWalkingModeVariables>(TOGGLE_PROTECT_MUTATION, {onCompleted})
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
          <div>
              <button onClick={() => onAClick(userData?.GetMyProfile.user?.id)}>{
              userData?.GetMyProfile.user?.isProtecting ? (
                <span>Stop Protecting</span>
              ): (<span>Start Protecting</span>)}</button>
              <span>
              </span>
              </div>
      )
  }