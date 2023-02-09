import {useState, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Typography,
    Paper
} from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'

// #startregion ---------------[ COMPONENTS ]-------------------------------------------
import { Copyright } from '../components/Copyright'
import { Header } from '../components/Header'
import { MainContainer } from '../components/MainContainer';
// #endregion --------------------------------------------------------------------------

 const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))


export default function HomeOnePage() {
    return (
        <>
            <MainContainer page="TestPage" />
        </>
    )
}