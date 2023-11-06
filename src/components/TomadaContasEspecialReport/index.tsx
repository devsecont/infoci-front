import { MenuItem, TextField } from '@mui/material'
import codigosCidades from '../../utils/codigosCidades';
import { TomadaContasEspecialReportStyle } from './style'

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

interface PropsType {
  dataTomadaContasEspecial: DataTomadaContasEspecialProps[]
}
export const TomadaContasEspecialReport = ({
  dataTomadaContasEspecial,
}: PropsType) => {
  return (
    <TomadaContasEspecialReportStyle>
      {dataTomadaContasEspecial.map((data: DataTomadaContasEspecialProps) => {
        const codCidades = codigosCidades.filter(codigo => codigo.cod === data.tomadaContasEspecialCodigoUnidadeGestora)[0];
        return (
          <div key={data.id} data-output="tomada-contas-especial">
            <h3>Registro - {data.tomadaContasEspecialIdNumRegistro}</h3>

            <TextField
              variant="standard"
              fullWidth
              id="tomadaContasEspecialIdNumRegistro"
              label="Identificação do Número do Registro"
              name="tomadaContasEspecialIdNumRegistro"
              value={data.tomadaContasEspecialIdNumRegistro}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              id="tomadaContasEspecialCodigoUnidadeGestora"
              label="Código da Unidade Gestora em que as
      Tomadas de Contas Especiais foram
      realizadas"
              name="tomadaContasEspecialCodigoUnidadeGestora"
              value={codCidades ? codCidades.label : ''}
              disabled
            />
            
            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="tomadaContasEspecialTipoTce"
              name="tomadaContasEspecialTipoTce"
              value={data.tomadaContasEspecialTipoTce}
              label="Tipo de Tomada de Contas Especial"
              disabled
            >
              <MenuItem value={1}>1 – Instaurada de ofício</MenuItem>
              <MenuItem value={2}>2 - Determinada pelo TCEES</MenuItem>
            </TextField>

            <TextField
              variant="standard"
              fullWidth
              id="tomadaContasEspecialProcesso"
              label="Número do Processo Administrativo da
      Tomada de Contas Especial"
              name="tomadaContasEspecialProcesso"
              value={data.tomadaContasEspecialProcesso}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              id="tomadaContasEspecialAnoProcesso"
              label="Ano do Processo Administrativo da Tomada de
      Contas Especial"
              name="tomadaContasEspecialAnoProcesso"
              value={data.tomadaContasEspecialAnoProcesso}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="tomadaContasEspecialFatoMotivo"
              name="tomadaContasEspecialFatoMotivo"
              value={data.tomadaContasEspecialFatoMotivo}
              label="Fatos motivadores para a Instauração da
      Tomada de Contas Especial"
              disabled
            >
              <MenuItem value={1}>
                1 - Omissão no dever de prestar contas ou a não comprovação da
                correta aplicação de recursos repassados mediante convênio,
                contrato de repasse, ou instrumento congênere;
              </MenuItem>
              <MenuItem value={2}>
                2 - Ocorrência de desfalque, alcance, desvio, desaparecimento de
                dinheiro, bens ou valores públicos;
              </MenuItem>
              <MenuItem value={3}>
                3 - Ocorrência de extravio, perda, subtração ou deterioração
                culposa ou dolosa de valores e bens;
              </MenuItem>
              <MenuItem value={4}>
                4 - Prática de ato ilegal, ilegítimo ou antieconômico de que
                resulte dano ao erário;
              </MenuItem>
              <MenuItem value={5}>
                5 - Concessão irregular de quaisquer benefícios fiscais ou de
                renúncia de receitas de que resulte dano ao erário.
              </MenuItem>
            </TextField>

            <TextField
              variant="standard"
              fullWidth
              id="tomadaContasEspecialDataCiencia"
              label="Data do evento ou, quando desconhecida, da
      data da ciência do fato pela autoridade
      competente (Inciso I, do art. 2o da IN 32/2014)."
              name="tomadaContasEspecialDataCiencia"
              value={data.tomadaContasEspecialDataCiencia}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              id="tomadaContasEspecialDataInstauracao"
              label="Data de Instauração da Tomada de Contas
      Especial"
              name="tomadaContasEspecialDataInstauracao"
              value={data.tomadaContasEspecialDataInstauracao}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              id="tomadaContasEspecialDataEnvioTribunalContas"
              label="Data de Envio ao TCEES da Tomada de
      Contas Especial"
              name="tomadaContasEspecialDataEnvioTribunalContas"
              value={data.tomadaContasEspecialDataEnvioTribunalContas}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              id="tomadaContasEspecialValorDebito"
              label="Valor Original do Débito - R$"
              name="tomadaContasEspecialValorDebito"
              value={data.tomadaContasEspecialValorDebito}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="tomadaContasEspecialSituacaoEm31do12InstauradaUg"
              name="tomadaContasEspecialSituacaoEm31do12InstauradaUg"
              value={data.tomadaContasEspecialSituacaoEm31do12InstauradaUg}
              label="Situação da Tomada de Contas Especial em
                31 de dezembro do Exercício referência da
                Prestação de Contas Situação da Tomada de Contas Especial em 
                31 de dezembro do Exercício referência da 
                Prestação de Contas Anual, referente as 
                TCE’s instauradas na UG e ainda não 
                encaminhadas ao TCEESAnual"
              disabled
            >
              <MenuItem value={1}>1 - Aguardando o início da instrução</MenuItem>
              <MenuItem value={2}>2 - Em instrução dentro do prazo</MenuItem>
              <MenuItem value={3}>3 - Em instrução fora do prazo</MenuItem>
              <MenuItem value={4}>4 - Finalizada – Dispensado o encaminhamento ao TCEES – art. 9º, IN 32/2014;</MenuItem>
              <MenuItem value={5}>5 - Finalizada - Arquivada antes do encaminhamento ao TCEES – art. 10, IN 32/2014</MenuItem>
            </TextField>

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="tomadaContasEspecialSituacaoEm31do12EnviadaTcees"
              name="tomadaContasEspecialSituacaoEm31do12EnviadaTcees"
              value={data.tomadaContasEspecialSituacaoEm31do12EnviadaTcees}
              label="Situação da Tomada de Contas Especial em 
                31 de dezembro do Exercício referência da 
                Prestação de Contas Anual, referente as 
                TCE’s já encaminhadas ao TCEES."
              disabled
            >
              <MenuItem value={1}>1 - Finalizada - Aguardando deliberação do TCEES</MenuItem>
              <MenuItem value={2}>2 - Com decisão do TCEES pela condenação ao ressarcimento / Sem baixa da responsabilidade pelo débito</MenuItem>
              <MenuItem value={3}>3 - Com decisão do TCEES pela baixa da responsabilidade pelo débito – art. 20, da IN 32/2014</MenuItem>
              <MenuItem value={4}>4 - Em complementação de informações, após retorno determinado pelo TCEES – art. 15, IN 32/2014</MenuItem>
            </TextField>
          </div>
        )
      })}
    </TomadaContasEspecialReportStyle>
  )
}
