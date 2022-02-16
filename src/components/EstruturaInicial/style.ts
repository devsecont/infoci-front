import styled from 'styled-components'

export const EstruturaInicialStyle = styled.form`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  legend {
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.5rem 0;

    @media (max-width: 720px) {
      font-size: 1rem;
    }
  }

  div[data-header='header-form'] {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div[data-input='input-options'] {
      display: flex;
      align-items: center;
      gap: 2rem;

      .MuiFormControl-root {
        width: 220px;
      }

      .MuiIconButton-root {
        padding: 0px;
        svg {
          font-size: 1.75rem;
          color: var(--blue-500);

          &:hover {
            filter: brightness(0.8);
          }
        }
      }
    }

    div[data-button='save'] {
      text-align: right;

      .MuiButton-root {
        background: var(--blue-500);
        width: 100px;

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }

  div[data-button='right'] {
    text-align: end;

    .MuiIconButton-root {
      padding: 0px;
      svg {
        font-size: 3.5rem;
        color: var(--blue-500);

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }
`
