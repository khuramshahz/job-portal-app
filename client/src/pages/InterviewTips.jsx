import React from 'react'
import { Box, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'

export default function InterviewTips() {
  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Interview Tips
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', fontWeight: 400 }}>
        Master your next interview with these proven strategies and tips
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CheckCircleIcon sx={{ mr: 2, color: 'success.main', fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Preparation
                </Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary="Research the company thoroughly" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Practice common interview questions" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Prepare questions for the interviewer" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Review your resume and portfolio" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LightbulbIcon sx={{ mr: 2, color: 'warning.main', fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  During Interview
                </Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary="Arrive 10-15 minutes early" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Dress professionally and appropriately" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Maintain good eye contact and posture" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Listen actively and answer clearly" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <QuestionAnswerIcon sx={{ mr: 2, color: 'info.main', fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Follow Up
                </Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText primary="Send a thank-you email within 24 hours" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Reiterate your interest in the position" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Connect on LinkedIn if appropriate" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Be patient while waiting for response" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}