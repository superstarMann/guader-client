import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { EmailSignUp, EmailSignUpVariables } from '../../__generated__/EmailSignUp';
import { useNavigate } from 'react-router';
import { Container, Contents, Header, LogInBtn, LoginInput } from './OutHome';
import { Helmet } from 'react-helmet-async';
import { Logo, PhoneForm, PhoneMain, PhoneTitle } from './PhoneLogin';
import { ErrorComment } from '../../components/ErrorComment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
    age: string;
    phoneNumber: string;
    profilePhoto: string;
}

export const CreateAccount = () => {
  const history = useNavigate()
  const onCompleted = (data: EmailSignUp) => {
    alert('itworks')
  }
  const [createAccountMutation, {data: createAccountResult, loading}] = useMutation<EmailSignUp, EmailSignUpVariables>(CREATE_ACCOUNT_MUTATION, {onCompleted})
  const {register, handleSubmit, formState:{errors}, getValues} = useForm<IProps>({
    defaultValues: {profilePhoto: ""}
  })
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
          <Link to="/phone-login"><Logo><FontAwesomeIcon icon={faArrowLeft}/></Logo></Link>
          <Header>
            <Contents>
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
            </Contents>
          </Header>
        </Container>
    )

}