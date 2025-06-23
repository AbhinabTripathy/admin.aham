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
  Card,
  CardContent,
  Stack,
  Avatar,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';

// Styled components with enhanced responsiveness
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  }
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(0, 1),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: '4px',
    '&:hover': {
      background: theme.palette.primary.dark
    }
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 'calc(100vh - 300px)'
  }
}));

const TableHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  padding: theme.spacing(2),
  fontSize: '1rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5),
    fontSize: '0.875rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    fontSize: '0.75rem',
  }
}));

const ContentCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(2.5),
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  fontSize: '0.875rem',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5),
    fontSize: '0.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    fontSize: '0.75rem',
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  fontSize: '1.2rem',
  [theme.breakpoints.down('md')]: {
    width: 35,
    height: 35,
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    width: 32,
    height: 32,
    fontSize: '0.9rem',
  }
}));

// Sample creator data
const sampleCreators = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+91 9876543210"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "+91 9876543211"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@example.com",
    mobile: "+91 9876543212"
  }
];

const Users = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [creators] = useState(sampleCreators);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const MobileCard = ({ creator }) => (
    <ContentCard>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <StyledAvatar sx={{ bgcolor: theme.palette.primary.main }}>
              {creator.name.charAt(0)}
            </StyledAvatar>
            <Box>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
              >
                {creator.name}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                mb: 0.5 
              }}
            >
              Email
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                fontSize: { xs: '0.875rem', sm: '0.95rem' }
              }}
            >
              {creator.email}
            </Typography>
          </Box>

          <Box>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                mb: 0.5 
              }}
            >
              Mobile
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                fontSize: { xs: '0.875rem', sm: '0.95rem' }
              }}
            >
              {creator.mobile}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </ContentCard>
  );

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <StyledPaper>
        <HeaderSection>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, sm: 2 },
            width: '100%'
          }}>
            <PeopleIcon sx={{ 
              fontSize: { 
                xs: 28, 
                sm: 32, 
                md: 36, 
                lg: 40 
              }, 
              color: 'primary.main' 
            }} />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 600,
                fontSize: { 
                  xs: '1.5rem', 
                  sm: '1.75rem', 
                  md: '2rem', 
                  lg: '2.25rem' 
                },
                color: theme.palette.primary.main
              }}
            >
              Creators
            </Typography>
          </Box>
        </HeaderSection>

        {isMobile ? (
          <Box sx={{ mt: { xs: 2, sm: 3 } }}>
            {creators
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((creator) => (
                <MobileCard key={creator.id} creator={creator} />
              ))}
          </Box>
        ) : (
          <StyledTableContainer>
            <Table size={isTablet ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableHeader>Creator Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Mobile</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {creators
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((creator) => (
                    <TableRow 
                      key={creator.id}
                      hover
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        }
                      }}
                    >
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <StyledAvatar sx={{ bgcolor: theme.palette.primary.main }}>
                            {creator.name.charAt(0)}
                          </StyledAvatar>
                          {creator.name}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>{creator.email}</StyledTableCell>
                      <StyledTableCell>{creator.mobile}</StyledTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}

        <TablePagination
          component="div"
          count={creators.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            mt: { xs: 2, sm: 3 },
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
            },
            '.MuiTablePagination-select': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
            }
          }}
        />
      </StyledPaper>
    </Container>
  );
};

export default Users; 