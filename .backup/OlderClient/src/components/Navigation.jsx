import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import { 
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogTitle,
  Divider,
  Drawer,
  Fab,
  FormGroup,
  FormControlLabel,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Menu,
  Switch,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import { PropTypes } from 'prop-types'

// Hooks
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {useNavigate} from 'react-router-dom';
import {useAuth, useStory} from '../middleware/contextHooks'

// #region --------------( ICONS )--------------
import AccountCircle from '@mui/icons-material/AccountCircle'
import AdbIcon from '@mui/icons-material/Adb'
import AddIcon from '@mui/icons-material/Add'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom';
// #endregion -------------------------------------------------------------

// Settings
const drawerWidth = 240
const pages = ['Home', 'About', 'Blog']
const settings = ['Account', 'Dashboard', 'Profile', 'Logout']
const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

// Functions
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 5 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


// Main
export const Navigation = (props) => {
  // Functions
  const {logoutUser} = useAuth()
  const {clearStories} = useStory()

  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const { window } = props
  const [mobileOpen, setMobileOpen ] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  }

  const handleSearchToggle = () => {
    alert('WIP: Search...pardon the dust.')
  }

  const handleThreeDotsToggle = () => {
    alert('WIP: Do not know what to do with this yet.')
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const handleLogout = () => {
    handleMenuClose();
    logoutUser();
    navigate('/');
    clearStories()
  }
  // ---------------------------------------------------------------------------

  // Defines
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', paddingLeft: '10px' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MSS
      </Typography>
      <Divider />
      <List>
        {pages.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  // -- Search Box
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }))
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }))
  // ---------------------------------------------------------------------------

  return (
      <>
        <ElevationScroll {...props}>
          <AppBar component="nav" position="sticky" color="inherit" elevation={1}>
            <Toolbar>
              <IconButton
                size="large"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              <AdbIcon sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                align='left'
                sx={{
                  mr: 2,
                  display: { xs: 'flex', sm: 'none', md: 'none' },
                  flexGrow: 0,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                MSS
              </Typography>

              <AdbIcon sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                align='left'
                sx={{
                  mr: 2,
                  display: { xs: 'none', sm: 'flex', md: 'flex' },
                  flexGrow: 0,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                MSS
              </Typography>
              
              <Box sx={{ flexGrow: 30, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    variant="inline"
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', margin: '5px' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Starter" src="images/avatar/2.png" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>


              <Box component="nav">
                <Drawer
                  container={container}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                >
                  {drawer}
                </Drawer>
              </Box>
            
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </>
  )
}