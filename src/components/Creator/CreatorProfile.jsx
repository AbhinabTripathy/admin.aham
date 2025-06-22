import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookIcon from '@mui/icons-material/Book';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useNavigate } from 'react-router-dom';
import CreaterHeader from './CreaterHeader';
import CreaterFooter from './CreaterFooter';

const ProfileContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f4f6f8',
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(12),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(10),
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
  display: 'flex',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const ProfileSection = styled(Box)(({ theme }) => ({
  flex: '0 0 350px',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 auto',
  },
}));

const ActivitySection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const BackButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: 0,
  borderRadius: theme.spacing(1.5),
  background: 'white',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  fontSize: '2.5rem',
  marginBottom: theme.spacing(2),
  backgroundColor: '#4f46e5',
  [theme.breakpoints.down('sm')]: {
    width: 80,
    height: 80,
    fontSize: '2rem',
  },
}));

const StatusBadge = styled(Box)(({ theme, isActive }) => ({
  backgroundColor: isActive ? '#dcfce7' : '#fee2e2',
  color: isActive ? '#166534' : '#b91c1c',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: 500,
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    padding: '3px 10px',
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(79, 70, 229, 0.1)',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1),
  color: '#4f46e5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75),
  },
}));

const StatCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    gap: theme.spacing(1.5),
  },
}));

const StatIcon = styled(Box)(({ theme, color }) => ({
  backgroundColor: `${color}10`,
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: color,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const CreatorProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBack = () => {
    navigate('/creator-dashboard');
  };

  return (
    <ProfileContainer>
      <CreaterHeader />
      
      <ContentWrapper>
        <MainContent>
          <ProfileSection>
            <ProfileCard>
              <ProfileHeader>
                <StyledAvatar>J</StyledAvatar>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#111827' }}>
                  John Doe
                </Typography>
                <Typography sx={{ color: '#4f46e5', fontWeight: 500, mt: 1 }}>
                  Content Creator
                </Typography>
                <StatusBadge isActive={true}>
                  Active
                </StatusBadge>
              </ProfileHeader>

              <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Profile Information
                </Typography>

                <InfoItem>
                  <IconWrapper>
                    <PersonIcon />
                  </IconWrapper>
                  <Box>
                    <Typography color="#6b7280" variant="body2">
                      Username
                    </Typography>
                    <Typography sx={{ color: '#111827' }}>
                      John Doe
                    </Typography>
                  </Box>
                </InfoItem>

                <InfoItem>
                  <IconWrapper>
                    <EmailIcon />
                  </IconWrapper>
                  <Box>
                    <Typography color="#6b7280" variant="body2">
                      Email
                    </Typography>
                    <Typography sx={{ color: '#111827' }}>
                      john.doe@example.com
                    </Typography>
                  </Box>
                </InfoItem>

                <InfoItem>
                  <IconWrapper>
                    <PersonIcon />
                  </IconWrapper>
                  <Box>
                    <Typography color="#6b7280" variant="body2">
                      Role
                    </Typography>
                    <Typography sx={{ color: '#111827' }}>
                      Content Creator
                    </Typography>
                  </Box>
                </InfoItem>
              </Box>
            </ProfileCard>
          </ProfileSection>

          <ActivitySection>
            <Typography 
              variant="h6" 
              fontWeight="600" 
              mb={3}
              sx={{
                gridColumn: '1 / -1',
                fontSize: {
                  xs: '1.25rem',
                  sm: '1.5rem',
                },
              }}
            >
              Activity Overview
            </Typography>

            <StatCard>
              <StatIcon color="#1d4ed8">
                <ArticleIcon sx={{ 
                  fontSize: {
                    xs: '1.25rem',
                    sm: '1.5rem',
                  }
                }} />
              </StatIcon>
              <Box flex={1}>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  sx={{ 
                    color: '#111827',
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.5rem',
                    }
                  }}
                >
                  24
                </Typography>
                <Typography sx={{ 
                  color: '#4b5563', 
                  fontSize: {
                    xs: '0.875rem',
                    sm: '0.9rem',
                  }
                }}>
                  Content
                </Typography>
                <Typography sx={{ 
                  color: '#6b7280', 
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.8rem',
                  }
                }}>
                  Approved
                </Typography>
              </Box>
            </StatCard>

            <StatCard>
              <StatIcon color="#ea580c">
                <PendingIcon sx={{ 
                  fontSize: {
                    xs: '1.25rem',
                    sm: '1.5rem',
                  }
                }} />
              </StatIcon>
              <Box flex={1}>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  sx={{ 
                    color: '#111827',
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.5rem',
                    }
                  }}
                >
                  0
                </Typography>
                <Typography sx={{ 
                  color: '#4b5563', 
                  fontSize: {
                    xs: '0.875rem',
                    sm: '0.9rem',
                  }
                }}>
                  Content
                </Typography>
                <Typography sx={{ 
                  color: '#6b7280', 
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.8rem',
                  }
                }}>
                  Pending Review
                </Typography>
              </Box>
            </StatCard>

            <StatCard>
              <StatIcon color="#dc2626">
                <BlockIcon sx={{ 
                  fontSize: {
                    xs: '1.25rem',
                    sm: '1.5rem',
                  }
                }} />
              </StatIcon>
              <Box flex={1}>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  sx={{ 
                    color: '#111827',
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.5rem',
                    }
                  }}
                >
                  90
                </Typography>
                <Typography sx={{ 
                  color: '#4b5563', 
                  fontSize: {
                    xs: '0.875rem',
                    sm: '0.9rem',
                  }
                }}>
                  Content
                </Typography>
                <Typography sx={{ 
                  color: '#6b7280', 
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.8rem',
                  }
                }}>
                  Needs Revision
                </Typography>
              </Box>
            </StatCard>

            <StatCard>
              <StatIcon color="#7c3aed">
                <BookIcon sx={{ 
                  fontSize: {
                    xs: '1.25rem',
                    sm: '1.5rem',
                  }
                }} />
              </StatIcon>
              <Box flex={1}>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  sx={{ 
                    color: '#111827',
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.5rem',
                    }
                  }}
                >
                  8
                </Typography>
                <Typography sx={{ 
                  color: '#4b5563', 
                  fontSize: {
                    xs: '0.875rem',
                    sm: '0.9rem',
                  }
                }}>
                  Published
                </Typography>
                <Typography sx={{ 
                  color: '#6b7280', 
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.8rem',
                  }
                }}>
                  Graphic Novels
                </Typography>
              </Box>
            </StatCard>

            <StatCard>
              <StatIcon color="#ec4899">
                <HeadphonesIcon sx={{ 
                  fontSize: {
                    xs: '1.25rem',
                    sm: '1.5rem',
                  }
                }} />
              </StatIcon>
              <Box flex={1}>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  sx={{ 
                    color: '#111827',
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.5rem',
                    }
                  }}
                >
                  6
                </Typography>
                <Typography sx={{ 
                  color: '#4b5563', 
                  fontSize: {
                    xs: '0.875rem',
                    sm: '0.9rem',
                  }
                }}>
                  Published
                </Typography>
                <Typography sx={{ 
                  color: '#6b7280', 
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.8rem',
                  }
                }}>
                  Audio Books
                </Typography>
              </Box>
            </StatCard>
          </ActivitySection>
        </MainContent>
      </ContentWrapper>

      <CreaterFooter />
    </ProfileContainer>
  );
};

export default CreatorProfile; 