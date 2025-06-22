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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
    backgroundColor: theme.palette.primary.main,
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

// Sample data - replace with actual data from your backend
const sampleData = [
  {
    id: 1,
    title: 'The Adventure Begins',
    category: 'Graphic Novel',
    submittedBy: 'John Doe',
    approvedBy: 'Admin',
    submittedAt: '2024-03-15 10:30 AM',
    approvedAt: '2024-03-16 02:45 PM',
  },
  {
    id: 2,
    title: 'Tales of Mystery',
    category: 'Audio Book',
    submittedBy: 'Jane Wilson',
    approvedBy: 'Admin',
    submittedAt: '2024-03-14 09:15 AM',
    approvedAt: '2024-03-15 11:20 AM',
  },
  // Add more sample data as needed
];

const ApprovedContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCategoryIcon = (category) => {
    return category === 'Graphic Novel' ? 
      <MenuBookIcon fontSize={isMobile ? "small" : "medium"} /> : 
      <HeadphonesIcon fontSize={isMobile ? "small" : "medium"} />;
  };

  const MobileCard = ({ row }) => (
    <ContentCard>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <LabelTypography>Title</LabelTypography>
            <ValueTypography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {row.title}
            </ValueTypography>
          </Box>

          <Box>
            <LabelTypography>Category</LabelTypography>
            <CategoryChip
              icon={getCategoryIcon(row.category)}
              label={row.category}
              contentType={row.category}
              size="small"
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LabelTypography>Submitted By</LabelTypography>
              <ValueTypography>{row.submittedBy}</ValueTypography>
            </Grid>
            <Grid item xs={6}>
              <LabelTypography>Approved By</LabelTypography>
              <ValueTypography>{row.approvedBy}</ValueTypography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LabelTypography>Submitted At</LabelTypography>
              <ValueTypography>{row.submittedAt}</ValueTypography>
            </Grid>
            <Grid item xs={6}>
              <LabelTypography>Approved At</LabelTypography>
              <ValueTypography>{row.approvedAt}</ValueTypography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </ContentCard>
  );

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
      <StyledPaper>
        <HeaderSection>
          <CheckCircleIcon sx={{ 
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
            All Content
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
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Submitted By</TableCell>
                  <TableCell>Approved By</TableCell>
                  {!isTablet && (
                    <>
                      <TableCell>Submitted At</TableCell>
                      <TableCell>Approved At</TableCell>
                    </>
                  )}
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
                      <TableCell>{row.submittedBy}</TableCell>
                      <TableCell>{row.approvedBy}</TableCell>
                      {!isTablet && (
                        <>
                          <TableCell>{row.submittedAt}</TableCell>
                          <TableCell>{row.approvedAt}</TableCell>
                        </>
                      )}
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

export default ApprovedContent; 