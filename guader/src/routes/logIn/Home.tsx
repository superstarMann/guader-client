import React, { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from 'react-sidebar'
import styled from 'styled-components';
import { Container } from '../logOut/OutHome';
import { Menubar } from './SideMenu';

const MainHeader = styled.div`
 width: 100%;
 padding: 10px 30px;
 display: flex;
 justify-content: space-between;
`

const SButton = styled.button`
 background-color: #20324f;
 font-size: 1rem;
 border: none;
 cursor: pointer;
`

export const Home = () => {
 const [sidebar, setSidebar] = useState(false);
 const showSidebar = () => setSidebar(!sidebar);
 const onClick = () => {
     setSidebar(true)
 }
 
 return(
     <Container>
        <MainHeader>
            <Sidebar
            sidebar={<Menubar/>}
            open={sidebar}
            onSetOpen={showSidebar}
            styles={{ sidebar: { 
                background: "#141B30",
                width: "45%",
                paddingLeft: "30"
                }}}
            >  <SButton onClick={onClick}><FontAwesomeIcon icon={faBars}/></SButton>
            </Sidebar>
            <div>""</div>
            <div>logo</div>
            <div>계정정보</div>
        </MainHeader>
     </Container>
 )
}