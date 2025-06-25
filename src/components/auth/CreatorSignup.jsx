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
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import logo from '../../assets/A Astro Logor.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const commonStyles = {
  borderRadius: '12px',
  transition: 'all 0.3s ease-in-out',
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...commonStyles,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#f8fafc',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '450px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
  },
}));

const Logo = styled('img')({
  width: '120px',
  height: '120px',
  marginBottom: '24px',
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiInputBase-root': {
    ...commonStyles,
    backgroundColor: '#ffffff',
    height: '56px',
    padding: '0 14px',
    '&:hover, &.Mui-focused': {
      backgroundColor: '#ffffff',
      boxShadow: theme.shadows[1],
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 2px #2563eb',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#64748b',
    transform: 'translate(14px, 16px)',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)',
      backgroundColor: '#ffffff',
      padding: '0 4px',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2e8f0',
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: '#64748b',
    fontSize: '20px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  ...commonStyles,
  height: '50px',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
  },
}));

const CreatorSignup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({ password: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const validations = {
      username: value => !value.trim() || value.length < 3 ? 'Username must be at least 3 characters' : '',
      email: value => !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Invalid email format' : '',
      phoneNumber: value => !value.match(/^[0-9]{10}$/) ? 'Mobile number must be 10 digits' : '',
      password: value => !value || value.length < 6 ? 'Password must be at least 6 characters' : '',
      confirmPassword: value => value !== formData.password ? 'Passwords do not match' : '',
    };

    Object.keys(formData).forEach(key => {
      const error = validations[key](formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');
    console.log('Form Data:', formData);

    if (validateForm()) {
      console.log('Form validation passed');
      setLoading(true);
      try {
        console.log('Making API call to:', 'https://api.ahamcore.com/api/creators/register');
        console.log('Request payload:', {
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        });

        const response = await axios.post('https://api.ahamcore.com/api/creators/register', {
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        });

        console.log('API Response:', response);
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        // Store the token
        localStorage.setItem('creatorToken', response.data.token);
        console.log('Token stored in localStorage');
        
        // Show success message
        setSnackbarMessage('Creator Registered Successfully');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        console.log('Redirecting to dashboard in 1.5 seconds...');
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/creator-dashboard');
        }, 1500);

      } catch (error) {
        console.error('Registration Error:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        
        // Handle error response
        const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
        console.log('Showing error message:', errorMessage);
        
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
        console.log('Form submission completed');
      }
    } else {
      console.log('Form validation failed');
      console.log('Validation errors:', errors);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordEndAdornment = (field) => (
    <InputAdornment position="end">
      <IconButton onClick={() => togglePasswordVisibility(field)} edge="end" sx={{ mr: '-8px' }}>
        {showPassword[field] ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  );

  const inputFields = [
    { name: 'username', label: 'Username', icon: <PersonIcon />, autoFocus: true },
    { name: 'email', label: 'Email Address', icon: <EmailIcon /> },
    { name: 'phoneNumber', label: 'Mobile Number', icon: <PhoneIcon /> },
    { name: 'password', label: 'Password', icon: <LockIcon />, type: 'password', endAdornment: true },
    { name: 'confirmPassword', label: 'Confirm Password', icon: <LockIcon />, type: 'password', endAdornment: true },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      p: { xs: 2, sm: 3, md: 4 },
    }}>
      <Container maxWidth="sm">
        <StyledPaper elevation={0}>
          <Logo src={logo} alt="Logo" />
          <Typography variant="h4" sx={{ 
            textAlign: 'center',
            fontWeight: 600,
            color: '#1e293b',
            mb: 4,
            fontSize: { xs: '1.75rem', sm: '2rem' },
          }}>
            Creator Registration
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', maxWidth: 400 }}>
            {inputFields.map(field => (
              <StyledTextField
                key={field.name}
                required
                fullWidth
                id={field.name}
                name={field.name}
                label={field.label}
                type={field.type && !showPassword[field.name] ? field.type : 'text'}
                value={formData[field.name]}
                onChange={handleChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
                autoFocus={field.autoFocus}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{field.icon}</InputAdornment>,
                  endAdornment: field.endAdornment && getPasswordEndAdornment(field.name),
                }}
                disabled={loading}
              />
            ))}

            <StyledButton 
              type="submit" 
              fullWidth 
              variant="contained"
              disabled={loading}
              sx={{
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
              {loading ? 'Signing Up...' : 'Sign Up'}
            </StyledButton>

            <Typography variant="body2" align="center" sx={{ color: '#64748b' }}>
              Already have an account?{' '}
              <Link component={RouterLink} to="/creator-login" sx={{ 
                color: '#2563eb',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </StyledPaper>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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

export default CreatorSignup; 