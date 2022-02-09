import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Header } from '../components/Header'
import { GlobalStyles } from '../globalStyles'
import { AddPlaces } from '../routes/logIn/AddPlace'
import { DashBoard } from '../components/Dashboard'
import { EditAccount } from '../routes/logIn/EditAccount'
import { FindAddress } from '../routes/logIn/FindAddress'
import { Home } from '../routes/logIn/Home'
import { Places } from '../routes/logIn/Places'
import { Protect } from '../routes/logIn/Protect'
import { Settings } from '../routes/logIn/Settings'
import theme from '../theme'

export const IsLoggedInRoutes = () => {
    return(
        <HelmetProvider>
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
        <BrowserRouter>
        <Header/>
         <Routes>
             <Route path="/*" element={<Home/>}/>
             <Route path="/protect/*" element={<Protect/>}/>
             <Route path="/edit-account/*" element={<EditAccount/>}/>
             <Route path="/settings/*" element={<Settings/>}/>
             <Route path="/places/*" element={<Places/>}/>
             <Route path="/add-place/*" element={<AddPlaces/>}/>
             <Route path="/find-address/*" element={<FindAddress/>}/>
             <Route path="*" element={<Navigate to="/" />}/>
         </Routes>
        </BrowserRouter>
        </ThemeProvider>
        </HelmetProvider>
    )
}