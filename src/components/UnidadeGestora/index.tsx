import { useFormik } from 'formik'

import { TextField, MenuItem, Button, IconButton, Autocomplete, Box, Tooltip, Collapse, Modal, Typography } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import { UnidadeGestoraStyle } from './style'
import validationUnidadeGestora from '../../utils/validationUnidadeGestora'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalStorage'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import baseAPI from '../../utils/baseAPI'
import { ConfirmDialog } from '../ConfirmDialog'
import { AlertSucess } from '../AlertSucess'
import codigosCidades from '../../utils/codigosCidades'
import { InfoOutlined } from '@mui/icons-material'
import ModalExplicacaoCampo from '../ModalExplicacaoCampo'

interface DataUnidadeGestoraProps {
  id: number
  unidadeGestoraIdNumRegistro: string
  unidadeGestoraNivelControleInterno: string
  unidadeGestoraCodigoUnidadeGestora: string
  unidadeGestoraOpiniaoPrestacaoContasControleInterno: string
  unidadeGestoraFatoRelevanteRelaci: string
  unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci: string
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

export const UnidadeGestora = () => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [textoModalCampo, setTextoModalCampo] = useState("");
  const [videoModalCampo, setVideoModalCampo] = useState("");

  const context = useContext(GlobalContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('app-token')
  const [buttonId, setButtonId] = useState('')
  const [dataUnidadeGestora, setDataUnidadeGestora] = useState<
    DataUnidadeGestoraProps[]
  >([] as DataUnidadeGestoraProps[])
  const [selectUnidadeGestora, setSelectUnidadeGestora] = useState(0)

  const [
    openDialogRemoveUnidadeGestora,
    setOpenDialogRemoveUnidadeGestora,
  ] = useState(false)

  const [openAlertSave, setOpenAlertSave] = useState(false);

  useEffect(() => {
    if (!context.formInfo.id) {
      navigate('/select_ug')
      return
    }

    requestAPI()
  }, [])

  async function requestAPI() {
    const unidadeGestoraExists = await unidadeGestoraList()

    if (!unidadeGestoraExists) {
      await newUnidadeGestora()
      await unidadeGestoraList()
    }
  }

  async function unidadeGestoraList() {
    const dataGetUnidadeGestora = await getUnidadeGestora()

    if (dataGetUnidadeGestora.length > 0) {
      const dataGetUnidadeGestoraReorderId: DataUnidadeGestoraProps[] = await reorderIdNumRegistro(
        dataGetUnidadeGestora,
      )

      setDataUnidadeGestora([...dataGetUnidadeGestoraReorderId])

      setSelectUnidadeGestora(dataGetUnidadeGestora.length - 1)

      return true
    }
    return false
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
          unidadeGestoraOpiniaoPrestacaoContasControleInterno:
            data.unidadeGestoraOpiniaoPrestacaoContasControleInterno,
          unidadeGestoraFatoRelevanteRelaci:
            data.unidadeGestoraFatoRelevanteRelaci,
          unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci:
            data.unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci,
        }
      },
    )
    return dataGet
  }

  async function reorderIdNumRegistro(
    dataGetUnidadeGestora: DataUnidadeGestoraProps[],
  ) {
    const dataGetUnidadeGestoraReorderId = dataGetUnidadeGestora.map(
      async (data: DataUnidadeGestoraProps, index: number) => {
        const response = await axios.put(
          `${baseAPI.URL}/forms/${context.formInfo.id}/unidades/${data.id}`,
          {
            unidadeGestoraIdNumRegistro: `${('0000' + (index + 1)).slice(-5)}`,
          },
          { headers: baseAPI.HEADERS(token) },
        )
        return response.data
      },
    )

    return await Promise.all(dataGetUnidadeGestoraReorderId)
  }

  async function newUnidadeGestora() {
    const valuesUnidadeGestora = {
      unidadeGestoraIdNumRegistro: ``,
      unidadeGestoraNivelControleInterno: `${
        context.formInfo.nomeUnidadeGestora !== 'SECONT' ? 2 : ''
      }`,
      unidadeGestoraCodigoUnidadeGestora: `${context.formInfo.nomeUnidadeGestora !== 'SECONT' ? context.formInfo.codigoUnidadeGestoraCidades : ''}`,
      unidadeGestoraOpiniaoPrestacaoContasControleInterno: ``,
      unidadeGestoraFatoRelevanteRelaci: ``,
      unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci: ``,
    }
    await axios.post(
      `${baseAPI.URL}/forms/${context.formInfo.id}/unidades`,
      valuesUnidadeGestora,
      { headers: baseAPI.HEADERS(token) },
    )
  }

  async function deleteUnidadeGestora() {
    await axios.delete(
      `${baseAPI.URL}/forms/${context.formInfo.id}/unidades/${dataUnidadeGestora[selectUnidadeGestora].id}`,
      { headers: baseAPI.HEADERS(token) },
    )

   

    setSelectUnidadeGestora(dataUnidadeGestora.length - 2)

    await unidadeGestoraList()
  }

  async function saveUnidadeGestora() {
   

    setOpenAlertSave(true);

    await axios.put(
      `${baseAPI.URL}/forms/${context.formInfo.id}/unidades/${dataUnidadeGestora[selectUnidadeGestora].id}`,
      formik.values,
      { headers: baseAPI.HEADERS(token) },
    )
  }

  async function handleSelectUnidadeGestora(e: any) {
    const validate = await formik.validateForm(formik.values)

    if (Object.entries(validate).length > 0) {
      alert(
        'Preencha todos os campos corretamente antes de alternar de registro.',
      )
      formik.handleSubmit()
      context.setValueTab(1)
      return
    }

    saveUnidadeGestora()
    await unidadeGestoraList()
    setSelectUnidadeGestora(e.target.value)
  }

  const initialValues = {
    unidadeGestoraIdNumRegistro: `${
      dataUnidadeGestora.length > 0 &&
      dataUnidadeGestora[selectUnidadeGestora].unidadeGestoraIdNumRegistro
    }`,
    unidadeGestoraNivelControleInterno: `${
      dataUnidadeGestora.length > 0
        ? dataUnidadeGestora[selectUnidadeGestora]
            .unidadeGestoraNivelControleInterno
        : ''
    }`,
    unidadeGestoraCodigoUnidadeGestora: `${
      dataUnidadeGestora.length > 0 ?
      dataUnidadeGestora[selectUnidadeGestora]
        .unidadeGestoraCodigoUnidadeGestora : ''
    }`,
    unidadeGestoraOpiniaoPrestacaoContasControleInterno: `${
      dataUnidadeGestora.length > 0
        ? dataUnidadeGestora[selectUnidadeGestora]
            .unidadeGestoraOpiniaoPrestacaoContasControleInterno
        : ''
    }`,
    unidadeGestoraFatoRelevanteRelaci: `${
      dataUnidadeGestora.length > 0 &&
      dataUnidadeGestora[selectUnidadeGestora]
        .unidadeGestoraFatoRelevanteRelaci
    }`,
    unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci: `${
      dataUnidadeGestora.length > 0 &&
      dataUnidadeGestora[selectUnidadeGestora]
        .unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci
    }`,
  }

  const validationSchema = validationUnidadeGestora.validationSchema

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: () => {
      saveUnidadeGestora()

      if (buttonId === 'previous') {
        context.setValueTab(0)
        return
      }
      context.setValueTab(2)
    },
  })

  function getIdButton(e: any) {
    setButtonId(e.target.parentNode.id)
  }

  useEffect(() => {
    if(formik.values.unidadeGestoraFatoRelevanteRelaci != '1'){
      formik.setFieldValue('unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci', '')
    }
  }, [formik.values.unidadeGestoraFatoRelevanteRelaci])
  return (
    <UnidadeGestoraStyle onSubmit={formik.handleSubmit}>
      <div data-header="header-form">
        <div data-input="input-options">
          {dataUnidadeGestora.length > 1 && (
            <TextField
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="unidadeGestora"
              name="unidadeGestora"
              value={selectUnidadeGestora}
              label="Unidade(s)"
              onChange={handleSelectUnidadeGestora}
            >
              {dataUnidadeGestora.map(
                (data: DataUnidadeGestoraProps, index) => {
                  return (
                    <MenuItem value={index} key={dataUnidadeGestora[index].id}>
                      Unidade -{' '}
                      {dataUnidadeGestora[index].unidadeGestoraIdNumRegistro}
                    </MenuItem>
                  )
                },
              )}
           
            </TextField>
          )}

          {dataUnidadeGestora.length > 1 && (
            <IconButton
              title="Remover Unidade Gestora"
              aria-label="Remover Unidade Gestora"
              id="removeUnidadeGestora"
              onClick={() => setOpenDialogRemoveUnidadeGestora(true)}
            >
              <RemoveCircleIcon />
            </IconButton>
          )}
        </div>

        <div data-button="save">
          <Button variant="contained" onClick={saveUnidadeGestora}>
            Salvar
          </Button>
        </div>
      </div>

      <legend>Informações de Controle Interno - Unidade Gestora</legend>
      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          variant="outlined"
          fullWidth
          id="unidadeGestoraIdNumRegistro"
          label="Identificação do Número do Registro"
          name="unidadeGestoraIdNumRegistro"
          value={formik.values.unidadeGestoraIdNumRegistro}
          onChange={formik.handleChange}
          error={
            formik.touched.unidadeGestoraIdNumRegistro &&
            Boolean(formik.errors.unidadeGestoraIdNumRegistro)
          }
          helperText={
            formik.touched.unidadeGestoraIdNumRegistro &&
            formik.errors.unidadeGestoraIdNumRegistro
          }
          disabled
        />
        
      </Box>

      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          fullWidth
          select
          inputProps={{ MenuProps: { disableScrollLock: true } }}
          id="unidadeGestoraNivelControleInterno"
          name="unidadeGestoraNivelControleInterno"
          value={formik.values.unidadeGestoraNivelControleInterno}
          label="Nível de Controle Interno"
          onChange={formik.handleChange}
          error={
            formik.touched.unidadeGestoraNivelControleInterno &&
            Boolean(formik.errors.unidadeGestoraNivelControleInterno)
          }
          helperText={
            formik.touched.unidadeGestoraNivelControleInterno &&
            formik.errors.unidadeGestoraNivelControleInterno
          }
          disabled={
            context.formInfo.nomeUnidadeGestora !== 'SECONT' ? true : false
          }
        >
          <MenuItem value={1}>1 – Unidade Central </MenuItem>
          <MenuItem value={2}>2 – Unidade Setorial</MenuItem>
        </TextField>
        
      </Box>
      {context.formInfo.nomeUnidadeGestora !== 'SECONT' ? 
      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          variant="outlined"
          fullWidth
          id="unidadeGestoraCodigoUnidadeGestora"
          label="Código da unidade Gestora em que os procedimentos foram aplicados"
          name="unidadeGestoraCodigoUnidadeGestora"
          value={formik.values.unidadeGestoraCodigoUnidadeGestora}
          onChange={formik.handleChange}
          error={
            formik.touched.unidadeGestoraCodigoUnidadeGestora &&
            Boolean(formik.errors.unidadeGestoraCodigoUnidadeGestora)
          }
          helperText={
            formik.touched.unidadeGestoraCodigoUnidadeGestora &&
            formik.errors.unidadeGestoraCodigoUnidadeGestora
          }
          disabled
        />
        
      </Box> : <Autocomplete
      id="unidadeGestoraCodigoUnidadeGestora"
      options={codigosCidades}
      noOptionsText={'Não encontrado'}
      getOptionLabel={(option) => option.label || ""}
      value={codigosCidades.filter(codigo => codigo.cod === formik.values.unidadeGestoraCodigoUnidadeGestora)[0]}
      isOptionEqualToValue={(option, value) => option === value}
      defaultValue={{cod:"", label:""}}
      onChange={(event, value) => {
        if(value) {
          formik.setFieldValue('unidadeGestoraCodigoUnidadeGestora', value?.cod)
          return
        }
       
        formik.setFieldValue('unidadeGestoraCodigoUnidadeGestora', "")
        
      }}
     
      renderInput={(params) => (
        <Box sx={{display: 'flex', gap: '1rem'}}>
          <TextField
            {...params}
            name="unidadeGestoraCodigoUnidadeGestora"
            label="Código da unidade Gestora em que os procedimentos foram aplicados"
            variant="outlined"
            error={
              formik.touched.unidadeGestoraCodigoUnidadeGestora &&
              Boolean(formik.errors.unidadeGestoraCodigoUnidadeGestora)
            }
            helperText={
              formik.touched.unidadeGestoraCodigoUnidadeGestora &&
              formik.errors.unidadeGestoraCodigoUnidadeGestora
            }
            fullWidth
          />
          
      </Box>
      )}
    /> }
      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          fullWidth
          select
          inputProps={{ MenuProps: { disableScrollLock: true } }}
          id="unidadeGestoraOpiniaoPrestacaoContasControleInterno"
          name="unidadeGestoraOpiniaoPrestacaoContasControleInterno"
          value={
            formik.values.unidadeGestoraOpiniaoPrestacaoContasControleInterno
          }
          label="Opinião do Controle Interno sobre os procedimentos aplicados"
          onChange={formik.handleChange}
          error={
            formik.touched.unidadeGestoraOpiniaoPrestacaoContasControleInterno &&
            Boolean(
              formik.errors.unidadeGestoraOpiniaoPrestacaoContasControleInterno,
            )
          }
          helperText={
            formik.touched.unidadeGestoraOpiniaoPrestacaoContasControleInterno &&
            formik.errors.unidadeGestoraOpiniaoPrestacaoContasControleInterno
          }
        >
          <MenuItem value={1}>1 - Regular</MenuItem>
          <MenuItem value={2}>2 - Regular com ressalva</MenuItem>
          <MenuItem value={3}>3 - Irregular</MenuItem>
          <MenuItem value={4}>4 - Não foi emitida opinião</MenuItem>
        </TextField>
        
      </Box>
      <Box sx={{display: 'flex', gap: '1rem'}}>
        <TextField
          fullWidth
          select
          inputProps={{ MenuProps: { disableScrollLock: true } }}
          id="unidadeGestoraFatoRelevanteRelaci"
          name="unidadeGestoraFatoRelevanteRelaci"
          value={
            formik.values.unidadeGestoraFatoRelevanteRelaci
          }
          label="O Controle Interno relatou algum fato 
            relevante no RELACI, de forma a dar ciência 
            ao Tribunal de Contas?"
          onChange={(e) => {formik.handleChange(e); if(e.target.value == "2"){formik.setFieldValue("unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci", "")}}}
          error={
            formik.touched.unidadeGestoraFatoRelevanteRelaci &&
            Boolean(
              formik.errors.unidadeGestoraFatoRelevanteRelaci,
            )
          }
          helperText={
            formik.touched.unidadeGestoraFatoRelevanteRelaci &&
            formik.errors.unidadeGestoraFatoRelevanteRelaci
          }
        >
          <MenuItem value="">{`Em Branco`}</MenuItem>
          <MenuItem value={1}>1 - Sim</MenuItem>
          <MenuItem value={2}>2 - Não</MenuItem>
        </TextField>
        
      </Box>

      <Box sx={{display: formik.values.unidadeGestoraFatoRelevanteRelaci == "1"?'flex': 'none', gap: '1rem'}}>
        <TextField
          fullWidth
          select
          inputProps={{ MenuProps: { disableScrollLock: true } }}
          id="unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci"
          name="unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci"
          value={
            formik.values.unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci
          }
          label="Assunto principal do fato relevante relatadono RELACI"
          onChange={formik.handleChange}
          error={
            formik.touched.unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci &&
            Boolean(
              formik.errors.unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci,
            )
          }
          helperText={
            formik.touched.unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci &&
            formik.errors.unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci
          }
        >
          <MenuItem value={1}>
            1 - Licitações, Contratos e Convênios
          </MenuItem>
          <MenuItem value={2}>
            2 - Folha de Pagamento e Concessão de Vantagens
          </MenuItem>
          <MenuItem value={3}>
            3 - Registro de Atos de Pessoal
          </MenuItem>
          <MenuItem value={4}>
            4 - Gestão de Previdência dos RPPS
          </MenuItem>
          <MenuItem value={5}>
            5 - Concessão de diárias e suprimento de fundos
          </MenuItem>
          <MenuItem value={6}>
            6 - Instrumentos de transparência
          </MenuItem>
          <MenuItem value={7}>
            7 - Gestão Fiscal
          </MenuItem>
          <MenuItem value={8}>
            8 - Gestão Orçamentária e Financeira
          </MenuItem>
          <MenuItem value={9}>
            9 - Gestão Patrimonial
          </MenuItem>
          <MenuItem value={10}>
            10 - Saúde e Educação
          </MenuItem>
          <MenuItem value={11}>
            11 - Obras e Serviços de Engenharia
          </MenuItem>
          <MenuItem value={99}>
            99 - Outros
          </MenuItem>
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
          <ArrowCircleLeftIcon id="previous" />
        </IconButton>

        <IconButton
          title="Próximo"
          aria-label="Próximo formulário."
          type="submit"
          id="next"
          onClick={getIdButton}
        >
          <ArrowCircleRightIcon id="next" />
        </IconButton>
      </div>

      <ConfirmDialog
        open={openDialogRemoveUnidadeGestora}
        setOpen={setOpenDialogRemoveUnidadeGestora}
        titleMessage={'Tem certeza que deseja remover essa Unidade Gestora ?'}
        responseYes={deleteUnidadeGestora}
        responseNo={() => null}
      />

      <AlertSucess
        open={openAlertSave}
        setOpen={setOpenAlertSave}
        message={'Os dados da Unidade Gestora foram salvos.'}
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
    </UnidadeGestoraStyle>
  )
}
