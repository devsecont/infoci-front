import * as yup from "yup";

const  initialValues = {
 
  // unidadeGestoraIdNumRegistro: "",
  // unidadeGestoraNivelControleInterno:"",
  // unidadeGestoraCodigoUnidadeGestora: "",
  // unidadeGestoraResponsavelUnidadeGestora: "",
  // unidadeGestoraExercicioUltimaManifestacaoControleInterno:"",
  // unidadeGestoraOpiniaoPrestacaoContasControleInterno: "",
  
}
const regexYear = /^\d{4}$/;
const regexNumbers = /^[0-9]+$/;

const validationSchema = yup.object({
  unidadeGestoraIdNumRegistro: yup
    .string()
    .required('O campo é obrigatório')
    .matches(regexNumbers, "Apenas números")
    .max(5, 'Máximo de 5 dígitos'),

    unidadeGestoraNivelControleInterno: yup
    .number()
    .required('O campo é obrigatório'),

    unidadeGestoraCodigoUnidadeGestora: yup
    .string()
    .required('O campo é obrigatório')
    .max(11, 'Máximo de 11 dígitos'),

    unidadeGestoraResponsavelUnidadeGestora: yup
    .string()
    .required('O campo é obrigatório')
    .max(1000, 'Máximo de 1000 dígitos'),

    unidadeGestoraExercicioUltimaManifestacaoControleInterno: yup
    .string()
    .required('O campo é obrigatório')
    .matches(regexYear, "Formato AAAA"),

    unidadeGestoraOpiniaoPrestacaoContasControleInterno: yup
    .number()
    .required('O campo é obrigatório'),

});

const validationUnidadeGestora = {
  initialValues,
  validationSchema
}
export default validationUnidadeGestora;