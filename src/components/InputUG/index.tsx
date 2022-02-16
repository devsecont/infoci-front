import { useFormik } from "formik";
import * as yup from "yup";

import { Button, MenuItem, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalStorage'
import baseAPI from '../../utils/baseAPI';
import { InputUGStyle } from './style'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


interface ValuesProps {
  formValue :string,
}

interface InputUGProps {
  id: number,
  codigoUnidadeGestoraSigefes: string,
  codigoUnidadeGestoraCidades: string,
  nomeUnidadeGestora: string,
}

export const InputUG = () => {
  const context = useContext(GlobalContext);
  const [inputUGInfo, setInputUGInfo] = useState<InputUGProps[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('app-token');
  


  useEffect(() => {

    context.setPath(location.pathname);

    axios.get(`${baseAPI.URL}/forms`, { headers: baseAPI.HEADERS(token) })
      .then((response: any) => {
        const { data } = response;

        const newInputUGInfo = data.map(({id, codigoUnidadeGestoraSigefes,codigoUnidadeGestoraCidades, nomeUnidadeGestora}: InputUGProps) => {
          return {
            id, 
            codigoUnidadeGestoraSigefes, 
            codigoUnidadeGestoraCidades, 
            nomeUnidadeGestora,
          }
        })

        setInputUGInfo([...newInputUGInfo]);
      })
  },[])

  
  const validationSchema = yup.object({
    formValue: yup
      .string()
      .required("Selecione uma UG")
  });

  const formik = useFormik({
    initialValues: {
      formValue:"",
    },
    validationSchema: validationSchema,
    onSubmit: (values:ValuesProps) => {
    
    const form = inputUGInfo.filter(form => form.codigoUnidadeGestoraCidades === values.formValue).reduce((form) => ({...form}));
    
    context.setFormInfo(form);
    context.setValueTab(0);

     navigate('/form')

    },
  });

  return (
    <InputUGStyle>
      <div data-input="select-container">
        <h2>Selecione a UG que deseja incluir as informações:</h2>
        <form noValidate onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            select
            inputProps={{ MenuProps: { disableScrollLock: true } }}
            id="formValue"
            name="formValue"
            label="Unidade(s) Gestora(s)"
            value={formik.values.formValue}
            onChange={formik.handleChange}
            error={formik.touched.formValue && Boolean(formik.errors.formValue)}
            helperText={formik.touched.formValue && formik.errors.formValue}
          >
            {inputUGInfo.map((data:InputUGProps) => {
               return <MenuItem value={`${data.codigoUnidadeGestoraCidades}`} key={data.id}>{data.nomeUnidadeGestora}</MenuItem>
            })}

            {/* <MenuItem value={"1"}>SECONT</MenuItem>
            <MenuItem value={"2"}>SESA</MenuItem>
            <MenuItem value={"3"}>SEGER</MenuItem>  */}
          </TextField>

          <Button type="submit" fullWidth variant="contained" color="primary">
            Acessar Formulário
          </Button>
        </form>
      </div>
    </InputUGStyle>
  )
}
