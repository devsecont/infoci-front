import styled from "styled-components";


export const GenerateXMLStyle = styled.main`

.MuiListItemText-root {
  span {
    font-weight: bold;
    font-size: 1.125rem;
  }
}

h2 {
  font-size: 1.125rem;
  text-align: center;
  margin-bottom: 2rem;
 
  
  span{
    text-decoration: underline;
    font-weight: bold;
    color: black;
  }

  @media print {
      display: none;
    }
}

div[data-button="download"]{
    margin-bottom: 1rem;
     text-align: center;

      .MuiButton-root {
        background: var(--blue-500);
        width: 200px;
       
       &:hover {
         filter:brightness(0.8);
       }
      }
     
      @media print {
      display: none;
    }
    }
`;