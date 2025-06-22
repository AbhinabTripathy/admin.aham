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
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';

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

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => console.log('Delete content with id:', id);
  const handleRestore = (id) => console.log('Restore content with id:', id);

  const getCategoryIcon = (category) => (
    category === 'Graphic Novel' ? 
      <MenuBookIcon fontSize="small" /> : 
      <HeadphonesIcon fontSize="small" />
  );

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
            <Grid item xs={6}>
              <Label>Status</Label>
              <StatusChip
                icon={<BlockIcon fontSize="small" />}
                label={row.status}
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

          <Box>
            <Label>Rejection Reason</Label>
            <Value>{row.reason}</Value>
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
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Submitted By</TableHeader>
                  <TableHeader>Rejected By</TableHeader>
                  <TableHeader>Reason</TableHeader>
                  {!isTablet && (
                    <>
                      <TableHeader>Submitted At</TableHeader>
                      <TableHeader>Rejected At</TableHeader>
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
                          contentType={row.category}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <StatusChip
                          icon={<BlockIcon fontSize="small" />}
                          label={row.status}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{row.submittedBy}</TableCell>
                      <TableCell>{row.rejectedBy}</TableCell>
                      <TableCell>{row.reason}</TableCell>
                      {!isTablet && (
                        <>
                          <TableCell>{row.submittedAt}</TableCell>
                          <TableCell>{row.rejectedAt}</TableCell>
                        </>
                      )}
                      <TableCell align="right">
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
      </StyledPaper>
    </Box>
  );
};

export default RejectedContent; 