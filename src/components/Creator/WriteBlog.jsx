import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Stack,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { motion } from 'framer-motion';

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
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  },
}));

const TitleSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
  },
}));

const ImageUploadSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}));

const PreviewImage = styled('img')(({ theme }) => ({
  width: '200px',
  height: '120px',
  objectFit: 'cover',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '160px',
  },
}));

const ImageUploadButton = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '120px',
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '160px',
  },
}));

const WriteBlog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [blogData, setBlogData] = useState({
    title: '',
    category: '',
    tags: [],
    content: '',
    featuredImage: null,
    featuredImagePreview: null,
  });
  
  const [tagInput, setTagInput] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // Fetch approved products when component mounts
  useEffect(() => {
    fetchApprovedProducts();
  }, []);

  // Function to fetch approved products from the API
  const fetchApprovedProducts = async () => {
    setIsLoadingProducts(true);
    try {
      // Replace with your actual API endpoint
      // const response = await axios.get('/api/products/approved');
      // setSuggestedProducts(response.data);
      
      // Simulated API response for now
      setTimeout(() => {
        const mockProducts = [
          'Premium Headphones',
          'Fitness Tracker',
          'Organic Skincare Set',
          'Business Planner',
          'Online Course',
          'Streaming Subscription',
          'Eco-friendly Water Bottle',
          'Gourmet Coffee Set',
          'Travel Backpack',
          'Yoga Mat',
          'Smart Home Device'
        ];
        setSuggestedProducts(mockProducts);
        setIsLoadingProducts(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching approved products:', error);
      showAlert('Failed to load product suggestions', 'error');
      setIsLoadingProducts(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value
    });
  };

  const handleFeaturedImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showAlert('Image size should be less than 5MB', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData({
          ...blogData,
          featuredImage: file,
          featuredImagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (blogData.tags.length >= 5) {
        showAlert('Maximum 5 tags allowed', 'warning');
        return;
      }
      if (!blogData.tags.includes(tagInput.trim())) {
        setBlogData({
          ...blogData,
          tags: [...blogData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setBlogData({
      ...blogData,
      tags: blogData.tags.filter(tag => tag !== tagToDelete)
    });
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!blogData.title.trim()) {
      showAlert('Please enter a blog title', 'error');
      return;
    }
    
    if (!blogData.category) {
      showAlert('Please select a suggested product', 'error');
      return;
    }
    
    if (blogData.content.trim().length < 100) {
      showAlert('Blog content should be at least 100 characters', 'error');
      return;
    }
    
    if (!blogData.featuredImage) {
      showAlert('Please upload a featured image', 'error');
      return;
    }

    try {
      // Here you would typically send the data to your backend
      // const formData = new FormData();
      // formData.append('title', blogData.title);
      // formData.append('category', blogData.category);
      // formData.append('tags', JSON.stringify(blogData.tags));
      // formData.append('content', blogData.content);
      // formData.append('featuredImage', blogData.featuredImage);
      
      // const response = await axios.post('/api/blogs', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      
      // Simulate successful submission
      toast.success('Blog submitted successfully!');
      setTimeout(() => {
        navigate('/creator-dashboard/pending');
      }, 2000);
    } catch (error) {
      console.error('Error submitting blog:', error);
      showAlert('Failed to submit blog. Please try again.', 'error');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All your progress will be lost.')) {
      navigate('/creator-dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledPaper>
        <HeaderSection>
          <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold" color="primary" gutterBottom>
            <CreateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Write a Blog
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Share your thoughts, insights, and expertise with the world. Create engaging content that resonates with readers.
          </Typography>
        </HeaderSection>

        <TitleSection>
          <TextField
            fullWidth
            label="Blog Title"
            name="title"
            value={blogData.title}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Enter an engaging title for your blog"
          />
        </TitleSection>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Tags (Press Enter to add)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            variant="outlined"
            placeholder="Add up to 5 tags"
            helperText="Press Enter to add a tag (max 5)"
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {blogData.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                color="primary"
                size="small"
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Featured Image
          </Typography>
          <ImageUploadSection>
            {blogData.featuredImagePreview ? (
              <PreviewImage src={blogData.featuredImagePreview} alt="Featured" />
            ) : (
              <ImageUploadButton component="label">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFeaturedImageUpload}
                />
                <Stack alignItems="center" spacing={1}>
                  <AddPhotoAlternateIcon color="primary" fontSize="large" />
                  <Typography variant="body2" color="text.secondary">
                    Upload Image
                  </Typography>
                </Stack>
              </ImageUploadButton>
            )}
            {blogData.featuredImagePreview && (
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFeaturedImageUpload}
                />
              </Button>
            )}
          </ImageUploadSection>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Story/Thread"
            name="content"
            value={blogData.content}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={15}
            placeholder="Write your thread content here..."
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-label">Suggested Product</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={blogData.category}
              onChange={handleInputChange}
              label="Suggested Product"
              disabled={isLoadingProducts}
              startAdornment={
                isLoadingProducts ? (
                  <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />
                ) : null
              }
            >
              {suggestedProducts.length > 0 ? (
                suggestedProducts.map((product) => (
                  <MenuItem key={product} value={product}>
                    {product}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value="">
                  {isLoadingProducts ? 'Loading products...' : 'No products available'}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={<CloudUploadIcon />}
          >
            Submit Blog
          </Button>
        </Box>
      </StyledPaper>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      
      <ToastContainer position="bottom-center" />
    </motion.div>
  );
};

export default WriteBlog;