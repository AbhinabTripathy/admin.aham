import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Grid,
  Container,
  Divider,
  Paper,
  Stack,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BannerSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: '#ffffff',
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const BannerSlot = styled(Card)(({ theme, isActive }) => ({
  height: 160,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: isActive ? '2px solid #4CAF50' : '2px dashed #1e3c72',
  backgroundColor: isActive ? 'rgba(76, 175, 80, 0.05)' : 'rgba(30, 60, 114, 0.05)',
  '&:hover': {
    backgroundColor: isActive ? 'rgba(76, 175, 80, 0.1)' : 'rgba(30, 60, 114, 0.1)',
  },
  [theme.breakpoints.up('sm')]: {
    height: 180,
  },
  [theme.breakpoints.up('md')]: {
    height: 200,
  },
}));

const BannerImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& .overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'flex', // Always show overlay on mobile
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  },
  '&:hover .overlay': {
    display: 'flex',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: '#1e3c72',
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  fontSize: '1.25rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(2.5),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: 100,
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 2),
  [theme.breakpoints.up('sm')]: {
    minWidth: 120,
    padding: theme.spacing(1, 3),
  },
}));

const ResponsiveIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1),
  },
}));

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(2),
  color: '#1e3c72',
  fontWeight: 700,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.75rem',
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
    marginBottom: theme.spacing(4),
  },
}));

const PostBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [homeBanners, setHomeBanners] = useState(Array(5).fill(null));
  const [mallBanners, setMallBanners] = useState(Array(5).fill(null));
  const [activeHomeBanner, setActiveHomeBanner] = useState(null);
  const [activeMallBanner, setActiveMallBanner] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleBannerUpload = (section, index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (section === 'home') {
            const newBanners = [...homeBanners];
            newBanners[index] = event.target.result;
            setHomeBanners(newBanners);
          } else {
            const newBanners = [...mallBanners];
            newBanners[index] = event.target.result;
            setMallBanners(newBanners);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleBannerDelete = (section, index) => {
    if (section === 'home') {
      const newBanners = [...homeBanners];
      newBanners[index] = null;
      setHomeBanners(newBanners);
      if (activeHomeBanner === index) setActiveHomeBanner(null);
    } else {
      const newBanners = [...mallBanners];
      newBanners[index] = null;
      setMallBanners(newBanners);
      if (activeMallBanner === index) setActiveMallBanner(null);
    }
  };

  const handleBannerClick = (section, index) => {
    if (section === 'home') {
      if (homeBanners[index]) {
        setActiveHomeBanner(activeHomeBanner === index ? null : index);
      }
    } else {
      if (mallBanners[index]) {
        setActiveMallBanner(activeMallBanner === index ? null : index);
      }
    }
  };

  const handlePostBanner = (section) => {
    const hasActiveBanner = section === 'home' 
      ? activeHomeBanner !== null 
      : activeMallBanner !== null;

    if (hasActiveBanner) {
      setSnackbarMessage(`${section.charAt(0).toUpperCase() + section.slice(1)} Banner Posted Successfully!`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage('Please select a banner to post');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
    }
  };

  const handleCancel = (section) => {
    if (section === 'home') {
      setHomeBanners(Array(5).fill(null));
      setActiveHomeBanner(null);
    } else {
      setMallBanners(Array(5).fill(null));
      setActiveMallBanner(null);
    }
    setSnackbarMessage('All banners have been reset');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
  };

  const renderBannerSlot = (section, banner, index) => {
    const isActive = section === 'home' 
      ? activeHomeBanner === index 
      : activeMallBanner === index;

    if (banner) {
      return (
        <BannerSlot isActive={isActive} onClick={() => handleBannerClick(section, index)}>
          <BannerImage>
            <img src={banner} alt={`${section} Banner ${index + 1}`} />
            <Box className="overlay">
              <ResponsiveIconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBannerUpload(section, index);
                }}
                sx={{ color: '#fff' }}
              >
                <EditIcon sx={{ fontSize: isMobile ? 20 : 24 }} />
              </ResponsiveIconButton>
              <ResponsiveIconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBannerDelete(section, index);
                }}
                sx={{ color: '#fff' }}
              >
                <DeleteIcon sx={{ fontSize: isMobile ? 20 : 24 }} />
              </ResponsiveIconButton>
              {isActive && (
                <ResponsiveIconButton sx={{ color: '#4CAF50' }}>
                  <CheckCircleIcon sx={{ fontSize: isMobile ? 20 : 24 }} />
                </ResponsiveIconButton>
              )}
            </Box>
          </BannerImage>
        </BannerSlot>
      );
    }

    return (
      <BannerSlot isActive={false} onClick={() => handleBannerUpload(section, index)}>
        <AddPhotoAlternateIcon 
          sx={{ 
            fontSize: isMobile ? 32 : isTablet ? 36 : 40, 
            color: '#1e3c72', 
            mb: 1 
          }} 
        />
        <Typography 
          variant="body2" 
          color="textSecondary"
          sx={{ 
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            textAlign: 'center',
            px: 1
          }}
        >
          Upload Banner {index + 1}
        </Typography>
      </BannerSlot>
    );
  };

  return (
    <ResponsiveContainer maxWidth="lg">
      <PageTitle variant="h4">
        Banner Management
      </PageTitle>

      <BannerSection>
        <SectionTitle variant="h5">
          Banner for Home
        </SectionTitle>
        <Grid container spacing={isMobile ? 1.5 : 3}>
          {homeBanners.map((banner, index) => (
            <Grid 
              item 
              xs={6} 
              sm={6} 
              md={4} 
              key={`home-${index}`}
              sx={{ mb: isMobile ? 1 : 0 }}
            >
              {renderBannerSlot('home', banner, index)}
            </Grid>
          ))}
        </Grid>
        <Stack 
          direction={isMobile ? 'column' : 'row'} 
          spacing={isMobile ? 1.5 : 2} 
          justifyContent="flex-end" 
          mt={isMobile ? 2 : 3}
          sx={{ width: isMobile ? '100%' : 'auto' }}
        >
          <ActionButton
            variant="outlined"
            color="error"
            onClick={() => handleCancel('home')}
            fullWidth={isMobile}
          >
            Cancel
          </ActionButton>
          <ActionButton
            variant="contained"
            sx={{ 
              bgcolor: '#1e3c72', 
              '&:hover': { bgcolor: '#15294f' },
              width: isMobile ? '100%' : 'auto'
            }}
            onClick={() => handlePostBanner('home')}
          >
            Post Banner
          </ActionButton>
        </Stack>
      </BannerSection>

      <BannerSection>
        <SectionTitle variant="h5">
          Banner for Mall
        </SectionTitle>
        <Grid container spacing={isMobile ? 1.5 : 3}>
          {mallBanners.map((banner, index) => (
            <Grid 
              item 
              xs={6} 
              sm={6} 
              md={4} 
              key={`mall-${index}`}
              sx={{ mb: isMobile ? 1 : 0 }}
            >
              {renderBannerSlot('mall', banner, index)}
            </Grid>
          ))}
        </Grid>
        <Stack 
          direction={isMobile ? 'column' : 'row'} 
          spacing={isMobile ? 1.5 : 2} 
          justifyContent="flex-end" 
          mt={isMobile ? 2 : 3}
          sx={{ width: isMobile ? '100%' : 'auto' }}
        >
          <ActionButton
            variant="outlined"
            color="error"
            onClick={() => handleCancel('mall')}
            fullWidth={isMobile}
          >
            Cancel
          </ActionButton>
          <ActionButton
            variant="contained"
            sx={{ 
              bgcolor: '#1e3c72', 
              '&:hover': { bgcolor: '#15294f' },
              width: isMobile ? '100%' : 'auto'
            }}
            onClick={() => handlePostBanner('mall')}
          >
            Post Banner
          </ActionButton>
        </Stack>
      </BannerSection>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ 
          vertical: isMobile ? 'bottom' : 'top', 
          horizontal: 'center' 
        }}
        sx={{
          bottom: isMobile ? '16px !important' : 'auto',
        }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ 
            width: '100%',
            fontSize: isMobile ? '0.875rem' : '1rem'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ResponsiveContainer>
  );
};

export default PostBanner; 