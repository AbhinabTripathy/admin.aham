import React, { useState } from 'react';
import { FaRegNewspaper, FaUsers, FaFileAlt, FaTimesCircle, FaBook, FaHeadphones, FaShoppingBag } from 'react-icons/fa';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Static data for the dashboard
  const [stats] = useState({
    approvedPosts: 150,
    membersAdded: 75,
    pendingApprovals: 30,
    rejectedPosts: 25,
    novels: 200,
    audioBooks: 85,
    mallItems: 320
  });

  const [showSessionExpiredDialog, setShowSessionExpiredDialog] = useState(false);
  const navigate = useNavigate();

  // Handle redirect to login page
  const handleLoginRedirect = () => {
    localStorage.clear();
    sessionStorage.clear();
    setShowSessionExpiredDialog(false);
    navigate('/user/login');
  };

  // Responsive styles for the container
  const containerStyle = {
    padding: isMobile ? '20px 16px' : isTablet ? '25px 24px' : '30px 40px',
    transition: 'padding 0.3s ease'
  };

  // Responsive styles for the title
  const titleStyle = {
    fontSize: isMobile ? '1.75rem' : isTablet ? '2rem' : '2.5rem',
    margin: '0',
    fontWeight: 'bold',
    color: '#111827',
    transition: 'font-size 0.3s ease'
  };

  // Responsive styles for the welcome text
  const welcomeStyle = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    margin: isMobile ? '0.35rem 0 1.5rem 0' : '0.5rem 0 2.5rem 0',
    color: '#6b7280',
    transition: 'all 0.3s ease'
  };

  // Responsive styles for the cards grid
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 
                        isTablet ? 'repeat(2, 1fr)' : 
                        'repeat(auto-fit, minmax(220px, 1fr))',
    gap: isMobile ? '16px' : '20px',
    transition: 'all 0.3s ease'
  };

  // Styles for individual cards
  const cardStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: isMobile ? '12px 20px' : '15px 25px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }
  };

  // Styles for card icon container
  const iconContainerStyle = (bgColor, iconColor) => ({
    backgroundColor: bgColor,
    borderRadius: '8px',
    padding: isMobile ? '10px' : '12px',
    marginRight: isMobile ? '16px' : '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  });

  // Styles for card content
  const cardContentStyle = {
    flex: 1
  };

  // Styles for card numbers
  const numberStyle = {
    fontSize: isMobile ? '1.5rem' : '2rem',
    fontWeight: 'bold',
    margin: '0',
    color: '#111827',
    transition: 'font-size 0.3s ease'
  };

  // Styles for card labels
  const labelStyle = {
    fontSize: isMobile ? '0.875rem' : '1rem',
    color: '#4b5563',
    transition: 'font-size 0.3s ease'
  };

  const sublabelStyle = {
    fontSize: isMobile ? '0.75rem' : '0.875rem',
    color: '#6b7280',
    transition: 'font-size 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      {/* Session Expired Dialog */}
      <Dialog
        open={showSessionExpiredDialog}
        onClose={() => {}}
        aria-labelledby="session-expired-dialog-title"
        aria-describedby="session-expired-dialog-description"
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: isMobile ? '320px' : '450px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            backgroundColor: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            m: 0,
            p: isMobile ? 2 : 3,
            alignItems: "center"
          }
        }}
      >
        <DialogTitle id="session-expired-dialog-title" sx={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: isMobile ? '20px' : '24px',
          pb: 1,
          pt: 2
        }}>
          Session Expired
        </DialogTitle>
        <DialogContent sx={{ px: isMobile ? 2 : 3, pb: 2, pt: 0 }}>
          <DialogContentText id="session-expired-dialog-description" sx={{ 
            color: '#4b5563',
            textAlign: 'center',
            fontSize: isMobile ? '14px' : '16px',
            lineHeight: 1.5
          }}>
            Your session has expired. Please login again to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ 
          px: isMobile ? 2 : 3, 
          pb: 2, 
          pt: 1,
          justifyContent: 'center'
        }}>
          <Button 
            onClick={handleLoginRedirect} 
            variant="contained"
            autoFocus
            sx={{
              bgcolor: '#6366f1',
              color: 'white',
              px: isMobile ? 3 : 4,
              py: 1.2,
              borderRadius: '6px',
              minWidth: isMobile ? '100px' : '130px',
              fontWeight: 'bold',
              fontSize: isMobile ? '14px' : '16px',
              '&:hover': {
                bgcolor: '#4f46e5'
              }
            }}
          >
            LOGIN
          </Button>
        </DialogActions>
      </Dialog>

      <div>
        <h1 style={titleStyle}>
          Admin Dashboard
        </h1>
        <p style={welcomeStyle}>
          Welcome, Aham Core Admin
        </p>
      </div>

      <div style={gridStyle}>
        {/* Approved Posts */}
        <div style={cardStyle}>
          <div style={iconContainerStyle('rgba(37, 99, 235, 0.1)', '#1d4ed8')}>
            <FaRegNewspaper size={isMobile ? 24 : 32} color="#1d4ed8" />
          </div>
          <div style={cardContentStyle}>
            <h2 style={numberStyle}>{stats.approvedPosts}</h2>
            <div style={labelStyle}>Posts</div>
            <div style={sublabelStyle}>Approved</div>
          </div>
        </div>

        {/* Members */}
        <div style={cardStyle}>
          <div style={iconContainerStyle('rgba(22, 163, 74, 0.1)', '#15803d')}>
            <FaUsers size={isMobile ? 24 : 32} color="#15803d" />
          </div>
          <div style={cardContentStyle}>
            <h2 style={numberStyle}>{stats.membersAdded}</h2>
            <div style={labelStyle}>Members</div>
            <div style={sublabelStyle}>Users Added</div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div style={cardStyle}>
          <div style={iconContainerStyle('rgba(234, 88, 12, 0.1)', '#ea580c')}>
            <FaFileAlt size={isMobile ? 24 : 32} color="#ea580c" />
          </div>
          <div style={cardContentStyle}>
            <h2 style={numberStyle}>{stats.pendingApprovals}</h2>
            <div style={labelStyle}>Posts</div>
            <div style={sublabelStyle}>Pending Approvals</div>
          </div>
        </div>

        {/* Rejects */}
        <div style={cardStyle}>
          <div style={iconContainerStyle('rgba(220, 38, 38, 0.1)', '#dc2626')}>
            <FaTimesCircle size={isMobile ? 24 : 32} color="#dc2626" />
          </div>
          <div style={cardContentStyle}>
            <h2 style={numberStyle}>{stats.rejectedPosts}</h2>
            <div style={labelStyle}>Rejects</div>
            <div style={sublabelStyle}>Post Rejected</div>
          </div>
        </div>

        {/* Novels */}
        <div style={cardStyle}>
          <div style={iconContainerStyle('rgba(124, 58, 237, 0.1)', '#7c3aed')}>
            <FaBook size={isMobile ? 24 : 32} color="#7c3aed" />
          </div>
          <div style={cardContentStyle}>
            <h2 style={numberStyle}>{stats.novels}</h2>
            <div style={labelStyle}>Books</div>
            <div style={sublabelStyle}>Novels</div>
          </div>
        </div>

        {/* Audio Books */}
        <div style={cardStyle}>
          <div style={iconContainerStyle('rgba(236, 72, 153, 0.1)', '#ec4899')}>
            <FaHeadphones size={isMobile ? 24 : 32} color="#ec4899" />
          </div>
          <div style={cardContentStyle}>
            <h2 style={numberStyle}>{stats.audioBooks}</h2>
            <div style={labelStyle}>Books</div>
            <div style={sublabelStyle}>Audio Books</div>
          </div>
        </div>

        {/* Mall Items */}
        <div style={cardStyle}>
          <div style={iconContainerStyle('rgba(245, 158, 11, 0.1)', '#f59e0b')}>
            <FaShoppingBag size={isMobile ? 24 : 32} color="#f59e0b" />
          </div>
          <div style={cardContentStyle}>
            <h2 style={numberStyle}>{stats.mallItems}</h2>
            <div style={labelStyle}>Items</div>
            <div style={sublabelStyle}>Mall Products</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 