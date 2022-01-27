import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { EmailSignUp, EmailSignUpVariables } from '../../__generated__/EmailSignUp';
import { useNavigate, useParams } from 'react-router';
import { Container, FContents, FHeader, LogInBtn, LoginInput } from './OutHome';
import { Helmet } from 'react-helmet-async';
import { LogoOut, PhoneForm, PhoneMain, PhoneTitle } from './PhoneLogin';
import { ErrorComment } from '../../components/ErrorComment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { types } from 'util';

export const CREATE_ACCOUNT_MUTATION = gql`
mutation EmailSignUp($email: String!, $password: String!, $firstName: String!, $lastName: String!, $age: String!, $phoneNumber: String!, $profilePhoto: String!) {
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
    age: string;
    phoneNumber: string;
    profilePhoto: string;
}

type IParams ={
  id: string;
}

export const CreateAccount = () => {
  const {id} = useParams<IParams>()
  console.log(id)
  const history = useNavigate()
  const {register, handleSubmit, formState:{errors}, getValues} = useForm<IProps>({
    defaultValues: {profilePhoto: "notReady", phoneNumber:`${id}`}
  })
  const onCompleted = (data: EmailSignUp) => {
    const {EmailSignUp : {ok, error}} = data
    if(ok){
      alert("Create-Account Success!")
      history("/");
    }else if(error){
      alert(`Create-Account Failed`)
    }
  }
  const [createAccountMutation, {data: createAccountResult, loading}] = useMutation<EmailSignUp, EmailSignUpVariables>(CREATE_ACCOUNT_MUTATION, {onCompleted})
  const onSubmit = () => {
  const {
      email,password,firstName,lastName, age,phoneNumber,profilePhoto
    } = getValues()
    createAccountMutation({
      variables:{
        email, password, firstName, lastName, age, phoneNumber, profilePhoto
      }
    })
  }

    return(
        <Container>
          <Helmet><title>Create-account | Guader</title></Helmet>
          <Link to="/phone-login"><LogoOut><FontAwesomeIcon icon={faArrowLeft}/></LogoOut></Link>
          <FHeader>
            <FContents>
              <PhoneMain>
                <PhoneTitle>3. Verify Your Mobile Number</PhoneTitle>
                <PhoneForm onSubmit={handleSubmit(onSubmit)}>
                  <LoginInput
                  type="text"
                  placeholder='firstName'
                  {...register("firstName", {required: `firstName is Required`})}
                  />
                  <ErrorComment errorMessage={errors.firstName?.message}/>
                  <LoginInput
                  type="text"
                  placeholder='lastName'
                  {...register("lastName", {required: `lastName is Required`})}
                  />
                  <ErrorComment errorMessage={errors.lastName?.message}/>
                  <LoginInput
                  type="text"
                  placeholder='age'
                  {...register("age", {required: `age is Required`})}
                  />
                  <ErrorComment errorMessage={errors.age?.message}/>
                  <LoginInput
                  type="email"
                  placeholder='example@example.com'
                  {...register("email", {required: `email is Required`})}
                  />
                  <ErrorComment errorMessage={errors.email?.message}/>
                  <LoginInput
                  type="password"
                  placeholder='password'
                  {...register("password", {required: `password is Required`})}
                  />
                  <ErrorComment errorMessage={errors.password?.message}/>
                  <LoginInput
                  type="text"
                  placeholder='01012345678'
                  {...register("phoneNumber", {required: `phoneNumber is Required`})}
                  />
                  <ErrorComment errorMessage={errors.phoneNumber?.message}/>
                  <LoginInput
                  type="text"
                  placeholder='folder'
                  {...register("profilePhoto", {required: `profilePhoto is Required`})}
                  />
                  <ErrorComment errorMessage={errors.profilePhoto?.message}/>
                  <LogInBtn>{loading ? "Loading" : "Create Account"}</LogInBtn>
                  {createAccountResult?.EmailSignUp.error &&  (
                    <ErrorComment errorMessage={createAccountResult.EmailSignUp.error}/>
                  )}
                </PhoneForm>
              </PhoneMain>
            </FContents>
          </FHeader>
        </Container>
    )

}