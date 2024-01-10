import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
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
        
        <Copyright />

      </Container>
    </Box>
  );
}
