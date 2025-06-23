import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Grid,
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
    if (file && file.type.startsWith('image/')) {
      setNovelIcon(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNovelIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = (episodeNumber) => {
    const files = selectedFiles[episodeNumber];
    if (files?.icon && files?.pdf) {
      setEpisodes(episodes.map(ep => ({
        ...ep,
        open: false,
        uploaded: ep.number === episodeNumber ? true : ep.uploaded
      })));
      setSnackbarMessage(`Episode ${episodeNumber} Uploaded Successfully`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage('Please upload both icon and PDF files');
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
    setTitle('');
    setEpisodes([{ number: 1, open: false }]);
    setSelectedFiles({});
    setNovelIcon(null);
    setNovelIconPreview(null);
    setSnackbarMessage('Form has been reset');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
  };

  const handlePostGraphicNovel = () => {
    if (!title.trim()) {
      setSnackbarMessage('Please enter a title for the Graphic Novel');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (!novelIcon) {
      setSnackbarMessage('Please upload a Graphic Novel cover image');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const hasUploadedEpisodes = episodes.some(ep => selectedFiles[ep.number]?.pdf && selectedFiles[ep.number]?.icon);
    if (!hasUploadedEpisodes) {
      setSnackbarMessage('Please upload at least one episode');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setSnackbarMessage('Graphic Novel Created Successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);

    setTimeout(() => {
      navigate('/creator-dashboard/pending');
    }, 1500);
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
            <input
              type="file"
              accept="image/*"
              onChange={handleNovelIconUpload}
              style={{ display: 'none' }}
              id="novel-icon-upload"
            />
            <label htmlFor="novel-icon-upload">
              <NovelIconUpload>
                {novelIconPreview ? (
                  <PreviewImage src={novelIconPreview} alt="Novel Icon" />
                ) : (
                  <AddPhotoAlternateIcon 
                    sx={{ 
                      fontSize: { xs: '24px', sm: '32px' },
                      color: 'primary.main'
                    }} 
                  />
                )}
              </NovelIconUpload>
            </label>
            <TextField
              fullWidth
              label="Graphic Novel Title"
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
            onClick={handlePostGraphicNovel}
            fullWidth={isMobile}
            sx={{
              py: { xs: 1, sm: 1.5 },
              px: { xs: 2, sm: 4 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Post Graphic Novel
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

export default GraphicNovel; 