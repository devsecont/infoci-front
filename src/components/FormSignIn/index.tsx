import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

import { useContext, useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import baseAPI from '../../utils/baseAPI';

import { FormSignInStyle } from "./style";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalStorage";

export const FormSignIn = () => {

  const context = useContext(GlobalContext);
  const navigate = useNavigate();
 
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Digite um e-mail válido.")
      .required("E-mail é obrigatório."),

    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .required("Senha é obrigatória."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values:any) => {
     
      const { email, password} = values;

      const valuesLogin = {
        email,
        senha: password,
      };

      axios.post(`${baseAPI.URL}/sessions`, valuesLogin)
        .then((response: any) => {
          
          const { data } = response;
        
          localStorage.setItem('app-token', data.token)
          context.setUserAuth({
            id: data.usuario.id,
            name: data.usuario.nome,
            token: data.token,

          });
          
          navigate('/select_ug');

        })
        .catch(() => {
          alert("Endereço de e-mail ou senha incorretos.")
        })
    },
  });

  return (
    <FormSignInStyle noValidate onSubmit={formik.handleSubmit}>
      <div data-form="inputs">
      <TextField
        variant="outlined"
        fullWidth
        id="email"
        label="E-mail"
        name="email"
        autoComplete="email"
        autoFocus
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
       
        variant="outlined"
        id="password"
        label="Senha"
        type={showPassword ? "text" : "password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(e) => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>
      </div>
      </div>
      
    </FormSignInStyle>
  );
};