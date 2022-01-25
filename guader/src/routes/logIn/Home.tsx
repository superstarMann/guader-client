import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MainMenu } from '../../components/MainMenu';
import { SideBarCustome } from '../../components/SidebarCustome';
import { useMe } from '../../components/useMe';
import { Container } from '../logOut/OutHome';

const Header = styled.header`
 padding: 18px 3rem;
 display: flex;
 justify-content: space-between;
 align-items: center;
`

const Icon = styled(Link)`
cursor: pointer;
`

const Menu = styled.div`
display: flex;

`

const Main = styled.div`
`

export const Home = () => {
    const {data, loading} = useMe()
 return(
     <Container>
         {!loading && data?.GetMyProfile.ok && data.GetMyProfile.user?.email &&(
             <SideBarCustome/>
         )}
        <Header>
            <Icon to="/">logo</Icon>
            <Menu>
                <div>{data?.GetMyProfile.user?.email}</div>
            </Menu>
        </Header>
        <Main>
            <MainMenu/>
        </Main>
     </Container>
 )
}