import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { EmailSignInMutation, EmailSignInMutationVariables } from '../../__generated__/EmailSignInMutation';
import { ErrorComment } from '../../components/ErrorComment';
import { LOCALSTORAGE_TOKEN } from '../../contants/token';
import { authTokenVar, isLoggedInVar } from '../../apollo';

export const Container = styled.div`
 height: 100vh;
`;

export const FHeader = styled.header`
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

export const FContents = styled.div`
  padding: 20px;
  width: 100%;
  margin: auto;
  @media screen and (max-width: 32rem) {
      width: 100%;
      padding: none;
      margin-top: 0px;
  }
`;

export const FSubTitle = styled.h2`
 font-weight: 300;
 text-align: center;
 font-size: 1.875rem;
 line-height: 2.25rem;
 margin: auto;
 padding-bottom: 10px;
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
 &:hover{
    text-decoration: underline;
 }
`

export const FMain = styled.div`
 width: 30%;
 margin: 0px auto;
 @media screen and (max-width: 32rem){
     width: 100%;
 }
`

const LoginForm = styled.form`
 display: flex;
 flex-direction: column;
 padding-top: 25px;
 @media screen and (max-width: 32rem){
     padding-top: 20px;
 }
`

export const LoginInput = styled.input`
 border: none;
 margin-bottom: 5px;
 padding: 7px 10px;
 border-radius: 0.375rem;
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
 display: flex;
 flex-direction: column;
 width: 100%;
 opacity: 0.7;
 cursor: pointer;
 &:hover{
    text-decoration: underline;
 }
`

export const LogInBtn = styled.button`
 margin-top: 10px;
 padding: 10px;
 border: none;
 background-color: ${props => props.theme.colors.blueColor};
 border-radius: 0.5rem;
 cursor: pointer;
 color: white;
 font-size: 1rem;
 line-height: 1.5rem;
 &:hover{
     opacity: 0.7;
 }
`

const EMAIL_SIGN_IN_MUTATION = gql`
mutation EmailSignInMutation($email: String!, $password: String!) {
    EmailSignIn(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

interface IFormProps{
    email: string;
    password: string;
}

export const OutHome = () => {
    const {register, formState:{errors}, getValues, handleSubmit} = useForm<IFormProps>()
    const onCompleted = (data: EmailSignInMutation) => {
        const {EmailSignIn: {ok, error, token}} = data
        if(ok && token){
            alert('Welcome to Guadr!')
            localStorage.setItem(LOCALSTORAGE_TOKEN, token)
            authTokenVar(token);
            isLoggedInVar(true)
        }else if(error){
            alert("Log IN Failed")
        }
        
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
        <FHeader>
            <Helmet><title>Login | Guader</title></Helmet>
            <FContents>
                    <FSubTitle>Welcome to the Guader</FSubTitle>
                    <FMain>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <LoginInput 
                        {...register("email", {required: `Email is Required`})} 
                        placeholder='email'/>
                        <ErrorComment errorMessage={errors.email?.message}/>
                        <LoginInput 
                        {...register("password", {required: `Password is Required`})} 
                        placeholder='password'/>
                        <ErrorComment errorMessage={errors.password?.message}/>
                        <LogInBtn>{loading ? "loading" : "Log In"}</LogInBtn>
                        {emailSignResult?.EmailSignIn.error && (
                            <ErrorComment errorMessage={emailSignResult.EmailSignIn.error}/>
                        )}
                    </LoginForm>
                    <Link to={"/phone-login"}>
                    <CreateAccount>create an account &rarr;</CreateAccount>
                    </Link>
                <Link to={"/social-login"}>
                    <SocialLogin>
                        <SocialLink>
                        connect with Social Media &rarr;
                        </SocialLink>
                    </SocialLogin>
                </Link>
                </FMain>
            </FContents>
        </FHeader>
    </Container>)
}
