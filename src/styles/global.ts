import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
  :root {
    --blue-300:#006A88;
    --blue-500:#003954;
    --gray-100:#E0E0E0;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
   
  }
  body { 
    width: 100vw;
    overflow-x: hidden;
  }

body, button, p, span {
  font:400 1rem 'Roboto', sans-serif;
}

  @media(max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}
@media(max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}
  
`;
