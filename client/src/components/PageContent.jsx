// #region ---------------[ REQUIRED ]------------------------------------------------
import React from 'react'
import { 
  Box,
  Container,
  Link,
  Paper,
  Typography
 } from "@mui/material"
// #endregion ------------------------------------------------------------------------

export default function PageContent(props) {
  const pageIdSlug = props.page

  return (
      <Paper sx={{
        width: '100%',
      }} component="main" square variant="outlined">
        <Container maxWidth={false} disableGutters>
            <Box sx={{
                width: '100%',
                flexGrow: 1,
                justifyContent: "left",
                display: "flex",
                my: 1,
                border: "thin solid #000"
            }}>

                <Typography variant="body2" color="primary" align="center">   
                    Hello World
                </Typography>

            </Box>
        </Container>
      </Paper>
  )
}