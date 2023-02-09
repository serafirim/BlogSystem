import { styled } from "@mui/material/styles"
import { 
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Toolbar,
  Typography,
 } from "@mui/material"

 import Image from 'mui-image'

// Icons
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
// ---------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  borderRadius: '0%',
}))

export const Digital = (props) => {
  return (
    <Grid container spacing={1} sx={{  }}>
        <Grid item xs={12}>
            <Item>
                <Grid container spacing={1} sx={{  }} >
                
                    <Grid item xs={2} sx={{ 
                        backgroundColor: 'transparent',
                        display: { xs: 'none', md: 'flex', lg: 'flex' }
                        }}>
                        <item>
                            
                        </item>
                    </Grid>
                    <Grid item xs={8}>
                        <item>
                            <Grid container spacing={1} sx={{ marginTop: '200px' }}>
                                <Grid item xs={6} sx={{
                                display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' }
                                }}>
                                    <Typography variant="h1" gutterBottom sx={{
                                        fontFamily: "Segoe UI",
                                        fontWeight: 800
                                    }}>
                                        MSS &gt; WP
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        MSS stands for MERN Stack Starter and is a boilerplate starter pack for creating NodeJS apps using a MERN Stack strategy with emphasis on becoming the "Wordpress Killer".
                                    </Typography>
                                    <Link variant="h4" href="/more" sx={{
                                        textDecoration: 'none',

                                    }}>
                                        Read More
                                    </Link>
                                    </Grid>

                                    <Grid item xs={6} sx={{  }}>
                                    <Typography variant="h6" gutterBottom>
                                        
                                    </Typography>
                                    <Typography variant="h3" gutterBottom>
                                        
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sx={{
                                display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' }
                                }}>
                                    <Typography variant="h1" gutterBottom sx={{
                                        fontFamily: "Segoe UI",
                                        fontWeight: 800
                                    }}>
                                        MSS &gt; WP
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        MSS stands for MERN Stack Starter and is a boilerplate starter pack for creating NodeJS apps using a MERN Stack strategy with emphasis on becoming the "Wordpress Killer".
                                    </Typography>
                                    <Link variant="h4" href="/more" sx={{
                                        textDecoration: 'none',

                                    }}>
                                        Read More
                                    </Link>
                                    </Grid>

                                    <Grid item xs={6} sx={{  }}>
                                    <Typography variant="h6" gutterBottom>
                                        
                                    </Typography>
                                    <Typography variant="h3" gutterBottom>
                                        
                                    </Typography>
                                </Grid>

                            </Grid>
                        </item>

                        <item>
                        <Grid container spacing={1} sx={{  }}>
                            <Grid item xs={6} sx={{  }}>
                            <Typography variant="h6" gutterBottom>
                                
                            </Typography>
                            <Typography variant="h3" gutterBottom>
                                
                            </Typography>
                            </Grid>

                            <Grid item xs={6} sx={{  }}>
                            <Typography variant="h6" gutterBottom>
                                
                            </Typography>
                            <Typography variant="h3" gutterBottom>
                                
                            </Typography>
                            </Grid>

                        </Grid>
                        </item>
                    </Grid>
                    <Grid item xs={2} sx={{ 
                        backgroundColor: 'transparent',
                        display: { xs: 'none', md: 'flex', lg: 'flex' }
                        }}>
                        <item>
                        
                        </item>
                    </Grid>

                </Grid>
            </Item>
        </Grid>
    </Grid>
  )
}