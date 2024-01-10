import * as yup from "yup";

const regexDate = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
const regexYear = /^\d{4}$/;
const regexDecimal =  /^\d{1,14}\.\d{2}$/;

const validationSchema = yup.object({
  tomadaContasEspecialIdNumRegistro: yup
    .string()
    .required('O campo é obrigatório')
    .matches(/^[0-9]+$/, "Apenas números")
    .max(5, 'Máximo de 5 dígitos'),
  tomadaContasEspecialExisteTceInstaurada: yup
    .string()
    .required('O campo é obrigatório')
    .matches(/^[0-9]+$/, "Apenas números")
    .max(1, 'Máximo de 1 dígitos'),
    tomadaContasEspecialCodigoUnidadeGestora: yup
    .string()
    .required('O campo é obrigatório')
    .max(11, 'Máximo de 11 dígitos'),

    tomadaContasEspecialTipoTce: yup
    .string()
    .required('O campo é obrigatório'),

    tomadaContasEspecialProcesso: yup
    .string()
    .required('O campo é obrigatório')
    .max(26, 'Máximo de 26 dígitos'),

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
    .matches(regexDecimal, 'Apenas números com ponto decimal ex: 100.00, 10152.20, 85424.65, etc.'),
  
    tomadaContasEspecialSituacaoEm31do12InstauradaUg: yup
    .number()
    .when('tomadaContasEspecialDataEnvioTribunalContas', (tomadaContasEspecialDataEnvioTribunalContas, field) => 
    !regexDate.test(tomadaContasEspecialDataEnvioTribunalContas) ? field.required('O campo é obrigatório') : field),
      
    tomadaContasEspecialSituacaoEm31do12EnviadaTcees: yup
    .number()
    .when('tomadaContasEspecialDataEnvioTribunalContas', (tomadaContasEspecialDataEnvioTribunalContas, field) => 
    regexDate.test(tomadaContasEspecialDataEnvioTribunalContas) ? field.required('O campo é obrigatório') : field)
    
});

const validationEstruturaInicial = {
  validationSchema
}
export default validationEstruturaInicial;