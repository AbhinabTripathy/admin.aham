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
  Select,
  MenuItem,
  FormControl,
  Chip,
  Card,
  CardContent,
  Grid,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden'
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(3),
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '3px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: '3px',
    '&:hover': {
      background: theme.palette.primary.dark
    }
  },
  [theme.breakpoints.down('md')]: {
    maxHeight: 'calc(100vh - 300px)'
  }
}));

const TableHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  padding: theme.spacing(1),
  fontSize: '0.75rem',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.5),
    fontSize: '0.875rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2),
    fontSize: '1rem',
  }
}));

const ContentCard = styled(Card)(({ theme }) => ({
  marginBottom: '12px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.up('sm')]: {
    marginBottom: '16px',
  }
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontSize: '0.7rem',
  marginBottom: '2px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.75rem',
    marginBottom: '4px',
  }
}));

const Value = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.8rem',
  wordBreak: 'break-word',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.875rem',
  }
}));

const StatusChip = styled(Chip)(({ status, theme }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Pending':
        return theme.palette.warning.main;
      case 'Approved':
        return theme.palette.info.main;
      case 'Delivered':
        return theme.palette.success.main;
      case 'Returned':
        return theme.palette.error.main;
      default:
        return theme.palette.warning.main;
    }
  };
  const statusColor = getStatusColor();
  return {
    color: statusColor,
    fontWeight: 700,
    backgroundColor: 'transparent'
  };
});

// Sample data
const sampleOrders = [
  {
    id: 1,
    userId: "USER123",
    productName: "The Lost Kingdom - Graphic Novel",
    quantity: 2,
    deliveryLocation: "123 Main St, New York, NY 10001",
    paymentMethod: "UPI",
    status: "Pending"
  },
  {
    id: 2,
    userId: "USER456",
    productName: "Mystic Tales - Audio Book",
    quantity: 1,
    deliveryLocation: "456 Park Ave, Los Angeles, CA 90001",
    paymentMethod: "Credit Card",
    status: "Approved"
  },
  {
    id: 3,
    userId: "USER789",
    productName: "Heroes Rise - Graphic Novel",
    quantity: 3,
    deliveryLocation: "789 Oak Rd, Chicago, IL 60601",
    paymentMethod: "Debit Card",
    status: "Delivered"
  }
];

// PDF styles
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    minHeight: 35,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
  },
});

