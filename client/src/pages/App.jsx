import React, { useContext } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import WorkIcon from '@mui/icons-material/Work'
import { AuthContext } from '../context/AuthContext'
import Footer from '../components/Footer'

export default function App(){
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()

  const onLogout = ()=>{ logout(); nav('/') }

  return (
    <div className="root">
      <AppBar position="static" sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <Toolbar sx={{ display:'flex', justifyContent:'space-between', px: 3 }}>
          <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
            <WorkIcon sx={{ fontSize: 32, color: 'white' }} />
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration:'none', color:'inherit', fontWeight: 700 }}>
              JobFinder
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
              <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                Home
              </Button>
              <Button color="inherit" component={Link} to="about" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                About
              </Button>
              <Button color="inherit" component={Link} to="blog" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                Blog
              </Button>
              <Button color="inherit" component={Link} to="contact" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                Contact
              </Button>
            </Box>
          </Box>
          <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
            <IconButton color="inherit" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
              <SearchIcon />
            </IconButton>
            {!user ? (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login" 
                  sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/register" 
                  sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/employer" 
                  sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Employer
                </Button>
                <IconButton 
                  color="inherit" 
                  onClick={onLogout} 
                  sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>{user.name?.[0]}</Avatar>
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <main className="container" style={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)', padding: '20px 0' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
