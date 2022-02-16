import { MenuItem, TextField } from '@mui/material'
import { ProcedimentosReportStyle } from './style'

interface DataProcedimentoProps {
  id: number
  procedimentosIdNumRegistro: string
  procedimentosNivelControleInterno: string
  procedimentosCodigoUnidadeGestora: string
  procedimentosCodigoProcedimento: string
  procedimentosTipoPontoControle: string
  procedimentosUniversoAnalisado: string
  procedimentosAmostraSelecionada: string
  procedimentosDescricaoAnalise: string
  procedimentosTipoProcedimentoAnalisado: string
  procedimentosSituacaoAnalise: string
}
interface PropsType {
  dataProcedimentos: DataProcedimentoProps[]
}
export const ProcedimentosReport = ({ dataProcedimentos }: PropsType) => {
  return (
    <ProcedimentosReportStyle>
      {dataProcedimentos.map((data: DataProcedimentoProps) => {
        return (
          <div key={data.id} data-output="procedimentos">
            <h3>Registro - {data.procedimentosIdNumRegistro}</h3>

            <TextField
              variant="standard"
              fullWidth
              id="procedimentosIdNumRegistro"
              label="Identificação do Número do Registro"
              name="procedimentosIdNumRegistro"
              value={data.procedimentosIdNumRegistro}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="procedimentosNivelControleInterno"
              name="procedimentosNivelControleInterno"
              value={data.procedimentosNivelControleInterno}
              label="Nível de Controle Interno"
              disabled
            >
              <MenuItem value={1}>1 – Unidade Central </MenuItem>
              <MenuItem value={2}>2 – Unidade Setorial</MenuItem>
            </TextField>

            <TextField
              variant="standard"
              fullWidth
              id="procedimentosCodigoUnidadeGestora"
              label="Código da Unidade Gestora em que os procedimentos foram aplicados"
              name="procedimentosCodigoUnidadeGestora"
              value={data.procedimentosCodigoUnidadeGestora}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              id="procedimentosCodigoProcedimento"
              label="Código do Procedimento (Tabela Referencial 1 / IN 68 de 2020)"
              name="procedimentosCodigoProcedimento"
              value={data.procedimentosCodigoProcedimento}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="procedimentosTipoPontoControle"
              name="procedimentosTipoPontoControle"
              value={data.procedimentosTipoPontoControle}
              label="Tipo do Ponto de Controle"
              disabled
            >
              <MenuItem value={1}>
                1 - Quantitativo (se mensurável quantitativamente)
              </MenuItem>
              <MenuItem value={2}>
                2 - Qualitativo (se não mensurável quantitativamente)
              </MenuItem>
            </TextField>

            <TextField
              variant="standard"
              fullWidth
              id="procedimentosUniversoAnalisado"
              label="Universo do Ponto de Controle Analisado"
              name="procedimentosUniversoAnalisado"
              value={data.procedimentosUniversoAnalisado}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              id="procedimentosAmostraSelecionada"
              label="Amostra Selecionada do Ponto de Controle Analisado"
              name="procedimentosAmostraSelecionada"
              value={data.procedimentosAmostraSelecionada}
              disabled
            />
            <TextField
              variant="standard"
              fullWidth
              id="procedimentosDescricaoAnalise"
              label="Descrição da Análise"
              name="procedimentosDescricaoAnalise"
              value={data.procedimentosDescricaoAnalise}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="procedimentosTipoProcedimentoAnalisado"
              name="procedimentosTipoProcedimentoAnalisado"
              value={data.procedimentosTipoProcedimentoAnalisado}
              label="Tipo de Procedimento Aplicado"
              disabled
            >
              <MenuItem value={1}>1 – Auditoria de conformidade </MenuItem>
              <MenuItem value={2}>2 – Auditoria financeira</MenuItem>
              <MenuItem value={3}>3 – Auditoria operacional</MenuItem>
              <MenuItem value={4}>4 – Analise documental</MenuItem>
              <MenuItem value={5}>5 – Conciliações de demonstrativos</MenuItem>
              <MenuItem value={6}>6 – Circularização</MenuItem>
              <MenuItem value={7}>7 – Revisão Analítica</MenuItem>
              <MenuItem value={8}>8 – Testes Substantivos</MenuItem>
              <MenuItem value={9}>9 – Testes de Controle</MenuItem>
              <MenuItem value={10}>10 – Inspeção Física</MenuItem>
              <MenuItem value={11}>11 – Observação Direta</MenuItem>
              <MenuItem value={12}>12 – Indagação</MenuItem>
              <MenuItem value={13}>13 – Confirmação Extrema</MenuItem>
              <MenuItem value={14}>14 – Recálculo</MenuItem>
              <MenuItem value={15}>15 – Reexecução</MenuItem>
              <MenuItem value={16}>16 – Outros</MenuItem>
            </TextField>

            <TextField
              variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="procedimentosSituacaoAnalise"
              name="procedimentosSituacaoAnalise"
              value={data.procedimentosSituacaoAnalise}
              label="Situação da Análise"
              disabled
            >
              <MenuItem value={1}>
                1 - Procedimento aplicado sem detecção de distorções
              </MenuItem>
              <MenuItem value={2}>
                2 - Procedimento aplicado sem detecção de distorções relevantes,
                constatando oportunidades de melhorias do controle
              </MenuItem>
              <MenuItem value={3}>
                3 - Procedimento aplicado com constatação de distorções que
                ensejam risco grave e necessidade de correções.
              </MenuItem>
            </TextField>
          </div>
        )
      })}
    </ProcedimentosReportStyle>
  )
}
