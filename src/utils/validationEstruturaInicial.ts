import * as yup from "yup";

const  initialValues = {
 
    // estruturaInicialIdNumRegistro: "",
    // estruturaInicialNivelControleInterno:"",
    // estruturaInicialQuantidadeTotalServidores: "",
    // estruturaInicialQuantidadeServidoresEfetivos: "",
    // estruturaInicialQuantidadeContadores:"",
    // estruturaInicialNormaInternaGestaoOrcamentaria: "",
    // estruturaInicialNormaInternaGestaoFinanceira:"",
    // estruturaInicialNormaInternaGestaoPatrimonial:"",
    // estruturaInicialNormaInternaGestaoFiscal:"",
    // estruturaInicialNormaInternaDemContabeis:"",
}

const regexNumbers = /^[0-9]+$/;

const validationSchema = yup.object({
  estruturaInicialIdNumRegistro: yup
    .string()
    .required('O campo é obrigatório')
    .matches(regexNumbers, "Apenas números")
    .max(5, 'Máximo de 5 dígitos'),

  estruturaInicialNivelControleInterno: yup
    .number()
    .required('O campo é obrigatório'),

  estruturaInicialQuantidadeTotalServidores: yup
    .string()
    .required('O campo é obrigatório')
    .matches(regexNumbers, "Apenas números")
    .max(5, 'Máximo de 5 dígitos'),

  estruturaInicialQuantidadeServidoresEfetivos: yup
    .string()
    .required('O campo é obrigatório')
    .matches(regexNumbers, "Apenas números")
    .max(5, 'Máximo de 5 dígitos'),

    estruturaInicialQuantidadeContadores: yup
    .string()
    .required('O campo é obrigatório')
    .matches(regexNumbers, "Apenas números")
    .max(5, 'Máximo de 5 dígitos'),

    estruturaInicialNormaInternaGestaoOrcamentaria: yup
    .number()
    .required('O campo é obrigatório'),

    estruturaInicialNormaInternaGestaoFinanceira: yup
      .number()
      .required('O campo é obrigatório'),
    
    estruturaInicialNormaInternaGestaoPatrimonial: yup
      .number()
      .required('O campo é obrigatório'),
      
    estruturaInicialNormaInternaGestaoFiscal: yup
      .number()
      .required('O campo é obrigatório'),

    estruturaInicialNormaInternaDemContabeis: yup
      .number()
      .required('O campo é obrigatório'),
});

const validationEstruturaInicial = {
  initialValues,
  validationSchema
}
export default validationEstruturaInicial;