import { MenuItem, TextField } from '@mui/material'
import { TomadaContasEspecialReportStyle } from './style'

interface DataTomadaContasEspecialProps {
  id: number
  tomadaContasEspecialIdNumRegistro: string
  tomadaContasEspecialCodigoUnidadeGestora: string
  tomadaContasEspecialProcesso: string
  tomadaContasEspecialAnoProcesso: string
  tomadaContasEspecialFatoMotivo: string
  tomadaContasEspecialDataCiencia: string
  tomadaContasEspecialDataInstauracao: string
  tomadaContasEspecialDataEnvioTribunalContas: string
  tomadaContasEspecialValorDebito: string
  tomadaContasEspecialSituacaoEm31do12: string
  tomadaContasEspecialMotivoBaixaDebito: string
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
              value={data.tomadaContasEspecialCodigoUnidadeGestora}
              disabled
            />

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
              label="Valor Original do Débito"
              name="tomadaContasEspecialValorDebito"
              value={data.tomadaContasEspecialValorDebito}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="tomadaContasEspecialSituacaoEm31do12"
              name="tomadaContasEspecialSituacaoEm31do12"
              value={data.tomadaContasEspecialSituacaoEm31do12}
              label="Situação da Tomada de Contas Especial em
      31 de dezembro do Exercício referência da
      Prestação de Contas Anual"
              disabled
            >
              <MenuItem value={1}>1 - Em instrução dentro do prazo;</MenuItem>
              <MenuItem value={2}>2 - Em instrução fora do prazo;</MenuItem>
              <MenuItem value={3}>
                3 - Em complementação de informações determinada pelo Tribunal
                de Contas;
              </MenuItem>
              <MenuItem value={4}>4 - Finalizada;</MenuItem>
            </TextField>

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="tomadaContasEspecialMotivoBaixaDebito"
              name="tomadaContasEspecialMotivoBaixaDebito"
              value={data.tomadaContasEspecialMotivoBaixaDebito}
              label="Motivo da Baixa da Responsabilidade pelo
      Débito"
              disabled
            >
              <MenuItem value={1}>
                1 - Elisão da responsabilidade pelo dano inicialmente imputada
                ao responsável;
              </MenuItem>
              <MenuItem value={2}>
                2 - Ausência de comprovação do dano;
              </MenuItem>
              <MenuItem value={3}>
                3 - Arquivamento do processo por falta de pressupostos de
                instauração ou do seu desenvolvimento regular;
              </MenuItem>
              <MenuItem value={4}>
                4 - Contas consideradas iliquidáveis, nos termos do art. 90 da
                Lei Complementar Estadual n° 621/2012;
              </MenuItem>
              <MenuItem value={5}>
                5 - Quitação ao responsável pelo recolhimento do débito.
              </MenuItem>
            </TextField>
          </div>
        )
      })}
    </TomadaContasEspecialReportStyle>
  )
}
