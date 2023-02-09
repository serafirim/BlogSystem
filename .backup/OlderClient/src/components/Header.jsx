import * as React from 'react'
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@mui/material'


import {useNavigate} from 'react-router-dom';
import {useAuth, useStory} from '../middleware/contextHooks'

// #region --------------( ICONS )--------------
import AccountCircle from '@mui/icons-material/AccountCircle'
import BookIcon from '@mui/icons-material/Book'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreIcon from '@mui/icons-material/MoreVert'
import PersonIcon from '@mui/icons-material/Person'
// #endregion

const authenticated = ['Blogs', 'Profile']

export const Header = (props) => {
    const {logoutUser} = useAuth()
    const {clearStories} = useStory()

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        handleMenuClose();
        logoutUser();
        navigate('/login');
        clearStories()
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => navigate('/blogs')}>
                <IconButton size="large" color="inherit">
                    <BookIcon />
                </IconButton>
                <p>Blogs</p>
            </MenuItem>
            <MenuItem onClick={() => navigate('/profile')}>
                <IconButton
                size="large"
                color="inherit"
                >
                    <PersonIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <IconButton
                size="large"
                color="inherit"
                >
                <LogoutIcon />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{color: 'white',  display: { xs: 'none', sm: 'block' } }}
                    >
                        Demo Blog
                    </Typography>
                
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {authenticated.map(page => (
                        <Button key={page} variant='text'
                        sx={{my: 2, display: 'block'}}
                        onClick={() => navigate(`/${page.toLowerCase()}`)}>
                            {page}
                        </Button>
                    ))}
                    
                    <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                    >
                    <MoreIcon />
                    </IconButton>
                </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
