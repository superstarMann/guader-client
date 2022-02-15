import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { isLoggedInVar } from '../../apollo';
import { DashBoard } from '../../components/Dashboard';
import { LOCALSTORAGE_TOKEN } from '../../contants/token';
import { Container, FContents } from '../logOut/OutHome';
import { PhoneTitle } from '../logOut/PhoneLogin';

const Main = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 10%;
`
const LogOutBtn = styled.button`
 margin-top: 20px;
 padding: 10px;
 border: none;
 background-color: #e74c3c;
 border-radius: 0.5rem;
 cursor: pointer;
 color: white;
 font-size: 1rem;
 line-height: 1.5rem;
 &:hover{
     opacity: 0.7;
 }
 width: 20%;
`

export const Settings = () => {
    const onClick = () => {
        isLoggedInVar(false);
        localStorage.removeItem(LOCALSTORAGE_TOKEN)
    }

    return(
        <Container>
            <Helmet><title>setting | Guader</title></Helmet>
            <DashBoard/>
            <Main>
                <PhoneTitle>We're always waiting for you 🙇</PhoneTitle>
                <LogOutBtn onClick={onClick}>
                    <span>Log Out</span>
                </LogOutBtn>
            </Main>
        </Container>
    )
}