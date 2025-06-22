import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
import Overview from './Overview';
import GraphicNovel from './GraphicNovel';
import Audiobook from './Audiobook';
import Mall from './Mall';
import ApprovedContent from './ApprovedContent';
import PendingContent from './PendingContent';
import RejectedContent from './RejectedContent';
import { useLocation } from 'react-router-dom';

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  overflow: 'hidden',
  position: 'relative',
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  paddingTop: '48px', // Mobile header height
  transition: 'padding-top 0.3s ease',
  minHeight: 'calc(100vh - 48px)', // Subtract mobile header height
  [theme.breakpoints.between('sm', 'md')]: {
    paddingTop: '52px',
    minHeight: 'calc(100vh - 52px)', // Subtract tablet header height
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: '56px',
    minHeight: 'calc(100vh - 56px)', // Subtract desktop header height
  },
}));

const ContentWrapper = styled(Box)(({ theme, isSidebarOpen }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isSidebarOpen && {
    [theme.breakpoints.up('md')]: {
      marginLeft: '240px',
      width: `calc(100% - 240px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
}));

const Content = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(8), // Add padding for footer
  overflowX: 'hidden',
  overflowY: 'auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2.5),
    paddingBottom: theme.spacing(8),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
    '&:hover': {
      background: '#555',
    },
  },
}));

const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.drawer + 2,
  transition: 'all 0.3s ease',
}));

const SidebarWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    height: '100%',
    flexShrink: 0,
  },
}));

const FooterWrapper = styled(Box)(({ theme, isSidebarOpen }) => ({
  position: 'fixed',
  bottom: 0,
  right: 0,
  width: '100%',
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(['width', 'left'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isSidebarOpen && {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - 240px)`,
      transition: theme.transitions.create(['width', 'left'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
  backgroundColor: '#fff',
  boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.05)',
}));

const AdminDashboard = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  // Update sidebar state when screen size changes
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on mobile when clicking outside
  const handleContentClick = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= theme.breakpoints.values.md) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme.breakpoints.values.md]);

  // Render content based on current route
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/admin-dashboard':
        return <Overview />;
      case '/admin-dashboard/graphic-novel':
        return <GraphicNovel />;
      case '/admin-dashboard/audio-book':
        return <Audiobook />;
      case '/admin-dashboard/mall':
        return <Mall />;
      case '/admin-dashboard/approved':
        return <ApprovedContent />;
      case '/admin-dashboard/pending':
        return <PendingContent key="pending-content" />;
      case '/admin-dashboard/rejected':
        return <RejectedContent />;
      default:
        return <Overview />;
    }
  };

  return (
    <DashboardContainer>
      <HeaderWrapper>
        <AdminHeader 
          onMenuClick={toggleSidebar} 
          isSidebarOpen={isSidebarOpen}
        />
      </HeaderWrapper>
      
      <MainContent>
        <SidebarWrapper>
          <AdminSidebar 
            open={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            variant={isMobile ? 'temporary' : 'permanent'}
          />
        </SidebarWrapper>
        
        <ContentWrapper 
          isSidebarOpen={isSidebarOpen} 
          onClick={handleContentClick}
        >
          <Content>
            {renderContent()}
          </Content>
        </ContentWrapper>
      </MainContent>

      <FooterWrapper isSidebarOpen={isSidebarOpen}>
        <AdminFooter />
      </FooterWrapper>
    </DashboardContainer>
  );
};

export default AdminDashboard; 