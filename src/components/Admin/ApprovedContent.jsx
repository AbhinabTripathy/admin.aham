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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
  backgroundColor: theme.palette.success.main,
  color: '#fff',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
    fontSize: '0.875rem',
  }
}));

const ContentCard = styled(Card)({
  marginBottom: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
});

const CategoryChip = styled(Chip)(({ category, theme }) => ({
  backgroundColor: `${category === 'Graphic Novel' ? theme.palette.primary.main : theme.palette.success.main}15`,
  color: category === 'Graphic Novel' ? theme.palette.primary.main : theme.palette.success.main,
  fontWeight: 500,
  borderRadius: '16px',
  '& .MuiChip-icon': {
    color: 'inherit'
  }
}));

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

const StyledMenuItem = styled(MenuItem)({
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'action.hover'
  },
  '& .MuiListItemIcon-root': {
    minWidth: '36px'
  }
});

const TrendingChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main
}));

const ApprovedContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [approvedContent, setApprovedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchApprovedContent = async () => {
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

        console.log('Fetching approved content from APIs...');

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
          approvedBy: 'Admin',
          submittedAt: new Date(item.createdAt).toLocaleString(),
          approvedAt: new Date(item.updatedAt).toLocaleString(),
          isTrending: false,
          type: 'graphic-novel',
          status: item.status
        }));

        const audiobooks = (Array.isArray(audiobooksArray) ? audiobooksArray : []).map(item => ({
          id: item._id || item.id,
          title: item.title,
          category: 'Audio Book',
          submittedBy: item.role || 'Unknown',
          approvedBy: 'Admin',
          submittedAt: new Date(item.createdAt).toLocaleString(),
          approvedAt: new Date(item.updatedAt).toLocaleString(),
          isTrending: false,
          type: 'audiobook',
          status: item.status
        }));

        // Filter for published content only
        const allApprovedContent = [...graphicNovels, ...audiobooks].filter(item => 
          item.status === 'published'
        );

        console.log('All content before filtering:', [...graphicNovels, ...audiobooks]);
        console.log('Filtered approved content:', allApprovedContent);
        setApprovedContent(allApprovedContent);

      } catch (err) {
        console.error('Error fetching approved content:', err);
        setError(err.response?.data?.message || 'Failed to fetch approved content');
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedContent();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleMarkTrending = () => {
    console.log('Mark trending:', selectedItem);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log('Delete:', selectedItem);
    handleMenuClose();
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Label>Title</Label>
              <Value variant="subtitle1" sx={{ fontWeight: 600 }}>{row.title}</Value>
            </Box>
            <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Box>
            <Label>Category</Label>
            <CategoryChip
              icon={getCategoryIcon(row.category)}
              label={row.category}
              category={row.category}
              size="small"
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Label>Submitted By</Label>
              <Value>{row.submittedBy}</Value>
            </Grid>
            <Grid item xs={6}>
              <Label>Approved By</Label>
              <Value>{row.approvedBy}</Value>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Label>Submitted At</Label>
              <Value>{row.submittedAt}</Value>
            </Grid>
            <Grid item xs={6}>
              <Label>Approved At</Label>
              <Value>{row.approvedAt}</Value>
            </Grid>
          </Grid>

          {row.isTrending && (
            <Box>
              <TrendingChip
                icon={<TrendingUpIcon />}
                label="Trending"
                size="small"
              />
            </Box>
          )}
        </Stack>
      </CardContent>
    </ContentCard>
  );

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <StyledPaper>
        <HeaderSection>
          <CheckCircleIcon sx={{ fontSize: { xs: 32, sm: 36, md: 40 }, color: 'success.main' }} />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' }
            }}
          >
            Approved Content
          </Typography>
        </HeaderSection>

        {approvedContent.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            p: 4,
            color: 'text.secondary'
          }}>
            <CheckCircleIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" gutterBottom>
              No Approved Content
            </Typography>
            <Typography variant="body2">
              There are currently no approved items to display.
            </Typography>
          </Box>
        ) : (
          <>
            {isMobile ? (
              <Box sx={{ mt: 2 }}>
                {approvedContent
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                      <TableHeader>Approved By</TableHeader>
                      {!isTablet && (
                        <>
                          <TableHeader>Submitted At</TableHeader>
                          <TableHeader>Approved At</TableHeader>
                        </>
                      )}
                      <TableHeader align="right">Actions</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {approvedContent
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>
                            <CategoryChip
                              icon={getCategoryIcon(row.category)}
                              label={row.category}
                              category={row.category}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{row.submittedBy}</TableCell>
                          <TableCell>{row.approvedBy}</TableCell>
                          {!isTablet && (
                            <>
                              <TableCell>{row.submittedAt}</TableCell>
                              <TableCell>{row.approvedAt}</TableCell>
                            </>
                          )}
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                              {row.isTrending && (
                                <TrendingChip
                                  icon={<TrendingUpIcon />}
                                  label="Trending"
                                  size="small"
                                />
                              )}
                              <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                                <MoreVertIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            )}

            <TablePagination
              component="div"
              count={approvedContent.length}
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
          </>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            elevation: 3,
            sx: { minWidth: 180, borderRadius: 1, mt: 1 }
          }}
        >
          <StyledMenuItem onClick={handleMarkTrending}>
            <ListItemIcon>
              {selectedItem?.isTrending ? (
                <TrendingDownIcon fontSize="small" sx={{ color: 'warning.main' }} />
              ) : (
                <TrendingUpIcon fontSize="small" sx={{ color: 'primary.main' }} />
              )}
            </ListItemIcon>
            <ListItemText 
              primary={selectedItem?.isTrending ? 'Remove from Trending' : 'Mark as Trending'}
              primaryTypographyProps={{ fontSize: '0.875rem' }}
            />
          </StyledMenuItem>
          <StyledMenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Delete"
              primaryTypographyProps={{
                fontSize: '0.875rem',
                color: 'error.main',
              }}
            />
          </StyledMenuItem>
        </Menu>
      </StyledPaper>
    </Box>
  );
};

export default ApprovedContent; 