import React from 'react';
import { faGg } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SideBarCustome } from '../routes/logIn/sideRoutes/SidebarCustome';
import { ToggleStatus } from './ToggleStatus';
import { useMe } from './useMe';

const Box = styled.header`
 padding: 22px 3rem;
 display: flex;
 justify-content: space-between;
 align-items: center;
 @media screen and (max-width: 32rem) {
     display: none;
 }
`

const Menu = styled.div`
display: flex;
`

const Logo = styled.span`
font-size: 1.4rem;
margin-right: 20px;
`

const LogoHome = styled(Link)`
cursor: pointer;
margin-left:50px;
`
const Account = styled(Link)`
cursor: pointer;
`

export const Header = () => {
    const {data, loading} = useMe()
 return(
     <div>
         <Helmet><title>{`${data?.GetMyProfile.user?.fullName} | Gudaer`}</title></Helmet>
         {!loading && data?.GetMyProfile.ok && data.GetMyProfile.user?.email &&(
             <SideBarCustome/>
         )}
        <Box>
        <Account to='/edit-account'>
            <Logo><FontAwesomeIcon icon={faUserCircle}/></Logo>
            {data?.GetMyProfile.user?.email}
        </Account>
        <LogoHome to ='/'><Logo><FontAwesomeIcon icon={faGg}/></Logo></LogoHome>
            <Menu>
            <ToggleStatus/>
            </Menu>
        </Box>
     </div>
 )
}