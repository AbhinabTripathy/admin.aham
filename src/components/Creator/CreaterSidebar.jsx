import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, Tooltip, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Drawer } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SidebarContainer = styled(Box)(({ theme, isCollapsed }) => ({
  padding: '20px 0',
  height: '100%',
  backgroundColor: '#1e3c72',
  color: '#fff',
  overflowY: 'auto',
  width: isCollapsed ? '60px' : '240px',
  transition: 'width 0.3s ease',
  marginTop: '48px', // Match mobile header height
  position: 'relative',
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
  position: 'relative',
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
  padding: isCollapsed ? '10px' : '10px 20px 10px 44px',
  cursor: 'pointer',
  backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
  transition: 'all 0.3s ease',
  justifyContent: isCollapsed ? 'center' : 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
}));

const CollapsibleMenu = styled(Box)(({ theme, isCollapsed, top }) => ({
  position: isCollapsed ? 'fixed' : 'relative',
  left: isCollapsed ? '60px' : '0',
  top: isCollapsed ? top : 'auto',
  width: isCollapsed ? '200px' : '100%',
  backgroundColor: isCollapsed ? '#2a5298' : 'transparent',
  borderRadius: isCollapsed ? '0 4px 4px 0' : '0',
  boxShadow: isCollapsed ? '4px 4px 8px rgba(0,0,0,0.2)' : 'none',
  zIndex: 1300,
  overflow: 'hidden',
  '.MuiCollapse-wrapper': {
    width: '100%'
  }
}));

const CreaterSidebar = ({ open, onClose, variant = 'permanent' }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isCollapsed = isMobile || variant === 'temporary';
  const [createContentOpen, setCreateContentOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState(0);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
      setCreateContentOpen(false);
    }
  };

  const toggleCreateContent = (event) => {
    event.stopPropagation();
    // Calculate the position of the dropdown relative to the viewport
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition(rect.top);
    setCreateContentOpen(!createContentOpen);
  };

  const renderMenuItem = (icon, text, path, showTooltip = true, hasSubmenu = false, onClick = null) => (
    <Tooltip title={isCollapsed && showTooltip ? text : ''} placement="right">
      <MenuItem 
        active={location.pathname === path}
        onClick={onClick || (() => handleNavigation(path))}
        isCollapsed={isCollapsed}
      >
        <IconWrapper isCollapsed={isCollapsed}>
          {icon}
        </IconWrapper>
        <MenuText isCollapsed={isCollapsed}>{text}</MenuText>
        {hasSubmenu && !isCollapsed && (
          <Box sx={{ ml: 'auto' }}>
            {createContentOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
        )}
        {hasSubmenu && isCollapsed && createContentOpen && (
          <CollapsibleMenu isCollapsed={isCollapsed} top={menuPosition}>
            <Collapse in={createContentOpen}>
              {renderSubMenuItem(
                <MenuBookIcon />,
                "Create Graphic Novel",
                '/creator-dashboard/create-content/graphic-novel'
              )}
              {renderSubMenuItem(
                <HeadphonesIcon />,
                "Create Audio Book",
                '/creator-dashboard/create-content/audio-book'
              )}
            </Collapse>
          </CollapsibleMenu>
        )}
      </MenuItem>
    </Tooltip>
  );

  const renderSubMenuItem = (icon, text, path) => (
    <Tooltip title={isCollapsed ? text : ''} placement="right">
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
    </Tooltip>
  );

  const sidebarContent = (
    <SidebarContainer isCollapsed={isCollapsed}>
      {/* Overview */}
      {renderMenuItem(<DashboardIcon />, "Overview", '/creator-dashboard')}

      {/* CONTENT MANAGEMENT Section */}
      <SectionTitle isCollapsed={isCollapsed}>CONTENT MANAGEMENT</SectionTitle>

      {/* In responsive mode, show direct icons */}
      {isCollapsed ? (
        <>
          <Tooltip title="Create Graphic Novel" placement="right">
            <MenuItem 
              active={location.pathname === '/creator-dashboard/create-content/graphic-novel'}
              onClick={() => handleNavigation('/creator-dashboard/create-content/graphic-novel')}
              isCollapsed={isCollapsed}
            >
              <IconWrapper isCollapsed={isCollapsed}>
                <MenuBookIcon />
              </IconWrapper>
            </MenuItem>
          </Tooltip>
          <Tooltip title="Create Audio Book" placement="right">
            <MenuItem 
              active={location.pathname === '/creator-dashboard/create-content/audio-book'}
              onClick={() => handleNavigation('/creator-dashboard/create-content/audio-book')}
              isCollapsed={isCollapsed}
            >
              <IconWrapper isCollapsed={isCollapsed}>
                <HeadphonesIcon />
              </IconWrapper>
            </MenuItem>
          </Tooltip>
        </>
      ) : (
        <>
          {/* Create Content with Dropdown for desktop */}
          {renderMenuItem(
            <AddCircleOutlineIcon />,
            "Create Content",
            null,
            true,
            true,
            toggleCreateContent
          )}
          
          <Collapse in={createContentOpen}>
            {renderSubMenuItem(
              <MenuBookIcon />,
              "Create Graphic Novel",
              '/creator-dashboard/create-content/graphic-novel'
            )}
            {renderSubMenuItem(
              <HeadphonesIcon />,
              "Create Audio Book",
              '/creator-dashboard/create-content/audio-book'
            )}
          </Collapse>
        </>
      )}

      {/* CONTENT STATUS Section */}
      <SectionTitle isCollapsed={isCollapsed}>CONTENT STATUS</SectionTitle>

      {/* All Content */}
      {renderMenuItem(<ArticleIcon />, "Approved Content", '/creator-dashboard/all-content')}

      {/* Pending Review */}
      {renderMenuItem(<PendingIcon />, "Pending Review", '/creator-dashboard/pending')}

      {/* Needs Revision */}
      {renderMenuItem(<BlockIcon />, "Rejected Content", '/creator-dashboard/rejected')}
    </SidebarContainer>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={() => {
        onClose();
        setCreateContentOpen(false);
      }}
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
            position: 'relative',
          },
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default CreaterSidebar; 