import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {Button, IconButton } from '@mui/material'
import { TextField, MenuItem } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import { GlobalContext } from '../../context/GlobalStorage'
import validationEstruturaInicial from '../../utils/validationEstruturaInicial'
import baseAPI from '../../utils/baseAPI'
import { ConfirmDialog } from '../ConfirmDialog'
import { AlertSucess } from '../AlertSucess'

import { EstruturaInicialStyle } from './style'

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

export const EstruturaInicial = () => {
  const context = useContext(GlobalContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('app-token')

  const [selectEstruturaInicial, setSelectEstruturaInicial] = useState(0)
  const [openDialogEstruturaInicial, setOpenDialogEstruturaInicial] = useState(
     false,
  )
  const [dataEstruturaInicial, setDataEstruturaInicial] = useState<
    DataEstruturaInicialProps[]
  >([] as DataEstruturaInicialProps[])

  const [
    openDialogRemoveEstruturaInicial,
    setOpenDialogRemoveEstruturaInicial,
  ] = useState(false)

  const [openAlertSave, setOpenAlertSave] = useState(false)

  useEffect(() => {
    if (!context.formInfo.id) {
      navigate('/select_ug')
      return
    }
   
    requestAPI()
    
  }, [])

  async function requestAPI() {
    const estruturaInicialExists = await estruturaInicialList()

    if (!estruturaInicialExists) {
      await newEstruturaInicial()
      await estruturaInicialList()
    }
  }

  async function estruturaInicialList() {
    const dataGetEstruturaInicial = await getEstruturaInicial()

    if (dataGetEstruturaInicial.length > 0) {
      const dataGetEstruturaInicialReorderId: DataEstruturaInicialProps[] = await reorderIdNumRegistro(
        dataGetEstruturaInicial,
      )

      setDataEstruturaInicial([...dataGetEstruturaInicialReorderId])

      setSelectEstruturaInicial(dataGetEstruturaInicial.length - 1)

      return true
    }
    return false
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
    return dataGet
  }

  async function reorderIdNumRegistro(
    dataGetEstruturaInicial: DataEstruturaInicialProps[],
  ) {
    const dataGetEstruturaInicialReorderId = dataGetEstruturaInicial.map(
      async (data: DataEstruturaInicialProps, index: number) => {
        const response = await axios.put(
          `${baseAPI.URL}/forms/${context.formInfo.id}/estruturas/${data.id}`,
          {
            estruturaInicialIdNumRegistro: `${('0000' + (index + 1)).slice(
              -5,
            )}`,
          },
          { headers: baseAPI.HEADERS(token) },
        )
        return response.data
      },
    )

    return await Promise.all(dataGetEstruturaInicialReorderId)
  }

  async function newEstruturaInicial() {
    const valuesEstruturaInicial = {
      estruturaInicialIdNumRegistro: ``,
      estruturaInicialNivelControleInterno: `${
        context.formInfo.codigoUnidadeGestoraCidades !== '001' ? 2 : ''
      }`,
      estruturaInicialQuantidadeTotalServidores: ``,
      estruturaInicialQuantidadeServidoresEfetivos: ``,
      estruturaInicialQuantidadeContadores: ``,
      estruturaInicialNormaInternaGestaoOrcamentaria: ``,
      estruturaInicialNormaInternaGestaoFinanceira: ``,
      estruturaInicialNormaInternaGestaoPatrimonial: ``,
      estruturaInicialNormaInternaGestaoFiscal: ``,
      estruturaInicialNormaInternaDemContabeis: ``,
    }
    await axios.post(
      `${baseAPI.URL}/forms/${context.formInfo.id}/estruturas`,
      valuesEstruturaInicial,
      { headers: baseAPI.HEADERS(token) },
    )
  }

  async function deleteEstruturaInicial() {
    await axios.delete(
      `${baseAPI.URL}/forms/${context.formInfo.id}/estruturas/${dataEstruturaInicial[selectEstruturaInicial].id}`,
      { headers: baseAPI.HEADERS(token) },
    )

    setSelectEstruturaInicial(dataEstruturaInicial.length - 2)

    await estruturaInicialList()
  }

  async function saveEstruturaInicial() {
  
    setOpenAlertSave(true)

    await axios.put(
      `${baseAPI.URL}/forms/${context.formInfo.id}/estruturas/${dataEstruturaInicial[selectEstruturaInicial].id}`,
      formik.values,
      { headers: baseAPI.HEADERS(token) },
    )
  }

  async function handleSelectEstruturaInicial(e: any) {
    const validate = await formik.validateForm(formik.values)

    if (Object.entries(validate).length > 0) {
      alert(
        'Preencha todos os campos corretamente antes de alternar de registro.',
      )
      formik.handleSubmit()
      context.setValueTab(0)
      return
    }

    saveEstruturaInicial()
    await estruturaInicialList()
    setSelectEstruturaInicial(e.target.value)
  }

  async function responseDialogEstruturaInicialYes() {
    await newEstruturaInicial()
    await estruturaInicialList()

    setSelectEstruturaInicial(selectEstruturaInicial + 1)
    return
  }

  async function responseDialogEstruturaInicialNo() {
    context.setValueTab(1)
    return
  }

  const initialValues = {
    estruturaInicialIdNumRegistro: `${
      dataEstruturaInicial.length > 0 &&
      dataEstruturaInicial[selectEstruturaInicial].estruturaInicialIdNumRegistro
    }`,
    estruturaInicialNivelControleInterno: `${
      dataEstruturaInicial.length
        ? dataEstruturaInicial[selectEstruturaInicial]
            .estruturaInicialNivelControleInterno
        : ''
    }`,
    estruturaInicialQuantidadeTotalServidores: `${
      dataEstruturaInicial.length &&
      dataEstruturaInicial[selectEstruturaInicial]
        .estruturaInicialQuantidadeTotalServidores
    }`,
    estruturaInicialQuantidadeServidoresEfetivos: `${
      dataEstruturaInicial.length &&
      dataEstruturaInicial[selectEstruturaInicial]
        .estruturaInicialQuantidadeServidoresEfetivos
    }`,
    estruturaInicialQuantidadeContadores: `${
      dataEstruturaInicial.length &&
      dataEstruturaInicial[selectEstruturaInicial]
        .estruturaInicialQuantidadeContadores
    }`,
    estruturaInicialNormaInternaGestaoOrcamentaria: `${
      dataEstruturaInicial.length > 0
        ? dataEstruturaInicial[selectEstruturaInicial]
            .estruturaInicialNormaInternaGestaoOrcamentaria
        : ''
    }`,
    estruturaInicialNormaInternaGestaoFinanceira: `${
      dataEstruturaInicial.length
        ? dataEstruturaInicial[selectEstruturaInicial]
            .estruturaInicialNormaInternaGestaoFinanceira
        : ''
    }`,
    estruturaInicialNormaInternaGestaoPatrimonial: `${
      dataEstruturaInicial.length
        ? dataEstruturaInicial[selectEstruturaInicial]
            .estruturaInicialNormaInternaGestaoPatrimonial
        : ''
    }`,
    estruturaInicialNormaInternaGestaoFiscal: `${
      dataEstruturaInicial.length
        ? dataEstruturaInicial[selectEstruturaInicial]
            .estruturaInicialNormaInternaGestaoFiscal
        : ''
    }`,
    estruturaInicialNormaInternaDemContabeis: `${
      dataEstruturaInicial.length
        ? dataEstruturaInicial[selectEstruturaInicial]
            .estruturaInicialNormaInternaDemContabeis
        : ''
    }`,
  }

  const validationSchema = validationEstruturaInicial.validationSchema

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: () => {
      saveEstruturaInicial()

      if (context.formInfo.nomeUnidadeGestora === 'SECONT' && dataEstruturaInicial.length < 2) {
         setOpenDialogEstruturaInicial(true)
        return
       }

      context.setValueTab(1)
    },
  })

  return (
    <EstruturaInicialStyle onSubmit={formik.handleSubmit}>
      <div data-header="header-form">

        <div data-input="input-options">
          {dataEstruturaInicial.length > 1 && (
            <TextField
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="estruturaInicial"
              name="estruturaInicial"
              value={selectEstruturaInicial}
              label="Estrutura(s)"
              onChange={handleSelectEstruturaInicial}
            >
              {dataEstruturaInicial.map(
                (data: DataEstruturaInicialProps, index) => {
                  return (
                    <MenuItem
                      value={index}
                      key={dataEstruturaInicial[index].id}
                    >
                      Estrutura -{' '}
                      {
                        dataEstruturaInicial[index]
                          .estruturaInicialIdNumRegistro
                      }
                    </MenuItem>
                  )
                },
              )}
             
            </TextField>
          )}

          {dataEstruturaInicial.length > 1 && (
            <IconButton
              title="Remover Estrutura Inicial"
              aria-label="Remover Estrutura Inicial"
              id="removeEstruturaInicial"
              onClick={() => setOpenDialogRemoveEstruturaInicial(true)}
            >
              <RemoveCircleIcon />
            </IconButton>
          )}
        </div>

        <div data-button="save">
          <Button variant="contained" onClick={saveEstruturaInicial}>
            Salvar
          </Button>
        </div>
      </div>

      <legend>Informações de Controle Interno - Estrutura Inicial</legend>

      <TextField
        variant="outlined"
        fullWidth
        id="estruturaInicialIdNumRegistro"
        label="Identificação do Número do Registro"
        name="estruturaInicialIdNumRegistro"
        value={formik.values.estruturaInicialIdNumRegistro}
        onChange={formik.handleChange}
        error={
          formik.touched.estruturaInicialIdNumRegistro &&
          Boolean(formik.errors.estruturaInicialIdNumRegistro)
        }
        helperText={
          formik.touched.estruturaInicialIdNumRegistro &&
          formik.errors.estruturaInicialIdNumRegistro
        }
        disabled
      />

      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="estruturaInicialNivelControleInterno"
        name="estruturaInicialNivelControleInterno"
        value={formik.values.estruturaInicialNivelControleInterno}
        label="Nível de Controle Interno"
        onChange={formik.handleChange}
        error={
          formik.touched.estruturaInicialNivelControleInterno &&
          Boolean(formik.errors.estruturaInicialNivelControleInterno)
        }
        helperText={
          formik.touched.estruturaInicialNivelControleInterno &&
          formik.errors.estruturaInicialNivelControleInterno
        }
        disabled={
          context.formInfo.nomeUnidadeGestora !== 'SECONT' ? true : false
        }
      >
        <MenuItem value={1}>1 – Unidade Central </MenuItem>
        <MenuItem value={2}>2 – Unidade Setorial</MenuItem>
      </TextField>

      <TextField
        variant="outlined"
        fullWidth
        id="estruturaInicialQuantidadeTotalServidores"
        label="Quantidade Total de Servidores na Estrutura
        da Unidade de Controle Interno"
        name="estruturaInicialQuantidadeTotalServidores"
        value={formik.values.estruturaInicialQuantidadeTotalServidores}
        onChange={formik.handleChange}
        error={
          formik.touched.estruturaInicialQuantidadeTotalServidores &&
          Boolean(formik.errors.estruturaInicialQuantidadeTotalServidores)
        }
        helperText={
          formik.touched.estruturaInicialQuantidadeTotalServidores &&
          formik.errors.estruturaInicialQuantidadeTotalServidores
        }
      />

      <TextField
        variant="outlined"
        fullWidth
        id="estruturaInicialQuantidadeServidoresEfetivos"
        label="Quantidade de Servidores Efetivos (do Ente)
        na Estrutura da Unidade de Controle Interno"
        name="estruturaInicialQuantidadeServidoresEfetivos"
        value={formik.values.estruturaInicialQuantidadeServidoresEfetivos}
        onChange={formik.handleChange}
        error={
          formik.touched.estruturaInicialQuantidadeServidoresEfetivos &&
          Boolean(formik.errors.estruturaInicialQuantidadeServidoresEfetivos)
        }
        helperText={
          formik.touched.estruturaInicialQuantidadeServidoresEfetivos &&
          formik.errors.estruturaInicialQuantidadeServidoresEfetivos
        }
      />
      <TextField
        variant="outlined"
        fullWidth
        id="estruturaInicialQuantidadeContadores"
        label="Quantidade de Servidores com formação em
        Ciências Contábeis na Estrutura da Unidade
        de Controle Interno"
        name="estruturaInicialQuantidadeContadores"
        value={formik.values.estruturaInicialQuantidadeContadores}
        onChange={formik.handleChange}
        error={
          formik.touched.estruturaInicialQuantidadeContadores &&
          Boolean(formik.errors.estruturaInicialQuantidadeContadores)
        }
        helperText={
          formik.touched.estruturaInicialQuantidadeContadores &&
          formik.errors.estruturaInicialQuantidadeContadores
        }
      />

      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="estruturaInicialNormaInternaGestaoOrcamentaria"
        name="estruturaInicialNormaInternaGestaoOrcamentaria"
        value={formik.values.estruturaInicialNormaInternaGestaoOrcamentaria}
        label="Normas internas estabelecendo procedimentos Orçamentária
          para avaliação da Gestão"
        onChange={formik.handleChange}
        error={
          formik.touched.estruturaInicialNormaInternaGestaoOrcamentaria &&
          Boolean(formik.errors.estruturaInicialNormaInternaGestaoOrcamentaria)
        }
        helperText={
          formik.touched.estruturaInicialNormaInternaGestaoOrcamentaria &&
          formik.errors.estruturaInicialNormaInternaGestaoOrcamentaria
        }
      >
        <MenuItem value={1}>1 - Existem somente os normativos</MenuItem>
        <MenuItem value={2}>
          2 - Existem normativos e fluxos desenhados
        </MenuItem>
        <MenuItem value={3}>
          3 - Existem normativos, fluxos e são de amplo conhecimento de toda a
          administração
        </MenuItem>
        <MenuItem value={4}>
          4 - Não existem normas internas definidas no âmbito desta temática
        </MenuItem>
      </TextField>

      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="estruturaInicialNormaInternaGestaoFinanceira"
        name="estruturaInicialNormaInternaGestaoFinanceira"
        value={formik.values.estruturaInicialNormaInternaGestaoFinanceira}
        label="Normas internas estabelecendo procedimentos para avaliação da Gestão Financeira"
        onChange={formik.handleChange}
        error={
          formik.touched.estruturaInicialNormaInternaGestaoFinanceira &&
          Boolean(formik.errors.estruturaInicialNormaInternaGestaoFinanceira)
        }
        helperText={
          formik.touched.estruturaInicialNormaInternaGestaoFinanceira &&
          formik.errors.estruturaInicialNormaInternaGestaoFinanceira
        }
      >
        <MenuItem value={1}>1 - Existem somente os normativos</MenuItem>
        <MenuItem value={2}>
          2 - Existem normativos e fluxos desenhados
        </MenuItem>
        <MenuItem value={3}>
          3 - Existem normativos, fluxos e são de amplo conhecimento de toda a
          administração
        </MenuItem>
        <MenuItem value={4}>
          4 - Não existem normas internas definidas no âmbito desta temática
        </MenuItem>
      </TextField>

      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="estruturaInicialNormaInternaGestaoPatrimonial"
        name="estruturaInicialNormaInternaGestaoPatrimonial"
        value={formik.values.estruturaInicialNormaInternaGestaoPatrimonial}
        label="Normas internas estabelecendo procedimentos para avaliação da Gestão Patrimonial"
        onChange={formik.handleChange}
        error={
          formik.touched.estruturaInicialNormaInternaGestaoPatrimonial &&
          Boolean(formik.errors.estruturaInicialNormaInternaGestaoPatrimonial)
        }
        helperText={
          formik.touched.estruturaInicialNormaInternaGestaoPatrimonial &&
          formik.errors.estruturaInicialNormaInternaGestaoPatrimonial
        }
      >
        <MenuItem value={1}>1 - Existem somente os normativos</MenuItem>
        <MenuItem value={2}>
          2 - Existem normativos e fluxos desenhados
        </MenuItem>
        <MenuItem value={3}>
          3 - Existem normativos, fluxos e são de amplo conhecimento de toda a
          administração
        </MenuItem>
        <MenuItem value={4}>
          4 - Não existem normas internas definidas no âmbito desta temática
        </MenuItem>
      </TextField>

      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="estruturaInicialNormaInternaGestaoFiscal"
        name="estruturaInicialNormaInternaGestaoFiscal"
        value={formik.values.estruturaInicialNormaInternaGestaoFiscal}
        label="Normas internas estabelecendo procedimentos para avaliação da Gestão Fiscal"
        onChange={formik.handleChange}
        error={
          formik.touched.estruturaInicialNormaInternaGestaoFiscal &&
          Boolean(formik.errors.estruturaInicialNormaInternaGestaoFiscal)
        }
        helperText={
          formik.touched.estruturaInicialNormaInternaGestaoFiscal &&
          formik.errors.estruturaInicialNormaInternaGestaoFiscal
        }
      >
        <MenuItem value={1}>1 - Existem somente os normativos</MenuItem>
        <MenuItem value={2}>
          2 - Existem normativos e fluxos desenhados
        </MenuItem>
        <MenuItem value={3}>
          3 - Existem normativos, fluxos e são de amplo conhecimento de toda a
          administração
        </MenuItem>
        <MenuItem value={4}>
          4 - Não existem normas internas definidas no âmbito desta temática
        </MenuItem>
      </TextField>

      <TextField
        fullWidth
        select
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        id="estruturaInicialNormaInternaDemContabeis"
        name="estruturaInicialNormaInternaDemContabeis"
        value={formik.values.estruturaInicialNormaInternaDemContabeis}
        label="Normas internas estabelecendo procedimentos para avaliação da conformidade da política e escrituração contábil, e elaboração das Demonstrações Contábeis"
        onChange={formik.handleChange}
        error={
          formik.touched.estruturaInicialNormaInternaDemContabeis &&
          Boolean(formik.errors.estruturaInicialNormaInternaDemContabeis)
        }
        helperText={
          formik.touched.estruturaInicialNormaInternaDemContabeis &&
          formik.errors.estruturaInicialNormaInternaDemContabeis
        }
      >
        <MenuItem value={1}>1 - Existem somente os normativos</MenuItem>
        <MenuItem value={2}>
          2 - Existem normativos e fluxos desenhados
        </MenuItem>
        <MenuItem value={3}>
          3 - Existem normativos, fluxos e são de amplo conhecimento de toda a
          administração
        </MenuItem>
        <MenuItem value={4}>
          4 - Não existem normas internas definidas no âmbito desta temática
        </MenuItem>
      </TextField>

      <div data-button="right">
        <IconButton
          title="Próximo"
          aria-label="Próximo formulário."
          type="submit"
        >
          <ArrowCircleRightIcon />
        </IconButton>
      </div>

      <ConfirmDialog
        open={openDialogRemoveEstruturaInicial}
        setOpen={setOpenDialogRemoveEstruturaInicial}
        titleMessage={'Tem certeza que deseja remover essa Estrutura Inicial ?'}
        responseYes={deleteEstruturaInicial}
        responseNo={() => null}
      />

      <ConfirmDialog
        open={openDialogEstruturaInicial}
        setOpen={setOpenDialogEstruturaInicial}
        titleMessage={'Deseja incluir outra Estrutura Inicial ?'}
        responseYes={responseDialogEstruturaInicialYes}
        responseNo={responseDialogEstruturaInicialNo}
      />

      <AlertSucess
        open={openAlertSave}
        setOpen={setOpenAlertSave}
        message={'Os dados da Estrutura Inicial foram salvos.'}
      />
    </EstruturaInicialStyle>
  )
}
