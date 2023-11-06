import { useFormik } from 'formik'
import { TextField, MenuItem, Button, IconButton, Autocomplete, Tooltip, Box, Collapse, Modal } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import axios from 'axios'
import baseAPI from '../../utils/baseAPI'

import validationTomadaContasEspecial from '../../utils/validationTomadaContasEspecial'
import { TomadaContasEspecialraStyle } from './style'
import { GlobalContext } from '../../context/GlobalStorage'
import { ConfirmDialog } from '../ConfirmDialog'
import { AlertSucess } from '../AlertSucess'
import codigosCidades from '../../utils/codigosCidades'
import { InfoOutlined } from '@mui/icons-material'
import ModalExplicacaoCampo from '../ModalExplicacaoCampo'

interface DataTomadaContasEspecialProps {
  id: number
  tomadaContasEspecialIdNumRegistro: string
  tomadaContasEspecialCodigoUnidadeGestora: string
  tomadaContasEspecialTipoTce: string
  tomadaContasEspecialProcesso: string
  tomadaContasEspecialAnoProcesso: string
  tomadaContasEspecialFatoMotivo: string
  tomadaContasEspecialDataCiencia: string
  tomadaContasEspecialDataInstauracao: string
  tomadaContasEspecialDataEnvioTribunalContas: string
  tomadaContasEspecialValorDebito: string
  tomadaContasEspecialSituacaoEm31do12InstauradaUg: string
  tomadaContasEspecialSituacaoEm31do12EnviadaTcees: string
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50vw",
  height: "max-content",
  bgcolor: 'background.paper',
  borderRadius: "5px",
  border: "1px solid black",
  boxShadow: 24,
  p: "2rem",
};

const regexDate = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

