import styled from "styled-components";

export const InputUGStyle = styled.main`

  height: 50vh;
  margin-top: 1rem;
  display:flex;
  justify-content: center;
  align-items: center;

  div[data-input=select-container] {
   
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
    padding: 1rem;
    max-width: 720px;
    
    h2 {
      margin-bottom: 1.25rem;
      font-size: 1.25rem;
    }
    button {
      margin-top: 1rem;
      background-color: var(--blue-300);
    
      &:hover {
        background-color: var(--blue-300);
        filter: brightness(0.8);
      }
    }
  }
  
`;