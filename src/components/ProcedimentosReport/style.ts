import styled from 'styled-components'

export const ProcedimentosReportStyle = styled.section`

legend {
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.5rem 0;

    @media (max-width: 720px) {
      font-size: 1rem;
    }
  }

div[data-output="procedimentos"]{
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 1.125rem;

  }
  .MuiFormControl-root {
    & label.Mui-disabled {
      color: black;
    }
    .MuiInput-root {
     & input.Mui-disabled {
      -webkit-text-fill-color: black;
     }

     & .Mui-disabled {
      -webkit-text-fill-color: black;
     }
    }
  }
  
}

`;