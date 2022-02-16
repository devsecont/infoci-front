import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';

import { EstruturaInicial } from '../EstruturaInicial'
import { UnidadeGestora } from '../UnidadeGestora'

import { FormInfociStyle } from './style'
import { Procedimentos } from '../Procedimentos'
import { TomadaContasEspecial } from '../TomadaContasEspecial'

import { GlobalContext } from '../../context/GlobalStorage'
import { GenerateXML } from '../GenerateXML'
import { useLocation } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export const FormInfoci = () => {
  
  const context = React.useContext(GlobalContext);
  const location = useLocation();



  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    context.setValueTab(newValue)
  }

  React.useEffect(() => {
    context.setPath(location.pathname);
  },[])
 

  return (
    <FormInfociStyle >
      <div data-form="description">
        {context.valueTab !== 4 && <><p>
          O preenchimento do formulário está divido em <span>5 etapas</span>.  
        </p>
        <p>
          É necessário preencher todos os campos corretamente para avançar de etapa. 
        </p>
        <p>Clique no botão <span>SALVAR</span> caso deseje salvar as informações e terminar o preenchimento em outro momento.</p></>}
        {context.valueTab === 2 && <p>Após clicar no botão <span>Próximo</span> será perguntado se deseja incluir outro Procedimento.</p>}
        {context.valueTab === 3 && <p>Após clicar no botão <span>Próximo</span> será perguntado se deseja incluir outra Tomada de Contas Especial.</p>}
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1 }} style={{ background: 'var(--blue-300)' }} data-tab="tab">
          <Tabs

            value={context.valueTab}
            onChange={handleChange}
            aria-label="selecione os formularios"
            centered
            variant="fullWidth"
            TabIndicatorProps={{ style: { background: '#FFF' } }}
          >
            <Tab
              style={{ color: 'white', flexDirection:'row'}}
              label={<><LooksOneIcon style={{verticalAlign:'middle', marginRight:'0.25rem'}}/> <span style={{fontWeight: 'bold'}}>Estrutura Inicial</span></>}
              {...a11yProps(0)}
            />
            <Tab
              style={{ color: 'white',  flexDirection:'row' }}
              label={<><LooksTwoIcon style={{verticalAlign:'middle', marginRight:'0.25rem'}}/> <span style={{fontWeight: 'bold',}}>Unidade Gestora</span></>}
              disabled
              {...a11yProps(1)}
            />
            <Tab
              style={{ color: 'white',  flexDirection:'row' }}
              label={<><Looks3Icon style={{verticalAlign:'middle', marginRight:'0.25rem'}}/> <span style={{fontWeight: 'bold',}}>Procedimentos</span></>}
              disabled
              {...a11yProps(2)}
            />
            <Tab
              style={{ color: 'white',  flexDirection:'row' }}
              label={<><Looks4Icon style={{verticalAlign:'middle', marginRight:'0.25rem'}}/> <span style={{fontWeight: 'bold',}}>Tomada de Contas</span></>}
              disabled
              {...a11yProps(3)}
            />
            <Tab
              style={{ color: 'white',  flexDirection:'row'}}
              label={<><Looks5Icon style={{verticalAlign:'middle', marginRight:'0.25rem'}}/> <span style={{fontWeight: 'bold',}}>Gerar XML</span></>}
              disabled
              {...a11yProps(4)}
            />
          </Tabs>
        </Box>

      
        <TabPanel value={context.valueTab} index={0}>
          <EstruturaInicial/>
        </TabPanel>
        <TabPanel value={context.valueTab} index={1} >
          <UnidadeGestora />
        </TabPanel>
        <TabPanel value={context.valueTab} index={2}>
          <Procedimentos />
        </TabPanel>
        <TabPanel value={context.valueTab} index={3}>
          <TomadaContasEspecial />
        </TabPanel>
        <TabPanel value={context.valueTab} index={4}>
          <GenerateXML />
        </TabPanel>

      </Box>
    </FormInfociStyle>
  )
}
