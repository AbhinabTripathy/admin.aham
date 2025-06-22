import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, Tooltip, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArticleIcon from '@mui/icons-material/Article';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PostAddIcon from '@mui/icons-material/PostAdd';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Drawer } from '@mui/material';

const SidebarContainer = styled(Box)(({ theme, isCollapsed }) => ({
  padding: '20px 0',
  height: '100%',
  backgroundColor: '#1e3c72',
  color: '#fff',
  overflowY: 'auto',
  width: isCollapsed ? '60px' : '240px',
  transition: 'width 0.3s ease',
  marginTop: '48px', // Match mobile header height
  [theme.breakpoints.between('sm', 'md')]: {
    marginTop: '52px', // Match tablet header height
  },
  [theme.breakpoints.up('md')]: {
    marginTop: '56px', // Match desktop header height
  },
  '&::-webkit-scrollbar': {
    width: '8px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#1e3c72'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#2a5298',
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#3a62a8'
  }
}));

const MenuItem = styled(Box)(({ theme, active, isCollapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: isCollapsed ? '12px' : '12px 20px',
  cursor: 'pointer',
  backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
  transition: 'all 0.3s ease',
  justifyContent: isCollapsed ? 'center' : 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
}));

const SectionTitle = styled(Box)(({ theme, isCollapsed }) => ({
  padding: isCollapsed ? '20px 0 10px' : '20px 20px 10px 20px',
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: isCollapsed ? 'center' : 'left',
  display: isCollapsed ? 'none' : 'block'
}));

const IconWrapper = styled(Box)(({ theme, isCollapsed }) => ({
  marginRight: isCollapsed ? 0 : '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '24px'
}));

const MenuText = styled(Box)(({ theme, isCollapsed }) => ({
  fontWeight: 500,
  fontSize: '0.95rem',
  display: isCollapsed ? 'none' : 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

const SubMenuItem = styled(Box)(({ theme, active, isCollapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: isCollapsed ? '10px 0' : '10px 20px 10px 58px',
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
            <KeyboardArrowRightIcon 
              sx={{ 
                transform: contentExpanded ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s'
              }}
            />
          </IconWrapper>
          <IconWrapper isCollapsed={isCollapsed}>
            <FolderIcon />
          </IconWrapper>
          <MenuText isCollapsed={isCollapsed}>Content</MenuText>
        </MenuItem>
      </Tooltip>

      <Collapse in={contentExpanded} timeout="auto" unmountOnExit>
        {renderSubMenuItem(<PostAddIcon />, "Standard Post", '/admin-dashboard/standard-post')}
        {renderSubMenuItem(<VideoCallIcon />, "Video Post", '/admin-dashboard/video-post')}
      </Collapse>

      {/* All Content */}
      {renderMenuItem(<ArticleIcon />, "All Content", '/admin-dashboard/all-content')}

      {/* Pending Approvals */}
      {renderMenuItem(<PendingIcon />, "Pending Approvals", '/admin-dashboard/pending')}

      {/* Rejected Content */}
      {renderMenuItem(<BlockIcon />, "Rejected", '/admin-dashboard/rejected')}

      {/* MANAGE USERS Section */}
      <SectionTitle isCollapsed={isCollapsed}>MANAGE USERS</SectionTitle>

      {/* Users List */}
      {renderMenuItem(<PeopleIcon />, "Users", '/admin-dashboard/users')}

      {/* Add Users */}
      {renderMenuItem(<PersonAddIcon />, "Add Users", '/admin-dashboard/add-users')}
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
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default AdminSidebar; 