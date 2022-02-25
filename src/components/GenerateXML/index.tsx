import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
 
} from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalStorage'
import baseAPI from '../../utils/baseAPI'
import { createSchemaINFOCIXML } from '../../utils/functions/createSchemaINFOCIXML'
import { download } from '../../utils/functions/downloadXML'
import { EstruturaInicialReport } from '../EstruturaInicialReport'
import { ProcedimentosReport } from '../ProcedimentosReport'
import { TomadaContasEspecialReport } from '../TomadaContasEspecialReport'
import { UnidadeGestoraReport } from '../UnidadeGestoraReport'


import { GenerateXMLStyle } from './style'


interface DataEstruturaInicialProps {
  id: number
  estruturaInicialIdNumRegistro: string
  estruturaInicialNivelControleInterno: string
  estruturaInicialQuantidadeTotalServidores: string
  estruturaInicialQuantidadeServidoresEfetivos: string
  estruturaInicialQuantidadeContadores: string
  estruturaInicialNormaInternaGestaoOrcamentaria: string
  estruturaInicialNormaInternaGestaoFinanceira: string
  estruturaInicialNormaInternaGestaoPatrimonial: string
  estruturaInicialNormaInternaGestaoFiscal: string
  estruturaInicialNormaInternaDemContabeis: string
}

interface DataUnidadeGestoraProps {
  id: number
  unidadeGestoraIdNumRegistro: string
  unidadeGestoraNivelControleInterno: string
  unidadeGestoraCodigoUnidadeGestora: string
  unidadeGestoraResponsavelUnidadeGestora: string
  unidadeGestoraExercicioUltimaManifestacaoControleInterno: string
  unidadeGestoraOpiniaoPrestacaoContasControleInterno: string
}

interface DataProcedimentoProps {
  id: number
  procedimentosIdNumRegistro: string
  procedimentosNivelControleInterno: string
  procedimentosCodigoUnidadeGestora: string
  procedimentosCodigoProcedimento: string
  procedimentosTipoPontoControle: string
  procedimentosUniversoAnalisado: string
  procedimentosAmostraSelecionada: string
  procedimentosDescricaoAnalise: string
  procedimentosTipoProcedimentoAnalisado: string
  procedimentosSituacaoAnalise: string
}
interface DataTomadaContasEspecialProps {
  id: number
  tomadaContasEspecialIdNumRegistro: string
  tomadaContasEspecialCodigoUnidadeGestora: string
  tomadaContasEspecialProcesso: string
  tomadaContasEspecialAnoProcesso: string
  tomadaContasEspecialFatoMotivo: string
  tomadaContasEspecialDataCiencia: string
  tomadaContasEspecialDataInstauracao: string
  tomadaContasEspecialDataEnvioTribunalContas: string
  tomadaContasEspecialValorDebito: string
  tomadaContasEspecialSituacaoEm31do12: string
  tomadaContasEspecialMotivoBaixaDebito: string
}



