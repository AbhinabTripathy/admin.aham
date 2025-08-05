import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, Tooltip, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ArticleIcon from '@mui/icons-material/Article';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PostAddIcon from '@mui/icons-material/PostAdd';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CreateIcon from '@mui/icons-material/Create';
import { Drawer } from '@mui/material';

const SidebarContainer = styled(Box)(({ theme, isCollapsed }) => ({
  padding: '16px 0',
  height: '100%',
  backgroundColor: '#1e3c72',
  color: '#fff',
  overflowY: 'hidden',
  width: isCollapsed ? '60px' : '240px',
  transition: 'width 0.3s ease',
  marginTop: '48px',
  [theme.breakpoints.between('sm', 'md')]: {
    marginTop: '52px',
  },
  [theme.breakpoints.up('md')]: {
    marginTop: '56px',
  },
  '& > *': {
    transform: 'scale(0.95)',
    transformOrigin: 'top center'
  }
}));

const MenuItem = styled(Box)(({ theme, active, isCollapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: isCollapsed ? '10px' : '10px 18px',
  cursor: 'pointer',
  backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
  transition: 'all 0.3s ease',
  justifyContent: isCollapsed ? 'center' : 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
}));

const SectionTitle = styled(Box)(({ theme, isCollapsed }) => ({
  padding: isCollapsed ? '14px 0 8px' : '14px 18px 8px 18px',
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '13px',
  fontWeight: 'bold',
  textAlign: isCollapsed ? 'center' : 'left',
  display: isCollapsed ? 'none' : 'block'
}));

const IconWrapper = styled(Box)(({ theme, isCollapsed }) => ({
  marginRight: isCollapsed ? 0 : '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '26px',
  '& > svg': {
    fontSize: '1.3rem'
  }
}));

const MenuText = styled(Box)(({ theme, isCollapsed }) => ({
  fontWeight: 500,
  fontSize: '0.975rem',
  display: isCollapsed ? 'none' : 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

const SubMenuItem = styled(Box)(({ theme, active, isCollapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: isCollapsed ? '8px 0' : '8px 18px 8px 54px',
  cursor: 'pointer',
  backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
  transition: 'all 0.3s ease',
  justifyContent: isCollapsed ? 'center' : 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
}));

const AdminSidebar = ({ open, onClose, variant = 'permanent' }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [contentExpanded, setContentExpanded] = useState(true);
  const isCollapsed = isMobile || variant === 'temporary';

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const toggleContent = () => {
    setContentExpanded(!contentExpanded);
  };

  const renderMenuItem = (icon, text, path, showTooltip = true) => (
    <Tooltip title={isCollapsed && showTooltip ? text : ''} placement="right">
      <MenuItem 
        active={location.pathname === path}
        onClick={() => handleNavigation(path)}
        isCollapsed={isCollapsed}
      >
        <IconWrapper isCollapsed={isCollapsed}>
          {icon}
        </IconWrapper>
        <MenuText isCollapsed={isCollapsed}>{text}</MenuText>
      </MenuItem>
    </Tooltip>
  );

  const renderSubMenuItem = (icon, text, path) => (
    <SubMenuItem 
      active={location.pathname === path}
      onClick={() => handleNavigation(path)}
      isCollapsed={isCollapsed}
    >
      <IconWrapper isCollapsed={isCollapsed}>
        {icon}
      </IconWrapper>
      <MenuText isCollapsed={isCollapsed}>{text}</MenuText>
    </SubMenuItem>
  );

  const sidebarContent = (
    <SidebarContainer isCollapsed={isCollapsed}>
      {/* Overview */}
      {renderMenuItem(<DashboardIcon />, "Overview", '/admin-dashboard')}

      {/* MANAGE CONTENT Section */}
      <SectionTitle isCollapsed={isCollapsed}>MANAGE CONTENT</SectionTitle>

      {/* Content Management Dropdown */}
      <Tooltip title={isCollapsed ? "Content" : ''} placement="right">
        <MenuItem onClick={toggleContent} isCollapsed={isCollapsed}>
          <IconWrapper isCollapsed={isCollapsed}>
            <FolderIcon />
          </IconWrapper>
          <MenuText isCollapsed={isCollapsed}>Content</MenuText>
        </MenuItem>
      </Tooltip>

      <Collapse in={contentExpanded} timeout="auto" unmountOnExit>
        {renderSubMenuItem(<AutoStoriesIcon />, "Graphic Novel", '/admin-dashboard/graphic-novel')}
        {renderSubMenuItem(<HeadphonesIcon />, "Audio Book", '/admin-dashboard/audio-book')}
        {renderSubMenuItem(<StorefrontIcon />, "Mall", '/admin-dashboard/mall')}
        {renderSubMenuItem(<CreateIcon />, "Write Blog", '/admin-dashboard/write-blog')}
      </Collapse>

      {/* All Content */}
      {renderMenuItem(<ArticleIcon />, "Approved Content", '/admin-dashboard/approved')}

      {/* Pending Approvals */}
      {renderMenuItem(<PendingIcon />, "Pending Content", '/admin-dashboard/pending')}

      {/* Rejected Content */}
      {renderMenuItem(<BlockIcon />, "Rejected Content", '/admin-dashboard/rejected')}

      {/* Products */}
      {renderMenuItem(<ShoppingBagIcon />, "Products", '/admin-dashboard/products')}

      {/* Orders */}
      {renderMenuItem(<ShoppingCartIcon />, "Orders", '/admin-dashboard/orders')}

      {/* MANAGE USERS Section */}
      <SectionTitle isCollapsed={isCollapsed}>MANAGE USERS</SectionTitle>

      {/* Users List */}
      {renderMenuItem(<PeopleIcon />, "Users", '/admin-dashboard/users')}

      {/* Subscribed Users */}
      {renderMenuItem(<SubscriptionsIcon />, "Subscribed Users", '/admin-dashboard/subscribed-users')}

      {/* Banner Section */}
      <SectionTitle isCollapsed={isCollapsed}>BANNER MANAGEMENT</SectionTitle>

      {/* Post Banners */}
      {renderMenuItem(<PostAddIcon />, "Post Banners", '/admin-dashboard/post-banners')}

    </SidebarContainer>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isCollapsed ? 60 : 240,
          border: 'none',
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
          transition: 'width 0.3s ease',
          height: '100%',
          marginTop: 0,
          '& .MuiDrawer-paper': {
            marginTop: 0,
            height: '100%',
          },
          '& svg': {
            fontSize: '1.3rem'
          }
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default AdminSidebar; 