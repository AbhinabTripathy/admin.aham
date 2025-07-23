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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/A Astro Logor.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const CreatorLogin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    mobileNo: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Attempting login with data:", formData);
      const response = await axios.post(
        "https://api.ahamcore.com/api/creators/login",
        formData
      );
      console.log("Login response:", response.data);

      // Check if we have data and token in the nested structure
      if (response.data.data && response.data.data.token) {
        // Store the token from the nested data object
        const token = response.data.data.token;
        
        // Clear any existing auth data
        localStorage.removeItem('creatorToken');
        localStorage.removeItem('creatorAuth');
        localStorage.removeItem('creatorUser');
        
        // Store new auth data
        localStorage.setItem('creatorToken', token);
        localStorage.setItem('creatorAuth', 'true');
        
        // Store user data if available
        if (response.data.data.user) {
          localStorage.setItem('creatorUser', JSON.stringify(response.data.data.user));
        }
        
        // Log auth data storage
        console.log('Auth data stored successfully:', {
          token: {
            length: token.length,
            preview: `${token.substring(0, 10)}...${token.substring(token.length - 10)}`
          },
          auth: localStorage.getItem('creatorAuth'),
          user: localStorage.getItem('creatorUser'),
          timestamp: new Date().toISOString()
        });

        toast.success("Login successful!");
        
        // Navigate to creator dashboard
        console.log('Navigating to creator dashboard...');
        setTimeout(() => {
          navigate("/creator-dashboard");
        }, 1000);
      } else {
        console.error('Login Error: Invalid response structure', response.data);
        toast.error("Login failed: Invalid server response");
      }
    } catch (error) {
      console.error("Login Error:", {
        message: error.message,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        }
      });
      
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
            Creator Login
          </Typography>
          <FormContainer component="form" onSubmit={handleSubmit}>
            {error && (
              <Typography 
                color="error" 
                variant="body2" 
                sx={{ 
                  mb: 2, 
                  textAlign: 'center',
                  backgroundColor: '#ffebee',
                  padding: '8px',
                  borderRadius: '4px',
                }}
              >
                {error}
              </Typography>
            )}
            <StyledTextField
              required
              fullWidth
              id="mobileNo"
              label="Mobile Number"
              name="mobileNo"
              autoComplete="tel"
              autoFocus
              value={formData.mobileNo}
              onChange={handleChange}
              type="tel"
              inputProps={{
                pattern: "[0-9]*",
                maxLength: 10,
              }}
              placeholder="Enter 10 digit mobile number"
              error={!!error}
              disabled={loading}
            />
            <StyledTextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!error}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
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
                transition: 'all 0.3s ease-in-out',
                opacity: loading ? 0.7 : 1,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  background: 'rgba(255, 255, 255, 0.1)',
                  animation: loading ? 'pulse 1.5s infinite' : 'none',
                },
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.7 },
                  '100%': { opacity: 1 },
                },
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
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
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
              }}
            >
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/creator-signup" 
                  variant="body2"
                >
                  Register here
                </Link>
              </Typography>
            </Box>
          </FormContainer>
        </StyledPaper>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Box>
  );
};

export default CreatorLogin; 