export const GenerateXML = () => {
  const [dataEstruturaInicial, setDataEstruturaInicial] = useState<
    DataEstruturaInicialProps[]
  >([] as DataEstruturaInicialProps[])
  const [dataUnidadeGestora, setDataUnidadeGestora] = useState<
    DataUnidadeGestoraProps[]
  >([] as DataUnidadeGestoraProps[])
  const [dataProcedimentos, setDataProcedimentos] = useState<
    DataProcedimentoProps[]
  >([] as DataProcedimentoProps[])
  const [dataTomadaContasEspecial, setDataTomadaContasEspecial] = useState<
    DataTomadaContasEspecialProps[]
  >([] as DataTomadaContasEspecialProps[])

  const context = useContext(GlobalContext)
  const token = localStorage.getItem('app-token')
  const navigate = useNavigate()

  const [openEstruturaInicialReport, setOpenEstruturaInicialReport] = useState(true)
  const [openUnidadeGestoraReport, setOpenUnidadeGestoraReport] = useState(true)
  const [openProcedimentosReport, setOpenProcedimentosReport] = useState(true)
  const [openTomadaContasEspecialReport, setOpenTomadaContasEspecialReport] = useState(true)

  const handleClickEstruturaInicialReport = () => {
    setOpenEstruturaInicialReport(!openEstruturaInicialReport)
  }
  const handleClickUnidadeGestoraReport = () => {
    setOpenUnidadeGestoraReport(!openUnidadeGestoraReport)
  }
  const handleClickProcedimentosReport = () => {
    setOpenProcedimentosReport(!openProcedimentosReport)
  }
  const handleClickTomadaContasEspecialReport = () => {
    setOpenTomadaContasEspecialReport(!openTomadaContasEspecialReport)
  }

  useEffect(() => {
    if (!context.formInfo.id) {
      navigate('/select_ug')
      return
    }

    requestAPI()

    async function requestAPI() {
      await getEstruturaInicial()
      await getUnidadeGestora()
      await getProcedimentos()
      await getTomadaContasEspecial()

      if (
        dataEstruturaInicial.length > 0 &&
        dataUnidadeGestora.length > 0 &&
        dataProcedimentos.length > 0
      ) {
      }
    }

    async function getEstruturaInicial() {
      const response = await axios.get(
        `${baseAPI.URL}/forms/${context.formInfo.id}/estruturas`,
        { headers: baseAPI.HEADERS(token) },
      )

      const dataGet: Array<DataEstruturaInicialProps> = await response.data.map(
        (data: DataEstruturaInicialProps) => {
          return {
            id: data.id,
            estruturaInicialIdNumRegistro: data.estruturaInicialIdNumRegistro,
            estruturaInicialNivelControleInterno:
              data.estruturaInicialNivelControleInterno,
            estruturaInicialQuantidadeTotalServidores:
              data.estruturaInicialQuantidadeTotalServidores,
            estruturaInicialQuantidadeServidoresEfetivos:
              data.estruturaInicialQuantidadeServidoresEfetivos,
            estruturaInicialQuantidadeContadores:
              data.estruturaInicialQuantidadeContadores,
            estruturaInicialNormaInternaGestaoOrcamentaria:
              data.estruturaInicialNormaInternaGestaoOrcamentaria,
            estruturaInicialNormaInternaGestaoFinanceira:
              data.estruturaInicialNormaInternaGestaoFinanceira,
            estruturaInicialNormaInternaGestaoPatrimonial:
              data.estruturaInicialNormaInternaGestaoPatrimonial,
            estruturaInicialNormaInternaGestaoFiscal:
              data.estruturaInicialNormaInternaGestaoFiscal,
            estruturaInicialNormaInternaDemContabeis:
              data.estruturaInicialNormaInternaDemContabeis,
          }
        },
      )
      if (dataGet.length > 0) {
        setDataEstruturaInicial([...dataGet])
      }
    }

    async function getUnidadeGestora() {
      const response = await axios.get(
        `${baseAPI.URL}/forms/${context.formInfo.id}/unidades`,
        { headers: baseAPI.HEADERS(token) },
      )

      const dataGet: Array<DataUnidadeGestoraProps> = await response.data.map(
        (data: DataUnidadeGestoraProps) => {
          return {
            id: data.id,
            unidadeGestoraIdNumRegistro: data.unidadeGestoraIdNumRegistro,
            unidadeGestoraNivelControleInterno:
              data.unidadeGestoraNivelControleInterno,
            unidadeGestoraCodigoUnidadeGestora:
              data.unidadeGestoraCodigoUnidadeGestora,
            unidadeGestoraResponsavelUnidadeGestora:
              data.unidadeGestoraResponsavelUnidadeGestora,
            unidadeGestoraExercicioUltimaManifestacaoControleInterno:
              data.unidadeGestoraExercicioUltimaManifestacaoControleInterno,
            unidadeGestoraOpiniaoPrestacaoContasControleInterno:
              data.unidadeGestoraOpiniaoPrestacaoContasControleInterno,
          }
        },
      )
      if (dataGet.length > 0) {
        setDataUnidadeGestora([...dataGet])
      }
    }

    async function getProcedimentos() {
      const response = await axios.get(
        `${baseAPI.URL}/forms/${context.formInfo.id}/procedimentos`,
        { headers: baseAPI.HEADERS(token) },
      )

      const dataGet: Array<DataProcedimentoProps> = await response.data.map(
        (data: DataProcedimentoProps) => {
          return {
            id: data.id,
            procedimentosIdNumRegistro: data.procedimentosIdNumRegistro,
            procedimentosNivelControleInterno:
              data.procedimentosNivelControleInterno,
            procedimentosCodigoUnidadeGestora:
              data.procedimentosCodigoUnidadeGestora,
            procedimentosCodigoProcedimento:
              data.procedimentosCodigoProcedimento,
            procedimentosTipoPontoControle: data.procedimentosTipoPontoControle,
            procedimentosUniversoAnalisado: data.procedimentosUniversoAnalisado,
            procedimentosAmostraSelecionada:
              data.procedimentosAmostraSelecionada,
            procedimentosDescricaoAnalise: data.procedimentosDescricaoAnalise,
            procedimentosTipoProcedimentoAnalisado:
              data.procedimentosTipoProcedimentoAnalisado,
            procedimentosSituacaoAnalise: data.procedimentosSituacaoAnalise,
          }
        },
      )
      if (dataGet.length > 0) {
        setDataProcedimentos([...dataGet])
      }
    }

    async function getTomadaContasEspecial() {
      const response = await axios.get(
        `${baseAPI.URL}/forms/${context.formInfo.id}/tomada_contas`,
        { headers: baseAPI.HEADERS(token) },
      )

      const dataGet: Array<DataTomadaContasEspecialProps> = await response.data.map(
        (data: DataTomadaContasEspecialProps) => {
          return {
            id: data.id,
            tomadaContasEspecialIdNumRegistro:
              data.tomadaContasEspecialIdNumRegistro,
            tomadaContasEspecialCodigoUnidadeGestora:
              data.tomadaContasEspecialCodigoUnidadeGestora,
            tomadaContasEspecialProcesso: data.tomadaContasEspecialProcesso,
            tomadaContasEspecialAnoProcesso:
              data.tomadaContasEspecialAnoProcesso,
            tomadaContasEspecialFatoMotivo: data.tomadaContasEspecialFatoMotivo,
            tomadaContasEspecialDataCiencia:
              data.tomadaContasEspecialDataCiencia,
            tomadaContasEspecialDataInstauracao:
              data.tomadaContasEspecialDataInstauracao,
            tomadaContasEspecialDataEnvioTribunalContas:
              data.tomadaContasEspecialDataEnvioTribunalContas,
            tomadaContasEspecialValorDebito:
              data.tomadaContasEspecialValorDebito,
            tomadaContasEspecialSituacaoEm31do12:
              data.tomadaContasEspecialSituacaoEm31do12,
            tomadaContasEspecialMotivoBaixaDebito:
              data.tomadaContasEspecialMotivoBaixaDebito,
          }
        },
      )
      if (dataGet.length > 0) {
        setDataTomadaContasEspecial([...dataGet])
      }
    }
  }, [])

  if (
    dataEstruturaInicial.length > 0 &&
    dataUnidadeGestora.length > 0 &&
    dataProcedimentos.length > 0
  ) {
   
  }

  const xml = createSchemaINFOCIXML(
    dataEstruturaInicial,
    dataUnidadeGestora,
    dataProcedimentos,
    dataTomadaContasEspecial,
  )

  function downloadXML() {
    const filename = 'INFOCI.XML'
    download(filename, xml)
  }
  
  return (
    <GenerateXMLStyle id='printReport'>
      <h2>
        Verifique se as informações foram preenchidas corretamente e clique no botão <span>INFOCI XML</span> no final da página para realizar o download do arquivo. 
      </h2>

      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="Registro da Estrutura Inicial"
      >
        <ListItemButton onClick={handleClickEstruturaInicialReport}>
          <ListItemText primary="Informações de Controle Interno - Estrutura Inicial" />
          {openEstruturaInicialReport ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openEstruturaInicialReport} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <EstruturaInicialReport
              dataEstruturaInicial={dataEstruturaInicial}
            />
          </List>
        </Collapse>
      </List>

      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="Registro da Unidade Gestora"
      >
        <ListItemButton onClick={handleClickUnidadeGestoraReport}>
          <ListItemText primary="Informações de Controle Interno - Unidade Gestora" />
          {openUnidadeGestoraReport ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openUnidadeGestoraReport} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <UnidadeGestoraReport
              dataUnidadeGestora={dataUnidadeGestora}
            />
          </List>
        </Collapse>
      </List>

      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="Registro dos Procedimentos"
      >
        <ListItemButton onClick={handleClickProcedimentosReport}>
          <ListItemText primary="Informações de Controle Interno - Procedimentos" />
          {openProcedimentosReport ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openProcedimentosReport} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ProcedimentosReport
              dataProcedimentos={dataProcedimentos}
            />
          </List>
        </Collapse>
      </List>
    {dataTomadaContasEspecial.length > 0 && 
      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="Registro dos Tomada Contas Especial"
      >
        <ListItemButton onClick={handleClickTomadaContasEspecialReport}>
          <ListItemText primary="Informações de Controle Interno - Tomada Contas Especial" />
          {openTomadaContasEspecialReport ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openTomadaContasEspecialReport} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <TomadaContasEspecialReport
              dataTomadaContasEspecial={dataTomadaContasEspecial}
            />
          </List>
        </Collapse>
      </List>}
    
      <div data-button="download">
        <Button onClick={downloadXML} variant="contained">
          INFOCI XML
        </Button>

      </div>
      
    </GenerateXMLStyle>
  )
}
