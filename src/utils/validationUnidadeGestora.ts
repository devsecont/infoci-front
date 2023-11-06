import * as yup from "yup";

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

    unidadeGestoraOpiniaoPrestacaoContasControleInterno: yup
    .number()
    .required('O campo é obrigatório'),

    unidadeGestoraFatoRelevanteRelaci: yup
    .number()
    .required('O campo é obrigatório'),

    unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci: yup
    .number()
    .when('unidadeGestoraFatoRelevanteRelaci', (unidadeGestoraFatoRelevanteRelaci, field) => 
      unidadeGestoraFatoRelevanteRelaci === 1 ? field.required('O campo é obrigatório') : field),
});

const validationUnidadeGestora = {
  validationSchema
}
export default validationUnidadeGestora;