import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../globalStyles';
import { CreateAccount } from '../routes/logOut/Create-Account';
import { OutHome } from '../routes/logOut/OutHome';
import { PhoneLogin } from '../routes/logOut/PhoneLogin';
import { SocialLogin } from '../routes/logOut/SocialLogin';
import { VerifyPhone } from '../routes/logOut/VerifyPhone';
import theme from '../theme';

export const IsLoggedOutRoutes = () => {
    return (
        <HelmetProvider>
        <ThemeProvider theme={theme}>
           <GlobalStyles/>
        <BrowserRouter>
         <Routes>
             <Route path="/*" element={<OutHome/>} />
             <Route path="/phone-login" element={<PhoneLogin/>}/>
             <Route path="/verify-phone/:id" element={<VerifyPhone/>}/>
             <Route path="/create-account" element={<CreateAccount/>}/>
             <Route path="/social-login" element={<SocialLogin/>}/>
             <Route path="*" element={<Navigate to="/" />}/>
         </Routes>
        </BrowserRouter>
        </ThemeProvider>
        </HelmetProvider>
    )
}
/*
OutHome
PhoneLogin
VerifyPhone
SocialLogin
*/