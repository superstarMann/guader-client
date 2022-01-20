import React from 'react';
import styled from 'styled-components';
import bgImage from '../../image/bg.png'

const Container = styled.div`
 height: 100vh;
`;

const Header = styled.header`
 height: 70%;
 background: linear-gradient(rgba(0, 153, 196, 0.5), rgba(0, 153, 196, 0.4)),
    url(${bgImage});
    display: flex;
    align-items: center;
    justify-content: center;
`

const Logo = styled.div`
 width: 110px;
 height: 110px;
 background-color: white;
 display: flex;
 justify-content: center;
 align-items: center;
 box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 -14px 28px rgba(0, 0, 0, 0.22);
 text-transform: uppercase;
 font-weight: 500;
 font-size: 25px;
`

const Title = styled.h1``;

const Footer = styled.div``

const PhoneLogin = styled.div`
  padding: 20px;
`;

const SubTitle = styled.h2`
 font-size: 30px;
`
const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 25px;
  font-weight: 300;
`;

const Gray = styled.span`
 color: ${props => props.theme.colors.blueColor};
`


export const OutHome = () => <Container>
    <Header>
        <Logo>
            <Title>Guader</Title>
        </Logo>
    </Header>
    <Footer>
        <PhoneLogin>
            <SubTitle>Get moving with Guader</SubTitle>
            <FakeInput>
                <Gray>Enter your mobile number</Gray>
            </FakeInput>
        </PhoneLogin>
    </Footer>
</Container>