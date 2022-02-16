import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { GlobalStorage } from './context/GlobalStorage';
import { RoutesForm } from './routes';
import { ContainerStyle } from './styles/container';
import { GlobalStyled } from './styles/global';

function App() {
  return (
  <GlobalStorage>
    <GlobalStyled/>
      <Header/>
    <ContainerStyle>

      {/* <FormInfoci/> */}
      {/* <FormSignIn/> */}
      {/* <FormRegister/> */}

      <RoutesForm/>

    </ContainerStyle>
      <Footer/>
    
  </GlobalStorage>
  );
}

export default App;
