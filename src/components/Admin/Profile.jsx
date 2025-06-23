import React from 'react';
import { Grid, Paper, Box, Typography, Avatar, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaRegNewspaper,
  FaUsers,
  FaFileAlt,
  FaTimesCircle,
  FaBook,
  FaHeadphones,
  FaStore,
  FaShoppingCart,
  FaUserFriends
} from 'react-icons/fa';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}));

const StatCard = ({ icon: Icon, title, value, color }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <StyledPaper>
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            backgroundColor: `${color}15`,
            borderRadius: '8px',
            padding: isMobile ? '8px' : '12px',
            marginRight: isMobile ? '12px' : '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: isMobile ? '40px' : '48px'
          }}
        >
          <Icon size={isMobile ? 20 : isTablet ? 24 : 28} color={color} />
        </Box>
        <Box>
          <Typography 
            variant={isMobile ? "h5" : isTablet ? "h4" : "h4"} 
            sx={{ 
              fontWeight: 'bold', 
              color: '#111827',
              fontSize: {
                xs: '1.5rem',
                sm: '1.75rem',
                md: '2rem'
              }
            }}
          >
            {value}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#4b5563',
              fontSize: {
                xs: '0.875rem',
                sm: '0.9rem',
                md: '1rem'
              }
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </StyledPaper>
  );
};

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const stats = [
    { icon: FaRegNewspaper, title: 'Posts Approved', value: '250', color: '#1d4ed8' },
    { icon: FaUsers, title: 'Members Creator', value: '120', color: '#15803d' },
    { icon: FaFileAlt, title: 'Posts Pending Approvals', value: '45', color: '#ea580c' },
    { icon: FaTimesCircle, title: 'Rejects Post Rejected', value: '30', color: '#dc2626' },
    { icon: FaBook, title: 'Books Novels', value: '180', color: '#6366f1' },
    { icon: FaHeadphones, title: 'Books Audio Books', value: '95', color: '#7c3aed' },
    { icon: FaStore, title: 'Items Mall Products', value: '320', color: '#0891b2' },
    { icon: FaShoppingCart, title: 'Products Total Products', value: '450', color: '#0d9488' },
    { icon: FaFileAlt, title: 'Orders Total Orders', value: '680', color: '#4f46e5' },
    { icon: FaUserFriends, title: 'Users Subscribed Users', value: '890', color: '#7e22ce' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <AdminHeader />
      
      <Box sx={{ 
        pt: { xs: '64px', sm: '70px', md: '80px' }, 
        px: { xs: 2, sm: 2.5, md: 3 }, 
        pb: { xs: 2, sm: 2.5, md: 3 }
      }}>
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {/* Profile Info Card */}
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <Avatar
                  sx={{
                    width: { xs: 80, sm: 90, md: 100 },
                    height: { xs: 80, sm: 90, md: 100 },
                    bgcolor: '#4f46e5',
                    fontSize: { xs: '32px', sm: '36px', md: '40px' },
                    mb: { xs: 1.5, sm: 2 }
                  }}
                >
                  A
                </Avatar>
                <Typography 
                  variant={isMobile ? "h5" : "h4"} 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#111827', 
                    mb: 1,
                    fontSize: {
                      xs: '1.5rem',
                      sm: '1.75rem',
                      md: '2rem'
                    }
                  }}
                >
                  Aham Core
                </Typography>
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"} 
                  sx={{ 
                    color: '#4f46e5', 
                    mb: { xs: 2, sm: 2.5, md: 3 },
                    fontSize: {
                      xs: '1rem',
                      sm: '1.1rem',
                      md: '1.25rem'
                    }
                  }}
                >
                  Admin
                </Typography>

                <Box sx={{ width: '100%' }}>
                  {[
                    { icon: FaUser, label: 'Username', value: 'Aham Core' },
                    { icon: FaEnvelope, label: 'Email', value: 'admin@ahamcore.com' },
                    { icon: FaUserTag, label: 'Role', value: 'Admin' }
                  ].map((item, index) => (
                    <Box 
                      key={index} 
                      display="flex" 
                      alignItems="center" 
                      gap={{ xs: 1.5, sm: 2 }} 
                      mb={index < 2 ? { xs: 1.5, sm: 2 } : 0}
                    >
                      <Box sx={{ 
                        bgcolor: 'rgba(79, 70, 229, 0.1)', 
                        p: { xs: 0.75, sm: 1 }, 
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: { xs: '32px', sm: '40px' }
                      }}>
                        <item.icon color="#4f46e5" size={isMobile ? 16 : 20} />
                      </Box>
                      <Box textAlign="left">
                        <Typography 
                          variant="body2" 
                          color="textSecondary"
                          sx={{ 
                            fontSize: {
                              xs: '0.75rem',
                              sm: '0.875rem'
                            }
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography 
                          variant="body1"
                          sx={{ 
                            fontSize: {
                              xs: '0.875rem',
                              sm: '1rem'
                            }
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </StyledPaper>
          </Grid>

          {/* Stats Grid */}
          <Grid item xs={12} md={8}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              sx={{ 
                fontWeight: 'bold', 
                color: '#111827', 
                mb: { xs: 2, sm: 2.5, md: 3 },
                fontSize: {
                  xs: '1.5rem',
                  sm: '1.75rem',
                  md: '2rem'
                }
              }}
            >
              Activity Overview
            </Typography>
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <StatCard {...stat} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <AdminFooter />
    </Box>
  );
};

export default Profile; 