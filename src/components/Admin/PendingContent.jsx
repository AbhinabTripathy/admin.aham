import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
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
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PendingIcon from '@mui/icons-material/Pending';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';

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

  // Static data
  const staticPendingNews = [
    {
      id: 1,
      title: 'The Mystery Chronicles',
      category: 'Graphic Novel',
      submittedBy: 'John Doe',
      submittedAt: '2024-03-15 10:30 AM',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Echoes of Time',
      category: 'Audio Book',
      submittedBy: 'Jane Wilson',
      submittedAt: '2024-03-14 09:15 AM',
      status: 'pending'
    },
    {
      id: 3,
      title: 'The Hidden Truth',
      category: 'Graphic Novel',
      submittedBy: 'Mike Brown',
      submittedAt: '2024-03-13 14:20 PM',
      status: 'pending'
    }
  ];

  const [pendingNews] = useState(staticPendingNews);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusUpdate = (newsId, status) => {
    console.log(`${status} clicked for news ID:`, newsId);
    setSuccessMessage(`Content ${status} successfully`);
    setTimeout(() => setSuccessMessage(null), 1500);
  };

  const getCategoryIcon = (category) => {
    return category === 'Graphic Novel' ? 
      <MenuBookIcon fontSize={isMobile ? "small" : "medium"} /> : 
      <HeadphonesIcon fontSize={isMobile ? "small" : "medium"} />;
  };

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
              >
                <FaCheck />
              </ActionButton>
              <ActionButton
                size="small"
                color="#ef4444"
                onClick={() => handleStatusUpdate(news.id, 'rejected')}
              >
                <FaTimes />
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

        {isMobile ? (
          <Box sx={{ mt: 2 }}>
            {pendingNews
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                {pendingNews
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                            >
                              <FaCheck />
                            </ActionButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <ActionButton
                              size="small"
                              color="#ef4444"
                              onClick={() => handleStatusUpdate(news.id, 'rejected')}
                            >
                              <FaTimes />
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

        <TablePagination
          component="div"
          count={pendingNews.length}
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
      </StyledPaper>
    </Box>
  );
};

export default PendingContent;