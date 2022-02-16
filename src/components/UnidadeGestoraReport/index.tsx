import { MenuItem, TextField } from '@mui/material'
import { UnidadeGestoraReportStyle } from './style'

interface DataUnidadeGestoraProps {
  id: number
  unidadeGestoraIdNumRegistro: string
  unidadeGestoraNivelControleInterno: string
  unidadeGestoraCodigoUnidadeGestora: string
  unidadeGestoraResponsavelUnidadeGestora: string
  unidadeGestoraExercicioUltimaManifestacaoControleInterno: string
  unidadeGestoraOpiniaoPrestacaoContasControleInterno: string
}

interface PropsType {
  dataUnidadeGestora: DataUnidadeGestoraProps[]
}

export const UnidadeGestoraReport = ({ dataUnidadeGestora }: PropsType) => {
  return (
    <UnidadeGestoraReportStyle>
    
      {dataUnidadeGestora.map((data: DataUnidadeGestoraProps) => {
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
              value={data.unidadeGestoraCodigoUnidadeGestora}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              id="unidadeGestoraResponsavelUnidadeGestora"
              label="Responsável pela Unidade Gestora"
              name="unidadeGestoraResponsavelUnidadeGestora"
              value={data.unidadeGestoraResponsavelUnidadeGestora}
              disabled
            />

            <TextField
              variant="standard"
              fullWidth
              id="unidadeGestoraExercicioUltimaManifestacaoControleInterno"
              label="Exercício da Última Manifestação do Controle Interno"
              name="unidadeGestoraExercicioUltimaManifestacaoControleInterno"
              value={
                data.unidadeGestoraExercicioUltimaManifestacaoControleInterno
              }
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
          </div>
        )
      })}
    </UnidadeGestoraReportStyle>
  )
}
