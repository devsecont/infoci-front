import { MenuItem, TextField } from '@mui/material'
import codigosCidades from '../../utils/codigosCidades';
import { UnidadeGestoraReportStyle } from './style'

interface DataUnidadeGestoraProps {
  id: number
  unidadeGestoraIdNumRegistro: string
  unidadeGestoraNivelControleInterno: string
  unidadeGestoraCodigoUnidadeGestora: string
  unidadeGestoraOpiniaoPrestacaoContasControleInterno: string
  unidadeGestoraFatoRelevanteRelaci: string
  unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci: string
}

interface PropsType {
  dataUnidadeGestora: DataUnidadeGestoraProps[]
}

export const UnidadeGestoraReport = ({ dataUnidadeGestora }: PropsType) => {
  return (
    <UnidadeGestoraReportStyle>
    
      {dataUnidadeGestora.map((data: DataUnidadeGestoraProps) => {
         const codCidades = codigosCidades.filter(codigo => codigo.cod === data.unidadeGestoraCodigoUnidadeGestora)[0];
        return (
          <div key={data.id} data-output="unidade-gestora">
            <h3>Registro - {data.unidadeGestoraIdNumRegistro}</h3>
            <TextField
              variant="standard"
              fullWidth
              id="unidadeGestoraIdNumRegistro"
              label="Identificação do Número do Registro"
              name="unidadeGestoraIdNumRegistro"
              value={data.unidadeGestoraIdNumRegistro}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="unidadeGestoraNivelControleInterno"
              name="unidadeGestoraNivelControleInterno"
              value={data.unidadeGestoraNivelControleInterno}
              label="Nível de Controle Interno"
              disabled
            >
              <MenuItem value={1}>1 – Unidade Central </MenuItem>
              <MenuItem value={2}>2 – Unidade Setorial</MenuItem>
            </TextField>

            <TextField
              variant="standard"
              fullWidth
              id="unidadeGestoraCodigoUnidadeGestora"
              label="Código da unidade Gestora em que os procedimentos foram aplicados"
              name="unidadeGestoraCodigoUnidadeGestora"
              value={codCidades ? codCidades.label : ''}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="unidadeGestoraOpiniaoPrestacaoContasControleInterno"
              name="unidadeGestoraOpiniaoPrestacaoContasControleInterno"
              value={data.unidadeGestoraOpiniaoPrestacaoContasControleInterno}
              label="Opinião do Controle Interno sobre os procedimentos aplicados"
              disabled
            >
              <MenuItem value={1}>1 - Regular</MenuItem>
              <MenuItem value={2}>2 - Regular com ressalva</MenuItem>
              <MenuItem value={3}>3 - Irregular</MenuItem>
              <MenuItem value={4}>4 - Não foi emitida opinião</MenuItem>
            </TextField>

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="unidadeGestoraFatoRelevanteRelaci"
              name="unidadeGestoraFatoRelevanteRelaci"
              value={data.unidadeGestoraFatoRelevanteRelaci}
              label="O Controle Interno relatou algum fato 
                relevante no RELACI, de forma a dar ciência 
                ao Tribunal de Contas?"
              disabled
            >
              <MenuItem value={1}>1 - Sim</MenuItem>
              <MenuItem value={2}>2 - Não</MenuItem>
            </TextField>

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci"
              name="unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci"
              value={data.unidadeGestoraAssuntoPrincipalFatoRelevanteRelaci}
              label="Assunto principal do fato relevante relatadono RELACI"
              disabled
            >
              <MenuItem value={1}>
                1 - Licitações, Contratos e Convênios
              </MenuItem>
              <MenuItem value={2}>
                2 - Folha de Pagamento e Concessão de Vantagens
              </MenuItem>
              <MenuItem value={3}>
                3 - Registro de Atos de Pessoal
              </MenuItem>
              <MenuItem value={4}>
                4 - Gestão de Previdência dos RPPS
              </MenuItem>
              <MenuItem value={5}>
                5 - Concessão de diárias e suprimento de fundos
              </MenuItem>
              <MenuItem value={6}>
                6 - Instrumentos de transparência
              </MenuItem>
              <MenuItem value={7}>
                7 - Gestão Fiscal
              </MenuItem>
              <MenuItem value={8}>
                8 - Gestão Orçamentária e Financeira
              </MenuItem>
              <MenuItem value={9}>
                9 - Gestão Patrimonial
              </MenuItem>
              <MenuItem value={10}>
                10 - Saúde e Educação
              </MenuItem>
              <MenuItem value={11}>
                11 - Obras e Serviços de Engenharia
              </MenuItem>
              <MenuItem value={99}>
                99 - Outros
              </MenuItem>
            </TextField>
          </div>
        )
      })}
    </UnidadeGestoraReportStyle>
  )
}
