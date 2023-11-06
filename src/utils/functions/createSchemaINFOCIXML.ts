interface DataEstruturaInicialProps {
  id: number
  estruturaInicialIdNumRegistro: string
  estruturaInicialNivelControleInterno: string
  estruturaInicialQuantidadeTotalServidores: string
  estruturaInicialQuantidadeServidoresEfetivos: string
  estruturaInicialQuantidadeContadores: string
  estruturaInicialNormaInternaGestaoOrcamentaria: string
  estruturaInicialNormaInternaGestaoFinanceira: string
  estruturaInicialNormaInternaGestaoPatrimonial: string
  estruturaInicialNormaInternaGestaoFiscal: string
  estruturaInicialNormaInternaDemContabeis: string
}
interface DataUnidadeGestoraProps {
  id: number
  unidadeGestoraIdNumRegistro: string
  unidadeGestoraNivelControleInterno: string
  unidadeGestoraCodigoUnidadeGestora: string
  unidadeGestoraOpiniaoPrestacaoContasControleInterno: string
  unidadeGestoraFatoRelevanteRelaci: string
  unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci: string
}
interface DataProcedimentoProps {
  id: number
  procedimentosIdNumRegistro: string
  procedimentosNivelControleInterno: string
  procedimentosCodigoUnidadeGestora: string
  procedimentosCodigoProcedimento: string
  procedimentosTipoPontoControle: string
  procedimentosUniversoAnalisado: string
  procedimentosAmostraSelecionada: string
  procedimentosUnidadeAmostraSelecionada: string
  procedimentosDescricaoAmostraSelecionada: string
  procedimentosDescricaoAnalise: string
  procedimentosTipoProcedimentoAnalisado: string
  procedimentosSituacaoAnalise: string
}
interface DataTomadaContasEspecialProps {
  id: number
  tomadaContasEspecialIdNumRegistro: string
  tomadaContasEspecialCodigoUnidadeGestora: string
  tomadaContasEspecialTipoTce: string
  tomadaContasEspecialProcesso: string
  tomadaContasEspecialAnoProcesso: string
  tomadaContasEspecialFatoMotivo: string
  tomadaContasEspecialDataCiencia: string
  tomadaContasEspecialDataInstauracao: string
  tomadaContasEspecialDataEnvioTribunalContas: string
  tomadaContasEspecialValorDebito: string
  tomadaContasEspecialSituacaoEm31do12InstauradaUg: string
  tomadaContasEspecialSituacaoEm31do12EnviadaTcees: string
}

