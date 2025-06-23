import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
  Button,
  TextField,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem,
  MobileStepper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 220,
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: 180,
  },
  [theme.breakpoints.between('sm', 'md')]: {
    height: 200,
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  '&:hover': {
    opacity: 1,
  },
}));

const ModalImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    maxWidth: '100%',
    maxHeight: '90vh',
    objectFit: 'contain',
  },
}));

const ImageNavButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  color: 'white',
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  zIndex: 2,
  '& .MuiSvgIcon-root': {
    fontSize: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
    '& .MuiSvgIcon-root': {
      fontSize: theme.spacing(2.5),
    },
  },
}));

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

const SizeChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: selected ? '#1e3c72' : 'transparent',
  color: selected ? '#fff' : theme.palette.text.primary,
  border: `1px solid ${selected ? '#1e3c72' : theme.palette.divider}`,
  '&:hover': {
    backgroundColor: selected ? '#15294f' : theme.palette.action.hover,
  },
  transition: 'all 0.2s ease',
  height: theme.spacing(3),
  fontSize: '0.75rem',
  [theme.breakpoints.up('sm')]: {
    height: theme.spacing(3.5),
    fontSize: '0.875rem',
  },
}));

const StockButton = styled(Button)(({ theme, inStock }) => ({
  backgroundColor: inStock ? '#4caf50' : '#f44336',
  color: 'white',
  '&:hover': {
    backgroundColor: inStock ? '#45a049' : '#d32f2f',
  },
  minWidth: '90px',
  height: '32px',
  fontSize: '0.75rem',
  padding: theme.spacing(0.5, 1),
  [theme.breakpoints.up('sm')]: {
    minWidth: '100px',
    fontSize: '0.875rem',
    padding: theme.spacing(0.75, 1.5),
  },
  transition: 'all 0.3s ease',
}));

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Sample product data with multiple images and stock status
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Classic T-Shirt',
      price: 2499, // Price in INR
      sizes: ['S', 'M', 'L', 'XL'],
      details: 'Premium cotton t-shirt with comfortable fit',
      quantity: 8,
      inStock: true,
      currentImageIndex: 0,
      images: [
        'https://example.com/tshirt1.jpg',
        'https://example.com/tshirt2.jpg',
        'https://example.com/tshirt3.jpg',
        'https://example.com/tshirt4.jpg',
        'https://example.com/tshirt5.jpg',
      ],
    },
    // Add more products as needed
  ]);

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleStockToggle = (productId) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, inStock: !product.inStock }
        : product
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setImageModalOpen(true);
  };

  const handleNextImage = (productId) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? {
            ...product,
            currentImageIndex: 
              product.currentImageIndex === product.images.length - 1 
                ? 0 
                : product.currentImageIndex + 1
          }
        : product
    ));
  };

  const handlePrevImage = (productId) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? {
            ...product,
            currentImageIndex: 
              product.currentImageIndex === 0 
                ? product.images.length - 1 
                : product.currentImageIndex - 1
          }
        : product
    ));
  };

  const renderProductCard = (product) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
      <ProductCard>
        <Box sx={{ position: 'relative' }}>
          <ProductImage
            image={product.images[product.currentImageIndex]}
            title={product.name}
            sx={{ 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <ImageNavButton
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage(product.id);
            }}
            sx={{ left: theme.spacing(1) }}
          >
            <NavigateBeforeIcon />
          </ImageNavButton>
          <ImageNavButton
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage(product.id);
            }}
            sx={{ right: theme.spacing(1) }}
          >
            <NavigateNextIcon />
          </ImageNavButton>
          <MobileStepper
            steps={product.images.length}
            position="static"
            activeStep={product.currentImageIndex}
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              background: 'rgba(0,0,0,0.5)',
              padding: theme.spacing(0.5),
              '& .MuiMobileStepper-dot': {
                width: 6,
                height: 6,
                margin: '0 4px',
              },
              '& .MuiMobileStepper-dotActive': {
                backgroundColor: 'white',
              },
            }}
            backButton={null}
            nextButton={null}
          />
        </Box>
        <CardContent sx={{ 
          p: theme.spacing(2),
          '&:last-child': { pb: theme.spacing(2) },
        }}>
          <Stack spacing={theme.spacing(1.5)}>
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              component="h2" 
              noWrap
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.25rem',
                },
              }}
            >
              {product.name}
            </Typography>
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              color="primary"
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.25rem',
                },
                fontWeight: 600,
              }}
            >
              {formatPrice(product.price)}
            </Typography>
            <Box>
              <Typography 
                variant="subtitle2" 
                gutterBottom
                sx={{
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.875rem',
                    md: '0.9rem',
                  },
                }}
              >
                Available Sizes:
              </Typography>
              <Box 
                display="flex" 
                flexWrap="wrap" 
                gap={0.5}
                sx={{ mt: 0.5 }}
              >
                {AVAILABLE_SIZES.map((size) => (
                  <SizeChip
                    key={size}
                    label={size}
                    size={isMobile ? "small" : "medium"}
                    selected={product.sizes.includes(size)}
                  />
                ))}
              </Box>
            </Box>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: {
                  xs: '32px',
                  sm: '36px',
                  md: '40px',
                },
                fontSize: {
                  xs: '0.75rem',
                  sm: '0.8rem',
                  md: '0.875rem',
                },
                lineHeight: 1.5,
              }}
            >
              {product.details}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography 
                variant="body2"
                sx={{
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.8rem',
                    md: '0.875rem',
                  },
                }}
              >
                In Stock: {product.quantity}/10
              </Typography>
            </Stack>
            <Stack 
              direction="row" 
              spacing={1} 
              alignItems="center"
              justifyContent="flex-end"
            >
              <StockButton
                variant="contained"
                size={isMobile ? "small" : "medium"}
                inStock={product.inStock}
                onClick={() => handleStockToggle(product.id)}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </StockButton>
              <Tooltip title="Delete Product">
                <IconButton 
                  size={isMobile ? "small" : "medium"} 
                  color="error"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: {
                        xs: '1.25rem',
                        sm: '1.5rem',
                      },
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </CardContent>
      </ProductCard>
    </Grid>
  );

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: { 
          xs: 2, 
          sm: 3, 
          md: 4 
        },
        px: {
          xs: 1,
          sm: 2,
          md: 3,
        },
      }}
    >
      <Box mb={theme.spacing(3)}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems={{ xs: 'stretch', sm: 'center' }}
          spacing={{ xs: 1.5, sm: 2 }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: '#1e3c72',
              fontWeight: 700,
              fontSize: {
                xs: '1.25rem',
                sm: '1.5rem',
                md: '2rem',
              },
            }}
          >
            Products Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#1e3c72',
              '&:hover': { bgcolor: '#15294f' },
              width: { xs: '100%', sm: 'auto' },
              fontSize: {
                xs: '0.875rem',
                sm: '0.9rem',
                md: '1rem',
              },
              py: {
                xs: 1,
                sm: 1.25,
                md: 1.5,
              },
            }}
            onClick={() => navigate('/admin-dashboard/mall')}
          >
            Add New Product
          </Button>
        </Stack>
      </Box>

      <Grid 
        container 
        spacing={{ 
          xs: 2, 
          sm: 2.5, 
          md: 3 
        }}
      >
        {products.map(renderProductCard)}
      </Grid>

      <Dialog
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ m: 0, p: 2, bgcolor: '#1e3c72', color: 'white' }}>
          <Typography variant="h6">
            {selectedProduct?.name} - Image {currentImageIndex + 1} of {selectedProduct?.images.length}
          </Typography>
          <IconButton
            onClick={() => setImageModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, position: 'relative', minHeight: '50vh' }}>
          {selectedProduct && (
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                src={selectedProduct.images[currentImageIndex]}
                alt={`${selectedProduct.name} - View ${currentImageIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
              <MobileStepper
                steps={selectedProduct.images.length}
                position="static"
                activeStep={currentImageIndex}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  background: 'rgba(0,0,0,0.5)',
                }}
                nextButton={
                  <IconButton onClick={() => handleNextImage(selectedProduct.id)} sx={{ color: 'white' }}>
                    <NavigateNextIcon />
                  </IconButton>
                }
                backButton={
                  <IconButton onClick={() => handlePrevImage(selectedProduct.id)} sx={{ color: 'white' }}>
                    <NavigateBeforeIcon />
                  </IconButton>
                }
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Products; 