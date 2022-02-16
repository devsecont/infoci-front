import { MenuItem, TextField } from '@mui/material'

import { EstruturaInicialReportStyle } from './style'

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

interface PropsType {
  dataEstruturaInicial: DataEstruturaInicialProps[]
}

export const EstruturaInicialReport = ({ dataEstruturaInicial }: PropsType) => {

  
  return (
    <EstruturaInicialReportStyle>
      
      {dataEstruturaInicial.map((data: DataEstruturaInicialProps) => {
        return (
          <div key={data.id} data-output="estrutura-inicial">
            <h3>Registro - {data.estruturaInicialIdNumRegistro}</h3>
            <TextField
              variant="standard"
              fullWidth
              id="estruturaInicialIdNumRegistro"
              label="Identificação do Número do Registro"
              name="estruturaInicialIdNumRegistro"
              value={data.estruturaInicialIdNumRegistro}
              disabled
            />

            <TextField
              fullWidth
              select
              variant="standard"
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="estruturaInicialNivelControleInterno"
              name="estruturaInicialNivelControleInterno"
              value={data.estruturaInicialNivelControleInterno}
              label="Nível de Controle Interno"
              disabled
            >
              <MenuItem value={1}>1 – Unidade Central </MenuItem>
              <MenuItem value={2}>2 – Unidade Setorial</MenuItem>
            </TextField>

            <TextField
               variant="standard"
              fullWidth
              id="estruturaInicialQuantidadeTotalServidores"
              label="Quantidade Total de Servidores na Estrutura
  da Unidade de Controle Interno"
              name="estruturaInicialQuantidadeTotalServidores"
              value={data.estruturaInicialQuantidadeTotalServidores}
              disabled
            />

            <TextField
               variant="standard"
              fullWidth
              id="estruturaInicialQuantidadeServidoresEfetivos"
              label="Quantidade de Servidores Efetivos (do Ente)
  na Estrutura da Unidade de Controle Interno"
              name="estruturaInicialQuantidadeServidoresEfetivos"
              value={data.estruturaInicialQuantidadeServidoresEfetivos}
              disabled
            />
            <TextField
               variant="standard"
              fullWidth
              id="estruturaInicialQuantidadeContadores"
              label="Quantidade de Servidores com formação em
  Ciências Contábeis na Estrutura da Unidade
  de Controle Interno"
              name="estruturaInicialQuantidadeContadores"
              value={data.estruturaInicialQuantidadeContadores}
              disabled
            />

            <TextField
             variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="estruturaInicialNormaInternaGestaoOrcamentaria"
              name="estruturaInicialNormaInternaGestaoOrcamentaria"
              value={data.estruturaInicialNormaInternaGestaoOrcamentaria}
              label="Normas internas estabelecendo procedimentos Orçamentária
    para avaliação da Gestão"
              disabled
            >
              <MenuItem value={1}>1 - Existem somente os normativos</MenuItem>
              <MenuItem value={2}>
                2 - Existem normativos e fluxos desenhados
              </MenuItem>
              <MenuItem value={3}>
                3 - Existem normativos, fluxos e são de amplo conhecimento de
                toda a administração
              </MenuItem>
              <MenuItem value={4}>
                4 - Não existem normas internas definidas no âmbito desta
                temática
              </MenuItem>
            </TextField>

            <TextField
             variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="estruturaInicialNormaInternaGestaoFinanceira"
              name="estruturaInicialNormaInternaGestaoFinanceira"
              value={data.estruturaInicialNormaInternaGestaoFinanceira}
              label="Normas internas estabelecendo procedimentos para avaliação da Gestão Financeira"
              disabled
            >
              <MenuItem value={1}>1 - Existem somente os normativos</MenuItem>
              <MenuItem value={2}>
                2 - Existem normativos e fluxos desenhados
              </MenuItem>
              <MenuItem value={3}>
                3 - Existem normativos, fluxos e são de amplo conhecimento de
                toda a administração
              </MenuItem>
              <MenuItem value={4}>
                4 - Não existem normas internas definidas no âmbito desta
                temática
              </MenuItem>
            </TextField>

            <TextField
             variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="estruturaInicialNormaInternaGestaoPatrimonial"
              name="estruturaInicialNormaInternaGestaoPatrimonial"
              value={data.estruturaInicialNormaInternaGestaoPatrimonial}
              label="Normas internas estabelecendo procedimentos para avaliação da Gestão Patrimonial"
              disabled
            >
              <MenuItem value={1}>1 - Existem somente os normativos</MenuItem>
              <MenuItem value={2}>
                2 - Existem normativos e fluxos desenhados
              </MenuItem>
              <MenuItem value={3}>
                3 - Existem normativos, fluxos e são de amplo conhecimento de
                toda a administração
              </MenuItem>
              <MenuItem value={4}>
                4 - Não existem normas internas definidas no âmbito desta
                temática
              </MenuItem>
            </TextField>

            <TextField
             variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="estruturaInicialNormaInternaGestaoFiscal"
              name="estruturaInicialNormaInternaGestaoFiscal"
              value={data.estruturaInicialNormaInternaGestaoFiscal}
              label="Normas internas estabelecendo procedimentos para avaliação da Gestão Fiscal"
              disabled
            >
              <MenuItem value={1}>1 - Existem somente os normativos</MenuItem>
              <MenuItem value={2}>
                2 - Existem normativos e fluxos desenhados
              </MenuItem>
              <MenuItem value={3}>
                3 - Existem normativos, fluxos e são de amplo conhecimento de
                toda a administração
              </MenuItem>
              <MenuItem value={4}>
                4 - Não existem normas internas definidas no âmbito desta
                temática
              </MenuItem>
            </TextField>

            <TextField
             variant="standard"
              fullWidth
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              id="estruturaInicialNormaInternaDemContabeis"
              name="estruturaInicialNormaInternaDemContabeis"
              value={data.estruturaInicialNormaInternaDemContabeis}
              label="Normas internas estabelecendo procedimentos para avaliação da conformidade da política e escrituração contábil, e elaboração das Demonstrações Contábeis"
              disabled
            >
              <MenuItem value={1}>1 - Existem somente os normativos</MenuItem>
              <MenuItem value={2}>
                2 - Existem normativos e fluxos desenhados
              </MenuItem>
              <MenuItem value={3}>
                3 - Existem normativos, fluxos e são de amplo conhecimento de
                toda a administração
              </MenuItem>
              <MenuItem value={4}>
                4 - Não existem normas internas definidas no âmbito desta
                temática
              </MenuItem>
            </TextField>
          </div>
        )
      })}
    </EstruturaInicialReportStyle>
  )
}
