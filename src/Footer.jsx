import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import fback from "./assets/fback.png"

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
       <Link href="/review">
        <img className='w-13 -my-9 ml-2' src={fback} alt="Feedback" />
      </Link>
      {'Copyright © '}
      <Link color="inherit" href="">
        Healthcare AB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer({title, description}) {

  return (
    <Box component="footer" sx={{ bgcolor: '#A3B8CB', py: 6 , position: "sticky"}}>
      <Container maxWidth="lg">
        
        <Copyright/>

      </Container>
    </Box>
  );
}
