import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import StarIcon from '@mui/icons-material/Star'

export default function PricingPlans() {
  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Pricing Plans
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', fontWeight: 400 }}>
        Choose the perfect plan for your hiring needs
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                Basic
              </Typography>
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 800, color: 'primary.main' }}>
                $29<span style={{ fontSize: '1rem', fontWeight: 400 }}>/month</span>
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Post up to 5 jobs" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Basic candidate filtering" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Email support" />
                </ListItem>
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 3 }}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 12px 40px rgba(0,0,0,0.15)', height: '100%', position: 'relative', border: '2px solid #ff6b35' }}>
            <Box sx={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', bgcolor: '#ff6b35', color: 'white', px: 2, py: 0.5, borderRadius: 1, fontSize: '0.8rem', fontWeight: 600 }}>
              MOST POPULAR
            </Box>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                Professional
              </Typography>
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 800, color: 'primary.main' }}>
                $79<span style={{ fontSize: '1rem', fontWeight: 400 }}>/month</span>
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Post unlimited jobs" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Advanced candidate filtering" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Priority support" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Analytics dashboard" />
                </ListItem>
              </List>
              <Button variant="contained" fullWidth sx={{ mt: 3, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' } }}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                Enterprise
              </Typography>
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 800, color: 'primary.main' }}>
                $199<span style={{ fontSize: '1rem', fontWeight: 400 }}>/month</span>
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Everything in Professional" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Dedicated account manager" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Custom integrations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                  <ListItemText primary="Advanced analytics" />
                </ListItem>
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 3 }}>
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}