import { useFormik } from 'formik'

import { TextField, MenuItem, Button, IconButton } from '@mui/material'
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

interface DataUnidadeGestoraProps {
  id: number
  unidadeGestoraIdNumRegistro: string
  unidadeGestoraNivelControleInterno: string
  unidadeGestoraCodigoUnidadeGestora: string
  unidadeGestoraResponsavelUnidadeGestora: string
  unidadeGestoraExercicioUltimaManifestacaoControleInterno: string
  unidadeGestoraOpiniaoPrestacaoContasControleInterno: string
}

export const UnidadeGestora = () => {
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
          unidadeGestoraResponsavelUnidadeGestora:
            data.unidadeGestoraResponsavelUnidadeGestora,
          unidadeGestoraExercicioUltimaManifestacaoControleInterno:
            data.unidadeGestoraExercicioUltimaManifestacaoControleInterno,
          unidadeGestoraOpiniaoPrestacaoContasControleInterno:
            data.unidadeGestoraOpiniaoPrestacaoContasControleInterno,
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
      unidadeGestoraCodigoUnidadeGestora: `${context.formInfo.codigoUnidadeGestoraCidades}`,
      unidadeGestoraResponsavelUnidadeGestora: ``,
      unidadeGestoraExercicioUltimaManifestacaoControleInterno: ``,
      unidadeGestoraOpiniaoPrestacaoContasControleInterno: ``,
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
      dataUnidadeGestora.length > 0 &&
      dataUnidadeGestora[selectUnidadeGestora]
        .unidadeGestoraCodigoUnidadeGestora
    }`,
    unidadeGestoraResponsavelUnidadeGestora: `${
      dataUnidadeGestora.length > 0 &&
      dataUnidadeGestora[selectUnidadeGestora]
        .unidadeGestoraResponsavelUnidadeGestora
    }`,
    unidadeGestoraExercicioUltimaManifestacaoControleInterno: `${
      dataUnidadeGestora.length > 0 &&
      dataUnidadeGestora[selectUnidadeGestora]
        .unidadeGestoraExercicioUltimaManifestacaoControleInterno
    }`,
    unidadeGestoraOpiniaoPrestacaoContasControleInterno: `${
      dataUnidadeGestora.length > 0
        ? dataUnidadeGestora[selectUnidadeGestora]
            .unidadeGestoraOpiniaoPrestacaoContasControleInterno
        : ''
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
              {/* <MenuItem value={0}>Procedimento - 00001</MenuItem>
          <MenuItem value={1}>Procedimento - 00002</MenuItem> */}
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
        disabled={
          context.formInfo.nomeUnidadeGestora !== 'SECONT' ? true : false
        }
      />

      <TextField
        variant="outlined"
        fullWidth
        id="unidadeGestoraResponsavelUnidadeGestora"
        label="Responsável pela Unidade Gestora"
        name="unidadeGestoraResponsavelUnidadeGestora"
        value={formik.values.unidadeGestoraResponsavelUnidadeGestora}
        onChange={formik.handleChange}
        error={
          formik.touched.unidadeGestoraResponsavelUnidadeGestora &&
          Boolean(formik.errors.unidadeGestoraResponsavelUnidadeGestora)
        }
        helperText={
          formik.touched.unidadeGestoraResponsavelUnidadeGestora &&
          formik.errors.unidadeGestoraResponsavelUnidadeGestora
        }
      />

      <TextField
        variant="outlined"
        fullWidth
        id="unidadeGestoraExercicioUltimaManifestacaoControleInterno"
        label="Exercício da Última Manifestação do Controle Interno"
        name="unidadeGestoraExercicioUltimaManifestacaoControleInterno"
        value={
          formik.values.unidadeGestoraExercicioUltimaManifestacaoControleInterno
        }
        onChange={formik.handleChange}
        error={
          formik.touched
            .unidadeGestoraExercicioUltimaManifestacaoControleInterno &&
          Boolean(
            formik.errors
              .unidadeGestoraExercicioUltimaManifestacaoControleInterno,
          )
        }
        helperText={
          formik.touched
            .unidadeGestoraExercicioUltimaManifestacaoControleInterno &&
          formik.errors.unidadeGestoraExercicioUltimaManifestacaoControleInterno
        }
      />

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

      {/* <ConfirmDialog
        open={openDialogUnidadeGestora}
        setOpen={setOpenDialogUnidadeGestora}
        titleMessage={'Deseja incluir outra Unidade Gestora ?'}
        responseYes={responseDialogUnidadeGestoraYes}
        responseNo={responseDialogUnidadeGestoraNo}
      /> */}

      <AlertSucess
        open={openAlertSave}
        setOpen={setOpenAlertSave}
        message={'Os dados da Unidade Gestora foram salvos.'}
      />
    </UnidadeGestoraStyle>
  )
}
