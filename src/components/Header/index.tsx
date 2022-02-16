import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF, faInstagramSquare, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { HeaderStyle } from "./style";
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalStorage';

export const Header = () => {
  const context = useContext(GlobalContext);

  function handleLogout (){
    localStorage.removeItem('app-token');
  }

  return (
    <HeaderStyle>  
        <nav>
         <div data-nav="items">
           <a href="https://www.facebook.com/SecontEspiritoSanto"  title="Facebook SECONT">
            <FontAwesomeIcon icon={faFacebookF} />
           </a>
           <a href="https://www.instagram.com/secont.es/"  title="Instagram SECONT">
           <FontAwesomeIcon icon={faInstagramSquare} />
           </a>
           <a href="https://twitter.com/EStransparencia"  title="Twitter SECONT">
           <FontAwesomeIcon icon={faTwitter} />
           </a>
         </div>

         <div data-nav="items">

           <div data-nav="websites">
            <FontAwesomeIcon icon={faHeadset} />
            <a  href="https://ouvidoria.es.gov.br/" title="Site da Ouvidoria ES" >Fale conosco</a>
  
            {context.path !== '' && <a data-logout="logout" href='/' title="Sair" onClick={handleLogout}>Logout</a>}
        
           </div>
           
         </div>
        </nav>
        <h1>Prestação de Contas - INFOCI</h1>
        <h2>Conforme Portaria Normativa 88/2021 do Tribunal de Contas do Estado do Espírito Santo.</h2>
        
       
    </HeaderStyle>
  );
}