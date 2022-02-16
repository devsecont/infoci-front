import styled from "styled-components"

export const FooterStyle = styled.footer`
 
  text-align: center;
  color:white;
  padding: 1rem;
  height: 2.5rem;
  background-color: var(--blue-300);
  box-shadow: -4px -4px 4px rgba(0,0,0,0.2);
  width: 100vw;
  position: fixed;
  bottom:0;
  z-index:100;
    
  p {
    font-size: 0.875rem;

    @media(max-width: 720px) {
      font-size: 0.7rem;
    }
  }

  @media print {
      display: none;
    }

`;