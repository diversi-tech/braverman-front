import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './profile.css'
import Rtl from '../rtl/rtl';
// import { useLocation, useNavigate } from 'react-router-dom';

// const type = sessionStorage.getItem("userType")
const ProfileIcon: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
//const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserId: string, UserTypeId: string, UserTypeName: string, UserFirstName: string, UserLastName: string } } }) => state.user.currentUser);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log('User logged out');
        window.location.href = '../../login/Login.tsx';
    };

    return (

        <div id='imgprof'>
            <IconButton
                edge="end"
                color="inherit"
                // aria-label="account of current user"
                // aria-controls="menu-appbar"
                // aria-haspopup="true"
                onClick={handleMenu}
            >
                <AccountCircle sx={{ width: 40, height: 40 }} />
            </IconButton>
            <Menu
                className='prof'
                id="menu-appbar"
                anchorEl={anchorEl}
                // anchorOrigin={{
                //     vertical: 'top',
                //     horizontal: 'right',

                // }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
          
          <MenuItem onClick={handleClose} sx={{ textAlign: 'right',direction:'rtl' }} > 
                    <Typography variant="h6" style={{ fontFamily:'CustomFont',fontSize:'20px'}} >שם משתמש:  {sessionStorage.getItem("firstName")}</Typography> 
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ textAlign: 'right',direction:'rtl',fontFamily:'CustomFont' }}>
                    <Typography variant="h6"style={{ fontFamily:'CustomFont',fontSize:'20px'}} >אימייל: {sessionStorage.getItem("email")} </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ textAlign:'center',direction:'rtl',fontFamily:'CustomFont' }}>
                    <Typography variant="button" style={{ fontFamily:'CustomFont',fontSize:'20px', fontWeight:'700' }}>החלף משתמש</Typography>
                </MenuItem>
            </Menu></div>);
};
// const currentUserType = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);

// const navigate = useNavigate();
// const location = useLocation();



export default ProfileIcon;
