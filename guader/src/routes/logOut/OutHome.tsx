import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { EmailSignInMutation, EmailSignInMutationVariables } from '../../__generated__/EmailSignInMutation';

const Container = styled.div`
 height: 100vh;
`;

const Header = styled.header`
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 @media screen and (max-width: 32rem) {
    align-items: flex-start;
    margin-top: 20px;
    margin: auto;
    }
`

const PhoneLogin = styled.div`
  padding: 20px;
  width: 40%;
  margin: auto;
  @media screen and (max-width: 32rem) {
      width: 100%;
      padding: none;
      margin-top: 0px;
  }
`;

const SubTitle = styled.h2`
 font-size: 1.875rem;
 line-height: 2.25rem;
 margin: auto;
 @media screen and (max-width: 32rem){
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 0px;
 }
`

const SocialLogin = styled.div`
 border-top: 1px solid ${props => props.theme.colors.grayColor};
 padding: 20px 0px;
 cursor: pointer;
`

const SocialLink = styled.span`
 color: ${props => props.theme.colors.blueColor};
 font-size: 20px;
`

const LoginForm = styled.form`
 display: flex;
 flex-direction: column;
 padding-top: 40px;
 @media screen and (max-width: 32rem){
     padding-top: 20px;
 }
`

const LoginInput = styled.input`
 border: none;
 margin-bottom: 10px;
 padding: 10px;
 border-radius: 0.5rem;
 box-sizing: border-box;
 box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
 &:focus{
     outline:none;
     border: 1px solid ${props => props.theme.colors.blueColor};
 }
 font-size: 1rem;
 line-height: 1.5rem;
`

const CreateAccount = styled.div`
 margin: 20px 0px;
 opacity: 0.5;
 cursor: pointer;
`

const LogInBtn = styled.button`
 margin-top: 10px;
 padding: 10px;
 border: none;
 background-color: ${props => props.theme.colors.blueColor};
 border-radius: 0.5rem;
 cursor: pointer;
 color: white;
 font-size: 1rem;
 line-height: 1.5rem;
`

const EMAIL_SIGN_IN_MUTATION = gql`
mutation EmailSignInMutation($email: String!, $password: String!) {
    EmailSignIn(email: $email, password: $password) {
      ok
      error
    }
  }
`;

interface IFormProps{
    email: string;
    password: string;
}

export const OutHome = () => {
    const {register, formState:{errors, isValid}, getValues, handleSubmit} = useForm<IFormProps>()
    const onCompleted = (data: EmailSignInMutation) => {
        console.log(data.EmailSignIn.error)
    }
    const [emailSignInMutation, {data: emailSignResult, loading}] = useMutation<EmailSignInMutation,EmailSignInMutationVariables>(EMAIL_SIGN_IN_MUTATION,{
        onCompleted
    })
    const onSubmit = () => {
        const {email, password} = getValues()
        emailSignInMutation({
            variables:{
                email,
                password
            }
        })
    }

    return(
    <Container>
        <Header>
            <Helmet><title>Login | Guader</title></Helmet>
            <PhoneLogin>
                <SubTitle>Welcome to the Guader</SubTitle>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <LoginInput 
                        {...register("email", {required: `Email is Required`})} 
                        placeholder='email'/>
                        <span>{errors.email?.message}</span>
                        <LoginInput 
                        {...register("password", {required: `Password is Required`})} 
                        placeholder='password'/>
                        <span>{errors.password?.message}</span>
                        <LogInBtn>Log In</LogInBtn>
                        <h1>{emailSignResult?.EmailSignIn.error}</h1>
                    </LoginForm>
                    <Link to={"/phone-login"}>
                    <CreateAccount>create an account &rarr;</CreateAccount>
                    </Link>
                <Link to={"/phone-login"}>
                    <SocialLogin>
                        <SocialLink>
                        Or connect with FaceBook &rarr;
                        </SocialLink>
                    </SocialLogin>
                </Link>
            </PhoneLogin>
        </Header>
    </Container>)
}
