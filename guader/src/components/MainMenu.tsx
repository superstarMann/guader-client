import React, { useEffect, useState } from'react'
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useMe } from './useMe';
import { useForm } from 'react-hook-form';
import { TOGGLE_PROTECT_MUTATION } from './SideMenu';
import { ToggleWalkingMode, ToggleWalkingModeVariables } from '../__generated__/ToggleWalkingMode';

export const MainMenu = () => {
    const client = useApolloClient()
    const {data: userData} = useMe();
    const [toggleWalkingMode] = useMutation<ToggleWalkingMode, ToggleWalkingModeVariables>(TOGGLE_PROTECT_MUTATION)
    const [isToggle, setIsToggle] = useState(false);
    const onAClick = (userId: any) => {
        toggleWalkingMode({
            variables:{
                userId
            }
        })
        setIsToggle(!isToggle)
    }
      return(
          <div>
              <button onClick={() => onAClick(userData?.GetMyProfile.user?.id)}>{isToggle ? (
                <span>Stop Protecting</span>
              ): (<span>Start Protecting</span>)}</button>
              <span>
                
              </span>
              </div>
      )
  }