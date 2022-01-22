import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Container, Contents, Header, Main, SubTitle } from './OutHome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SocialTitle = styled.h2`
display: flex;
justify-content: space-between;
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

const SocialUl = styled.ul`
font-size: 1.125rem;
line-height: 1.75rem;
width: 30%;
display: flex;
flex-direction: column;
margin: 0px auto;
@media screen and (max-width: 32rem){
    width: 100%;
}
padding-top: 20px;
`

const SocialLi = styled.li`
 list-style: none;
 cursor: pointer;
 padding-bottom: 10px;
`

const AccountName = styled.span`
 padding-left: 10px;
 &:hover{
     text-decoration: underline;
 }
`

const BackCursor = styled.span`
  display: none;
  @media screen and (max-width: 32rem) {
    display: block;
    }
`

export const SocialLogin = () => {
 return(
     <Container>
         <Helmet><title>Sical-Login | Guader</title></Helmet>
         <Header>
         <Contents>
             <SocialTitle>
                 <Link to={"/"}><BackCursor>{"<"}</BackCursor></Link>
                 <span>Choose an Account</span>
                 <span>{""}</span>
            </SocialTitle>
             <SocialUl>
                 <SocialLi>
                <FontAwesomeIcon icon={faFacebook}/><AccountName>FaceBook &rarr;</AccountName>
                </SocialLi>
                <SocialLi>
                <FontAwesomeIcon icon={faEnvelope}/><AccountName>Email &rarr;</AccountName>
                </SocialLi>
             </SocialUl>
         </Contents>
         </Header>
     </Container>     
 )
}