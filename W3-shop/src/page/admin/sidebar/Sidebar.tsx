// src/components/Sidebar.tsx
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
  } from "@mui/material";
  import {
    Home as HomeIcon,
    Add as AddIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
  } from "@mui/icons-material";
  import { Link } from "react-router-dom";
  
  const drawerWidth = 240;
  
  const Sidebar = ({ mobileOpen, handleDrawerToggle }: { mobileOpen: boolean, handleDrawerToggle: () => void }) => {
    const drawer = (
      <div>
        <Toolbar />
        <List>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/products/add" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </ListItem>
          </Link>
          <Link to="/categories/add" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Category" />
            </ListItem>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </Link>
          <Link to="/settings" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </Link>
        </List>
      </div>
    );
  
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    );
  };
  
  export default Sidebar;
  