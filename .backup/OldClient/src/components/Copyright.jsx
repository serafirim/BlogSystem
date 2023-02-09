import React from 'react'
import { Link, Typography } from '@mui/material'

export default function Copyright() {
    return (
        <Typography variant="body2" color="primary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/serafirim" target="_blank">Lumière Labs</Link>{' '}
            {new Date().getFullYear()}{'.'}
        </Typography>
    )
}
