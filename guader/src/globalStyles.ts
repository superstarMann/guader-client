import React from 'react';
import {createGlobalStyle} from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyles = createGlobalStyle`
 ${reset}
 * {
      box-sizing: border-box;
  }
  body{
      font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  }
  a{ 
      color:inherit;
      text-decoration:none;
  }
  input,
  button{
      &:focus,
      &:active{outline:none}
  }
`


