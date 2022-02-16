import { useFormik } from 'formik'

import { TextField, MenuItem, Button, IconButton } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import validationProcedimentos from '../../utils/validationProcedimentos'
import { ProcedimentosStyle } from './style'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalStorage'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog } from '../ConfirmDialog'
import axios from 'axios'
import baseAPI from '../../utils/baseAPI'
import { AlertSucess } from '../AlertSucess'

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

export const Procedimentos = () => {
  const context = useContext(GlobalContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('app-token')

  const [dataProcedimentos, setDataProcedimentos] = useState<
    DataProcedimentoProps[]
  >([] as DataProcedimentoProps[])

  const [buttonId, setButtonId] = useState('')
  const [selectProcedimento, setSelectProcedimento] = useState(0)
  const [openDialogProcedimento, setOpenDialogProcedimento] = useState(false)
  const [openDialogTomadaContas, setOpenDialogTomadaContas] = useState(false)
  const [openDialogUnidadeGestora, setOpenDialogUnidadeGestora] = useState(
    false,
  )
  const [
    openDialogRemoveProcedimento,
    setOpenDialogRemoveProcedimento,
  ] = useState(false)

  const [
    openAlertSave,
    setOpenAlertSave
  ] = useState(false)

  useEffect(() => {
    if (!context.formInfo.id) {
      navigate('/select_ug')
      return
    }
    requestAPI()
  }, [])

  async function requestAPI() {
    const procedimentoExists = await procedimentosList()

    if (!procedimentoExists) {
      await newProcedimento()
      await procedimentosList()
    }
  }

  async function procedimentosList() {
    const dataGetProcedimento = await getProcedimentos()

    if (dataGetProcedimento.length > 0) {
      const dataGetProcedimentosReorderId: DataProcedimentoProps[] = await reorderIdNumRegistro(
        dataGetProcedimento,
      )

      setDataProcedimentos([...dataGetProcedimentosReorderId])

      setSelectProcedimento(dataGetProcedimento.length - 1)

      return true
    }
    return false
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
          procedimentosCodigoProcedimento: data.procedimentosCodigoProcedimento,
          procedimentosTipoPontoControle: data.procedimentosTipoPontoControle,
          procedimentosUniversoAnalisado: data.procedimentosUniversoAnalisado,
          procedimentosAmostraSelecionada: data.procedimentosAmostraSelecionada,
          procedimentosDescricaoAnalise: data.procedimentosDescricaoAnalise,
          procedimentosTipoProcedimentoAnalisado:
            data.procedimentosTipoProcedimentoAnalisado,
          procedimentosSituacaoAnalise: data.procedimentosSituacaoAnalise,
        }
      },
    )

    return dataGet
  }

  async function reorderIdNumRegistro(
    dataGetProcedimentos: DataProcedimentoProps[],
  ) {
    const dataGetProcedimentosReorderId = dataGetProcedimentos.map(
      async (data: DataProcedimentoProps, index: number) => {
        const response = await axios.put(
          `${baseAPI.URL}/forms/${context.formInfo.id}/procedimentos/${data.id}`,
          { procedimentosIdNumRegistro: `${('0000' + (index + 1)).slice(-5)}` },
          { headers: baseAPI.HEADERS(token) },
        )
        return response.data
      },
    )

    return await Promise.all(dataGetProcedimentosReorderId)
  }

  async function newProcedimento() {
    const valuesProcedimento = {
      procedimentosIdNumRegistro: ``,
      procedimentosNivelControleInterno: `${context.formInfo.codigoUnidadeGestoraCidades !== "001" ? 2 : ''}`,
      procedimentosCodigoUnidadeGestora: `${context.formInfo.codigoUnidadeGestoraCidades}`,
      procedimentosCodigoProcedimento: ``,
      procedimentosTipoPontoControle: ``,
      procedimentosUniversoAnalisado: ``,
      procedimentosAmostraSelecionada: ``,
      procedimentosDescricaoAnalise: ``,
      procedimentosTipoProcedimentoAnalisado: ``,
      procedimentosSituacaoAnalise: ``,
    }
    await axios.post(
      `${baseAPI.URL}/forms/${context.formInfo.id}/procedimentos`,
      valuesProcedimento,
      { headers: baseAPI.HEADERS(token) },
    )
  }

  async function deleteProcedimento() {
    await axios.delete(
      `${baseAPI.URL}/forms/${context.formInfo.id}/procedimentos/${dataProcedimentos[selectProcedimento].id}`,
      { headers: baseAPI.HEADERS(token) },
    )

   

    setSelectProcedimento(dataProcedimentos.length - 2)

    await procedimentosList()
  }

  async function saveProcedimento() {
   
    setOpenAlertSave(true);

    await axios.put(
      `${baseAPI.URL}/forms/${context.formInfo.id}/procedimentos/${dataProcedimentos[selectProcedimento].id}`,
      formik.values,
      { headers: baseAPI.HEADERS(token) },
    )
  }


  async function handleSelectProcedimento(e: any) {
    const validate = await formik.validateForm(formik.values)

    if (Object.entries(validate).length > 0) {
      alert(
        'Preencha todos os campos corretamente antes de alternar de registro.',
      )
      formik.handleSubmit()
      context.setValueTab(2)
      return
    }

    saveProcedimento()
    await procedimentosList()
    setSelectProcedimento(e.target.value)
  }

  function getIdButton(e: any) {
    setButtonId(e.target.parentNode.id)
  }

  async function responseDialogProcedimentoYes() {
    await newProcedimento()
    await procedimentosList()

    setSelectProcedimento(selectProcedimento + 1)
    return
  }

  async function responseDialogProcedimentoNo() {

    const response = await axios.get(
      `${baseAPI.URL}/forms/${context.formInfo.id}/tomada_contas`,
      { headers: baseAPI.HEADERS(token) },
    )
   const dataGetTomadaContasEspecial = await response.data;
   
   if(dataGetTomadaContasEspecial.length > 0) {
    context.setValueTab(3);
    return;
   }
    setOpenDialogTomadaContas(true)
    return
  }

  function responseDialogTomadaContasYes() {
    context.setValueTab(3)
   
    return
  }

  function responseDialogTomadaContasNo() {

    if(context.formInfo.nomeUnidadeGestora === 'SECONT') {
      setOpenDialogUnidadeGestora(true)
      return
    }
    context.setValueTab(4)
   
    return
  }

  async function responseDialogUnidadeGestoraYes() {
    // navigate('/select_ug')
    // context.setValueTab(0)

    const valuesUnidadeGestora = {
      unidadeGestoraIdNumRegistro: ``,
      unidadeGestoraNivelControleInterno: `${
        context.formInfo.nomeUnidadeGestora !== 'SECONT' ? 2 : ''
      }`,
      unidadeGestoraCodigoUnidadeGestora: ``,
      unidadeGestoraResponsavelUnidadeGestora: ``,
      unidadeGestoraExercicioUltimaManifestacaoControleInterno: ``,
      unidadeGestoraOpiniaoPrestacaoContasControleInterno: ``,
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
    console.log('Ir para a geração de XML.')
    context.setValueTab(4)
    return
  }

  const initialValues = {
    procedimentosIdNumRegistro: `${
      dataProcedimentos.length &&
      dataProcedimentos[selectProcedimento].procedimentosIdNumRegistro
    }`,
    procedimentosNivelControleInterno: `${
      dataProcedimentos.length
        ? dataProcedimentos[selectProcedimento]
            .procedimentosNivelControleInterno
        : ''
    }`,
    procedimentosCodigoUnidadeGestora: `${
      dataProcedimentos.length &&
      dataProcedimentos[selectProcedimento].procedimentosCodigoUnidadeGestora
    }`,
    procedimentosCodigoProcedimento: `${
      dataProcedimentos.length &&
      dataProcedimentos[selectProcedimento].procedimentosCodigoProcedimento
    }`,
    procedimentosTipoPontoControle: `${
      dataProcedimentos.length
        ? dataProcedimentos[selectProcedimento].procedimentosTipoPontoControle
        : ''
    }`,
    procedimentosUniversoAnalisado: `${
      dataProcedimentos.length &&
      dataProcedimentos[selectProcedimento].procedimentosUniversoAnalisado
    }`,
    procedimentosAmostraSelecionada: `${
      dataProcedimentos.length &&
      dataProcedimentos[selectProcedimento].procedimentosAmostraSelecionada
    }`,
    procedimentosDescricaoAnalise: `${
      dataProcedimentos.length &&
      dataProcedimentos[selectProcedimento].procedimentosDescricaoAnalise
    }`,
    procedimentosTipoProcedimentoAnalisado: `${
      dataProcedimentos.length
        ? dataProcedimentos[selectProcedimento]
            .procedimentosTipoProcedimentoAnalisado
        : ''
    }`,
    procedimentosSituacaoAnalise: `${
      dataProcedimentos.length
        ? dataProcedimentos[selectProcedimento].procedimentosSituacaoAnalise
        : ''
    }`,
  }
  const validationSchema = validationProcedimentos.validationSchema

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: () => {
      saveProcedimento()

      if (buttonId === 'previous') {
        context.setValueTab(1)
        return
      }

      setOpenDialogProcedimento(true)
    },
  })

  return (
    <ProcedimentosStyle onSubmit={formik.handleSubmit}>
      
      <div data-header="header-form">
        <div data-input="input-options">
          {dataProcedimentos.length > 1 && (
            <TextField
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="procedimento"
              name="procedimento"
              value={selectProcedimento}
              label="Procedimento(s)"
              onChange={handleSelectProcedimento}
            >
              {dataProcedimentos.map((data: DataProcedimentoProps, index) => {
                return (
                  <MenuItem value={index} key={dataProcedimentos[index].id}>
                    Procedimento -{' '}
                    {dataProcedimentos[index].procedimentosIdNumRegistro}
                  </MenuItem>
                )
              })}
              {/* <MenuItem value={0}>Procedimento - 00001</MenuItem>
          <MenuItem value={1}>Procedimento - 00002</MenuItem> */}
            </TextField>
          )}

          {dataProcedimentos.length > 1 && (
            <IconButton
              title="Remover Procedimento"
              aria-label="Remover Procedimento"
              id="removeProcedimento"
              onClick={() => setOpenDialogRemoveProcedimento(true)}
            >
              <RemoveCircleIcon />
            </IconButton>
          )}
        </div>

        <div data-button="save">
          <Button variant="contained" onClick={saveProcedimento}>
            Salvar
          </Button>
        </div>
      </div>

      <legend>Informações de Controle Interno - Procedimentos</legend>

      <TextField
        variant="outlined"
        fullWidth
        id="procedimentosIdNumRegistro"
        label="Identificação do Número do Registro"
        name="procedimentosIdNumRegistro"
        value={formik.values.procedimentosIdNumRegistro}
        onChange={formik.handleChange}
        error={
          formik.touched.procedimentosIdNumRegistro &&
          Boolean(formik.errors.procedimentosIdNumRegistro)
        }
        helperText={
          formik.touched.procedimentosIdNumRegistro &&
          formik.errors.procedimentosIdNumRegistro
        }
        disabled
      />

      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="procedimentosNivelControleInterno"
        name="procedimentosNivelControleInterno"
        value={formik.values.procedimentosNivelControleInterno}
        label="Nível de Controle Interno"
        onChange={formik.handleChange}
        error={
          formik.touched.procedimentosNivelControleInterno &&
          Boolean(formik.errors.procedimentosNivelControleInterno)
        }
        helperText={
          formik.touched.procedimentosNivelControleInterno &&
          formik.errors.procedimentosNivelControleInterno
        }
        disabled={context.formInfo.codigoUnidadeGestoraCidades !== "001" ? true : false}
      >
        <MenuItem value={1}>1 – Unidade Central </MenuItem>
        <MenuItem value={2}>2 – Unidade Setorial</MenuItem>
      </TextField>

      <TextField
        variant="outlined"
        fullWidth
        id="procedimentosCodigoUnidadeGestora"
        label="Código da Unidade Gestora em que os procedimentos foram aplicados"
        name="procedimentosCodigoUnidadeGestora"
        value={formik.values.procedimentosCodigoUnidadeGestora}
        onChange={formik.handleChange}
        error={
          formik.touched.procedimentosCodigoUnidadeGestora &&
          Boolean(formik.errors.procedimentosCodigoUnidadeGestora)
        }
        helperText={
          formik.touched.procedimentosCodigoUnidadeGestora &&
          formik.errors.procedimentosCodigoUnidadeGestora
        }
        disabled={
          context.formInfo.nomeUnidadeGestora !== 'SECONT' ? true : false
        }
      />

      <TextField
        variant="outlined"
        fullWidth
        id="procedimentosCodigoProcedimento"
        label="Código do Procedimento (Tabela Referencial 1 / IN 68 de 2020)"
        name="procedimentosCodigoProcedimento"
        value={formik.values.procedimentosCodigoProcedimento}
        onChange={formik.handleChange}
        error={
          formik.touched.procedimentosCodigoProcedimento &&
          Boolean(formik.errors.procedimentosCodigoProcedimento)
        }
        helperText={
          formik.touched.procedimentosCodigoProcedimento &&
          formik.errors.procedimentosCodigoProcedimento
        }
      />

      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="procedimentosTipoPontoControle"
        name="procedimentosTipoPontoControle"
        value={formik.values.procedimentosTipoPontoControle}
        label="Tipo do Ponto de Controle"
        onChange={formik.handleChange}
        error={
          formik.touched.procedimentosTipoPontoControle &&
          Boolean(formik.errors.procedimentosTipoPontoControle)
        }
        helperText={
          formik.touched.procedimentosTipoPontoControle &&
          formik.errors.procedimentosTipoPontoControle
        }
      >
        <MenuItem value={1}>
          1 - Quantitativo (se mensurável quantitativamente)
        </MenuItem>
        <MenuItem value={2}>
          2 - Qualitativo (se não mensurável quantitativamente)
        </MenuItem>
      </TextField>

      <TextField
        variant="outlined"
        fullWidth
        id="procedimentosUniversoAnalisado"
        label="Universo do Ponto de Controle Analisado"
        name="procedimentosUniversoAnalisado"
        value={formik.values.procedimentosUniversoAnalisado}
        onChange={formik.handleChange}
        error={
          formik.touched.procedimentosUniversoAnalisado &&
          Boolean(formik.errors.procedimentosUniversoAnalisado)
        }
        helperText={
          formik.touched.procedimentosUniversoAnalisado &&
          formik.errors.procedimentosUniversoAnalisado
        }
      />

      <TextField
        variant="outlined"
        fullWidth
        id="procedimentosAmostraSelecionada"
        label="Amostra Selecionada do Ponto de Controle Analisado"
        name="procedimentosAmostraSelecionada"
        value={formik.values.procedimentosAmostraSelecionada}
        onChange={formik.handleChange}
        error={
          formik.touched.procedimentosAmostraSelecionada &&
          Boolean(formik.errors.procedimentosAmostraSelecionada)
        }
        helperText={
          formik.touched.procedimentosAmostraSelecionada &&
          formik.errors.procedimentosAmostraSelecionada
        }
      />
      <TextField
        variant="outlined"
        fullWidth
        id="procedimentosDescricaoAnalise"
        label="Descrição da Análise"
        name="procedimentosDescricaoAnalise"
        value={formik.values.procedimentosDescricaoAnalise}
        onChange={formik.handleChange}
        error={
          formik.touched.procedimentosDescricaoAnalise &&
          Boolean(formik.errors.procedimentosDescricaoAnalise)
        }
        helperText={
          formik.touched.procedimentosDescricaoAnalise &&
          formik.errors.procedimentosDescricaoAnalise
        }
      />

      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="procedimentosTipoProcedimentoAnalisado"
        name="procedimentosTipoProcedimentoAnalisado"
        value={formik.values.procedimentosTipoProcedimentoAnalisado}
        label="Tipo de Procedimento Aplicado"
        onChange={formik.handleChange}
        error={
          formik.touched.procedimentosTipoProcedimentoAnalisado &&
          Boolean(formik.errors.procedimentosTipoProcedimentoAnalisado)
        }
        helperText={
          formik.touched.procedimentosTipoProcedimentoAnalisado &&
          formik.errors.procedimentosTipoProcedimentoAnalisado
        }
      >
        <MenuItem value={1}>1 – Auditoria de conformidade </MenuItem>
        <MenuItem value={2}>2 – Auditoria financeira</MenuItem>
        <MenuItem value={3}>3 – Auditoria operacional</MenuItem>
        <MenuItem value={4}>4 – Analise documental</MenuItem>
        <MenuItem value={5}>5 – Conciliações de demonstrativos</MenuItem>
        <MenuItem value={6}>6 – Circularização</MenuItem>
        <MenuItem value={7}>7 – Revisão Analítica</MenuItem>
        <MenuItem value={8}>8 – Testes Substantivos</MenuItem>
        <MenuItem value={9}>9 – Testes de Controle</MenuItem>
        <MenuItem value={10}>10 – Inspeção Física</MenuItem>
        <MenuItem value={11}>11 – Observação Direta</MenuItem>
        <MenuItem value={12}>12 – Indagação</MenuItem>
        <MenuItem value={13}>13 – Confirmação Extrema</MenuItem>
        <MenuItem value={14}>14 – Recálculo</MenuItem>
        <MenuItem value={15}>15 – Reexecução</MenuItem>
        <MenuItem value={16}>16 – Outros</MenuItem>
      </TextField>

      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="procedimentosSituacaoAnalise"
        name="procedimentosSituacaoAnalise"
        value={formik.values.procedimentosSituacaoAnalise}
        label="Situação da Análise"
        onChange={formik.handleChange}
        error={
          formik.touched.procedimentosSituacaoAnalise &&
          Boolean(formik.errors.procedimentosSituacaoAnalise)
        }
        helperText={
          formik.touched.procedimentosSituacaoAnalise &&
          formik.errors.procedimentosSituacaoAnalise
        }
      >
        <MenuItem value={1}>
          1 - Procedimento aplicado sem detecção de distorções
        </MenuItem>
        <MenuItem value={2}>
          2 - Procedimento aplicado sem detecção de distorções relevantes,
          constatando oportunidades de melhorias do controle
        </MenuItem>
        <MenuItem value={3}>
          3 - Procedimento aplicado com constatação de distorções que ensejam
          risco grave e necessidade de correções.
        </MenuItem>
      </TextField>

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
          onClick={getIdButton}
        >
          <ArrowCircleRightIcon />
        </IconButton>
      </div>

      <ConfirmDialog
        open={openDialogRemoveProcedimento}
        setOpen={setOpenDialogRemoveProcedimento}
        titleMessage={'Tem certeza que deseja remover esse Procedimento ?'}
        responseYes={deleteProcedimento}
        responseNo={() => null}
      />

      <ConfirmDialog
        open={openDialogProcedimento}
        setOpen={setOpenDialogProcedimento}
        titleMessage={'Deseja incluir outro Procedimento ?'}
        responseYes={responseDialogProcedimentoYes}
        responseNo={responseDialogProcedimentoNo}
      />

      <ConfirmDialog
        open={openDialogTomadaContas}
        setOpen={setOpenDialogTomadaContas}
        titleMessage={'Deseja incluir alguma Tomada de Contas Especial ?'}
        responseYes={responseDialogTomadaContasYes}
        responseNo={responseDialogTomadaContasNo}
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
        message={'Os dados do Procedimento foram salvos.'}
      />
    </ProcedimentosStyle>
  )
}
