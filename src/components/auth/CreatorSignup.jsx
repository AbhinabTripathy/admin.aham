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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import logo from '../../assets/A Astro Logor.png';

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
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({ password: false, confirm: false });
  const [errors, setErrors] = useState({});

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
      mobile: value => !value.match(/^[0-9]{10}$/) ? 'Mobile number must be 10 digits' : '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
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
    { name: 'mobile', label: 'Mobile Number', icon: <PhoneIcon /> },
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
              />
            ))}

            <StyledButton type="submit" fullWidth variant="contained">
              Sign Up
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
    </Box>
  );
};

export default CreatorSignup; 