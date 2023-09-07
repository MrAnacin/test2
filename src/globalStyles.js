import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
     box-sizing: border-box;
  }
  
  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }
  
  button,
  ._btn {
    cursor: pointer;
    border: 0;
    background-color: #005e54; 
    color: #fff; 
    padding: 10px 20px; 
    font-size: 16px; 
    border: none; 
    cursor: pointer; 
    transition: background-color 0.3s ease-in-out;
  }
  
  
  html,
  body {
    background: #white;
    min-height: 100vh;
    color: #000;
  }
  `;
