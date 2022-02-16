import styled from "styled-components";

export const HeaderStyle = styled.header`
  
  color: var(--blue-500);
  
  nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 2.5rem;
    
    background-color: var(--blue-300);
    box-shadow: 4px 4px 4px rgba(0,0,0,0.2);
    
    padding: 0 4rem;
    font-size: 1rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 720px) {
      padding: 0 1rem;
    }

    div[data-nav="items"]{
      display: flex;
      gap: 2rem;

      svg { 
        cursor: pointer;
        color: var(--gray-100);  
      }
      & [data-nav="websites"] {
        a {
        color: white;
        text-decoration: none;
        margin-left: 0.25rem;

        &[data-logout="logout"]{
          margin-left: 1.5rem;
        }
      }
      }
    }
    @media print {
      display: none;
    }
  }

  h1,h2 {
    text-align: center;
  }

    h1 {
    margin-top : 2.5rem;
    font-size: 2.25rem;
    text-transform: uppercase;
    font-weight: bold;
    padding: 1rem 0.5rem 0.5rem;
    border-bottom: 1px solid var(--gray-100);
  
    @media(max-width:720px){
      font-size: 2rem;
    }  

    @media print {
      margin-top: 0;
    }
  }
  h2{
    font-size: 1rem;
    color:black;
    margin-top: 1rem;
    font-weight: bold;

    @media(max-width:720px){
      font-size: 0.87rem;
    }  
  }

  
`;