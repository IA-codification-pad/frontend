import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ClassIcon from '@mui/icons-material/Class';
import HistoryIcon from '@mui/icons-material/History';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ open, onClose }) => {
  const { user } = useAuth();

  const menuItems = [
    { text: 'Accueil', icon: <HomeIcon />, link: '/' },
    { text: 'Classification', icon: <ClassIcon />, link: '/classification', requireAuth: true },
    { text: 'Classification par lot', icon: <ListAltIcon />, link: '/batch-classification', requireAuth: true },
    { text: 'Historique', icon: <HistoryIcon />, link: '/history', requireAuth: true },
    { text: 'Chatbot Assistant', icon: <ChatIcon />, link: '/chatbot', requireAuth: true },
  ];

  const adminItems = [
    { text: 'Dashboard Développeur', icon: <DashboardIcon />, link: '/developer', requireAdmin: true },
    { text: 'Configuration', icon: <SettingsIcon />, link: '/config', requireAdmin: true },
  ];

  const drawerWidth = 240;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <img 
            src="/assets/images/logo.png" 
            alt="PAD Logo" 
            style={{ maxWidth: '80%', height: 'auto' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150x80?text=PAD+Logo';
            }}
          />
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            (!item.requireAuth || user) && (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  component={RouterLink} 
                  to={item.link}
                  onClick={onClose}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )
          ))}
        </List>
        <Divider />
        {user && user.role === 'admin' && (
          <List>
            {adminItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  component={RouterLink} 
                  to={item.link}
                  onClick={onClose}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
