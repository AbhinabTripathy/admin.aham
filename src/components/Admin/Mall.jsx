import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Stack,
  InputAdornment,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Chip,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DeleteIcon from '@mui/icons-material/Delete';

const MAX_IMAGES = 5;
const MAX_QUANTITY = 10;
const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(1.5),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  '& .MuiSvgIcon-root': {
    fontSize: '40px',
    [theme.breakpoints.down('md')]: {
      fontSize: '36px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '32px',
    },
  },
  '& .MuiTypography-root': {
    fontSize: '2.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

const ImageUploadSection = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(1.5),
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(1),
  },
}));

const ImageUploadButton = styled(Button)(({ theme }) => ({
  width: '100%',
  aspectRatio: '1/1',
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '32px',
    [theme.breakpoints.down('md')]: {
      fontSize: '28px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
    },
  },
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
    textAlign: 'center',
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  },
}));

const ImagePreviewBox = styled(Box)(({ theme }) => ({
  width: '100%',
  aspectRatio: '1/1',
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 2,
  right: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '4px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '2px',
    '& .MuiSvgIcon-root': {
      fontSize: '14px',
    },
  },
}));

const FormSection = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(4),
  marginBottom: theme.spacing(4),
  '& .MuiFormControl-root': {
    '& .MuiInputLabel-root': {
      fontSize: '1rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
      },
    },
    '& .MuiInputBase-root': {
      fontSize: '1rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2.5),
  },
}));

const QuantityControl = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .MuiTextField-root': {
    width: '100px',
    [theme.breakpoints.down('sm')]: {
      width: '80px',
    },
  },
  '& .MuiIconButton-root': {
    padding: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  '& .MuiButton-root': {
    minWidth: '120px',
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      minWidth: '100px',
      padding: theme.spacing(1.25, 2.5),
      fontSize: '0.9rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: theme.spacing(1, 2),
      fontSize: '0.875rem',
    },
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}));

const SizeSelection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const SizeChip = styled(Chip)(({ theme, selected }) => ({
  borderRadius: '16px',
  backgroundColor: selected ? '#1e3c72' : 'transparent',
  color: selected ? '#fff' : theme.palette.text.primary,
  border: `1px solid ${selected ? '#1e3c72' : theme.palette.divider}`,
  '&:hover': {
    backgroundColor: selected ? '#15294f' : theme.palette.action.hover,
  },
  transition: 'all 0.2s ease',
  [theme.breakpoints.down('sm')]: {
    height: '28px',
    fontSize: '0.75rem',
  },
}));

