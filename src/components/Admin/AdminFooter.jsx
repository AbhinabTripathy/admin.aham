import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '0.875rem',
  },
}));

const AdminFooter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterText variant={isMobile ? 'caption' : 'body2'}>
        © {currentYear} Aham Core. All rights reserved.
      </FooterText>
    </FooterContainer>
  );
};

export default AdminFooter; 