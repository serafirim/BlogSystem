import React from 'react'
import { Container, Link, Typography } from '@mui/material'
import { palette } from '@mui/system'

export const Copyright = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                position: 'fixed',
                bottom: 0,
                paddingBottom: '10px',
                backgroundColor: '#003554',
                paddingTop: '10px',
                width: '100%',
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '100%'
            }}
        >
            <Typography variant="body2" color="text.light">
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/serafirim" target="_blank">
                    Lumière Labs
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Container>
    )
}
