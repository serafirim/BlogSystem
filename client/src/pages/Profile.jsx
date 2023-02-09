import {useState, useEffect} from 'react'
import {
    Box, 
    Button,
    Container,
    FormGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    Stack,
    Switch,
    TextField, 
} from '@mui/material'
import {toast} from 'react-toastify'
import {useAuth} from '../middleware/contextHooks'

//#region ---------------------- Components ----------------------
import MainContainer from '../components/MainContainer'
//#region ---------------------- Components ----------------------

// #region --------------( ICONS )--------------
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// #endregion

export default function Profile() {
    const {currentUser, getProfile, toasts, updateUser} = useAuth()
    const [profile, setProfile] = useState({})
    const [isDisabled, setIsDisabled] = useState(true);
    const [temp, setTemp] = useState(null)
    const [showCPassword, setShowCPassword] = useState(false)
    const [showNPassword, setShowNPassword] = useState(false)
    const [showCNPassword, setShowCNPassword] = useState(false)
    const [privateSwitchChecked, setPrivateSwitchChecked] = useState(false)

    useEffect(() => {
        if(!currentUser) {
            getProfile();
        }

        if(currentUser) {
            setProfile(currentUser)
            setPrivateSwitchChecked(currentUser.isPrivate)
        }

        if(toasts){
            Array.from(toasts).forEach(ele => {
                toast(ele.message, {
                    type: ele.type
                })
            })
            //clearErrors()
        }

    },[toasts, currentUser, getProfile])

    const handlePrivateSwitchChange = e => {
        setPrivateSwitchChecked(e.target.checked)
    }

    const handleDisabled = e => {
        setIsDisabled(false)
        setTemp(profile)
    }

    const handleCancel = e => {
        setIsDisabled(true)
        setProfile(temp)
        setTemp(null)
    }

    const handleUpdate = e => {
        setIsDisabled(true)
        updateUser(profile)
    }
        
    return (
        <MainContainer>
            <Container maxWidth="md" sx={{my: 3}}>
                <Stack spacing={2}>
                    {isDisabled
                        ?   <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button onClick={handleDisabled}>Edit</Button>
                            </Box>
                        : null
                    }
                    
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Basic Settings</FormLabel>
                        <FormGroup>
                            
                            <TextField
                                label="First Name" name='firstName'
                                value={profile.firstName} disabled={isDisabled}
                                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                            />
                            <TextField
                                label="Last Name" name='lastName'
                                value={profile.lastName} disabled={isDisabled}
                                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                            />
                            <TextField
                                label="Username" name='userName'
                                value={profile.userName} disabled={isDisabled}
                                onChange={(e) => setProfile({...profile, userName: e.target.value})}
                            />
                            <TextField
                                label="Email" name='email'
                                value={profile.email} disabled={isDisabled}
                                onChange={(e) => setProfile({...profile, email: e.target.value})}
                            />
                            <TextField
                                label="Profile Image" name='image'
                                value={profile.image} disabled={isDisabled}
                                onChange={(e) => setProfile({...profile, image: e.target.value})}
                            />
                        </FormGroup>

                        <FormLabel component="legend">Security Settings</FormLabel>
                        <FormGroup>
                            <TextField
                                    name='currentPassword' 
                                    placeholder='Enter your current password'
                                    label='Current Password'
                                    type={showCPassword ? 'text' : 'password'}
                                    value={profile.currentPassword} disabled={isDisabled}
                                    onChange={(e) => setProfile({...profile, currentPassword: e.target.value})}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end" onClick={() => setShowCPassword(!showCPassword)}>
                                            {!showCPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                        </InputAdornment>,
                                    }}
                                />
                            
                            <TextField
                                    name='newPassword' 
                                    placeholder='Enter a new password'
                                    label='New Password'
                                    type={showNPassword ? 'text' : 'password'}
                                    value={profile.newPassword} disabled={isDisabled}
                                    onChange={(e) => setProfile({...profile, newPassword: e.target.value})}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end" onClick={() => setShowNPassword(!showNPassword)}>
                                            {!showNPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                        </InputAdornment>,
                                    }}
                                />

                            <TextField
                                    name='confirmNewPassword' 
                                    placeholder='Confirm your new password'
                                    label='Confirm New Password'
                                    type={showCNPassword ? 'text' : 'password'}
                                    value={profile.confirmNewPassword} disabled={isDisabled}
                                    onChange={(e) => setProfile({...profile, confirmNewPassword: e.target.value})}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end" onClick={() => setShowCNPassword(!showCNPassword)}>
                                            {!showCNPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                        </InputAdornment>,
                                    }}
                                />
                        </FormGroup>
                            
                        <br />

                        <FormLabel component="legend">Under the Hood</FormLabel>
                        <FormGroup>
                            <Button
                                name='verifyaccount'
                            >
                                Verify Account
                            </Button>
                        </FormGroup>
                        
                        <br />

                        <FormLabel component="legend">Privacy Settings</FormLabel>
                        <FormGroup>
                            <FormControlLabel 
                                control={
                                    <Switch 
                                        checked={privateSwitchChecked}
                                        onChange={handlePrivateSwitchChange}
                                        disabled={isDisabled}                                        
                                        inputProps={{ 'aria-label': 'isPrivate' }} 
                                        name="isPrivate"
                                    ></Switch>
                                } 
                                value="top"
                                label="Make account private?" 
                                labelPlacement="start" />
                        </FormGroup>

                        <FormLabel component="legend">Danger Zone</FormLabel>
                        <FormGroup>
                            <Button
                                name='deleteaccount'
                                color='error'
                            >
                                Delete Account
                            </Button>
                        </FormGroup>
                    </FormControl>       

                    {!isDisabled
                        ?   <Stack spacing={2} direction='row'>
                                <Button onClick={handleUpdate}>Update</Button>
                                <Button onClick={handleCancel}>Cancel</Button>
                            </Stack>
                        : null
                    }
                    
                </Stack>
            </Container>
        </MainContainer>
    )
}
