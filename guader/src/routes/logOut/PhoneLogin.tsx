import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { StartPhoneVerification, StartPhoneVerificationVariables } from '../../__generated__/StartPhoneVerification';
import { Container, Contents, Header, LogInBtn, LoginInput } from './OutHome';
import styled from 'styled-components';
import countries from '../../countries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGg } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorComment } from '../../components/ErrorComment';

const PhoneMain= styled.h1`
 width:30%;
 display: flex; 
 align-items: center;
 justify-content: center;
 flex-direction: column;
 text-align: center;
 margin: auto;
 @media screen and (max-width: 32rem) {
   width: 100%;
 }
`

const PhoneTitle = styled.h1`
font-size: 1.875rem;
line-height: 2.25rem; 
margin-bottom: 20px;
@media screen and (max-width: 32rem) {
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 30px;
 }
`

const CountrySelect = styled.select`
font-size: 1rem;
 line-height: 1.5rem;
 padding: 7px 10px;
 border-radius: 0.375rem;
 border: 0;
 color: "#2c3e50";
 -webkit-appearance: none;
 -moz-appearance: none;
 appearance: none;
 @media screen and (max-width: 32rem) {
  width: 100%;
 }
 margin-bottom: 15px;
 `

const CountryOption = styled.option`
`

const PhoneForm = styled.form`
 display: flex;
 flex-direction: column;
 margin-top: 20px;
 width: 100%;
`

export const Logo = styled.span`
cursor: pointer;
position: absolute;
top: 20px;
left: 40px;
font-size: 1.5rem;
@media screen and (max-width: 32rem){
  display: none;
}
`

const PHONE_VERIFY = gql`
mutation StartPhoneVerification($phoneNumber: String!) {
    StartPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
  
`



interface IPhoneProps{
    phoneNumber: string;
    dialCode: string;
}

export const PhoneLogin = () => {
    const history = useNavigate();
    const {register, handleSubmit, formState:{isValid, errors}, getValues} = useForm<IPhoneProps>({
      defaultValues: {dialCode: "+82"}
    })
    const onCompleted = (data: StartPhoneVerification) => {
      alert(`We send your ${getValues("phoneNumber")}`)
      history("/verify-phone", {state: `enter-verify-code`})
    }
    const [startPhoneVerificationMutation, {data: startPhoneResult, loading}] = useMutation<
    StartPhoneVerification, 
    StartPhoneVerificationVariables
    >(PHONE_VERIFY, {onCompleted})

    const onSubmit = () => {
      const {phoneNumber, dialCode} = getValues();
      /*
      startPhoneVerificationMutation({
        variables: {
          phoneNumber: `${dialCode}${phoneNumber}`
        }
      })*/
    }

 return(
     <Container>
       <Helmet><title>Phone-Login | Guader</title></Helmet>
       <Link to="/"><Logo><FontAwesomeIcon icon={faGg}/></Logo></Link>
        <Header>
          <Contents>
            <PhoneMain>
              <PhoneTitle>1. Enter Your Mobile Number</PhoneTitle>
              <PhoneForm onSubmit={handleSubmit(onSubmit)}>
                   <CountrySelect>
                   {countries.map((country, index) => (
                     <CountryOption 
                     {...register("dialCode")}
                     key={index} value={country.dial_code}>
                       {country.flag} {country.name} {country.dial_code}
                     </CountryOption>
                   ))}
                   </CountrySelect >
              <LoginInput 
              {...register("phoneNumber", 
              {required: 'PhoneNumber is Required',
               minLength: 10
               })}
              placeholder='010 1234 5678'
              />
              {errors.phoneNumber?.type === "minLength" && (
                <ErrorComment errorMessage='Mobile Number must be more 10'/>
              )}
              <ErrorComment errorMessage={errors.phoneNumber?.message}/>
              <LogInBtn>{loading ? "loading" : "Submit"}</LogInBtn>
              {startPhoneResult?.StartPhoneVerification.error && (
                <ErrorComment errorMessage={startPhoneResult.StartPhoneVerification.error}/>
              )}
            </PhoneForm>
            </PhoneMain>
          </Contents>
        </Header>
     </Container>
 )
}