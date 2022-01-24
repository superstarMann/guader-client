import React from 'react';
import styled from 'styled-components';
import { SideBarCustome } from '../../components/SidebarCustome';
import { useMe } from '../../components/useMe';
import { Container } from '../logOut/OutHome';

const Header = styled.header`
 padding: 18px 3rem;
 display: flex;
 justify-content: space-between;
 align-items: center;
 
`
const Main = styled.div`
`


export const Home = () => {
    const {data} = useMe()
 return(
     <Container>
        <SideBarCustome/>
        <Header>
            <span>logo</span>
            <span>{data?.GetMyProfile.user?.email}</span>
        </Header>
        <Main>

        </Main>
     </Container>
 )
}