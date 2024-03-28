import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`


:root {
   margin:0;
  padding:0;
  box-sizing:border-box; 
  -ms-overflow-style: none;
}

::-webkit-scrollbar {
    display: none;
}

body{
    background-color:white;
    font-family: Roboto Condensed;
  box-sizing:border-box; 
}

a {
       text-decoration: none;
}

header{
  font-family: Roboto Condensed;
}
    
`;
