import * as yup from "yup";

const regexDecimal =  /^\d{1,14}\.\d{2}$/;

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
    .max(10, 'Máximo de 10 dígitos'),

    procedimentosTipoPontoControle: yup
    .number()
    .required('O campo é obrigatório'),

    procedimentosUniversoAnalisado: yup
    .string()
    .when('procedimentosTipoPontoControle', (procedimentosTipoPontoControle, field) => 
          procedimentosTipoPontoControle === 1 ? field.required('O campo é obrigatório') : field)
    .matches(regexDecimal, "Apenas números com ponto decimal ex: 100.00, 10152.20, 85424.65, etc."),
    
    procedimentosAmostraSelecionada: yup
    .string()
    .when('procedimentosTipoPontoControle', (procedimentosTipoPontoControle, field) => 
          procedimentosTipoPontoControle === 1 ? field.required('O campo é obrigatório') : field)
    .matches(regexDecimal, "Apenas números com ponto decimal ex: 100.00, 10152.20, 85424.65, etc."),

    procedimentosUnidadeAmostraSelecionada: yup
    .number()
    .when('procedimentosTipoPontoControle', (procedimentosTipoPontoControle, field) => 
          procedimentosTipoPontoControle === 1 ? field.required('O campo é obrigatório') : field),
    procedimentosDescricaoAmostraSelecionada: yup
    .string()
    .required('O campo é obrigatório')
    .max(1000, 'Máximo de 1000 dígitos'),
    
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
 
  validationSchema
}
export default validationEstruturaInicial;