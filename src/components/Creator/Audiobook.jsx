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
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';

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

const IconUploadBox = styled(Box)(({ theme }) => ({
  width: { xs: 60, sm: 80 },
  height: { xs: 60, sm: 80 },
  border: '2px dashed',
  borderColor: theme.palette.primary.main,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
  '&:hover': {
    borderColor: theme.palette.primary.dark,
    backgroundColor: theme.palette.action.hover,
  },
}));

const IconPreview = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

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

const AnimatedButton = motion(Button);

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
  const [audiobookIcon, setAudiobookIcon] = useState(null);
  const [audiobookIconPreview, setAudiobookIconPreview] = useState('');
  const [audiobookCreated, setAudiobookCreated] = useState(false);
  const [audiobookId, setAudiobookId] = useState(null);
  const [audiobookData, setAudiobookData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEpisodeToggle = (episodeNumber) => {
    setEpisodes(episodes.map(ep => ({
      ...ep,
      open: ep.number === episodeNumber ? !ep.open : false
    })));
  };

  const handleAudiobookIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudiobookIcon(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudiobookIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  const handlePostAudiobook = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title for the Audiobook');
      return;
    }
    if (!audiobookIcon) {
      toast.error('Please upload an icon for the Audiobook');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('creatorToken');
      if (!token) {
        toast.error('Authentication token not found. Please login again.');
        return;
      }
      const formData = new FormData();
      formData.append('title', title);
      formData.append('bookIcon', audiobookIcon);
      const finalToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      const response = await axios.post(
        'https://api.ahamcore.com/api/audiobooks',
        formData,
        {
          headers: {
            'Authorization': finalToken,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        }
      );
      const createdAudiobookId = response.data?.data?.audiobook?.id || response.data?.audiobook?.id || response.data?.id;
      if (createdAudiobookId) {
        setAudiobookId(createdAudiobookId);
        setAudiobookCreated(true);
        toast.success('Audiobook Created Successfully!');
        await fetchAudiobookData(createdAudiobookId);
      } else {
        throw new Error('No audiobook ID received from server');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create audiobook. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAudiobookData = async (id) => {
    try {
      const token = localStorage.getItem('creatorToken');
      if (!token) return;
      const finalToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      const response = await axios.get(
        `https://api.ahamcore.com/api/audiobooks/${id}`,
        {
          headers: {
            'Authorization': finalToken,
            'Accept': 'application/json'
          }
        }
      );
      const data = response.data?.data?.audiobook || response.data?.audiobook || response.data;
      setAudiobookData(data);
    } catch (error) {
      // Just log, don't block UI
      console.warn('Failed to fetch audiobook data', error);
    }
  };

  const handleCreate = async (episodeNumber) => {
    const file = selectedFiles[episodeNumber]?.icon;
    const youtubeUrl = youtubeUrls[episodeNumber];
    if (!file || !youtubeUrl || !isValidYoutubeUrl(youtubeUrl)) {
      toast.error('Please upload an icon and provide a valid YouTube URL');
      return;
    }
    if (!audiobookId) {
      toast.error('Audiobook ID not found. Please create the audiobook first.');
      return;
    }
    try {
      const token = localStorage.getItem('creatorToken');
      if (!token) {
        toast.error('Authentication token not found. Please login again.');
        return;
      }
      const finalToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      const formData = new FormData();
      formData.append('icon', file);
      formData.append('youtubeUrl', youtubeUrl);
      const response = await axios.post(
        `https://api.ahamcore.com/api/audiobooks/${audiobookId}/episodes`,
        formData,
        {
          headers: {
            'Authorization': finalToken,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        }
      );
      if (response.status === 200 || response.status === 201) {
        setEpisodes(episodes.map(ep => ({
          ...ep,
          open: false,
          uploaded: ep.number === episodeNumber ? true : ep.uploaded
        })));
        toast.success(`Episode ${episodeNumber} uploaded successfully`);
      } else {
        throw new Error(response.data?.message || 'Failed to upload episode');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload episode. Please try again.');
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
    setAudiobookIcon(null);
    setAudiobookIconPreview('');
    setSnackbarMessage('Form has been reset');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
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
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              width: '100%',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center'
            }}>
              <TextField
                label="Audiobook Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  flex: '10 1 0%',
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  },
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAudiobookIconUpload}
                style={{ display: 'none' }}
                id="audiobook-icon-upload"
              />
              <label htmlFor="audiobook-icon-upload">
                <AnimatedButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => {
                      document.getElementById('audiobook-icon-upload').click();
                    }}
                    sx={{
                      width: { xs: '100%', sm: '110px' },
                      minWidth: 0,
                      maxWidth: '110px',
                      fontSize: { xs: '0.80rem', sm: '0.85rem' },
                      height: '40px',
                      whiteSpace: 'nowrap',
                      padding: 0,
                    }}
                  >
                    {audiobookIcon ? 'Uploaded' : 'Upload'}
                  </Button>
                </AnimatedButton>
              </label>
              <AnimatedButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePostAudiobook}
                  disabled={loading}
                  startIcon={loading ? null : <SendIcon />}
                  sx={{
                    minWidth: { xs: '100%', sm: '160px' },
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    height: '100%',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {loading ? 'Creating...' : 'Create Audiobook Page'}
                </Button>
              </AnimatedButton>
            </Box>
          </IconUploadSection>
        </HeaderSection>

        {audiobookCreated && (
          <>
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
                        <TextField
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
                      </UploadButtonGroup>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        gap: 2,
                        flexDirection: { xs: 'column', sm: 'row' }
                      }}>
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
          </>
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