const Mall = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [productImages, setProductImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({});

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const uploadIndex = parseInt(event.target.id.split('-').pop());
      reader.onload = () => {
        const newImages = [...productImages];
        newImages[uploadIndex] = reader.result;
        setProductImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (index) => {
    const newImages = [...productImages];
    newImages[index] = null;
    setProductImages(newImages);
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < MAX_QUANTITY) {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!productImages.length) {
      newErrors.images = 'At least one product image is required';
    }
    if (!productName.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!productPrice.trim()) {
      newErrors.price = 'Product price is required';
    } else if (isNaN(productPrice) || Number(productPrice) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    if (!productDetails.trim()) {
      newErrors.details = 'Product details are required';
    }
    if (quantity === 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setProductImages([]);
    setProductName('');
    setProductPrice('');
    setProductDetails('');
    setQuantity(1);
    setSelectedSizes([]);
    setErrors({});
    setSnackbarMessage('Form has been reset');
    setSnackbarSeverity('info');
    setOpenSnackbar(true);
  };

  const handleCreate = () => {
    if (validateForm()) {
      // Here you would typically send the data to your backend
      setSnackbarMessage('Item Data created Successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCancel(); // Reset form after successful creation
    }
  };

  return (
    <Box sx={{ 
      p: { 
        xs: 1,
        sm: 1.5,
        md: 2,
        lg: 3 
      },
      maxWidth: {
        sm: '600px',
        md: '800px',
        lg: '1000px',
      },
      mx: 'auto',
    }}>
      <StyledPaper>
        <HeaderSection>
          <StorefrontIcon color="primary" />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Create Mall Item
          </Typography>
        </HeaderSection>

        <FormSection>
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: { xs: 1, sm: 1.5 },
                fontWeight: 500,
                fontSize: {
                  xs: '0.875rem',
                  sm: '1rem',
                },
              }}
            >
              Product Images* (Max 5)
            </Typography>
            <ImageUploadSection>
              {[0, 1, 2, 3, 4].map((index) => (
                <Box key={index}>
                  {productImages[index] ? (
                    <ImagePreviewBox>
                      <img 
                        src={productImages[index]} 
                        alt={`Product ${index + 1}`}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                      />
                      <DeleteButton
                        size="small"
                        onClick={() => handleImageDelete(index)}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </DeleteButton>
                    </ImagePreviewBox>
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id={`product-image-upload-${index}`}
                      />
                      <label htmlFor={`product-image-upload-${index}`} style={{ display: 'block' }}>
                        <ImageUploadButton component="span">
                          <CloudUploadIcon />
                          <Typography>
                            {index === 0 ? 'Upload Image*' : 'Add Image'}
                          </Typography>
                        </ImageUploadButton>
                      </label>
                    </>
                  )}
                </Box>
              ))}
            </ImageUploadSection>
            {errors.images && (
              <Typography 
                color="error" 
                variant="caption"
                sx={{ 
                  display: 'block',
                  mt: 0.5,
                  fontSize: {
                    xs: '0.7rem',
                    sm: '0.75rem',
                  },
                }}
              >
                {errors.images}
              </Typography>
            )}
          </Box>

          <TextField
            fullWidth
            label="Product Name*"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            size={isMobile ? "small" : "medium"}
          />

          <TextField
            fullWidth
            label="Product Price*"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            error={!!errors.price}
            helperText={errors.price}
            size={isMobile ? "small" : "medium"}
          />

          <FormControl component="fieldset">
            <FormLabel 
              component="legend"
              sx={{ 
                mb: 1,
                fontSize: {
                  xs: '0.875rem',
                  sm: '1rem',
                },
                color: 'text.primary',
                '&.Mui-focused': {
                  color: 'text.primary',
                },
              }}
            >
              Available Sizes (Optional)
            </FormLabel>
            <SizeSelection>
              {AVAILABLE_SIZES.map((size) => (
                <SizeChip
                  key={size}
                  label={size}
                  onClick={() => handleSizeToggle(size)}
                  selected={selectedSizes.includes(size)}
                  sx={{ 
                    cursor: 'pointer',
                  }}
                />
              ))}
            </SizeSelection>
            <FormHelperText sx={{ mt: 1 }}>
              {selectedSizes.length > 0 
                ? `Selected sizes: ${selectedSizes.join(', ')}` 
                : 'Click to select multiple sizes'}
            </FormHelperText>
          </FormControl>

          <TextField
            fullWidth
            label="Product Details*"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            multiline
            rows={isMobile ? 3 : 4}
            error={!!errors.details}
            helperText={errors.details}
            size={isMobile ? "small" : "medium"}
          />

          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: { xs: 1, sm: 1.5 },
                fontWeight: 500,
                fontSize: {
                  xs: '0.875rem',
                  sm: '1rem',
                },
              }}
            >
              Quantity*
            </Typography>
            <QuantityControl>
              <IconButton 
                onClick={() => handleQuantityChange('decrease')}
                disabled={quantity === 0}
                size={isMobile ? "small" : "medium"}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                value={quantity}
                InputProps={{
                  readOnly: true,
                }}
                size={isMobile ? "small" : "medium"}
              />
              <IconButton 
                onClick={() => handleQuantityChange('increase')}
                disabled={quantity === MAX_QUANTITY}
                size={isMobile ? "small" : "medium"}
              >
                <AddIcon />
              </IconButton>
            </QuantityControl>
            {errors.quantity && (
              <Typography 
                color="error" 
                variant="caption"
                sx={{ 
                  display: 'block',
                  mt: 0.5,
                  fontSize: {
                    xs: '0.7rem',
                    sm: '0.75rem',
                  },
                }}
              >
                {errors.quantity}
              </Typography>
            )}
          </Box>
        </FormSection>

        <ActionButtons>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreate}
          >
            Create Item
          </Button>
        </ActionButtons>
      </StyledPaper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isMobile ? 'center' : 'right'
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ 
            width: '100%',
            fontSize: {
              xs: '0.875rem',
              sm: '1rem',
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Mall; 