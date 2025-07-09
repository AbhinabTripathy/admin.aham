import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
  Button,
  Paper,
  // Grid,
  useTheme,
  useMediaQuery,
  Collapse,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
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
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  },
}));

const TitleSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
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
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}));

const PreviewIcon = styled('img')(({ theme }) => ({
  width: '60px',
  height: '60px',
  objectFit: 'cover',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    width: '48px',
    height: '48px',
  },
}));

const IconUploadButton = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down('sm')]: {
    width: '48px',
    height: '48px',
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

const NovelIconUpload = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px',
  },
}));

const PreviewImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '6px',
}));

const AnimatedButton = styled(motion.div)(({ theme }) => ({
  display: 'inline-flex',
  '& .MuiButton-root': {
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 600,
    gap: theme.spacing(1),
    padding: theme.spacing(1.5, 2.5),
    minWidth: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: theme.spacing(1, 2),
    },
  },
}));

const GraphicNovel = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [title, setTitle] = useState('');
  const [episodes, setEpisodes] = useState([{ number: 1, open: false }]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [novelIcon, setNovelIcon] = useState(null);
  const [novelIconPreview, setNovelIconPreview] = useState(null);
  const [novelCreated, setNovelCreated] = useState(false);
  const [novelId, setNovelId] = useState(null);
  const [novelData, setNovelData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handlePdfUpload = (episodeNumber, event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFiles(prev => ({
        ...prev,
        [episodeNumber]: { ...prev[episodeNumber], pdf: file }
      }));
    }
  };

  const handleNovelIconUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      toast.error('No file selected');
      return;
    }

    if (file.type.startsWith('image/')) {
      setNovelIcon(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setNovelIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      toast.success(`Image uploaded: ${file.name}`);
    } else {
      toast.error('Please select a valid image file for the thumbnail');
    }
  };

  const handleCreate = async (episodeNumber) => {
    const files = selectedFiles[episodeNumber];
    if (!files?.icon || !files?.pdf) {
      toast.error('Please upload both icon and PDF files');
      return;
    }
    if (!novelId) {
      toast.error('Novel ID not found. Please create the novel first.');
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
      formData.append('icon', files.icon);
      formData.append('pdf', files.pdf);
      const response = await axios.post(
        `https://api.ahamcore.com/api/graphic-novels/${novelId}/episodes`,
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
    setTitle('');
    setEpisodes([{ number: 1, open: false }]);
    setSelectedFiles({});
    setNovelIcon(null);
    setNovelIconPreview(null);
    setSnackbarMessage('Form has been reset');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
  };

  const handlePostGraphicNovel = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title for the Graphic Novel');
      return;
    }

    if (!novelIcon) {
      toast.error('Please upload a Graphic Novel cover image');
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
      formData.append('title', title.trim());
      formData.append('thumbnail', novelIcon, 'novel-icon-' + Date.now() + '.jpeg');

      const finalToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

      const response = await axios.post(
        'https://api.ahamcore.com/api/graphic-novels',
        formData,
        {
          headers: {
            'Authorization': finalToken,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        }
      );

      if (response.status === 401) {
        toast.error('Authentication failed: Your session has expired. Please login again.');
        setTimeout(() => {
          window.location.href = '/creator-login';
        }, 2000);
        return;
      }

      if (response.status === 200 || response.status === 201) {
        const createdNovelId = response.data?.id || response.data?.graphicNovel?.id;
        
        if (createdNovelId) {
          setNovelId(createdNovelId);
          setNovelCreated(true);
          toast.success('Graphic Novel Created Successfully!');
          
          // Fetch the created novel data to confirm the novelIcon path
          await fetchNovelData(createdNovelId);
        } else {
          console.error('No novel ID found in response:', response.data);
          throw new Error('No novel ID received from server');
        }
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }

    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      let errorMessage;
      if (error.response?.status === 401) {
        errorMessage = 'Your session has expired. Please login again.';
        setTimeout(() => {
          window.location.href = '/creator-login';
        }, 2000);
      } else {
        errorMessage = error.response?.data?.message || 'Failed to create graphic novel. Please try again.';
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchNovelData = async (id) => {
    try {
      const token = localStorage.getItem('creatorToken');
      if (!token) {
        return;
      }

      const finalToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

      const response = await axios.get(
        `https://api.ahamcore.com/api/graphic-novels/${id}`,
        {
          headers: {
            'Authorization': finalToken,
            'Accept': 'application/json'
          }
        }
      );

      const novelData = response.data?.data?.graphicNovel || 
                       response.data?.graphicNovel || 
                       response.data;

      setNovelData(novelData);

    } catch (error) {
      // Don't show error toast for fetch failure, just log it
      // The content section will still show even if fetch fails
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
      <StyledPaper>
        <HeaderSection>
          <TitleSection>
            <MenuBookIcon sx={{ 
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
              Create a Graphic Novel
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
                label="Graphic Novel Title"
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
                onChange={handleNovelIconUpload}
                style={{ display: 'none' }}
                id="novel-icon-upload"
              />
              <label htmlFor="novel-icon-upload">
                <AnimatedButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    startIcon={novelIcon ? <CheckCircleIcon /> : <AddPhotoAlternateIcon />}
                    onClick={(e) => {
                      e.preventDefault();
                      const fileInput = document.getElementById('novel-icon-upload');
                      if (fileInput) {
                        fileInput.click();
                      } else {
                        toast.error('Upload functionality not available');
                      }
                    }}
                    sx={{
                      width: { xs: '100%', sm: '110px' },
                      minWidth: 0,
                      maxWidth: '110px',
                      fontSize: { xs: '0.80rem', sm: '0.85rem' },
                      height: '40px',
                      whiteSpace: 'nowrap',
                      padding: 0,
                      backgroundColor: novelIcon ? 'success.light' : 'transparent',
                      color: novelIcon ? 'success.contrastText' : 'primary.main',
                      '&:hover': {
                        backgroundColor: novelIcon ? 'success.main' : 'primary.light',
                      }
                    }}
                  >
                    {novelIcon ? 'Uploaded' : 'Upload Novel Thumbnail'}
                  </Button>
                </AnimatedButton>
              </label>

              {/* Show preview of uploaded image */}
              {novelIconPreview && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  ml: 1
                }}>
                  <img 
                    src={novelIconPreview} 
                    alt="Preview" 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      objectFit: 'cover', 
                      borderRadius: '4px',
                      border: '1px solid #ddd'
                    }} 
                  />
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 500 }}>
                    {novelIcon?.name}
                  </Typography>
                </Box>
              )}

              <AnimatedButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePostGraphicNovel}
                  disabled={loading}
                  startIcon={loading ? null : <SendIcon />}
                  sx={{
                    minWidth: { xs: '100%', sm: '160px' },
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    height: '100%',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {loading ? 'Creating...' : 'Create Novel Page'}
                </Button>
              </AnimatedButton>
            </Box>
          </IconUploadSection>
        </HeaderSection>

        {novelCreated && (
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

                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePdfUpload(episode.number, e)}
                          style={{ display: 'none' }}
                          id={`pdf-upload-${episode.number}`}
                        />
                        <label htmlFor={`pdf-upload-${episode.number}`} style={{ flex: 1 }}>
                          <UploadButton component="span">
                            <CloudUploadIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
                            <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                              {selectedFiles[episode.number]?.pdf?.name || 'Upload PDF'}
                            </Typography>
                          </UploadButton>
                        </label>
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

export default GraphicNovel; 