export const createSchemaINFOCIXML = (dataEstruturaInicial:DataEstruturaInicialProps[], dataUnidadeGestora: DataUnidadeGestoraProps[], dataProcedimentos: DataProcedimentoProps[], dataTomadaContasEspecial:DataTomadaContasEspecialProps[] | []) => {

const schemaEstruturaInicial = dataEstruturaInicial.map((data: DataEstruturaInicialProps) => `<InformacoesControleInternoEstruturaInicial> <IdNumRegistro>${data.estruturaInicialIdNumRegistro}</IdNumRegistro><NivelControleInterno>${data.estruturaInicialNivelControleInterno}</NivelControleInterno><QuantidadeTotalServidores>${data.estruturaInicialQuantidadeTotalServidores}</QuantidadeTotalServidores><QuantidadeServidoresEfetivos>${data.estruturaInicialQuantidadeServidoresEfetivos}</QuantidadeServidoresEfetivos><QuantidadeContadores>${data.estruturaInicialQuantidadeContadores}</QuantidadeContadores><NormaInternaGestaoOrcamentaria>${data.estruturaInicialNormaInternaGestaoOrcamentaria}</NormaInternaGestaoOrcamentaria><NormaInternaGestaoFinanceira>${data.estruturaInicialNormaInternaGestaoFinanceira}</NormaInternaGestaoFinanceira><NormaInternaGestaoPatrimonial>${data.estruturaInicialNormaInternaGestaoPatrimonial}</NormaInternaGestaoPatrimonial><NormaInternaGestaoFiscal>${data.estruturaInicialNormaInternaGestaoFiscal}</NormaInternaGestaoFiscal><NormaInternaDemContabeis>${data.estruturaInicialNormaInternaDemContabeis}</NormaInternaDemContabeis></InformacoesControleInternoEstruturaInicial >`).toString().replaceAll(',', '');

const schemaUnidadeGestora = dataUnidadeGestora.map((data:DataUnidadeGestoraProps) => `<InformacoesControleInternoEstruturaInicialUnidadeGestora> <IdNumRegistro>${data.unidadeGestoraIdNumRegistro}</IdNumRegistro><NivelControleInterno>${data.unidadeGestoraNivelControleInterno}</NivelControleInterno><CodigoUnidadeGestora>${data.unidadeGestoraCodigoUnidadeGestora}</CodigoUnidadeGestora><OpiniaoPrestacaoContasControleInterno>${data.unidadeGestoraOpiniaoPrestacaoContasControleInterno}</OpiniaoPrestacaoContasControleInterno>${data.unidadeGestoraFatoRelevanteRelaci ? `<FatoRelevanteRelaci>${data.unidadeGestoraFatoRelevanteRelaci}</FatoRelevanteRelaci>` : ''} ${data.unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci ? `<AssuntoPrincipalFatoRelevanteRelaci>${data.unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci}</AssuntoPrincipalFatoRelevanteRelaci>` : ''}</InformacoesControleInternoEstruturaInicialUnidadeGestora>`).toString().replaceAll(',', '')

const schemaProcedimentos = dataProcedimentos.map((data: DataProcedimentoProps) => `<InformacoesControleInternoProcedimentos> <IdNumRegistro>${data.procedimentosIdNumRegistro}</IdNumRegistro><NivelControleInterno>${data.procedimentosNivelControleInterno}</NivelControleInterno><CodigoUnidadeGestora>${data.procedimentosCodigoUnidadeGestora}</CodigoUnidadeGestora><CodigoProcedimento>${data.procedimentosCodigoProcedimento}</CodigoProcedimento><TipoPontoControle>${data.procedimentosTipoPontoControle}</TipoPontoControle>${data.procedimentosUniversoAnalisado ? `<UniversoAnalisado>${data.procedimentosUniversoAnalisado}</UniversoAnalisado>` : ""}${data.procedimentosAmostraSelecionada ? `<AmostraSelecionada>${data.procedimentosAmostraSelecionada}</AmostraSelecionada>` : ""}${data.procedimentosUnidadeAmostraSelecionada ? `<UnidadeAmostraSelecionada>${data.procedimentosUnidadeAmostraSelecionada}</UnidadeAmostraSelecionada>` : ""}<DescricaoAmostraSelecionada>${data.procedimentosDescricaoAmostraSelecionada}</DescricaoAmostraSelecionada><DescricaoAnalise>${data.procedimentosDescricaoAnalise}</DescricaoAnalise><TipoProcedimentoAnalisado>${data.procedimentosTipoProcedimentoAnalisado}</TipoProcedimentoAnalisado><SituacaoAnalise>${data.procedimentosSituacaoAnalise}</SituacaoAnalise></InformacoesControleInternoProcedimentos>` ).toString().replaceAll(',', '')

const schemaTomadaContasEspecial = dataTomadaContasEspecial.length > 0  ? dataTomadaContasEspecial.map((data: DataTomadaContasEspecialProps) => `<InformacoesControleInternoTomadaContasEspecial><IdNumRegistro>${data.tomadaContasEspecialIdNumRegistro}</IdNumRegistro><CodigoUnidadeGestora>${data.tomadaContasEspecialCodigoUnidadeGestora}</CodigoUnidadeGestora><TipoTCE>${data.tomadaContasEspecialTipoTce}</TipoTCE><Processo>${data.tomadaContasEspecialProcesso}</Processo><AnoProcesso>${data.tomadaContasEspecialAnoProcesso}</AnoProcesso><FatoMotivo>${data.tomadaContasEspecialFatoMotivo}</FatoMotivo><DataCiencia>${data.tomadaContasEspecialDataCiencia}</DataCiencia><DataInstauracao>${data.tomadaContasEspecialDataInstauracao}</DataInstauracao>${data.tomadaContasEspecialDataEnvioTribunalContas ? `<DataEnvioTribunalContas>${data.tomadaContasEspecialDataEnvioTribunalContas}</DataEnvioTribunalContas>`: ""}<ValorDebito>${data.tomadaContasEspecialValorDebito}</ValorDebito>${data.tomadaContasEspecialSituacaoEm31do12InstauradaUg? `<SituacaoEm31do12InstauradaUG>${data.tomadaContasEspecialSituacaoEm31do12InstauradaUg}</SituacaoEm31do12InstauradaUG>`:''}${data.tomadaContasEspecialSituacaoEm31do12EnviadaTcees? `<SituacaoEm31do12EnviadaTCEES>${data.tomadaContasEspecialSituacaoEm31do12EnviadaTcees}</SituacaoEm31do12EnviadaTCEES>`: ""}</InformacoesControleInternoTomadaContasEspecial >`).toString().replaceAll(',', '') : '';

const schemaINFOCI =
  `<PrestacaoContasAnual>
  <InformacoesControleInterno_Schema> ${schemaEstruturaInicial}${schemaUnidadeGestora}${schemaProcedimentos}${schemaTomadaContasEspecial}</InformacoesControleInterno_Schema></PrestacaoContasAnual>`;

  return schemaINFOCI;
}

