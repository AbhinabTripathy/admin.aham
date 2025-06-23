import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Container,
  Avatar,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';

// Styled components with enhanced responsiveness
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  }
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(0, 1),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: '4px',
    '&:hover': {
      background: theme.palette.primary.dark
    }
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 'calc(100vh - 300px)'
  }
}));

const TableHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#1e3c72',
  color: '#fff',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  padding: theme.spacing(2),
  fontSize: '1rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5),
    fontSize: '0.875rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    fontSize: '0.75rem',
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  fontSize: '0.875rem',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5),
    fontSize: '0.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    fontSize: '0.75rem',
  }
}));

const ContentCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(2.5),
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  fontSize: '1.2rem',
  backgroundColor: '#1e3c72',
  [theme.breakpoints.down('md')]: {
    width: 35,
    height: 35,
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    width: 32,
    height: 32,
    fontSize: '0.9rem',
  }
}));

const SubscribedUsers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Format phone number to Indian format
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const last10Digits = cleaned.slice(-10);
    return `+91 ${last10Digits}`;
  };

  // Sample data - replace with actual data from your backend
  const subscribedUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '9876543210',
      membershipPrice: '₹499',
      paymentMethod: 'Credit Card',
      subscribedDate: '2024-03-15',
      expiryDate: '2025-03-15'
    },
    // Add more sample data as needed
  ];

  const TableView = () => (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>User Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Phone Number</TableHeader>
            <TableHeader>Membership Price</TableHeader>
            <TableHeader>Payment Method</TableHeader>
            <TableHeader>Subscribed Date</TableHeader>
            <TableHeader>Expiry Date</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribedUsers.map((user) => (
            <TableRow 
              key={user.id} 
              hover
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <StyledTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <StyledAvatar>{user.name.charAt(0)}</StyledAvatar>
                  {user.name}
                </Box>
              </StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{formatPhoneNumber(user.phoneNumber)}</StyledTableCell>
              <StyledTableCell>{user.membershipPrice}</StyledTableCell>
              <StyledTableCell>{user.paymentMethod}</StyledTableCell>
              <StyledTableCell>{user.subscribedDate}</StyledTableCell>
              <StyledTableCell>{user.expiryDate}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );

  const CardView = () => (
    <Box sx={{ mt: { xs: 2, sm: 3 } }}>
      {subscribedUsers.map((user) => (
        <ContentCard key={user.id}>
          <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <StyledAvatar>{user.name.charAt(0)}</StyledAvatar>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}
                >
                  {user.name}
                </Typography>
              </Box>

              <Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    mb: 0.5 
                  }}
                >
                  Email
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '0.95rem' }
                  }}
                >
                  {user.email}
                </Typography>
              </Box>

              <Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    mb: 0.5 
                  }}
                >
                  Phone
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '0.95rem' }
                  }}
                >
                  {formatPhoneNumber(user.phoneNumber)}
                </Typography>
              </Box>

              <Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    mb: 0.5 
                  }}
                >
                  Membership Price
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '0.95rem' }
                  }}
                >
                  {user.membershipPrice}
                </Typography>
              </Box>

              <Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    mb: 0.5 
                  }}
                >
                  Payment Method
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '0.95rem' }
                  }}
                >
                  {user.paymentMethod}
                </Typography>
              </Box>

              <Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    mb: 0.5 
                  }}
                >
                  Subscription Period
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '0.95rem' }
                  }}
                >
                  {user.subscribedDate} - {user.expiryDate}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </ContentCard>
      ))}
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <StyledPaper>
        <HeaderSection>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, sm: 2 },
            width: '100%'
          }}>
            <PeopleIcon sx={{ 
              fontSize: { 
                xs: 28, 
                sm: 32, 
                md: 36, 
                lg: 40 
              }, 
              color: '#1e3c72' 
            }} />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 600,
                fontSize: { 
                  xs: '1.5rem', 
                  sm: '1.75rem', 
                  md: '2rem', 
                  lg: '2.25rem' 
                },
                color: '#1e3c72'
              }}
            >
              Subscribed Users
            </Typography>
          </Box>
        </HeaderSection>

        {isMobile ? <CardView /> : <TableView />}
      </StyledPaper>
    </Container>
  );
};

export default SubscribedUsers; 