import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Header from "../Header";
import Footer from "../Footer";
import { createTheme } from "@mui/material/styles";
const theme = createTheme();

function Navbar() {
  return (
    <>
      <CssBaseline />
      <Header />

      <Container
        maxWidth="100%"
        sx={{
          mx: "auto",
          width: "100%",
          [theme.breakpoints.up("xs")]: {
            px: 0,
          },
        }}>
        <main></main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
}

export default Navbar;
