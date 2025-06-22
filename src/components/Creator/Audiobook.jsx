import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Collapse,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';

const MAX_EPISODES = 15;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

const TitleSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
  },
}));

const IconUploadSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}));

const EpisodeAccordion = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const EpisodeHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const EpisodeContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const UploadButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}));

const UploadButton = styled(Button)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  borderRadius: '8px',
  border: `2px dashed ${theme.palette.primary.main}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  textTransform: 'none',
  minHeight: '120px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    minHeight: '100px',
    '& .MuiSvgIcon-root': {
      fontSize: '32px',
    },
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
    },
  },
}));

const YouTubeUrlField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      padding: theme.spacing(1.5),
    },
  },
  '& .MuiInputLabel-root': {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const BottomActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}));

const Audiobook = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [title, setTitle] = useState('');
  const [episodes, setEpisodes] = useState([{ number: 1, open: false }]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [youtubeUrls, setYoutubeUrls] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleEpisodeToggle = (episodeNumber) => {
    setEpisodes(episodes.map(ep => ({
      ...ep,
      open: ep.number === episodeNumber ? !ep.open : false
    })));
  };

  const handleIconUpload = (episodeNumber, event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFiles(prev => ({
        ...prev,
        [episodeNumber]: { ...prev[episodeNumber], icon: file }
      }));
    }
  };

  const handleYoutubeUrlChange = (episodeNumber, url) => {
    setYoutubeUrls(prev => ({
      ...prev,
      [episodeNumber]: url
    }));
  };

  const isValidYoutubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleCreate = (episodeNumber) => {
    const file = selectedFiles[episodeNumber]?.icon;
    const youtubeUrl = youtubeUrls[episodeNumber];

    if (file && youtubeUrl && isValidYoutubeUrl(youtubeUrl)) {
      setEpisodes(episodes.map(ep => ({
        ...ep,
        open: false,
        uploaded: ep.number === episodeNumber ? true : ep.uploaded
      })));
      setSnackbarMessage(`Episode ${episodeNumber} Uploaded Successfully`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage('Please upload an icon and provide a valid YouTube URL');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleAddEpisode = () => {
    if (episodes.length < MAX_EPISODES) {
      const newEpisodeNumber = episodes.length + 1;
      setEpisodes([...episodes, { number: newEpisodeNumber, open: false }]);
    }
  };

  const handleCancel = () => {
    // Reset all form data
    setTitle('');
    setEpisodes([{ number: 1, open: false }]);
    setSelectedFiles({});
    setYoutubeUrls({});
    setSnackbarMessage('Form has been reset');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
  };

  const handlePostAudiobook = () => {
    // Validate if title and at least one episode is uploaded
    if (!title.trim()) {
      setSnackbarMessage('Please enter a title for the Audiobook');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const hasUploadedEpisodes = episodes.some(ep => 
      selectedFiles[ep.number]?.icon && 
      youtubeUrls[ep.number] && 
      isValidYoutubeUrl(youtubeUrls[ep.number])
    );

    if (!hasUploadedEpisodes) {
      setSnackbarMessage('Please upload at least one episode with valid YouTube URL');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Show success message and redirect
    setSnackbarMessage('Audiobook Created Successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);

    // Redirect after a short delay
    setTimeout(() => {
      navigate('/creator-dashboard/pending');
    }, 1500);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
      <StyledPaper>
        <HeaderSection>
          <TitleSection>
            <HeadphonesIcon sx={{ 
              fontSize: { xs: 32, sm: 36, md: 40 },
              color: 'primary.main'
            }} />
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h1" 
              sx={{ 
                fontWeight: 600,
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.25rem',
                }
              }}
            >
              Create an Audiobook
            </Typography>
          </TitleSection>

          <IconUploadSection>
            <TextField
              fullWidth
              label="Audiobook Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                },
              }}
            />
          </IconUploadSection>
        </HeaderSection>

        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          sx={{ 
            mb: { xs: 1.5, sm: 2 },
            fontWeight: 600
          }}
        >
          Content
        </Typography>

        <Stack spacing={isMobile ? 1.5 : 2}>
          {episodes.map((episode) => (
            <EpisodeAccordion key={episode.number}>
              <EpisodeHeader onClick={() => handleEpisodeToggle(episode.number)}>
                <Typography 
                  variant={isMobile ? "body1" : "subtitle1"} 
                  sx={{ fontWeight: 500 }}
                >
                  Episode {episode.number}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {episode.uploaded && (
                    <CheckCircleIcon 
                      color="success" 
                      sx={{ fontSize: isMobile ? 20 : 24 }}
                    />
                  )}
                  {episode.open ? (
                    <KeyboardArrowUpIcon sx={{ fontSize: isMobile ? 20 : 24 }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ fontSize: isMobile ? 20 : 24 }} />
                  )}
                </Box>
              </EpisodeHeader>

              <Collapse in={episode.open}>
                <EpisodeContent>
                  <UploadButtonGroup>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleIconUpload(episode.number, e)}
                      style={{ display: 'none' }}
                      id={`icon-upload-${episode.number}`}
                    />
                    <label htmlFor={`icon-upload-${episode.number}`} style={{ flex: 1 }}>
                      <UploadButton component="span">
                        <CloudUploadIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
                        <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                          {selectedFiles[episode.number]?.icon?.name || 'Upload Episode Icon'}
                        </Typography>
                      </UploadButton>
                    </label>

                    <Box sx={{ 
                      flex: 1, 
                      display: 'flex', 
                      alignItems: 'stretch',
                      width: '100%'
                    }}>
                      <YouTubeUrlField
                        fullWidth
                        label="YouTube URL"
                        variant="outlined"
                        value={youtubeUrls[episode.number] || ''}
                        onChange={(e) => handleYoutubeUrlChange(episode.number, e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <YouTubeIcon sx={{ 
                              color: 'error.main', 
                              mr: 1,
                              fontSize: { xs: 20, sm: 24 }
                            }} />
                          ),
                        }}
                        error={youtubeUrls[episode.number] && !isValidYoutubeUrl(youtubeUrls[episode.number])}
                        helperText={youtubeUrls[episode.number] && !isValidYoutubeUrl(youtubeUrls[episode.number]) ? 'Please enter a valid YouTube URL' : ''}
                      />
                    </Box>
                  </UploadButtonGroup>

                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}>
                    <ActionButton
                      variant="outlined"
                      onClick={() => handleEpisodeToggle(episode.number)}
                      fullWidth={isMobile}
                    >
                      Cancel
                    </ActionButton>
                    <ActionButton
                      variant="contained"
                      onClick={() => handleCreate(episode.number)}
                      fullWidth={isMobile}
                    >
                      Create
                    </ActionButton>
                  </Box>
                </EpisodeContent>
              </Collapse>
            </EpisodeAccordion>
          ))}
        </Stack>

        {episodes.length < MAX_EPISODES && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: { xs: 1.5, sm: 2 }
          }}>
            <IconButton
              onClick={handleAddEpisode}
              sx={{
                color: 'primary.main',
                '&:hover': { color: 'primary.dark' },
                '& .MuiSvgIcon-root': {
                  fontSize: { xs: 32, sm: 40 }
                }
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </Box>
        )}

        <BottomActionButtons>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancel}
            fullWidth={isMobile}
            sx={{
              py: { xs: 1, sm: 1.5 },
              px: { xs: 2, sm: 4 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostAudiobook}
            fullWidth={isMobile}
            sx={{
              py: { xs: 1, sm: 1.5 },
              px: { xs: 2, sm: 4 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Post Audiobook
          </Button>
        </BottomActionButtons>
      </StyledPaper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isMobile ? 'center' : 'right'
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ 
            width: '100%',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Audiobook; 