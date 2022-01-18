import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../globalStyles'
import { AddPlace } from '../routes/logIn/AddPlace'
import { EditAccount } from '../routes/logIn/EditAccount'
import { FindAddress } from '../routes/logIn/FindAddress'
import { Home } from '../routes/logIn/Home'
import { Places } from '../routes/logIn/Places'
import { Protect } from '../routes/logIn/Protect'
import { Settings } from '../routes/logIn/Settings'
import theme from '../theme'

export const IsLoggedInRoutes = () => {
    return(
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
        <BrowserRouter>
         <Routes>
             <Route path="/*" element={<Home/>}/>
             <Route path="/protect/*" element={<Protect/>}/>
             <Route path="/edit-accont/*" element={<EditAccount/>}/>
             <Route path="/settings/*" element={<Settings/>}/>
             <Route path="/places/*" element={<Places/>}/>
             <Route path="/add-place/*" element={<AddPlace/>}/>
             <Route path="/find-address/*" element={<FindAddress/>}/>
             <Route path="*" element={<Navigate to="/" />}/>
         </Routes>
        </BrowserRouter>
        </ThemeProvider>
    )
}

/*
Home
Ride
EditAccount
Settings
Places
AddPlace
FindAddress
*/