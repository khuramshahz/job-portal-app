import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import App from './pages/App'
import Login from './pages/Login'
import Register from './pages/Register'
import JobList from './pages/JobList'
import JobDetails from './pages/JobDetails'
import EmployerDashboard from './pages/EmployerDashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import CareerResources from './pages/CareerResources'
import ResumeBuilder from './pages/ResumeBuilder'
import InterviewTips from './pages/InterviewTips'
import PricingPlans from './pages/PricingPlans'
import EmployerResources from './pages/EmployerResources'
import HelpCenter from './pages/HelpCenter'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Careers from './pages/Careers'
import Press from './pages/Press'
import Blog from './pages/Blog'
import { AuthProvider } from './context/AuthContext'

import './styles.css'

const theme = createTheme({
  palette: {
    primary: { main: '#ff6b35' }, // Vibrant orange
    secondary: { main: '#f72585' }, // Hot pink
    success: { main: '#06ffa5' }, // Bright green
    background: { default: '#f8f9fa' },
    text: { primary: '#2d3436' }
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h4: { fontWeight: 700, color: '#ff6b35' },
    h6: { fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.6 }
  },
  components: {
    MuiAppBar: { 
      styleOverrides: { 
        root: { 
          padding: '8px 0',
          background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        } 
      } 
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
          }
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)'
          }
        }
      }
    }
  }
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<JobList />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="jobs/:id" element={<JobDetails />} />
              <Route path="employer" element={<EmployerDashboard />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="career-resources" element={<CareerResources />} />
              <Route path="resume-builder" element={<ResumeBuilder />} />
              <Route path="interview-tips" element={<InterviewTips />} />
              <Route path="pricing-plans" element={<PricingPlans />} />
              <Route path="employer-resources" element={<EmployerResources />} />
              <Route path="help-center" element={<HelpCenter />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="careers" element={<Careers />} />
              <Route path="press" element={<Press />} />
              <Route path="blog" element={<Blog />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
