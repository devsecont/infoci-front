import * as yup from "yup";

const  initialValues = {
 
  // procedimentosIdNumRegistro: "",
  // procedimentosNivelControleInterno:"",
  // procedimentosCodigoUnidadeGestora: "",
  // procedimentosCodigoProcedimento: "",
  // procedimentosTipoPontoControle:"",
  // procedimentosUniversoAnalisado: "",
  // procedimentosAmostraSelecionada:"",
  // procedimentosDescricaoAnalise:"",
  // procedimentosTipoProcedimentoAnalisado:"",
  // procedimentosSituacaoAnalise:"",
}

const validationSchema = yup.object({
  procedimentosIdNumRegistro: yup
    .string()
    .required('O campo é obrigatório')
    .matches(/^[0-9]+$/, "Apenas números")
    .max(5, 'Máximo de 5 dígitos'),

    procedimentosNivelControleInterno: yup
    .number()
    .required('O campo é obrigatório'),

    procedimentosCodigoUnidadeGestora: yup
    .string()
    .required('O campo é obrigatório')
    .max(11, 'Máximo de 11 dígitos'),

    procedimentosCodigoProcedimento: yup
    .string()
    .required('O campo é obrigatório')
    .max(6, 'Máximo de 6 dígitos'),

    procedimentosTipoPontoControle: yup
    .number()
    .required('O campo é obrigatório'),

    procedimentosUniversoAnalisado: yup
    .string()
    .required('O campo é obrigatório')
    .matches(/^[0-9]+$/, "Apenas números")
    .max(5, 'Máximo de 5 dígitos'),
    
    procedimentosAmostraSelecionada: yup
    .string()
    .required('O campo é obrigatório')
    .matches(/^[0-9]+$/, "Apenas números")
    .max(5, 'Máximo de 5 dígitos'),

    procedimentosDescricaoAnalise: yup
    .string()
    .required('O campo é obrigatório')
    .max(1000, 'Máximo de 1000 dígitos'),

    procedimentosTipoProcedimentoAnalisado: yup
    .number()
    .required('O campo é obrigatório'),

    procedimentosSituacaoAnalise: yup
    .number()
    .required('O campo é obrigatório'),
});

const validationEstruturaInicial = {
  initialValues,
  validationSchema
}
export default validationEstruturaInicial;