import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/A Astro Logor.png';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  boxShadow: '0 4px 12px 0 rgba(31, 38, 135, 0.37)',
  zIndex: theme.zIndex.drawer + 1,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.25, 0),
  },
}));

const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& img': {
    height: '40px',
    transition: 'all 0.3s ease',
    [theme.breakpoints.down('sm')]: {
      height: '30px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      height: '35px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '40px',
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  padding: theme.spacing(0.5, 2),
  minHeight: '56px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.25, 1),
    minHeight: '48px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    padding: theme.spacing(0.5, 1.5),
    minHeight: '52px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0.5, 2),
    minHeight: '56px',
  },
}));

const UserSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  width: 32,
  height: 32,
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    width: 28,
    height: 28,
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('lg')]: {
    width: 32,
    height: 32,
    fontSize: '1rem',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  gap: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  margin: theme.spacing(0.5),
  transition: 'all 0.2s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '1.1rem',
  },
  '& .MuiTypography-root': {
    fontSize: '0.9rem',
  },
}));

const AdminHeader = ({ onMenuClick }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
    handleMenuClose();
  };

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={onMenuClick}
              sx={{ padding: 0.5 }}
            >
              <MenuIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          )}
          <LogoContainer>
            <img src={logo} alt="Aham Logo" />
            <Typography
              variant={isMobile ? 'subtitle2' : isTablet ? 'subtitle1' : 'h6'}
              sx={{
                ml: { xs: 0.5, sm: 1 },
                fontWeight: 600,
                color: 'white',
                display: { xs: 'none', sm: 'block' },
                fontSize: {
                  sm: '0.9rem',
                  md: '1.1rem',
                  lg: '1.2rem',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Admin Dashboard
            </Typography>
          </LogoContainer>
        </Box>

        <UserSection>
          <Tooltip title="Account Settings">
            <StyledAvatar onClick={handleMenuOpen}>A</StyledAvatar>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                borderRadius: '8px',
                minWidth: { xs: '120px', sm: '140px', md: '160px' },
                overflow: 'hidden',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: isMobile ? 12 : 14,
                  width: 8,
                  height: 8,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <StyledMenuItem
              onClick={handleMenuClose}
              sx={{
                '&:hover': { background: 'rgba(42, 82, 152, 0.1)' },
              }}
            >
              <AccountCircleIcon />
              <Typography>Profile</Typography>
            </StyledMenuItem>
            <StyledMenuItem
              onClick={handleLogout}
              sx={{
                color: theme.palette.error.main,
                '&:hover': { background: 'rgba(211, 47, 47, 0.1)' },
              }}
            >
              <LogoutIcon />
              <Typography>Logout</Typography>
            </StyledMenuItem>
          </Menu>
        </UserSection>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default AdminHeader; 