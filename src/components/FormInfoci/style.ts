import styled from 'styled-components'

export const FormInfociStyle = styled.main`
  margin: 2rem 0;

  div[data-form="description"] {
    display: flex;
    flex-direction: column;
   align-items: center;
   gap: 0.5rem;
   margin-bottom: 1rem;

   p {
     span {
       font-weight: bold;
     }
     @media(max-width: 720px) {
     font-size: 0.85rem;
     text-align: center;
   }
   }
   
    
    @media print {
     display: none;
    }
  }

  div[data-tab="tab"] {
    
    .MuiButtonBase-root {
     
      span {
        font-size: 0.88rem;

        @media(max-width:720px) {
         font-size: 0.5rem;
          
        }
      }
      .MuiSvgIcon-root {
        @media(max-width:720px) {
          display: none;
          
        }
      }
    }

    @media print {
     display: none;
    }
  }
`
