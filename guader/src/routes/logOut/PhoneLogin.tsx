import { gql } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Container } from './OutHome';

const PHONE_VERIFY = gql`
mutation StartPhoneVerification($phoneNumber: String!) {
    StartPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
  
`

interface IPhoneProps{
    phoneNumber: string
}

export const PhoneLogin = () => {
    const {register, handleSubmit, formState:{isValid, errors}} = useForm<IPhoneProps>()
 return(
     <Container>
         <h1>Please Enter your Mobile Number</h1>
     </Container>
 )
}