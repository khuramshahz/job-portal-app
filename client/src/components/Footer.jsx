import React from 'react'
import { Box, Typography, Link, Grid, Divider, IconButton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import WorkIcon from '@mui/icons-material/Work'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', color: 'white', py: 6, mt: 8 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <WorkIcon sx={{ mr: 2, fontSize: 40 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                JobFinder
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, opacity: 0.9 }}>
              Your trusted partner in career advancement. We connect talented individuals with amazing opportunities, fostering growth and success in the professional world.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" size="small" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" size="small" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" size="small" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" size="small" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              For Job Seekers
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link component={RouterLink} to="/jobs" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Browse Jobs</Link>
              <Link component={RouterLink} to="/career-resources" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Career Resources</Link>
              <Link component={RouterLink} to="/resume-builder" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Resume Builder</Link>
              <Link component={RouterLink} to="/interview-tips" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Interview Tips</Link>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              For Employers
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Post a Job</Link>
              <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Find Talent</Link>
              <Link component={RouterLink} to="/pricing-plans" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Pricing Plans</Link>
              <Link component={RouterLink} to="/employer-resources" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Employer Resources</Link>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link component={RouterLink} to="/help-center" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Help Center</Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Contact Us</Link>
              <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Privacy Policy</Link>
              <Link component={RouterLink} to="/terms-of-service" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Terms of Service</Link>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>About Us</Link>
              <Link component={RouterLink} to="/careers" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Careers</Link>
              <Link component={RouterLink} to="/press" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Press</Link>
              <Link component={RouterLink} to="/blog" color="inherit" underline="hover" sx={{ fontSize: '0.95rem', opacity: 0.8, '&:hover': { opacity: 1 } }}>Blog</Link>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.2)' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2025 JobFinder. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="hover" sx={{ fontSize: '0.9rem', opacity: 0.7, '&:hover': { opacity: 1 } }}>Privacy</Link>
            <Link component={RouterLink} to="/terms-of-service" color="inherit" underline="hover" sx={{ fontSize: '0.9rem', opacity: 0.7, '&:hover': { opacity: 1 } }}>Terms</Link>
            <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '0.9rem', opacity: 0.7, '&:hover': { opacity: 1 } }}>Cookies</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}