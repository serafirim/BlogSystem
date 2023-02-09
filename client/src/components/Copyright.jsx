import React from 'react'
import { 
    Box,
    Container,
    Link,
    Paper,
    Typography
} from '@mui/material'

export default function Copyright() {
    return (
        <Paper sx={{
            marginTop: 'calc(10% + 60px)',
            width: '100%',
            position: 'fixed',
            bottom: 0,
        }} component="footer" square variant="outlined">
            <Container maxWidth="lg">
                <Box sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    display: "flex",
                    my: 1
                }}>
                    
                </Box>

                <Box>
                    <Typography variant="body2" color="primary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="https://github.com/serafirim" target="_blank">Lumière Labs</Link>{' '}
                        {new Date().getFullYear()}{'.'}
                    </Typography>
                </Box>
            </Container>
        </Paper>
    )
}
