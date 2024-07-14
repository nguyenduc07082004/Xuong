// Footer.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" component="div">
          <Typography variant="subtitle1" color="inherit" sx={{ fontWeight: 'bold' }}>
          W3
          </Typography>
          <Typography variant="body2" color="inherit">
            Address: 123 Example St, City, Country
            <br />
            Email: contact@example.com
            <br />
            Phone: +1234567890
          </Typography>
        </Typography>
        <Typography variant="body1" component="div">
          <Link href="/privacy-policy" color="inherit" underline="hover">
            Privacy Policy
          </Link>
          {' | '}
          <Link href="/terms-of-service" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
