import React, { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from 'react-sidebar';
import styled from 'styled-components';
import { Menubar } from './SideMenu';


const SMain = styled.div`
 width: 100%;
 padding: 10px 30px;
 display: flex;
 justify-content: space-between;
 @media screen and (min-width: 32rem){
     display:none;
 }
`

const SButton = styled.button`
 background-color: #20324f;
 font-size: 1rem;
 border: none;
 cursor: pointer;
`

export const SideBarCustome = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const onClick = () => {
        setSidebar(true)
    }
    return(
        <SMain>
            <Sidebar
            sidebar={<Menubar/>}
            open={sidebar}
            onSetOpen={showSidebar}
            styles={{ sidebar: { 
                background: "#20293A",
                width: "60%",
                }}}
            >  <SButton onClick={onClick}><FontAwesomeIcon icon={faBars}/></SButton>
            </Sidebar>
        </SMain>
    )
}