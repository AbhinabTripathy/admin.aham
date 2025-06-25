import React, { useState, useEffect } from 'react';
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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(1),
  }
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
  }
}));

const StyledTableContainer = styled(TableContainer)({
  borderRadius: '8px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none'
});

const TableHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: '#fff',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
    fontSize: '0.875rem',
  }
}));

const CategoryChip = styled(Chip)(({ theme, contentType }) => ({
  borderRadius: '16px',
  fontWeight: 500,
  backgroundColor: contentType === 'Graphic Novel' ? 
    theme.palette.info.light : 
    theme.palette.warning.light,
  color: contentType === 'Graphic Novel' ? 
    theme.palette.info.dark : 
    theme.palette.warning.dark,
  '& .MuiChip-icon': {
    color: 'inherit',
  }
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  borderRadius: '16px',
  fontWeight: 500,
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.dark,
  '& .MuiChip-icon': {
    color: 'inherit',
  }
}));

const ContentCard = styled(Card)({
  marginBottom: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
});

const Label = styled(Typography)({
  fontWeight: 600,
  color: 'text.secondary',
  fontSize: '0.75rem',
  marginBottom: '4px'
});

const Value = styled(Typography)({
  color: 'text.primary',
  fontSize: '0.875rem',
  wordBreak: 'break-word'
});

const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '8px',
  justifyContent: 'flex-end'
});

const sampleData = [
  {
    id: 1,
    title: 'The Lost Kingdom',
    category: 'Graphic Novel',
    submittedBy: 'John Doe',
    rejectedBy: 'Admin',
    submittedAt: '2024-03-15 10:30 AM',
    rejectedAt: '2024-03-16 02:45 PM',
    status: 'Needs Revision',
    reason: 'Content quality needs improvement'
  },
  {
    id: 2,
    title: 'Whispers in the Dark',
    category: 'Audio Book',
    submittedBy: 'Jane Wilson',
    rejectedBy: 'Admin',
    submittedAt: '2024-03-14 09:15 AM',
    rejectedAt: '2024-03-15 11:20 AM',
    status: 'Needs Revision',
    reason: 'Audio quality issues'
  }
];

const RejectedContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rejectedContent, setRejectedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewAll, setViewAll] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchRejectedContent = async () => {
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

        console.log('Fetching rejected content from APIs...');

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

        // Debug: Log status values from first few items
        if (graphicNovelsArray.length > 0) {
          console.log('Sample graphic novel statuses:', graphicNovelsArray.slice(0, 3).map(item => ({ id: item._id || item.id, status: item.status })));
        }
        if (audiobooksArray.length > 0) {
          console.log('Sample audiobook statuses:', audiobooksArray.slice(0, 3).map(item => ({ id: item._id || item.id, status: item.status })));
        }

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
          rejectedBy: 'Admin',
          submittedAt: new Date(item.createdAt).toLocaleString(),
          rejectedAt: new Date(item.updatedAt).toLocaleString(),
          status: item.status,
          reason: item.rejectionReason || 'Content rejected by admin',
          type: 'graphic-novel'
        }));

        const audiobooks = (Array.isArray(audiobooksArray) ? audiobooksArray : []).map(item => ({
          id: item._id || item.id,
          title: item.title,
          category: 'Audio Book',
          submittedBy: item.role || 'Unknown',
          rejectedBy: 'Admin',
          submittedAt: new Date(item.createdAt).toLocaleString(),
          rejectedAt: new Date(item.updatedAt).toLocaleString(),
          status: item.status,
          reason: item.rejectionReason || 'Content rejected by admin',
          type: 'audiobook'
        }));

        // Filter for rejected content only
        const allRejectedContent = [...graphicNovels, ...audiobooks].filter(item => 
          item.status === 'rejected'
        );

        console.log('All content before filtering:', [...graphicNovels, ...audiobooks]);
        console.log('Filtered rejected content:', allRejectedContent);
        setRejectedContent(allRejectedContent);

      } catch (err) {
        console.error('Error fetching rejected content:', err);
        setError(err.response?.data?.message || 'Failed to fetch rejected content');
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedContent();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => console.log('Delete content with id:', id);
  const handleRestore = (id) => console.log('Restore content with id:', id);

  const handleViewAllToggle = () => {
    setViewAll(!viewAll);
    if (!viewAll) {
      setPage(0); // Reset to first page when switching to view all
    }
  };

  const getCategoryIcon = (category) => (
    category === 'Graphic Novel' ? 
      <MenuBookIcon fontSize="small" /> : 
      <HeadphonesIcon fontSize="small" />
  );

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ 
        p: { xs: 1, sm: 2, md: 3 },
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
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
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

  const MobileCard = ({ row }) => (
    <ContentCard>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Label>Title</Label>
            <Value variant="subtitle1" sx={{ fontWeight: 600 }}>{row.title}</Value>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Label>Category</Label>
              <CategoryChip
                icon={getCategoryIcon(row.category)}
                label={row.category}
                contentType={row.category}
                size="small"
              />
            </Grid>
          </Grid>

          <Box>
            <Label>Submitted By</Label>
            <Value>{row.submittedBy}</Value>
          </Box>

          <Box>
            <Label>Rejected By</Label>
            <Value>{row.rejectedBy}</Value>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Label>Submitted At</Label>
              <Value>{row.submittedAt}</Value>
            </Grid>
            <Grid item xs={6}>
              <Label>Rejected At</Label>
              <Value>{row.rejectedAt}</Value>
            </Grid>
          </Grid>

          <ActionButtons>
            <Tooltip title="Delete Permanently">
              <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Restore to Pending">
              <IconButton size="small" color="primary" onClick={() => handleRestore(row.id)}>
                <RestoreIcon />
              </IconButton>
            </Tooltip>
          </ActionButtons>
        </Stack>
      </CardContent>
    </ContentCard>
  );

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <StyledPaper>
        <HeaderSection>
          <BlockIcon sx={{ fontSize: { xs: 32, sm: 36, md: 40 }, color: 'error.main' }} />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' }
            }}
          >
            Rejected Content
          </Typography>
        </HeaderSection>

        {rejectedContent.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            p: 4,
            color: 'text.secondary'
          }}>
            <BlockIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" gutterBottom>
              No Rejected Content
            </Typography>
            <Typography variant="body2">
              There are currently no rejected items to display.
            </Typography>
          </Box>
        ) : (
          <>
            {isMobile ? (
              <Box sx={{ mt: 2 }}>
                {(viewAll ? rejectedContent : rejectedContent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
                  .map((row) => (
                    <MobileCard key={row.id} row={row} />
                  ))}
              </Box>
            ) : (
              <StyledTableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Title</TableHeader>
                      <TableHeader>Category</TableHeader>
                      <TableHeader>Submitted By</TableHeader>
                      <TableHeader>Rejected By</TableHeader>
                      <TableHeader>Submitted At</TableHeader>
                      <TableHeader>Rejected At</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(viewAll ? rejectedContent : rejectedContent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>
                            <CategoryChip
                              icon={getCategoryIcon(row.category)}
                              label={row.category}
                              contentType={row.category}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{row.submittedBy}</TableCell>
                          <TableCell>{row.rejectedBy}</TableCell>
                          <TableCell>{row.submittedAt}</TableCell>
                          <TableCell>{row.rejectedAt}</TableCell>
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
                  count={rejectedContent.length}
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

export default RejectedContent; 