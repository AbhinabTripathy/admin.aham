import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: '10px',
    margin: theme.spacing(2),
  },
}));

const Logo = styled('img')(({ theme }) => ({
  width: '150px',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '120px',
    marginBottom: '15px',
  },
  [theme.breakpoints.up('md')]: {
    width: '180px',
    marginBottom: '25px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '200px',
    marginBottom: '30px',
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '450px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

const AdminLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    if (isAuthenticated) {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    console.log('Login attempt started for username:', formData.username);

    try {
      // Make POST request to authenticate admin
      console.log('Making API request to /api/admin/login');
      const response = await axios.post('/api/admin/login', {
        username: formData.username,
        password: formData.password,
      });

      console.log('API Response received:', response);
      const data = response.data;
      console.log('Response data:', data);

      if (response.status === 200 && data.success && data.data && data.data.token) {
        console.log('Login successful, token received:', data.data.token);
        
        // Store the token
        localStorage.setItem('adminToken', data.data.token);
        console.log('Token stored in localStorage');
        
        // Store admin auth status
        localStorage.setItem('adminAuth', 'true');
        console.log('Admin auth status stored in localStorage');
        
        // Add user info if needed
        localStorage.setItem('adminUser', JSON.stringify({
          username: formData.username,
          role: 'admin',
          adminData: data.data.admin
        }));
        console.log('User info stored in localStorage');
        
        // Show success toast
        console.log('Showing success toast');
        toast.success('Admin login successful!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Redirect to admin dashboard after a short delay
        console.log('Redirecting to admin dashboard in 1.5 seconds');
        setTimeout(() => {
          console.log('Executing redirect to /admin-dashboard');
          navigate('/admin-dashboard');
        }, 1500);
      } else {
        console.log('Login failed - Invalid response or no token');
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login error occurred:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      console.log('Login process completed, setting loading to false');
      setIsLoading(false);
    }
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
          width: '100%',
          mx: 'auto',
          px: {
            xs: 1,
            sm: 2,
            md: 3,
          },
        }}
      >
        <StyledPaper 
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: {
              xs: '100%',
              sm: '450px',
              md: '500px',
            },
            mx: 'auto',
          }}
        >
          <Logo src={logo} alt="Logo" />
          <Typography 
            component="h1" 
            variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h4'} 
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: { xs: 2, sm: 3 },
              fontWeight: 'bold',
            }}
          >
            Admin Login
          </Typography>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 2,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              {error}
            </Alert>
          )}
          <FormContainer component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              sx={{
                mb: { xs: 1.5, sm: 2 },
                '& .MuiInputBase-root': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              sx={{
                mb: { xs: 2, sm: 3 },
                '& .MuiInputBase-root': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: { xs: 2, sm: 3 },
                mb: { xs: 2, sm: 3 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
                },
                borderRadius: { xs: '8px', sm: '10px' },
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </FormContainer>
        </StyledPaper>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default AdminLogin; 