import * as yup from "yup";

const regexDate = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
const regexYear = /^\d{4}$/;
const regexDecimal = /^\d{0,14}(.\d{1,2})?$/;

const validationSchema = yup.object({
  tomadaContasEspecialIdNumRegistro: yup
    .string()
    .required('O campo é obrigatório')
    .matches(/^[0-9]+$/, "Apenas números")
    .max(5, 'Máximo de 5 dígitos'),

    tomadaContasEspecialCodigoUnidadeGestora: yup
    .string()
    .required('O campo é obrigatório')
    .max(11, 'Máximo de 11 dígitos'),

    tomadaContasEspecialProcesso: yup
    .string()
    .required('O campo é obrigatório')
    .max(16, 'Máximo de 16 dígitos'),

    tomadaContasEspecialAnoProcesso: yup
    .string()
    .required('O campo é obrigatório')
    .matches(regexYear, "Formato AAAA"),
   

    tomadaContasEspecialFatoMotivo: yup
    .number()
    .required('O campo é obrigatório'),

    tomadaContasEspecialDataCiencia: yup
    .string()
    .required('O campo é obrigatório')
    .matches(regexDate, "Apenas no formato AAAA-MM-DD"),

    tomadaContasEspecialDataInstauracao: yup
    .string()
    .required('O campo é obrigatório')
    .matches(regexDate, "Apenas no formato AAAA-MM-DD"),

    tomadaContasEspecialDataEnvioTribunalContas: yup
    .string()
    .matches(regexDate, "Apenas no formato AAAA-MM-DD"),

    tomadaContasEspecialValorDebito: yup
    .string()
    .required('O campo é obrigatório')
    .matches(regexDecimal, 'Apenas números de no máximo 14 dígitos antes da vírgula e 2 dígitos depois da vírgula'),
  
    tomadaContasEspecialSituacaoEm31do12: yup
    .number()
    .required('O campo é obrigatório'),

    tomadaContasEspecialMotivoBaixaDebito: yup
    .number()
    .required('O campo é obrigatório'),
});

const validationEstruturaInicial = {
  
  validationSchema
}
export default validationEstruturaInicial;