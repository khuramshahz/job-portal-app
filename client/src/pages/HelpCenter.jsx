import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, TextField, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'

export default function HelpCenter() {
  const faqs = [
    {
      question: 'How do I create a job posting?',
      answer: 'To create a job posting, log in as an employer, navigate to your dashboard, and click "Post New Job". Fill in the required details and publish.'
    },
    {
      question: 'How do I apply for a job?',
      answer: 'Browse available jobs, click on a job you\'re interested in, and click "Apply Now". Upload your resume and fill in any additional information.'
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email.'
    },
    {
      question: 'What file formats are accepted for resumes?',
      answer: 'We accept PDF, DOC, and DOCX formats for resume uploads.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact our support team through the contact form or by emailing support@jobportal.com.'
    }
  ]

  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Help Center
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', fontWeight: 400 }}>
        Find answers to common questions and get support
      </Typography>

      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
        <TextField
          placeholder="Search for help..."
          variant="outlined"
          sx={{ width: '100%', maxWidth: 500 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                Still need help?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Can't find what you're looking for? Our support team is here to help.
              </Typography>
              <Button variant="contained" fullWidth sx={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' } }}>
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}