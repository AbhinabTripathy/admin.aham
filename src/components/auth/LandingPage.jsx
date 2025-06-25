import React from 'react';
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CreateIcon from '@mui/icons-material/Create';
import logo from '../../assets/A Astro Logor.png';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  width: '100%',
  maxWidth: '500px',
  margin: 'auto',
  transform: 'translateY(0)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.45)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: '10px',
    margin: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));

const Logo = styled('img')(({ theme }) => ({
  width: '200px',
  marginBottom: '30px',
  animation: 'float 3s ease-in-out infinite',
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    marginBottom: '20px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '180px',
    marginBottom: '25px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '220px',
    marginBottom: '35px',
  },
  transition: 'width 0.3s ease-in-out',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  width: '200px',
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  '&:hover': {
    background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '180px',
    padding: theme.spacing(1.2),
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    width: '220px',
    padding: theme.spacing(1.8),
    fontSize: '1.1rem',
  },
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: 'inherit',
    transition: 'transform 0.3s ease-in-out',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.3rem',
    },
  },
  '&:hover .MuiSvgIcon-root': {
    transform: 'rotate(15deg)',
  },
}));

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        padding: {
          xs: theme.spacing(2),
          sm: theme.spacing(3),
          md: theme.spacing(4),
        },
        overflow: 'hidden',
      }}
    >
      <Container 
        maxWidth="sm"
        sx={{
          px: {
            xs: 1,
            sm: 2,
            md: 3,
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Zoom in={true} timeout={800}>
          <StyledPaper elevation={6}>
            <Logo src={logo} alt="Logo" />
            <Fade in={true} timeout={1200}>
              <Typography 
                component="h1" 
                variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h3'} 
                gutterBottom 
                align="center"
                sx={{
                  fontWeight: 'bold',
                  mb: { xs: 1, sm: 2 },
                  fontSize: {
                    xs: '1.5rem',
                    sm: '2rem',
                    md: '2.5rem',
                  },
                  background: 'linear-gradient(45deg, #1e3c72, #2a5298)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Welcome to Aham
              </Typography>
            </Fade>
            <Fade in={true} timeout={1500}>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'} 
                gutterBottom 
                align="center" 
                sx={{ 
                  mb: { xs: 3, sm: 4 },
                  color: 'text.secondary',
                  fontSize: {
                    xs: '1rem',
                    sm: '1.1rem',
                    md: '1.25rem',
                  },
                }}
              >
                Choose your Login Type
              </Typography>
            </Fade>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%',
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Fade in={true} timeout={1800}>
                <StyledButton
                  variant="contained"
                  onClick={() => navigate('/creator-login')}
                  startIcon={<CreateIcon />}
                >
                  Creator Login
                </StyledButton>
              </Fade>
              <Fade in={true} timeout={2100}>
                <StyledButton
                  variant="contained"
                  onClick={() => navigate('/admin-login')}
                  startIcon={<AdminPanelSettingsIcon />}
                >
                  Admin Login
                </StyledButton>
              </Fade>
            </Box>
          </StyledPaper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default LandingPage; 