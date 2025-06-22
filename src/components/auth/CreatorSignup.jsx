import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
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
  width: '150px',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '120px',
    marginBottom: '15px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '140px',
    marginBottom: '20px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '180px',
    marginBottom: '25px',
  },
  transition: 'all 0.3s ease-in-out',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '450px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputBase-root': {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
}));

const CreatorSignup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Creator signup attempt:', formData);
  };

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
        <StyledPaper elevation={6}>
          <Logo src={logo} alt="Logo" />
          <Typography 
            component="h1" 
            variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h3'} 
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              mb: { xs: 2, sm: 3 },
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '2.5rem',
              },
            }}
          >
            Creator Signup
          </Typography>
          <FormContainer component="form" onSubmit={handleSubmit}>
            <StyledTextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <StyledTextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <StyledTextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <StyledTextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: { xs: 2, sm: 3 },
                mb: { xs: 2, sm: 3 },
                py: { xs: 1.5, sm: 2 },
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
                },
                fontSize: {
                  xs: '0.9rem',
                  sm: '1rem',
                  md: '1.1rem',
                },
                borderRadius: { xs: '8px', sm: '10px' },
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Sign Up
            </Button>
            <Box 
              sx={{ 
                textAlign: 'center', 
                mt: { xs: 1, sm: 2 },
                '& .MuiTypography-root': {
                  fontSize: {
                    xs: '0.875rem',
                    sm: '1rem',
                  },
                },
                '& .MuiLink-root': {
                  fontSize: {
                    xs: '0.875rem',
                    sm: '1rem',
                  },
                  fontWeight: 500,
                  ml: 0.5,
                },
              }}
            >
              <Typography variant="body2">
                Already have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/creator-login" 
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Login here
                </Link>
              </Typography>
            </Box>
          </FormContainer>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default CreatorSignup; 