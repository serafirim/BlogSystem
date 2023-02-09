import { styled } from "@mui/material/styles"
import { 
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  Typography,
 } from "@mui/material"

 import Image from 'mui-image'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  borderRadius: '0%',
}))

export const About = (props) => {
  return (
    <section id="about">
        <h1>Loading About section...</h1>
    </section>
  )
}