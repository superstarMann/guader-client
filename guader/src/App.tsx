import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from './apollo';
import {IsLoggedInRoutes} from './routers/isLoggedIn'
import { IsLoggedOutRoutes } from './routers/isLoggedOut'

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  return isLoggedIn ? <IsLoggedInRoutes/> : <IsLoggedOutRoutes/>
}

export default App;
