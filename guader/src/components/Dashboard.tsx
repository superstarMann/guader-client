import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
position: fixed;
top: 50px;
left: 0px;
height: 100vh;
padding: 45px;
width: 20%;
`

const Main = styled.ul`
height: 70%;
display: flex;
flex-direction: column;

@media screen and (max-width: 32rem) {
   align-items: flex-start;
   margin-top: 20px;
   margin: auto;
   padding: 20px;
   }
`
const Items = styled(Link)`
border-top: 1px solid #74b9ff;
padding: 10px 10px;
list-style: none;
margin-bottom: 5px;
text-align: left;
font-size: 1.125rem;
line-height: 1.75rem;
cursor: pointer;
`

export const DashBoard = () => {
    return(
        <Container>
            <Main>
                <Items to='/'>Home</Items>
                <Items to='/edit-account'>Edit Profile</Items>
                <Items to='/places'>Places</Items>
                <Items to='/settings'>Setting</Items>
                <Items to="/"></Items>
            </Main>
        </Container>
    )
}