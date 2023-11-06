import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './style.css';

interface ModalProps{
    texto: string,
    video: string
}

export default function ModalExplicacaoCampo({ texto, video }:  ModalProps) {

    const [loadError, setLoadError] = useState(false);
    const TesteYoutube = async () =>{
        try{
            const request = await fetch(
                "https://www.youtube.com/",
                {
                  mode: "no-cors"
                }
              ).then( r=>
                console.log("Carregado")
              )
        } catch {
          console.log("Bloqueado")
        }
    }
    return (
        <React.Fragment>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{pt: '0rem', textAlign: 'center'}}>INFORMAÇÃO SOBRE PREENCHIMENTO</Typography>
                <Typography id="modal-modal-texto-ajuda" sx={{pt: '1rem', pb: '2rem', pl: "1rem", textAlign: 'justify'}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quaerat mollitia ipsam quasi, vitae debitis aperiam. Labore, nihil beatae molestiae dolorum aliquam, cumque nulla nemo facere est, voluptatibus temporibus harum aspernatur laborum nesciunt non laboriosam quod corporis eveniet ipsam porro.
                </Typography>
                <Box sx={{width: '100%', height: 'max-contet', display: loadError? 'none': 'flex',pl: '1rem', justifyContent: 'left'}}>
                    <iframe className="iframeVideo" onLoad={() => TesteYoutube()} width="98%" height="500" src={video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>
                </Box>
                <Box sx={{display: loadError? 'block': 'none'}}>
                    "Percebemos que você não tem acesso ao YouTube. Para visualizar o vídeo entre em contato com sua equipe de TI e solicite acesso"
                </Box>
                <Typography sx={{textAlign: 'center', pt: '1rem'}}>Caso a dúvida persista, entre em contato com a CHAC pelo nosso grupo do whatsapp.</Typography>
        </React.Fragment>
    );
}