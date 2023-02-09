import {useState, useEffect} from 'react'
import MainContainer from '../components/MainContainer';
//import { styled } from '@mui/material/styles'
import { useParams } from 'react-router-dom';
import {
    Avatar,
    Button,
    Container, 
    Grid,
    Typography,
} from '@mui/material';
//import {toast} from 'react-toastify';


// #region -----------( ICONS )-------------

// #endregion -----------( ICONS )-------------

export default function PublicProfile() {
    // Get the userName from the :id get value
    const { id } = useParams()

    // setting the state variable
    const [ user, setUser ] = useState([])
    const [ userFound, setUserFound ] = useState(false)

    // ------------------[ Functions ]-----------------------------------------------
    const fetchUser = async () => {
        // Get response from api
        const response = await fetch(`/api/v1/user/public/${id}`)

        if (response.status === 404) {
            setUser([{ "image": "default.png", "userName": "unknown" }])
        } else {
            // Set data as the response from the API
            const data = await response.json()
            
            // update the state
            setUser(data)
            setUserFound(true)
        }
    }

    const userTitleTag = () => {
        var firstName, lastName
        
        if (user.firstName == null) firstName = "Bobby"
        if (user.lastName == null) lastName = "Tables"
        
        return firstName+" "+lastName
    }
    // --------------------------------------------------------------------------------

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <MainContainer>
            <Container maxWidth='md' sx={{mt: 3, mb: 5}}>
                {userFound && 
                   <Grid container spacing={12}>
                        <Grid item xs={10}>
                            <Avatar alt={user.userName} src={"/users/"+user.image} sx={{
                                width: 125,
                                height: 125
                            }} />                              
                        </Grid>    
                        <Grid item xs={1}>
                            <Button>Follow</Button>
                        </Grid>                          
                    </Grid>
                }   
                
                {userFound &&
                    <Grid container spacing={12}>
                        <Grid item xs="auto">
                            <Typography variant='h4'></Typography>
                        </Grid>
                    </Grid>
                }

                {userFound &&
                    <Grid container spacing={12}>
                        <Grid item xs="auto">
                            <Typography variant='p'>@{user.userName}</Typography>
                        </Grid>
                    </Grid>
                }

                {!userFound && 
                    <Grid container spacing={12}>
                        <Grid item xs={12} >
                            <Typography variant='h2' textAlign='center'>User not found</Typography>
                        </Grid>
                    </Grid>

                }
            </Container>
        </MainContainer>
    )
}