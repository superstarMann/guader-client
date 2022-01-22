import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { EmailSignUp, EmailSignUpVariables } from '../../__generated__/EmailSignUp';
import { useNavigate } from 'react-router';

export const CREATE_ACCOUNT_MUTATION = gql`
mutation EmailSignUp($email: String!, $password: String!, $firstName: String!, $lastName: String!, $age: Int!, $phoneNumber: String!, $profilePhoto: String!) {
    EmailSignUp(email: $email, password: $password, firstName: $firstName, lastName: $lastName, age: $age, phoneNumber: $phoneNumber, profilePhoto: $profilePhoto) {
      ok
      token
      error
    }
  }  
`

interface IProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
    profilePhoto: string;
}

export const CreateAccount = () => {
  const history = useNavigate()
  const onCompleted = (data: EmailSignUp) => {
    const { EmailSignUp : {ok}} = data;
    if(ok){
      console.log('it works')
    }
  }
  const [createAccountMutation, {data: createAccountResult, loading}] = useMutation<EmailSignUp, EmailSignUpVariables>(CREATE_ACCOUNT_MUTATION, {onCompleted})
  const {register, handleSubmit, formState:{errors}, getValues} = useForm<IProps>()
  const onSubmit = () => {
  const {
      email,password,firstName,lastName,age,phoneNumber,profilePhoto
    } = getValues()
    createAccountMutation({
      variables:{
        email,  password,  firstName,  lastName,  age,  phoneNumber,  profilePhoto
      }
    })
  }
  
    return(
        <div>Craete Account</div>
    )

}