import React, { useState } from 'react';
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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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

// Sample data
const sampleData = [
  {
    id: 1,
    title: 'The Adventure Begins',
    category: 'Graphic Novel',
    submittedBy: 'John Doe',
    approvedBy: 'Admin',
    submittedAt: '2024-03-15 10:30 AM',
    approvedAt: '2024-03-16 02:45 PM',
    isTrending: false,
  },
  {
    id: 2,
    title: 'Tales of Mystery',
    category: 'Audio Book',
    submittedBy: 'Jane Wilson',
    approvedBy: 'Admin',
    submittedAt: '2024-03-14 09:15 AM',
    approvedAt: '2024-03-15 11:20 AM',
    isTrending: true,
  },
  {
    id: 3,
    title: 'The Hidden Truth',
    category: 'Graphic Novel',
    submittedBy: 'Mike Brown',
    approvedBy: 'Admin',
    submittedAt: '2024-03-13 14:20 PM',
    approvedAt: '2024-03-14 10:30 AM',
    isTrending: false,
  },
];

const ApprovedContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

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

        {isMobile ? (
          <Box sx={{ mt: 2 }}>
            {sampleData
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
                {sampleData
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
          count={sampleData.length}
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