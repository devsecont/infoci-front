import { Dialog } from "@mui/material";
import styled from "styled-components";

export const ConfirmDialogStyle = styled(Dialog) `

.MuiDialogTitle-root {
 font-size: 1.25rem;

 @media(max-width: 560px) {
  font-size: 1rem;
 }
}
	.MuiDialogActions-root {
    
    justify-content: space-around;

    button {
      background: var(--blue-500);
      color: white;
      font-size: 1rem;
      width: 6rem;

      &:hover {
        filter:brightness(0.8);
      }

    }
  }
`; 