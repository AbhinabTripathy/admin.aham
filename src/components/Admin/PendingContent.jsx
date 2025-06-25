import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  useTheme,
  useMediaQuery,
  Chip,
  Card,
  CardContent,
  Grid,
  Stack,
  IconButton,
  Tooltip,
  CircularProgress,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PendingIcon from '@mui/icons-material/Pending';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import axios from 'axios';

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
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
      fontSize: '0.875rem',
    },
  },
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
      fontSize: '0.875rem',
    },
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  borderRadius: '16px',
  fontWeight: 500,
  backgroundColor: theme.palette.info.light,
  color: theme.palette.info.dark,
  '& .MuiChip-icon': {
    color: 'inherit',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    height: '24px',
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  borderRadius: '16px',
  fontWeight: 500,
  backgroundColor: theme.palette.warning.light,
  color: theme.palette.warning.dark,
  '& .MuiChip-icon': {
    color: 'inherit',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    height: '24px',
  },
}));

const ContentCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

const LabelTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  marginBottom: theme.spacing(0.5),
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.875rem',
  wordBreak: 'break-word',
}));

const ActionButton = styled(IconButton)(({ theme, color }) => ({
  backgroundColor: color,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? 
      theme.palette.augmentColor({ color: { main: color } }).dark :
      theme.palette.augmentColor({ color: { main: color } }).light,
  },
  marginRight: theme.spacing(1),
}));

const PendingContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [successMessage, setSuccessMessage] = useState(null);
  const [pendingContent, setPendingContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewAll, setViewAll] = useState(false);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  // Fetch data from API
  useEffect(() => {
    const fetchPendingContent = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        console.log('Fetching pending content from APIs...');

        // Fetch graphic novels
        const graphicNovelsResponse = await axios.get('https://api.ahamcore.com/api/admin/graphic-novels', config);
        console.log('Graphic novels response:', graphicNovelsResponse.data);

        // Fetch audiobooks
        const audiobooksResponse = await axios.get('https://api.ahamcore.com/api/admin/audiobooks', config);
        console.log('Audiobooks response:', audiobooksResponse.data);

        // Transform and combine data - handle both array and object responses
        const graphicNovelsData = graphicNovelsResponse.data.data;
        const audiobooksData = audiobooksResponse.data.data;
        
        console.log('Graphic novels data:', graphicNovelsData);
        console.log('Graphic novels data type:', typeof graphicNovelsData);
        console.log('Graphic novels data keys:', graphicNovelsData ? Object.keys(graphicNovelsData) : 'null/undefined');
        
        console.log('Audiobooks data:', audiobooksData);
        console.log('Audiobooks data type:', typeof audiobooksData);
        console.log('Audiobooks data keys:', audiobooksData ? Object.keys(audiobooksData) : 'null/undefined');

        // Check if data is an array or object with array property
        const graphicNovelsArray = Array.isArray(graphicNovelsData) ? graphicNovelsData : 
                                  (graphicNovelsData && Array.isArray(graphicNovelsData.graphicNovels)) ? graphicNovelsData.graphicNovels :
                                  (graphicNovelsData && Array.isArray(graphicNovelsData.novels)) ? graphicNovelsData.novels :
                                  (graphicNovelsData && Array.isArray(graphicNovelsData.items)) ? graphicNovelsData.items :
                                  (graphicNovelsData && Array.isArray(graphicNovelsData.data)) ? graphicNovelsData.data : [];

        const audiobooksArray = Array.isArray(audiobooksData) ? audiobooksData : 
                               (audiobooksData && Array.isArray(audiobooksData.audiobooks)) ? audiobooksData.audiobooks :
                               (audiobooksData && Array.isArray(audiobooksData.books)) ? audiobooksData.books :
                               (audiobooksData && Array.isArray(audiobooksData.items)) ? audiobooksData.items :
                               (audiobooksData && Array.isArray(audiobooksData.data)) ? audiobooksData.data : [];

        console.log('Graphic novels array:', graphicNovelsArray);
        console.log('Audiobooks array:', audiobooksArray);

        // Ensure we have arrays before mapping
        if (!Array.isArray(graphicNovelsArray)) {
          console.error('Graphic novels data is not an array:', graphicNovelsArray);
        }
        if (!Array.isArray(audiobooksArray)) {
          console.error('Audiobooks data is not an array:', audiobooksArray);
        }

        const graphicNovels = (Array.isArray(graphicNovelsArray) ? graphicNovelsArray : []).map(item => ({
          id: item._id || item.id,
          title: item.title,
          category: 'Graphic Novel',
          submittedBy: item.role || 'Unknown',
          submittedAt: new Date(item.createdAt).toLocaleString(),
          status: item.status,
          type: 'graphic-novel'
        }));

        const audiobooks = (Array.isArray(audiobooksArray) ? audiobooksArray : []).map(item => ({
          id: item._id || item.id,
          title: item.title,
          category: 'Audio Book',
          submittedBy: item.role || 'Unknown',
          submittedAt: new Date(item.createdAt).toLocaleString(),
          status: item.status,
          type: 'audiobook'
        }));

        // Filter for pending content only
        const allPendingContent = [...graphicNovels, ...audiobooks].filter(item => 
          item.status === 'pending'
        );

        console.log('Filtered pending content:', allPendingContent);
        setPendingContent(allPendingContent);

      } catch (err) {
        console.error('Error fetching pending content:', err);
        setError(err.response?.data?.message || 'Failed to fetch pending content');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingContent();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusUpdate = async (newsId, status) => {
    try {
      console.log(`${status} clicked for news ID:`, newsId);
      
      // Add item to updating set
      setUpdatingItems(prev => new Set(prev).add(newsId));
      
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No authentication token found');
        setUpdatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(newsId);
          return newSet;
        });
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      // Determine the API endpoint based on content type
      const contentItem = pendingContent.find(item => item.id === newsId);
      if (!contentItem) {
        console.error('Content item not found:', newsId);
        setUpdatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(newsId);
          return newSet;
        });
        return;
      }

      let apiUrl;
      if (contentItem.type === 'graphic-novel') {
        apiUrl = `https://api.ahamcore.com/api/admin/graphic-novels/${newsId}/status`;
      } else if (contentItem.type === 'audiobook') {
        apiUrl = `https://api.ahamcore.com/api/admin/audiobooks/${newsId}/status`;
      } else {
        console.error('Unknown content type:', contentItem.type);
        setUpdatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(newsId);
          return newSet;
        });
        return;
      }

      console.log(`Making PUT request to: ${apiUrl}`);
      console.log(`Status to update: ${status}`);

      // Map status to API format
      const apiStatus = status === 'approved' ? 'published' : 'rejected';
      
      const response = await axios.put(apiUrl, { status: apiStatus }, config);
      
      console.log('Status update response:', response.data);

      if (response.status === 200) {
        // Update local state to remove the item from pending list
        setPendingContent(prevContent => 
          prevContent.filter(item => item.id !== newsId)
        );
        
        setSuccessMessage(`Content ${status} successfully`);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError('Failed to update content status');
      }
    } catch (err) {
      console.error('Error updating content status:', err);
      setError(err.response?.data?.message || 'Failed to update content status');
      setTimeout(() => setError(null), 3000);
    } finally {
      // Remove item from updating set
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(newsId);
        return newSet;
      });
    }
  };

  const handleView = (newsId) => {
    console.log(`View clicked for news ID:`, newsId);
    // Add your view logic here
  };

  const handleViewAllToggle = () => {
    setViewAll(!viewAll);
    if (!viewAll) {
      setPage(0); // Reset to first page when switching to view all
    }
  };

  const getCategoryIcon = (category) => {
    return category === 'Graphic Novel' ? 
      <MenuBookIcon fontSize={isMobile ? "small" : "medium"} /> : 
      <HeadphonesIcon fontSize={isMobile ? "small" : "medium"} />;
  };

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ 
        p: { xs: 1, sm: 2, md: 3, lg: 4 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box sx={{ p: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
        <StyledPaper>
          <Box sx={{ 
            textAlign: 'center', 
            p: 3,
            color: 'error.main'
          }}>
            <Typography variant="h6" gutterBottom>
              Error Loading Content
            </Typography>
            <Typography variant="body2">
              {error}
            </Typography>
          </Box>
        </StyledPaper>
      </Box>
    );
  }

  const MobileCard = ({ news }) => (
    <ContentCard>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <LabelTypography>Post Title</LabelTypography>
            <ValueTypography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {news.title}
            </ValueTypography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LabelTypography>Category</LabelTypography>
              <CategoryChip 
                icon={getCategoryIcon(news.category)}
                label={news.category} 
                size="small" 
              />
            </Grid>
            <Grid item xs={6}>
              <LabelTypography>Status</LabelTypography>
              <StatusChip
                icon={<PendingIcon fontSize="small" />}
                label="Pending"
                size="small"
              />
            </Grid>
          </Grid>

          <Box>
            <LabelTypography>Submitted By</LabelTypography>
            <ValueTypography>{news.submittedBy}</ValueTypography>
          </Box>

          <Box>
            <LabelTypography>Submitted At</LabelTypography>
            <ValueTypography>{news.submittedAt}</ValueTypography>
          </Box>

          <Box>
            <LabelTypography>Actions</LabelTypography>
            <Box sx={{ mt: 1 }}>
              <ActionButton
                size="small"
                color="#10b981"
                onClick={() => handleStatusUpdate(news.id, 'approved')}
                disabled={updatingItems.has(news.id)}
              >
                {updatingItems.has(news.id) ? <CircularProgress size={16} color="inherit" /> : <FaCheck />}
              </ActionButton>
              <ActionButton
                size="small"
                color="#ef4444"
                onClick={() => handleStatusUpdate(news.id, 'rejected')}
                disabled={updatingItems.has(news.id)}
              >
                {updatingItems.has(news.id) ? <CircularProgress size={16} color="inherit" /> : <FaTimes />}
              </ActionButton>
              <ActionButton
                size="small"
                color="#3b82f6"
                onClick={() => handleView(news.id)}
                disabled={updatingItems.has(news.id)}
              >
                <FaEye />
              </ActionButton>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </ContentCard>
  );

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
      <StyledPaper>
        <HeaderSection>
          <PendingIcon sx={{ 
            fontSize: { xs: 32, sm: 36, md: 40 }, 
            color: 'warning.main' 
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
            Pending Content
          </Typography>
        </HeaderSection>

        {successMessage && (
          <Box sx={{ 
            mb: 2, 
            p: 2, 
            bgcolor: '#d1fae5', 
            color: '#047857',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '6px' }}>✓</span> {successMessage}
          </Box>
        )}

        {pendingContent.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            p: 4,
            color: 'text.secondary'
          }}>
            <PendingIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" gutterBottom>
              No Pending Content
            </Typography>
            <Typography variant="body2">
              There are currently no items waiting for approval.
            </Typography>
          </Box>
        ) : (
          <>
            {isMobile ? (
              <Box sx={{ mt: 2 }}>
                {(viewAll ? pendingContent : pendingContent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
                  .map((news) => (
                    <MobileCard key={news.id} news={news} />
                  ))}
              </Box>
            ) : (
              <StyledTableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Post Title</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Submitted By</TableCell>
                      {!isTablet && <TableCell>Submitted At</TableCell>}
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(viewAll ? pendingContent : pendingContent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
                      .map((news) => (
                        <TableRow key={news.id}>
                          <TableCell>{news.title}</TableCell>
                          <TableCell>
                            <CategoryChip 
                              icon={getCategoryIcon(news.category)}
                              label={news.category} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>{news.submittedBy}</TableCell>
                          {!isTablet && <TableCell>{news.submittedAt}</TableCell>}
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="Approve">
                                <ActionButton
                                  size="small"
                                  color="#10b981"
                                  onClick={() => handleStatusUpdate(news.id, 'approved')}
                                  disabled={updatingItems.has(news.id)}
                                >
                                  {updatingItems.has(news.id) ? <CircularProgress size={16} color="inherit" /> : <FaCheck />}
                                </ActionButton>
                              </Tooltip>
                              <Tooltip title="Reject">
                                <ActionButton
                                  size="small"
                                  color="#ef4444"
                                  onClick={() => handleStatusUpdate(news.id, 'rejected')}
                                  disabled={updatingItems.has(news.id)}
                                >
                                  {updatingItems.has(news.id) ? <CircularProgress size={16} color="inherit" /> : <FaTimes />}
                                </ActionButton>
                              </Tooltip>
                              <Tooltip title="View">
                                <ActionButton
                                  size="small"
                                  color="#3b82f6"
                                  onClick={() => handleView(news.id)}
                                  disabled={updatingItems.has(news.id)}
                                >
                                  <FaEye />
                                </ActionButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            )}

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mt: 2,
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Button
                variant="outlined"
                onClick={handleViewAllToggle}
                sx={{
                  borderColor: viewAll ? '#ef4444' : '#3b82f6',
                  color: viewAll ? '#ef4444' : '#3b82f6',
                  '&:hover': {
                    borderColor: viewAll ? '#dc2626' : '#2563eb',
                    backgroundColor: viewAll ? 'rgba(239, 68, 68, 0.04)' : 'rgba(59, 130, 246, 0.04)'
                  }
                }}
              >
                {viewAll ? 'Show Less' : 'View All'}
              </Button>

              {!viewAll && (
                <TablePagination
                  component="div"
                  count={pendingContent.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                  sx={{
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    },
                    '.MuiTablePagination-select': {
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }
                  }}
                />
              )}
            </Box>
          </>
        )}
      </StyledPaper>
    </Box>
  );
};

export default PendingContent;