export const TomadaContasEspecial = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [textoModalCampo, setTextoModalCampo] = useState("");
  const [videoModalCampo, setVideoModalCampo] = useState("");

  const context = useContext(GlobalContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('app-token')

  const [dataTomadaContasEspecial, setDataTomadaContasEspecial] = useState<
    DataTomadaContasEspecialProps[]
  >([] as DataTomadaContasEspecialProps[])

  const [buttonId, setButtonId] = useState('')
  const [selectTomadaContasEspecial, setSelectTomadaContasEspecial] = useState(
    0,
  )
  const [
    openDialogTomadaContasEspecial,
    setOpenDialogTomadaContasEspecial,
  ] = useState(false)
  const [openDialogUnidadeGestora, setOpenDialogUnidadeGestora] = useState(
    false,
  )
  const [
    openDialogRemoveTomadaContasEspecial,
    setOpenDialogRemoveTomadaContasEspecial,
  ] = useState(false)

  const [
    openAlertSave,
    setOpenAlertSave,
  ] = useState(false)

  useEffect(() => {
    if (!context.formInfo.id) {
      navigate('/select_ug')
      return
    }
    requestAPI()
  }, [])

  async function requestAPI() {
    const tomadaContasEspecialExists = await tomadaContasEspecialList()

    if (!tomadaContasEspecialExists) {
      await newTomadaContasEspecial()
      await tomadaContasEspecialList()
    }
  }

  async function tomadaContasEspecialList() {
    const dataGetTCE = await getTomadaContasEspecial()

    if (dataGetTCE.length > 0) {
      const dataGetTCEReorderId: DataTomadaContasEspecialProps[] = await reorderIdNumRegistro(
        dataGetTCE,
      )

      setDataTomadaContasEspecial([...dataGetTCEReorderId])

      setSelectTomadaContasEspecial(dataGetTCE.length - 1)

      return true
    }
    return false
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
          tomadaContasEspecialTipoTce:
            data.tomadaContasEspecialTipoTce,
          tomadaContasEspecialProcesso: data.tomadaContasEspecialProcesso,
          tomadaContasEspecialAnoProcesso: data.tomadaContasEspecialAnoProcesso,
          tomadaContasEspecialFatoMotivo: data.tomadaContasEspecialFatoMotivo,
          tomadaContasEspecialDataCiencia: data.tomadaContasEspecialDataCiencia,
          tomadaContasEspecialDataInstauracao:
            data.tomadaContasEspecialDataInstauracao,
          tomadaContasEspecialDataEnvioTribunalContas:
            data.tomadaContasEspecialDataEnvioTribunalContas,
          tomadaContasEspecialValorDebito: data.tomadaContasEspecialValorDebito,
          tomadaContasEspecialSituacaoEm31do12InstauradaUg:
            data.tomadaContasEspecialSituacaoEm31do12InstauradaUg,
          tomadaContasEspecialSituacaoEm31do12EnviadaTcees:
            data.tomadaContasEspecialSituacaoEm31do12EnviadaTcees
        }
      },
    )

    return dataGet
  }

  async function reorderIdNumRegistro(
    dataGetTCE: DataTomadaContasEspecialProps[],
  ) {
    const dataGetTCEReorderId = dataGetTCE.map(
      async (data: DataTomadaContasEspecialProps, index: number) => {
        const response = await axios.put(
          `${baseAPI.URL}/forms/${context.formInfo.id}/tomada_contas/${data.id}`,
          {
            tomadaContasEspecialIdNumRegistro: `${('0000' + (index + 1)).slice(
              -5,
            )}`,
          },
          { headers: baseAPI.HEADERS(token) },
        )
        return response.data
      },
    )

    return await Promise.all(dataGetTCEReorderId)
  }

  async function newTomadaContasEspecial() {
    const valuesTCE = {
      tomadaContasEspecialIdNumRegistro: ``,
      tomadaContasEspecialCodigoUnidadeGestora: `${context.formInfo.nomeUnidadeGestora !== 'SECONT' ? context.formInfo.codigoUnidadeGestoraCidades : ''}`,
      tomadaContasEspecialTipoTce: ``,
      tomadaContasEspecialProcesso: ``,
      tomadaContasEspecialAnoProcesso: ``,
      tomadaContasEspecialFatoMotivo: ``,
      tomadaContasEspecialDataCiencia: ``,
      tomadaContasEspecialDataInstauracao: ``,
      tomadaContasEspecialDataEnvioTribunalContas: ``,
      tomadaContasEspecialValorDebito: ``,
      tomadaContasEspecialSituacaoEm31do12InstauradaUg: ``,
      tomadaContasEspecialSituacaoEm31do12EnviadaTcees: ``
    }
    await axios.post(
      `${baseAPI.URL}/forms/${context.formInfo.id}/tomada_contas`,
      valuesTCE,
      { headers: baseAPI.HEADERS(token) },
    )
  }

  async function deleteTomadaContasEspecial() {
    await axios.delete(
      `${baseAPI.URL}/forms/${context.formInfo.id}/tomada_contas/${dataTomadaContasEspecial[selectTomadaContasEspecial].id}`,
      { headers: baseAPI.HEADERS(token) },
    )

    if(dataTomadaContasEspecial.length === 1) {
      context.setValueTab(4)
      return
    }
    setSelectTomadaContasEspecial(dataTomadaContasEspecial.length - 2)

    await tomadaContasEspecialList()
  }
  
  async function saveTomadaContasEspecial() {
   
    setOpenAlertSave(true);

    await axios.put(
      `${baseAPI.URL}/forms/${context.formInfo.id}/tomada_contas/${dataTomadaContasEspecial[selectTomadaContasEspecial].id}`,
      formik.values,
      { headers: baseAPI.HEADERS(token) },
    )
  }

  async function handleSelectTomadaContasEspecial(e: any) {
    const validate = await formik.validateForm(formik.values)

    if (Object.entries(validate).length > 0) {
      alert(
        'Preencha todos os campos corretamente antes de alternar de registro.',
      )
      formik.handleSubmit()
      context.setValueTab(3)
      return
    }

    saveTomadaContasEspecial()
    await tomadaContasEspecialList()
    setSelectTomadaContasEspecial(e.target.value)
  }

  function getIdButton(e: any) {
    setButtonId(e.target.parentNode.id)
  }

  async function responseDialogTomadaContasEspecialYes() {
    await newTomadaContasEspecial()
    await tomadaContasEspecialList()

    setSelectTomadaContasEspecial(selectTomadaContasEspecial + 1)
    return
  }

  function responseDialogTomadaContasEspecialNo() {
   

    if(context.formInfo.nomeUnidadeGestora === 'SECONT') {
      setOpenDialogUnidadeGestora(true)
      return
    }
    context.setValueTab(4)
   
    return
  }

  async function responseDialogUnidadeGestoraYes() {
    

    const valuesUnidadeGestora = {
      unidadeGestoraIdNumRegistro: ``,
      unidadeGestoraNivelControleInterno: `${
        context.formInfo.nomeUnidadeGestora !== 'SECONT' ? 2 : ''
      }`,
      unidadeGestoraCodigoUnidadeGestora: ``,
      unidadeGestoraOpiniaoPrestacaoContasControleInterno: ``,
      unidadeGestoraFatoRelevanteRelaci: ``,
      unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci: ``,
    }
    await axios.post(
      `${baseAPI.URL}/forms/${context.formInfo.id}/unidades`,
      valuesUnidadeGestora,
      { headers: baseAPI.HEADERS(token) },
    )
      context.setValueTab(1)
    return
  }

  function responseDialogUnidadeGestoraNo() {
   
    context.setValueTab(4)
    return
  }

  const initialValues = {
    tomadaContasEspecialIdNumRegistro: `${
      dataTomadaContasEspecial.length &&
      dataTomadaContasEspecial[selectTomadaContasEspecial]
        .tomadaContasEspecialIdNumRegistro
    }`,
    tomadaContasEspecialCodigoUnidadeGestora: `${
      dataTomadaContasEspecial.length ?
      dataTomadaContasEspecial[selectTomadaContasEspecial]
        .tomadaContasEspecialCodigoUnidadeGestora : ''
    }`,
    tomadaContasEspecialTipoTce: `${
      dataTomadaContasEspecial.length ?
      dataTomadaContasEspecial[selectTomadaContasEspecial]
        .tomadaContasEspecialTipoTce : ''
    }`,
    tomadaContasEspecialProcesso: `${
      dataTomadaContasEspecial.length &&
      dataTomadaContasEspecial[selectTomadaContasEspecial]
        .tomadaContasEspecialProcesso
    }`,
    tomadaContasEspecialAnoProcesso: `${
      dataTomadaContasEspecial.length &&
      dataTomadaContasEspecial[selectTomadaContasEspecial]
        .tomadaContasEspecialAnoProcesso
    }`,
    tomadaContasEspecialFatoMotivo: `${
      dataTomadaContasEspecial.length
        ? dataTomadaContasEspecial[selectTomadaContasEspecial]
            .tomadaContasEspecialFatoMotivo
        : ''
    }`,
    tomadaContasEspecialDataCiencia: `${
      dataTomadaContasEspecial.length &&
      dataTomadaContasEspecial[selectTomadaContasEspecial]
        .tomadaContasEspecialDataCiencia
    }`,
    tomadaContasEspecialDataInstauracao: `${
      dataTomadaContasEspecial.length &&
      dataTomadaContasEspecial[selectTomadaContasEspecial]
        .tomadaContasEspecialDataInstauracao
    }`,
    tomadaContasEspecialDataEnvioTribunalContas: `${
      dataTomadaContasEspecial.length &&
      dataTomadaContasEspecial[selectTomadaContasEspecial]
        .tomadaContasEspecialDataEnvioTribunalContas
    }`,
    tomadaContasEspecialValorDebito: `${
      dataTomadaContasEspecial.length &&
      dataTomadaContasEspecial[selectTomadaContasEspecial]
        .tomadaContasEspecialValorDebito
    }`,
    tomadaContasEspecialSituacaoEm31do12InstauradaUg: `${
      dataTomadaContasEspecial.length
        ? dataTomadaContasEspecial[selectTomadaContasEspecial]
            .tomadaContasEspecialSituacaoEm31do12InstauradaUg
        : ''
    }`,
    tomadaContasEspecialSituacaoEm31do12EnviadaTcees: `${
      dataTomadaContasEspecial.length
        ? dataTomadaContasEspecial[selectTomadaContasEspecial]
            .tomadaContasEspecialSituacaoEm31do12EnviadaTcees
        : ''
    }`,
  }

  const validationSchema = validationTomadaContasEspecial.validationSchema

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: () => {
      saveTomadaContasEspecial()

      if (buttonId === 'previous') {
        context.setValueTab(2)
        return
      }

      setOpenDialogTomadaContasEspecial(true)
    },
  })

  const validaEnvio = () =>{
    formik.setFieldValue('tomadaContasEspecialSituacaoEm31do12InstauradaUg',``);
    formik.setFieldValue('tomadaContasEspecialSituacaoEm31do12EnviadaTcees',``);
  }
  return (
    <TomadaContasEspecialraStyle onSubmit={formik.handleSubmit}>
      <div data-header="headerForm">
        <div data-input="input-options">
        {dataTomadaContasEspecial.length && <TextField
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="tomada_contas_especial"
              name="tomada_contas_especial"
              value={selectTomadaContasEspecial}
              label="TCE(s)"
              onChange={handleSelectTomadaContasEspecial}
            >
              {dataTomadaContasEspecial.map(
                (data: DataTomadaContasEspecialProps, index) => {
                  return (
                    <MenuItem
                      value={index}
                      key={dataTomadaContasEspecial[index].id}
                    >
                      TCE -{' '}
                      {
                        dataTomadaContasEspecial[index]
                          .tomadaContasEspecialIdNumRegistro
                      }
                    </MenuItem>
                  )
                },
              )}
             
            </TextField>}
         
            <IconButton
              title="Remover Tomada de Contas Especial"
              aria-label="Remover Tomada de Contas Especial"
              id="removeTCE"
              onClick={() => setOpenDialogRemoveTomadaContasEspecial(true)}
            >
              <RemoveCircleIcon />
            </IconButton>
        </div>

        <div data-button="save">
          <Button variant="contained" onClick={saveTomadaContasEspecial}>
            Salvar
          </Button>
        </div>
      </div>
      <legend>
        Informações de Controle Interno - Tomada de Contas Especial
      </legend>
      <Box sx={{display: 'flex', gap: '1rem'}}>       
        <TextField
          variant="outlined"
          fullWidth
          id="tomadaContasEspecialIdNumRegistro"
          label="Identificação do Número do Registro"
          name="tomadaContasEspecialIdNumRegistro"
          value={formik.values.tomadaContasEspecialIdNumRegistro}
          onChange={formik.handleChange}
          error={
            formik.touched.tomadaContasEspecialIdNumRegistro &&
            Boolean(formik.errors.tomadaContasEspecialIdNumRegistro)
          }
          helperText={
            formik.touched.tomadaContasEspecialIdNumRegistro &&
            formik.errors.tomadaContasEspecialIdNumRegistro
          }
          disabled
        />
        
      </Box>
      {context.formInfo.nomeUnidadeGestora !== 'SECONT' ? 
      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          variant="outlined"
          fullWidth
          id="tomadaContasEspecialCodigoUnidadeGestora"
          label="Código da Unidade Gestora em que as
          Tomadas de Contas Especiais foram
          realizadas"
          name="tomadaContasEspecialCodigoUnidadeGestora"
          value={formik.values.tomadaContasEspecialCodigoUnidadeGestora}
          onChange={formik.handleChange}
          error={
            formik.touched.tomadaContasEspecialCodigoUnidadeGestora &&
            Boolean(formik.errors.tomadaContasEspecialCodigoUnidadeGestora)
          }
          helperText={
            formik.touched.tomadaContasEspecialCodigoUnidadeGestora &&
            formik.errors.tomadaContasEspecialCodigoUnidadeGestora
          }
          disabled
        />
        
      </Box> : <Autocomplete
      id="tomadaContasEspecialCodigoUnidadeGestora"
      options={codigosCidades}
      noOptionsText={'Não encontrado'}
      getOptionLabel={(option) => option.label || ""}
      value={codigosCidades.filter(codigo => codigo.cod === formik.values.tomadaContasEspecialCodigoUnidadeGestora)[0]}
      isOptionEqualToValue={(option, value) => option === value}
      defaultValue={{cod:"", label:""}}
      onChange={(event, value) => {
        if(value) {
          formik.setFieldValue('tomadaContasEspecialCodigoUnidadeGestora', value?.cod)
          return
        }
       
        formik.setFieldValue('tomadaContasEspecialCodigoUnidadeGestora', "")
        
      }}
     
      
      renderInput={(params) => (
        <Box sx={{display: 'flex', gap: '1rem'}}>
          <TextField
            {...params}
            name="tomadaContasEspecialCodigoUnidadeGestora"
            label="Código da Unidade Gestora em que as
            Tomadas de Contas Especiais foram
            realizadas"
            variant="outlined"
            error={
              formik.touched.tomadaContasEspecialCodigoUnidadeGestora &&
              Boolean(formik.errors.tomadaContasEspecialCodigoUnidadeGestora)
            }
            helperText={
              formik.touched.tomadaContasEspecialCodigoUnidadeGestora &&
              formik.errors.tomadaContasEspecialCodigoUnidadeGestora
            }
            fullWidth
          />
          <Tooltip title="" placement='right'>
            <IconButton sx={{height: 'max-content', alignSelf: 'center'}} onClick={() => {
              setModalOpen(true);
              setTextoModalCampo("Campo ID Número Registro");
              setVideoModalCampo("https://www.youtube.com/embed/Ru6Ld6nH6C8?start=1&end=120")
            }}>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    /> }

    <Box sx={{display: 'flex', gap: '1rem'}}>
      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="tomadaContasEspecialTipoTce"
        name="tomadaContasEspecialTipoTce"
        value={formik.values.tomadaContasEspecialTipoTce}
        label="Tipo de Tomada de Contas Especial"
        onChange={formik.handleChange}
        error={
          formik.touched.tomadaContasEspecialTipoTce &&
          Boolean(formik.errors.tomadaContasEspecialTipoTce)
        }
        helperText={
          formik.touched.tomadaContasEspecialTipoTce &&
          formik.errors.tomadaContasEspecialTipoTce
        }
      >
        <MenuItem value={1}>
          1 – Instaurada de ofício
        </MenuItem>
        <MenuItem value={2}>
          2 – Determinada pelo TCEES
        </MenuItem>
      </TextField>
      
      </Box>
      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          variant="outlined"
          fullWidth
          id="tomadaContasEspecialProcesso"
          label="Número do Processo Administrativo da
        Tomada de Contas Especial"
          name="tomadaContasEspecialProcesso"
          value={formik.values.tomadaContasEspecialProcesso}
          onChange={formik.handleChange}
          error={
            formik.touched.tomadaContasEspecialProcesso &&
            Boolean(formik.errors.tomadaContasEspecialProcesso)
          }
          helperText={
            formik.touched.tomadaContasEspecialProcesso &&
            formik.errors.tomadaContasEspecialProcesso
          }
        />
        
      </Box>
      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          variant="outlined"
          fullWidth
          id="tomadaContasEspecialAnoProcesso"
          label="Ano do Processo Administrativo da Tomada de
        Contas Especial"
          name="tomadaContasEspecialAnoProcesso"
          value={formik.values.tomadaContasEspecialAnoProcesso}
          onChange={formik.handleChange}
          error={
            formik.touched.tomadaContasEspecialAnoProcesso &&
            Boolean(formik.errors.tomadaContasEspecialAnoProcesso)
          }
          helperText={
            formik.touched.tomadaContasEspecialAnoProcesso &&
            formik.errors.tomadaContasEspecialAnoProcesso
          }
        />
        
      </Box>
      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          fullWidth
          select
          inputProps={{ MenuProps: { disableScrollLock: true } }}
          id="tomadaContasEspecialFatoMotivo"
          name="tomadaContasEspecialFatoMotivo"
          value={formik.values.tomadaContasEspecialFatoMotivo}
          label="Fatos motivadores para a Instauração da
        Tomada de Contas Especial"
          onChange={formik.handleChange}
          error={
            formik.touched.tomadaContasEspecialFatoMotivo &&
            Boolean(formik.errors.tomadaContasEspecialFatoMotivo)
          }
          helperText={
            formik.touched.tomadaContasEspecialFatoMotivo &&
            formik.errors.tomadaContasEspecialFatoMotivo
          }
        >
          <MenuItem value={1}>
            1 - Omissão no dever de prestar contas ou a não comprovação da correta
            aplicação de recursos repassados mediante convênio, contrato de
            repasse, ou instrumento congênere;
          </MenuItem>
          <MenuItem value={2}>
            2 - Ocorrência de desfalque, alcance, desvio, desaparecimento de
            dinheiro, bens ou valores públicos;
          </MenuItem>
          <MenuItem value={3}>
            3 - Ocorrência de extravio, perda, subtração ou deterioração culposa
            ou dolosa de valores e bens;
          </MenuItem>
          <MenuItem value={4}>
            4 - Prática de ato ilegal, ilegítimo ou antieconômico de que resulte
            dano ao erário;
          </MenuItem>
          <MenuItem value={5}>
            5 - Concessão irregular de quaisquer benefícios fiscais ou de renúncia
            de receitas de que resulte dano ao erário.
          </MenuItem>
        </TextField>
        
      </Box>

      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          variant="outlined"
          fullWidth
          id="tomadaContasEspecialDataCiencia"
          label="Data do evento ou, quando desconhecida, 
            data da ciência do fato pela autoridade
            competente (Inciso I, do art. 2o da IN 32/2014)."
          name="tomadaContasEspecialDataCiencia"
          value={formik.values.tomadaContasEspecialDataCiencia}
          onChange={formik.handleChange}
          error={
            formik.touched.tomadaContasEspecialDataCiencia &&
            Boolean(formik.errors.tomadaContasEspecialDataCiencia)
          }
          helperText={
            formik.touched.tomadaContasEspecialDataCiencia &&
            formik.errors.tomadaContasEspecialDataCiencia
          }
        />
        
      </Box>

      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          variant="outlined"
          fullWidth
          id="tomadaContasEspecialDataInstauracao"
          label="Data de Instauração da Tomada de Contas
        Especial"
          name="tomadaContasEspecialDataInstauracao"
          value={formik.values.tomadaContasEspecialDataInstauracao}
          onChange={formik.handleChange}
          error={
            formik.touched.tomadaContasEspecialDataInstauracao &&
            Boolean(formik.errors.tomadaContasEspecialDataInstauracao)
          }
          helperText={
            formik.touched.tomadaContasEspecialDataInstauracao &&
            formik.errors.tomadaContasEspecialDataInstauracao
          }
        />
        
      </Box>

      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          variant="outlined"
          fullWidth
          id="tomadaContasEspecialDataEnvioTribunalContas"
          label="Data de Envio ao TCEES da Tomada de
        Contas Especial"
          name="tomadaContasEspecialDataEnvioTribunalContas"
          value={formik.values.tomadaContasEspecialDataEnvioTribunalContas}
          onChange={(e) => {formik.handleChange(e); validaEnvio()}}
          error={
            formik.touched.tomadaContasEspecialDataEnvioTribunalContas &&
            Boolean(formik.errors.tomadaContasEspecialDataEnvioTribunalContas)
          }
          helperText={
            formik.touched.tomadaContasEspecialDataEnvioTribunalContas &&
            formik.errors.tomadaContasEspecialDataEnvioTribunalContas
          }
        />
        
      </Box>

      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          variant="outlined"
          fullWidth
          id="tomadaContasEspecialValorDebito"
          label="Valor Original do Débito - R$"
          name="tomadaContasEspecialValorDebito"
          value={formik.values.tomadaContasEspecialValorDebito}
          onChange={formik.handleChange}
          error={
            formik.touched.tomadaContasEspecialValorDebito &&
            Boolean(formik.errors.tomadaContasEspecialValorDebito)
          }
          helperText={
            formik.touched.tomadaContasEspecialValorDebito &&
            formik.errors.tomadaContasEspecialValorDebito
          }
        />
          
      </Box>

      <Box sx={{display: formik.values.tomadaContasEspecialDataEnvioTribunalContas === "" ?'flex':'none' , gap: '1rem'}}>
        <TextField
          fullWidth
          select
          inputProps={{ MenuProps: { disableScrollLock: true } }}
          id="tomadaContasEspecialSituacaoEm31do12InstauradaUg"
          name="tomadaContasEspecialSituacaoEm31do12InstauradaUg"
          value={formik.values.tomadaContasEspecialSituacaoEm31do12InstauradaUg}
          label="Situação da Tomada de Contas Especial em 
            31 de dezembro do Exercício referência da 
            Prestação de Contas Anual, referente as 
            TCE’s instauradas na UG e ainda não 
            encaminhadas ao TCEES.
            "
          onChange={formik.handleChange}
          error={
            formik.touched.tomadaContasEspecialSituacaoEm31do12InstauradaUg &&
            Boolean(formik.errors.tomadaContasEspecialSituacaoEm31do12InstauradaUg)
          }
          helperText={
            formik.touched.tomadaContasEspecialSituacaoEm31do12InstauradaUg &&
            formik.errors.tomadaContasEspecialSituacaoEm31do12InstauradaUg
          }
        >
          <MenuItem value={1}>1 - Aguardando o início da instrução</MenuItem>
          <MenuItem value={2}>2 - Em instrução dentro do prazo</MenuItem>
          <MenuItem value={3}>3 - Em instrução fora do prazo</MenuItem>
          <MenuItem value={4}>4 - Finalizada – Dispensado o encaminhamento ao TCEES – art. 9º, IN 32/2014;</MenuItem>
          <MenuItem value={5}>5 - Finalizada - Arquivada antes do encaminhamento ao TCEES – art. 10, IN 32/2014</MenuItem>
        </TextField>
        
      </Box>

      <Box sx={{display: formik.values.tomadaContasEspecialDataEnvioTribunalContas !== "" ?'flex':'none', gap: '1rem'}}>
        <TextField
          fullWidth
          select
          inputProps={{ MenuProps: { disableScrollLock: true } }}
          id="tomadaContasEspecialSituacaoEm31do12EnviadaTcees"
          name="tomadaContasEspecialSituacaoEm31do12EnviadaTcees"
          value={formik.values.tomadaContasEspecialSituacaoEm31do12EnviadaTcees}
          label="Situação da Tomada de Contas Especial em 
            31 de dezembro do Exercício referência da 
            Prestação de Contas Anual, referente as 
            TCE’s já encaminhadas ao TCEES.
            "
          onChange={formik.handleChange}
          error={
            formik.touched.tomadaContasEspecialSituacaoEm31do12EnviadaTcees &&
            Boolean(formik.errors.tomadaContasEspecialSituacaoEm31do12EnviadaTcees)
          }
          helperText={
            formik.touched.tomadaContasEspecialSituacaoEm31do12EnviadaTcees &&
            formik.errors.tomadaContasEspecialSituacaoEm31do12EnviadaTcees
          }
        >
          <MenuItem value={1}>1 - Finalizada - Aguardando deliberação do TCEES</MenuItem>
          <MenuItem value={2}>2 - Com decisão do TCEES pela condenação ao ressarcimento / Sem baixa da responsabilidade pelo débito</MenuItem>
          <MenuItem value={3}>3 - Com decisão do TCEES pela baixa da responsabilidade pelo débito – art. 20, da IN 32/2014</MenuItem>
          <MenuItem value={4}>4 - Em complementação de informações, após retorno determinado pelo TCEES – art. 15, IN 32/2014</MenuItem>
        </TextField>
        
      </Box>
      <div data-button="next-previous">
        <IconButton
          title="Anterior"
          aria-label="Formulário anterior."
          type="submit"
          id="previous"
          onClick={getIdButton}
        >
          <ArrowCircleLeftIcon id="previous"/>
        </IconButton>

        <IconButton
          title="Próximo"
          aria-label="Próximo formulário."
          type="submit"
          id="next"
          onClick={() => getIdButton}
        >
          <ArrowCircleRightIcon />
        </IconButton>
      </div>

      <ConfirmDialog
        open={openDialogRemoveTomadaContasEspecial}
        setOpen={setOpenDialogRemoveTomadaContasEspecial}
        titleMessage={'Tem certeza que deseja remover essa Tomada de Contas ?'}
        responseYes={deleteTomadaContasEspecial}
        responseNo={() => null}
      />

      <ConfirmDialog
        open={openDialogTomadaContasEspecial}
        setOpen={setOpenDialogTomadaContasEspecial}
        titleMessage={'Deseja incluir informações de outra Tomada de Contas ?'}
        responseYes={responseDialogTomadaContasEspecialYes}
        responseNo={responseDialogTomadaContasEspecialNo}
      />

      <ConfirmDialog
        open={openDialogUnidadeGestora}
        setOpen={setOpenDialogUnidadeGestora}
        titleMessage={'Deseja incluir informações de outra Unidade Gestora ?'}
        responseYes={responseDialogUnidadeGestoraYes}
        responseNo={responseDialogUnidadeGestoraNo}
      />

      <AlertSucess
        open={openAlertSave}
        setOpen={setOpenAlertSave}
        message={'Os dados da Tomada de Contas Especial foram salvos.'}
      />

      <Collapse in={modalOpen} unmountOnExit>
        <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <ModalExplicacaoCampo texto={textoModalCampo} video={videoModalCampo}/>
          </Box>
        </Modal>
      </Collapse>
    </TomadaContasEspecialraStyle>
  )
}