// PDF Document component
const OrdersPDF = ({ orders }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.header}>Orders Report</Text>
      <View style={pdfStyles.table}>
        <View style={[pdfStyles.tableRow, pdfStyles.tableHeader]}>
          <Text style={pdfStyles.tableCell}>User ID</Text>
          <Text style={pdfStyles.tableCell}>Product Name</Text>
          <Text style={pdfStyles.tableCell}>Quantity</Text>
          <Text style={pdfStyles.tableCell}>Delivery Location</Text>
          <Text style={pdfStyles.tableCell}>Payment Method</Text>
          <Text style={pdfStyles.tableCell}>Status</Text>
        </View>
        {orders.map((order) => (
          <View key={order.id} style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCell}>{order.userId}</Text>
            <Text style={pdfStyles.tableCell}>{order.productName}</Text>
            <Text style={pdfStyles.tableCell}>{order.quantity}</Text>
            <Text style={pdfStyles.tableCell}>{order.deliveryLocation}</Text>
            <Text style={pdfStyles.tableCell}>{order.paymentMethod}</Text>
            <Text style={pdfStyles.tableCell}>{order.status}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const Orders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState(sampleOrders);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const MobileCard = ({ order }) => (
    <ContentCard>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Stack spacing={{ xs: 1.5, sm: 2 }}>
          <Box>
            <Label>User ID</Label>
            <Value>{order.userId}</Value>
          </Box>

          <Box>
            <Label>Product Name</Label>
            <Value>{order.productName}</Value>
          </Box>

          <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            <Grid item xs={6}>
              <Label>Quantity</Label>
              <Value>{order.quantity}</Value>
            </Grid>
            <Grid item xs={6}>
              <Label>Payment Method</Label>
              <Value>{order.paymentMethod}</Value>
            </Grid>
          </Grid>

          <Box>
            <Label>Delivery Location</Label>
            <Value>{order.deliveryLocation}</Value>
          </Box>

          <Box>
            <Label>Order Status</Label>
            <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
              <Select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    py: 0.5,
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }
                }}
              >
                <MenuItem value="Pending" sx={{ color: 'warning.main', fontWeight: 700 }}>
                  <StatusChip label="Pending" status="Pending" size="small" />
                </MenuItem>
                <MenuItem value="Approved" sx={{ color: 'info.main', fontWeight: 700 }}>
                  <StatusChip label="Approved" status="Approved" size="small" />
                </MenuItem>
                <MenuItem value="Delivered" sx={{ color: 'success.main', fontWeight: 700 }}>
                  <StatusChip label="Delivered" status="Delivered" size="small" />
                </MenuItem>
                <MenuItem value="Returned" sx={{ color: 'error.main', fontWeight: 700 }}>
                  <StatusChip label="Returned" status="Returned" size="small" />
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </CardContent>
    </ContentCard>
  );

  return (
    <Box sx={{ p: { xs: 0.5, sm: 1, md: 2, lg: 3 } }}>
      <StyledPaper>
        <HeaderSection>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, sm: 1 },
            width: { xs: '100%', sm: 'auto' }
          }}>
            <ShoppingCartIcon sx={{ 
              fontSize: { 
                xs: 24, 
                sm: 28, 
                md: 32, 
                lg: 36 
              }, 
              color: 'primary.main' 
            }} />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 600,
                fontSize: { 
                  xs: '1.25rem', 
                  sm: '1.5rem', 
                  md: '1.75rem', 
                  lg: '2rem' 
                }
              }}
            >
              Orders
            </Typography>
            <PDFDownloadLink
              document={<OrdersPDF orders={orders} />}
              fileName="orders-report.pdf"
            >
              {({ loading }) => (
                <Tooltip title="Download PDF">
                  <IconButton 
                    color="primary"
                    disabled={loading}
                    sx={{ 
                      ml: { xs: 'auto', sm: 2 },
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}
                  >
                    <PictureAsPdfIcon />
                  </IconButton>
                </Tooltip>
              )}
            </PDFDownloadLink>
          </Box>
        </HeaderSection>

        {isMobile ? (
          <Box sx={{ mt: { xs: 1, sm: 2 } }}>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <MobileCard key={order.id} order={order} />
              ))}
          </Box>
        ) : (
          <StyledTableContainer>
            <Table size={isTablet ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableHeader>User ID</TableHeader>
                  <TableHeader>Product Name</TableHeader>
                  <TableHeader>Quantity</TableHeader>
                  <TableHeader>Delivery Location</TableHeader>
                  <TableHeader>Payment Method</TableHeader>
                  <TableHeader>Order Status</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell sx={{ fontSize: { sm: '0.75rem', md: '0.875rem' } }}>
                        {order.userId}
                      </TableCell>
                      <TableCell sx={{ fontSize: { sm: '0.75rem', md: '0.875rem' } }}>
                        {order.productName}
                      </TableCell>
                      <TableCell sx={{ fontSize: { sm: '0.75rem', md: '0.875rem' } }}>
                        {order.quantity}
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: { sm: '0.75rem', md: '0.875rem' },
                        maxWidth: { sm: '150px', md: '200px', lg: '300px' },
                        whiteSpace: 'normal',
                        wordBreak: 'break-word'
                      }}>
                        {order.deliveryLocation}
                      </TableCell>
                      <TableCell sx={{ fontSize: { sm: '0.75rem', md: '0.875rem' } }}>
                        {order.paymentMethod}
                      </TableCell>
                      <TableCell>
                        <FormControl size="small" fullWidth>
                          <Select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            sx={{
                              '& .MuiSelect-select': {
                                py: { sm: 0.5, md: 1 },
                                px: { sm: 1, md: 1.5 },
                                fontSize: { sm: '0.75rem', md: '0.875rem' },
                                display: 'flex',
                                alignItems: 'center'
                              }
                            }}
                          >
                            <MenuItem value="Pending" sx={{ color: 'warning.main', fontWeight: 700 }}>
                              <StatusChip label="Pending" status="Pending" size="small" />
                            </MenuItem>
                            <MenuItem value="Approved" sx={{ color: 'info.main', fontWeight: 700 }}>
                              <StatusChip label="Approved" status="Approved" size="small" />
                            </MenuItem>
                            <MenuItem value="Delivered" sx={{ color: 'success.main', fontWeight: 700 }}>
                              <StatusChip label="Delivered" status="Delivered" size="small" />
                            </MenuItem>
                            <MenuItem value="Returned" sx={{ color: 'error.main', fontWeight: 700 }}>
                              <StatusChip label="Returned" status="Returned" size="small" />
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}

        <TablePagination
          component="div"
          count={orders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' }
            },
            '.MuiTablePagination-select': {
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' }
            },
            mt: { xs: 1, sm: 2 }
          }}
        />
      </StyledPaper>
    </Box>
  );
};

export default Orders; 